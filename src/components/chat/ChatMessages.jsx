import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages() {
  return (
    <div className="space-y-10 px-4 py-8 md:px-8">

      <MessageBubble
        sender="user"
        text="Create a beautiful React dashboard UI."
      />

      <MessageBubble
        sender="ai"
        text="Absolutely! I can create a premium React dashboard with a modern purple futuristic UI, glassmorphism effects, responsive layout and smooth animations."
      />

      <TypingIndicator />

    </div>
  );
}