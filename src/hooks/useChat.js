import { useState } from "react";

export default function useChat() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "New Chat",
      messages: [
        {
          id: 1,
          sender: "ai",
          text: "Hello Krish 👋 Welcome to NOX AI. How can I help you today?",
        },
      ],
    },
  ]);

  const [currentChatId, setCurrentChatId] = useState(1);

  const [isTyping, setIsTyping] = useState(false);

  const currentConversation = conversations.find(
    (chat) => chat.id === currentChatId
  );

  const messages = currentConversation?.messages || [];

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

   setConversations((prev) =>
  prev.map((chat) => {
    if (chat.id !== currentChatId) return chat;

    const shouldUpdateTitle =
      chat.title === "New Chat";

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

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: `You said: "${text}"

This is a temporary NOX AI response.`,
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

      setIsTyping(false);
    }, 1500);
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
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

  return {
    conversations,
    currentChatId,
    setCurrentChatId,
    messages,
    sendMessage,
    createNewChat,
    isTyping,
  };
}