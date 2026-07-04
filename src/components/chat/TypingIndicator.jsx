import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">

        <Bot size={18} />

      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5">

        <div className="flex gap-2">

          <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400"></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-violet-400"
            style={{ animationDelay: ".2s" }}
          ></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-violet-400"
            style={{ animationDelay: ".4s" }}
          ></span>

        </div>

      </div>

    </div>
  );
}