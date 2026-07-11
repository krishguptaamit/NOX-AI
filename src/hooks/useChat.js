import { useEffect, useState } from "react";
import {
  askAI,
  askAIStream,
} from "../services/aiService";
import { AI_PROVIDERS } from "../config/providers";
import { AI_MODELS } from "../config/models";
import { fileToBase64 } from "../utils/fileToBase64";

export default function useChat() {

  const [provider, setProvider] = useState(
  AI_PROVIDERS.AUTO
);

// const abortControllerRef = useRef(null);

const [theme, setTheme] = useState(() => {
  return localStorage.getItem("nox-theme") || "dark";
});

const [voiceLanguage, setVoiceLanguage] = useState(() => {
  return localStorage.getItem("nox-voice-language") || "auto";
});

 const [conversations, setConversations] = useState(() => {


  const saved = localStorage.getItem("nox-conversations");

  if (saved) {
    return JSON.parse(saved);
  }

  return [
    {
      id: 1,
      title: "New Chat",
      pinned: false,
      messages: [
        {
          id: 1,
          sender: "ai",
          text: "Hello Krish 👋 Welcome to NOX AI. How can I help you today?",
        },
      ],
    },
  ];

});



const [currentChatId, setCurrentChatId] = useState(() => {

  const saved = localStorage.getItem("nox-current-chat");

  return saved ? Number(saved) : 1;

});

  const [isTyping, setIsTyping] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
const [editingText, setEditingText] = useState("");

  const currentConversation = conversations.find(
    (chat) => chat.id === currentChatId
  );

  const messages = currentConversation?.messages || [];

  async function generateAIResponse(apiMessages) {
  setIsTyping(true);

  try {
    const result = await askAI(apiMessages, provider);

    return result.content;
  } catch (error) {
    console.error(error);
    return "❌ Failed to connect to NOX AI.";
  } finally {
    setIsTyping(false);
  }
}



async function generateChatTitle(firstMessage) {
  try {
    const result = await askAI(
      [
        {
          role: "system",
          content:
            "Generate a very short chat title (maximum 4 words). Return only the title. No quotes. No punctuation.",
        },
        {
          role: "user",
          content: firstMessage,
        },
      ],
      provider
    );

    return result.content.trim();
  } catch (error) {
    console.error(error);

    return firstMessage.length > 30
      ? firstMessage.substring(0, 30) + "..."
      : firstMessage;
  }
}

  const sendMessage = async (text, file = null) => {
    if (!text.trim() && !file) return;

    let imageBase64 = null;

if (file && file.type.startsWith("image/")) {
  imageBase64 = await fileToBase64(file);
}

   const userMessage = {
  id: Date.now(),
  sender: "user",
  text,
  file,
  imageBase64,
};

//check
// console.log(userMessage);

   setConversations((prev) =>
  prev.map((chat) => {
    if (chat.id !== currentChatId) return chat;

    return {
      ...chat,
      messages: [...chat.messages, userMessage],
    };
  })
);


   setIsTyping(true);

try {
  const currentConversation = conversations.find(
  (chat) => chat.id === currentChatId
);

const aiMessages = currentConversation.messages.map((msg) => {
  if (msg.imageBase64) {
    return {
      role: msg.sender === "user" ? "user" : "assistant",
      content: [
        {
          type: "text",
          text: msg.text,
        },
        {
          type: "image_url",
          image_url: {
            url: msg.imageBase64,
          },
        },
      ],
    };
  }

  return {
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.text,
  };
});

const aiId = Date.now() + 1;

setConversations((prev) =>
  prev.map((chat) =>
    chat.id === currentChatId
      ? {
          ...chat,
          messages: [
            ...chat.messages,
            {
              id: aiId,
              sender: "ai",
              text: "",
            },
          ],
        }
      : chat
  )
);

let fullText = "";

await askAIStream(
  [
    ...aiMessages,
    imageBase64
      ? {
          role: "user",
          content: [
            {
              type: "text",
              text,
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
              },
            },
          ],
        }
      : {
          role: "user",
          content: text,
        },
  ],
  provider,
  (chunk) => {
    fullText += chunk;

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === aiId
                  ? {
                      ...msg,
                      text: fullText,
                    }
                  : msg
              ),
            }
          : chat
      )
    );
  },
  imageBase64
    ? AI_MODELS.VISION
    : AI_MODELS.CHAT,

);

const currentChat = conversations.find(
  (chat) => chat.id === currentChatId
);

