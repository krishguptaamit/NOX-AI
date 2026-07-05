import { useEffect, useState } from "react";
import { askAI } from "../services/aiService";
import { typeWriter } from "../utils/typeWriter";


export default function useChat() {
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
    const result = await askAI(apiMessages);

    return result.content;
  } catch (error) {
    console.error(error);
    return "❌ Failed to connect to NOX AI.";
  } finally {
    setIsTyping(false);
  }
}

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };
    setConversations((prev) =>
  prev.map((chat) => {
    if (chat.id !== currentChatId) return chat;

    const shouldUpdateTitle = chat.title === "New Chat";

    return {
      ...chat,
      title: shouldUpdateTitle
        ? text.length > 30
          ? text.substring(0, 30) + "..."
          : text
        : chat.title,
      messages: [...chat.messages, userMessage],
    };
  })
);

   setIsTyping(true);

try {
  const currentConversation = conversations.find(
  (chat) => chat.id === currentChatId
);

const aiMessages = currentConversation.messages.map((msg) => ({
  role: msg.sender === "user" ? "user" : "assistant",
  content: msg.text,
}));

const result = {
  content: await generateAIResponse([
    ...aiMessages,
    {
      role: "user",
      content: text,
    },
  ]),
};

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

await typeWriter(result.content, (currentText) => {
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

  // setConversations((prev) =>
  //   prev.map((chat) =>
  //     chat.id === currentChatId
  //       ? {
  //           ...chat,
  //           messages: [...chat.messages, aiMessage],
  //         }
  //       : chat
  //   )
  // );
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
}

setIsTyping(false);
    
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
};
}