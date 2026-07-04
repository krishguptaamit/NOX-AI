import { useState } from "react";
import {
  Paperclip,
  Image,
  Mic,
  SendHorizontal,
} from "lucide-react";

export default function ChatInput({
  sendMessage,
}) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-white/10 bg-[#0D0818]/80 backdrop-blur-xl p-3 md:p-4">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-2 md:p-3 shadow-[0_0_35px_rgba(139,92,246,.12)]">

        {/* Input */}

        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask NOX AI anything..."
          className="w-full resize-none bg-transparent px-2 py-2 text-white placeholder:text-gray-500 outline-none"
        />

        {/* Bottom */}

        <div className="mt-3 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <button className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-violet-500/10 transition">
              <Paperclip size={18} />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-violet-500/10 transition">
              <Image size={18} />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-violet-500/10 transition">
              <Mic size={18} />
            </button>

          </div>

          <button
            onClick={handleSend}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_25px_rgba(139,92,246,.4)] hover:scale-105 transition"
          >
            <SendHorizontal size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}