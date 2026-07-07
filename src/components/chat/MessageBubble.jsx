import { useState } from "react";
import {
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Pencil,
} from "lucide-react";
import MarkdownMessage from "./MarkdownMessage";


export default function MessageBubble({
  sender,
  text,
  imageBase64,
  messageId,
  regenerateResponse,

  editingMessageId,
  editingText,
  setEditingText,
  editMessage,
  saveEditedMessage,
}) {
  const isUser = sender === "user";

  const [copied, setCopied] = useState(false);

const copyMessage = async () => {
  try {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  } catch (err) {
    console.error(err);
  }
};


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
       {editingMessageId === messageId ? (
  <div className="space-y-3">

    <textarea
      value={editingText}
      onChange={(e) => setEditingText(e.target.value)}
      className="w-full rounded-xl bg-[#1B1725] p-3 outline-none border border-white/10 resize-none"
      rows={4}
    />

    <div className="flex justify-end gap-2">

      <button
        onClick={saveEditedMessage}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm hover:bg-violet-500"
      >
        Save
      </button>

      <button
        onClick={() => editMessage(null, "")}
        className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
      >
        Cancel
      </button>

    </div>

  </div>
) : (
  <>
    {isUser && imageBase64 && (
      <img
        src={imageBase64}
        alt="Uploaded"
        className="mb-4 max-h-72 w-full rounded-2xl object-cover border border-white/10"
      />
    )}

    <MarkdownMessage content={text} />
  </>
)}
        </div>

        {/* AI Actions */}

        {!isUser && (
          <div className="mt-4 flex items-center gap-2">

            <button
  onClick={copyMessage}
  className="rounded-xl bg-white/5 p-2 hover:bg-violet-500/10 transition"
>
  {copied ? (
    <Check size={16} className="text-green-400" />
  ) : (
    <Copy size={16} />
  )}
</button>
            <button className="rounded-xl bg-white/5 p-2 hover:bg-violet-500/10 transition">
              <ThumbsUp size={16} />
            </button>

            <button className="rounded-xl bg-white/5 p-2 hover:bg-violet-500/10 transition">
              <ThumbsDown size={16} />
            </button>

          <button
  onClick={regenerateResponse}
  className="rounded-xl bg-white/5 p-2 hover:bg-violet-500/10 transition"
>
  <RotateCcw size={16} />
</button>

          </div>
        )}

        {/* User Actions */}

{isUser && (
  <div className="mt-4 flex items-center justify-end gap-2">

    <button
  onClick={() => editMessage(messageId, text)}
  className="rounded-xl bg-white/5 p-2 hover:bg-violet-500/10 transition"
  title="Edit message"
>
  <Pencil size={16} />
</button>

  </div>
)}

      </div>
    </div>
  );
}