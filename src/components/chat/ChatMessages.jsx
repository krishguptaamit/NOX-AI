import MessageBubble from "./MessageBubble";

export default function ChatMessages({
  messages,
}) {
  return (
    <div className="space-y-8 px-5 py-8">

      {messages.map((message) => (

        <MessageBubble
          key={message.id}
          sender={message.sender}
          text={message.text}
        />

      ))}

    </div>
  );
}