import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({
  messages,
  isTyping,
  regenerateResponse,

  editingMessageId,
  editingText,
  setEditingText,
  editMessage,
  saveEditedMessage,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="space-y-8 px-5 py-8">

      {messages.map((message) => (

    <MessageBubble
  key={message.id}
  sender={message.sender}
  text={message.text}
  imageBase64={message.imageBase64}
  regenerateResponse={regenerateResponse}

  editingMessageId={editingMessageId}
  editingText={editingText}
  setEditingText={setEditingText}
  editMessage={editMessage}
  saveEditedMessage={saveEditedMessage}

  messageId={message.id}
/>

      ))}

    {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />

    </div>
  );
}