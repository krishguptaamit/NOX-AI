import {
  MessageSquare,
  FileText,
  Cpu,
  Pin,
  Download,
  Trash2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function RightPanel({
  messages = [],
  provider = "auto",
  conversations = [],
  currentChatId,
  rightPanelOpen,
  setRightPanelOpen,
  clearCurrentChat,
}) {

  const totalMessages = messages.length;

  const totalWords = messages.reduce((count, msg) => {
    return (
      count +
      msg.text
        .trim()
        .split(/\s+/)
        .filter(Boolean).length
    );
  }, 0);

  const currentChat = conversations.find(
    (chat) => chat.id === currentChatId
  );

  const isPinned = currentChat?.pinned ?? false;

  const exportChat = () => {
    const content = messages
      .map(
        (msg) =>
          `${msg.sender.toUpperCase()}\n${msg.text}`
      )
      .join("\n\n-----------------\n\n");

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "NOXVERSE-CHAT.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div
className={`
relative
sticky
top-0
h-full
overflow-hidden
rounded-3xl
border
border-white/10
bg-[#14101D]
transition-all
duration-300
${rightPanelOpen ? "p-6" : "p-1"}
`}
>

      {/* Collapse Button */}

      <button
        onClick={() =>
          setRightPanelOpen(!rightPanelOpen)
        }
        className="
absolute
left-3
top-4
z-50
flex
h-10
w-10
items-center
justify-center
rounded-full
border
border-white/10
bg-[#14101D]
shadow-xl
hover:bg-violet-600
transition
"
      >
        {rightPanelOpen ? (
          <ChevronLeft size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </button>

      {rightPanelOpen && (
        <>

          {/* Header */}

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg">

              <Sparkles size={24} />

            </div>

            <div>

              <h2 className="text-xl font-bold">

                Conversation

              </h2>

              <p className="text-sm text-gray-400">

                Live Statistics

              </p>

            </div>

          </div>

          {/* Stats */}

          <div className="space-y-4">

            <Card
              icon={<MessageSquare size={18} />}
              title="Messages"
              value={totalMessages}
            />

            <Card
              icon={<FileText size={18} />}
              title="Words"
              value={totalWords}
            />

            <Card
              icon={<Cpu size={18} />}
              title="Provider"
              value={provider.toUpperCase()}
            />

            <Card
              icon={<Pin size={18} />}
              title="Pinned"
              value={isPinned ? "Yes" : "No"}
            />
                      </div>

          {/* Action Buttons */}

          <div className="mt-8 space-y-3">

            <button
              onClick={exportChat}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-medium transition hover:scale-[1.02]"
            >
              <Download size={18} />
              Export Chat
            </button>

            <button
  onClick={clearCurrentChat}
  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 py-3 text-red-400 transition hover:bg-red-500/20"
>
              <Trash2 size={18} />
              Clear Chat
            </button>

          </div>

          {/* About */}

          <div className="mt-10 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-5">

            <h3 className="font-bold text-lg">

              NOXVERSE AI

            </h3>

            <p className="mt-2 text-sm text-gray-400">

              One AI.
              <br />
              Infinite Possibilities.

            </p>

            <div className="mt-5 h-px bg-white/10" />

            <div className="mt-5 flex items-center justify-between text-xs text-gray-400">

              <span>Version</span>

              <span className="text-violet-400">

                v1.0

              </span>

            </div>

          </div>

        </>
      )}

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
        transition
        hover:border-violet-500/30
        hover:bg-violet-500/5
      "
    >

      <div className="flex items-center gap-3">

        <div className="text-violet-400">

          {icon}

        </div>

        <span className="text-sm">

          {title}

        </span>

      </div>

      <span className="font-semibold">

        {value}

      </span>

    </div>
  );
}