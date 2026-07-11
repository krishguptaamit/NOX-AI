import { useEffect, useRef, useState } from "react";

import {
  Send,
  Bot,
  User,
  LoaderCircle,
  FileText,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  Download,
  ChevronDown,
  FileDown,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

export default function ChatPanel({ pdf }) {
  const [question, setQuestion] = useState("");

  const [exportOpen, setExportOpen] =
  useState(false);

  const [copiedId, setCopiedId] = useState(null);

  const suggestions = [
  "Summarize this document",
  "What are the key points?",
  "Explain the main topic",
  "What are the important conclusions?",
];

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [pdf.messages, pdf.chatLoading]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!question.trim()) return;

    const currentQuestion = question;

    setQuestion("");

    await pdf.sendQuestion(currentQuestion);
  }

  async function copyAnswer(message) {
  await navigator.clipboard.writeText(
    message.content
  );

  setCopiedId(message.id);

  setTimeout(() => {
    setCopiedId(null);
  }, 1500);
}

async function regenerateAnswer() {
  if (chatLoading) return;

  const lastUserMessage = [...messages]
    .reverse()
    .find(
      (message) => message.role === "user"
    );

  if (!lastUserMessage) return;

  const question = lastUserMessage.content;

  const assistantId = crypto.randomUUID();

  setMessages((prev) => {
    const lastAssistantIndex = prev
      .map((message) => message.role)
      .lastIndexOf("assistant");

    if (lastAssistantIndex === -1) {
      return prev;
    }

    return prev.filter(
      (_, index) => index !== lastAssistantIndex
    );
  });

  setChatLoading(true);

  setMessages((prev) => [
    ...prev,
    {
      id: assistantId,
      role: "assistant",
      content: "",
    },
  ]);

  try {
    await askPDFQuestionStream(
      pdfText,
      question,
      (chunk) => {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content:
                    message.content + chunk,
                }
              : message
          )
        );
      }
    );
  } catch (error) {
    console.error(
      "Regenerate Error:",
      error
    );

    setMessages((prev) =>
      prev.map((message) =>
        message.id === assistantId
          ? {
              ...message,
              content:
                "Failed to regenerate answer.",
            }
          : message
      )
    );
  } finally {
    setChatLoading(false);
  }
}

