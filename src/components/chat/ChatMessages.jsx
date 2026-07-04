import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({
  messages,
  isTyping,
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
        />

      ))}

    {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />

    </div>
  );
}