if (currentChat?.title === "New Chat") {
  const aiTitle = await generateChatTitle(text);

  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === currentChatId
        ? {
            ...chat,
            title: aiTitle,
          }
        : chat
    )
  );
}


} catch (error) {
  console.error(error);

  const aiMessage = {
    id: Date.now() + 1,
    sender: "ai",
    text: "❌ Failed to connect to NOX AI.",
  };

  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === currentChatId
        ? {
            ...chat,
            messages: [...chat.messages, aiMessage],
          }
        : chat
    )
  );
}finally{

setIsTyping(false);
}
  };

  const regenerateResponse = async () => {
  const currentConversation = conversations.find(
    (chat) => chat.id === currentChatId
  );

  if (!currentConversation) return;

  const messages = currentConversation.messages;

  // Last user message dhoondo
  const lastUserMessage = [...messages]
    .reverse()
    .find((msg) => msg.sender === "user");

  if (!lastUserMessage) return;

  await sendMessage(lastUserMessage.text);
};

// const stopGeneration = () => {
//   abortControllerRef.current?.abort();
//   setIsTyping(false);
// };

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      pinned: false,
      messages: [
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Hello 👋 I'm ready to help.",
        },
      ],
    };

    setConversations((prev) => [newChat, ...prev]);

    setCurrentChatId(newChat.id);
  };

  const editMessage = (messageId, text) => {
  setEditingMessageId(messageId);
  setEditingText(text);
};

const saveEditedMessage = async () => {
  if (!editingText.trim()) return;

  const currentConversation = conversations.find(
    (chat) => chat.id === currentChatId
  );

  if (!currentConversation) return;

  // Updated messages
  const updatedMessages = currentConversation.messages.map((msg) =>
    msg.id === editingMessageId
      ? {
          ...msg,
          text: editingText,
        }
      : msg
  );

  // Edited message ka index
  const editedIndex = updatedMessages.findIndex(
    (msg) => msg.id === editingMessageId
  );

  // Sirf edited message tak rakho
  const history = updatedMessages.slice(0, editedIndex + 1);

  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === currentChatId
        ? {
            ...chat,
            messages: history,
          }
        : chat
    )
  );

  setEditingMessageId(null);
  setEditingText("");

  // API messages
  const apiMessages = history.map((msg) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.text,
  }));

  const aiId = Date.now();

  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === currentChatId
        ? {
            ...chat,
            messages: [
              ...history,
              {
                id: aiId,
                sender: "ai",
                text: "",
              },
            ],
          }
        : chat
    )
  );

  const result = await generateAIResponse(apiMessages);

  await typeWriter(result, (currentText) => {
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === aiId
                  ? {
                      ...msg,
                      text: currentText,
                    }
                  : msg
              ),
            }
          : chat
      )
    );
  });
};

  const renameChat = (chatId, newTitle) => {
  if (!newTitle.trim()) return;

  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            title: newTitle.trim(),
          }
        : chat
    )
  );
};

const pinChat = (chatId) => {
  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            pinned: !chat.pinned,
          }
        : chat
    )
  );
};

  const deleteChat = (chatId) => {
  // Agar sirf 1 chat hai to delete mat karo
  if (conversations.length === 1) return;

  const updatedChats = conversations.filter(
    (chat) => chat.id !== chatId
  );

  setConversations(updatedChats);

  // Agar current chat delete hui to pehli chat open karo
  if (currentChatId === chatId) {
    setCurrentChatId(updatedChats[0].id);
  }
};

const clearCurrentChat = () => {
  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === currentChatId
        ? {
            ...chat,
            messages: [
              {
                id: Date.now(),
                sender: "ai",
                text: "Hello 👋 I'm ready to help.",
              },
            ],
            title: "New Chat",
          }
        : chat
    )
  );
};

  useEffect(() => {

  localStorage.setItem(
    "nox-conversations",
    JSON.stringify(conversations)
  );

}, [conversations]);

useEffect(() => {

  localStorage.setItem(
    "nox-current-chat",
    currentChatId
  );

}, [currentChatId]);

useEffect(() => {
  localStorage.setItem("nox-theme", theme);
}, [theme]);

useEffect(() => {
  localStorage.setItem(
    "nox-voice-language",
    voiceLanguage
  );
}, [voiceLanguage]);

return {
  conversations,
  currentChatId,
  setCurrentChatId,
  messages,
  sendMessage,
  regenerateResponse,

  editingMessageId,
  editingText,
  setEditingText,
  editMessage,
  saveEditedMessage,

  createNewChat,
  deleteChat,
  renameChat,
  pinChat,
  isTyping,

  provider,
setProvider,

theme,
setTheme,

voiceLanguage,
setVoiceLanguage,

clearCurrentChat,



// stopGeneration,
};
}