function clearChat() {
  if (messages.length === 0) return;

  const confirmed = window.confirm(
    "Clear PDF chat?"
  );

  if (confirmed) {
    setMessages([]);
  }
}

  return (
    <div className="flex min-h-full flex-col gap-6">

      <SummaryCard
        summary={pdf.summary}
        loading={pdf.loadingSummary}
      />

      <div
        className="
          flex
          min-h-[500px]
          flex-1
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-[#14101D]
        "
      >
        {/* Header */}

       <div className="border-b border-white/10 p-5 sm:p-6">

  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    <div className="flex items-center gap-3">

      <div className="rounded-xl bg-violet-600/20 p-3">
        <Bot className="text-violet-400" />
      </div>

      <div>

        <h2 className="text-xl font-bold sm:text-2xl">
          Chat with PDF
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Ask questions about your document
        </p>

      </div>

    </div>

    {pdf.messages.length > 0 && (

      <div className="flex gap-2">

    <div className="relative">

  <button
    type="button"
    onClick={() =>
      setExportOpen((prev) => !prev)
    }
    disabled={
      pdf.chatLoading ||
      pdf.messages.length === 0
    }
    className="
      flex
      items-center
      gap-2
      rounded-xl
      border
      border-white/10
      px-3
      py-2
      text-sm
      transition
      hover:border-violet-500
      hover:bg-violet-600/10
      disabled:opacity-40
    "
  >
    <Download size={16} />

    Export

    <ChevronDown size={14} />
  </button>

  {exportOpen && (

    <div
      className="
        absolute
        right-0
        top-full
        z-50
        mt-2
        w-48
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-[#090511]
        p-2
        shadow-2xl
      "
    >

      <button
        type="button"
        onClick={() => {
          pdf.exportChatTXT();
          setExportOpen(false);
        }}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-3
          text-left
          text-sm
          transition
          hover:bg-white/5
        "
      >
        <FileText size={17} />

        Export as TXT
      </button>

      <button
        type="button"
        onClick={() => {
          pdf.exportChatPDF();
          setExportOpen(false);
        }}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-3
          text-left
          text-sm
          transition
          hover:bg-violet-600/10
        "
      >
        <FileDown
          size={17}
          className="text-violet-400"
        />

        Export as PDF
      </button>

    </div>

  )}

</div>
        <button
          type="button"
          onClick={pdf.regenerateAnswer}
          disabled={pdf.chatLoading}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            px-3
            py-2
            text-sm
            transition
            hover:border-violet-500
            hover:bg-violet-600/10
            disabled:opacity-40
          "
        >
          <RotateCcw size={16} />

          Regenerate
        </button>

        <button
          type="button"
          onClick={pdf.openClearChat}
          disabled={pdf.chatLoading}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500/20
            px-3
            py-2
            text-sm
            text-red-400
            transition
            hover:bg-red-500/10
            disabled:opacity-40
          "
        >
          <Trash2 size={16} />

          Clear
        </button>

      </div>

    )}

  </div>

</div>
        {/* Messages */}

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">

          {!pdf.file ? (

            <div className="flex h-full min-h-[280px] items-center justify-center">

              <div className="text-center">

                <FileText
                  size={48}
                  className="mx-auto text-violet-400"
                />

                <h3 className="mt-5 text-xl font-semibold">
                  Upload a PDF
                </h3>

                <p className="mt-2 text-gray-400">
                  Upload a document to start chatting.
                </p>

              </div>

            </div>

          ) : pdf.messages.length === 0 ? (

            <div className="flex h-full min-h-[280px] items-center justify-center">

              <div className="max-w-md text-center">

                <Bot
                  size={48}
                  className="mx-auto text-violet-400"
                />

                <h3 className="mt-5 text-xl font-semibold">
                  Ask anything about your PDF
                </h3>

                <p className="mt-2 text-gray-400">
                  NOXVERSE AI will answer using your uploaded document.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">

  {suggestions.map((item) => (
    <button
      key={item}
      type="button"
      onClick={() => setQuestion(item)}
      className="
        rounded-full
        border
        border-white/10
        bg-[#090511]
        px-4
        py-2
        text-sm
        text-gray-300
        transition
        hover:border-violet-500
        hover:bg-violet-600/10
      "
    >
      {item}
    </button>
  ))}

</div>

              </div>

            </div>

          ) : (

            <div className="space-y-5">

              {pdf.messages.map((message) => (

                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {message.role === "assistant" && (

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600/20">
                      <Bot
                        size={20}
                        className="text-violet-400"
                      />
                    </div>

                  )}

                <div
  className={`
    max-w-[85%]
    rounded-2xl
    px-4
    py-3
    leading-7
    sm:max-w-[75%]

    ${
      message.role === "user"
        ? "bg-violet-600 text-white"
        : "border border-white/10 bg-[#090511] text-gray-200"
    }
  `}
>
  <div className="whitespace-pre-wrap">

    {message.content || (
      <span className="flex items-center gap-2 text-gray-400">

        <LoaderCircle
          size={16}
          className="animate-spin"
        />

        Thinking...

      </span>
    )}

  </div>

  {message.role === "assistant" &&
    message.content && (

      <button
        type="button"
        onClick={() => copyAnswer(message)}
        className="
          mt-3
          flex
          items-center
          gap-2
          border-t
          border-white/10
          pt-3
          text-xs
          text-gray-400
          transition
          hover:text-white
        "
      >

        {copiedId === message.id ? (
          <>
            <Check size={14} />
            Copied
          </>
        ) : (
          <>
            <Copy size={14} />
            Copy Answer
          </>
        )}

      </button>

    )}

</div>

                  {message.role === "user" && (

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <User size={20} />
                    </div>

                  )}

                </div>

              ))}

              <div ref={bottomRef} />

            </div>

          )}

        </div>

        {/* Input */}

        <form
          onSubmit={handleSubmit}
          className="border-t border-white/10 p-4 sm:p-5"
        >

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#090511] p-2 focus-within:border-violet-500">

            <input
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              disabled={
                !pdf.file || pdf.chatLoading
              }
              placeholder={
                pdf.file
                  ? "Ask anything about this PDF..."
                  : "Upload a PDF first..."
              }
              className="
                min-w-0
                flex-1
                bg-transparent
                px-3
                py-3
                outline-none
                disabled:cursor-not-allowed
              "
            />

            <button
              type="submit"
              disabled={
                !pdf.file ||
                pdf.chatLoading ||
                !question.trim()
              }
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-fuchsia-600
                transition
                hover:scale-105
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <Send size={20} />
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}