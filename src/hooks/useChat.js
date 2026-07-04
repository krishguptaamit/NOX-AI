import { useState } from "react";

export default function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello Krish 👋 Welcome to NOX AI. How can I help you today?",
    },
  ]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text,
      },
    ]);
  };

  return {
    messages,
    sendMessage,
  };
}