import {
  Bot,
  User,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function MessageBubble({
  sender,
  text,
}) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[95%]
          sm:max-w-[90%]
          lg:max-w-[80%]
          xl:max-w-[70%]
        `}
      >
        {/* Header */}

        <div
          className={`mb-3 flex items-center gap-3 ${
            isUser ? "justify-end" : ""
          }`}
        >
          {!isUser && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
              <Bot size={18} />
            </div>
          )}

          <span className="font-semibold">
            {isUser ? "You" : "NOX AI"}
          </span>

          {isUser && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
              <User size={18} />
            </div>
          )}
        </div>

        {/* Bubble */}

        <div
          className={`rounded-3xl border border-white/10 p-5 leading-8 ${
            isUser
              ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
              : "bg-white/5 backdrop-blur-xl"
          }`}
        >
          {text}
        </div>

        {/* AI Actions */}

        {!isUser && (
          <div className="mt-4 flex items-center gap-2">

            <button className="rounded-xl bg-white/5 p-2 hover:bg-violet-500/10 transition">
              <Copy size={16} />
            </button>

            <button className="rounded-xl bg-white/5 p-2 hover:bg-violet-500/10 transition">
              <ThumbsUp size={16} />
            </button>

            <button className="rounded-xl bg-white/5 p-2 hover:bg-violet-500/10 transition">
              <ThumbsDown size={16} />
            </button>

            <button className="rounded-xl bg-white/5 p-2 hover:bg-violet-500/10 transition">
              <RotateCcw size={16} />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}