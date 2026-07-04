import {
  Plus,
  MessageSquare,
  Crown,
  X,
} from "lucide-react";

export default function ChatSidebar({
  setSidebarOpen,
  conversations,
  currentChatId,
  setCurrentChatId,
  createNewChat,
}) {
  return (
    <div
      className="
      h-full
      flex
      flex-col
      bg-[#090511]
      border-r
      border-white/10
      xl:rounded-3xl
      xl:border
      p-6
    "
    >

      {/* Mobile */}

      <div className="flex items-center justify-between xl:hidden mb-6">

        <h2 className="text-xl font-bold">

          Chats

        </h2>

          <button
   onClick={() => setSidebarOpen(false)}
          className="
          w-10
          h-10
          rounded-xl
          bg-white/5
          hover:bg-white/10
          flex
          items-center
          justify-center
        "
        >
          <X size={20} />
        </button>

      </div>

      {/* Button */}

      <button
       onClick={() => {
    createNewChat();
    setSidebarOpen(false);
  }}
        className="
        w-full
        py-4
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        to-fuchsia-600
        font-semibold
        flex
        items-center
        justify-center
        gap-2
        hover:scale-[1.02]
        transition
      "
      >
        <Plus size={20} />

        New Chat

      </button>

      {/* History */}

      <div
        className="
        mt-8
        flex-1
        overflow-y-auto
        pr-2
        space-y-8
      "
      >
      <div>

  <h3 className="text-xs uppercase tracking-[2px] text-gray-500 mb-4">
    Chats
  </h3>

  <div className="space-y-2">

    {conversations.map((chat) => (

      <button
        key={chat.id}
        onClick={() => {
          setCurrentChatId(chat.id);
          setSidebarOpen(false);
        }}
        className={`
          w-full
          flex
          items-center
          gap-3
          px-3
          py-3
          rounded-xl
          text-left
          transition

          ${
            currentChatId === chat.id
              ? "bg-violet-600 text-white"
              : "hover:bg-violet-500/10"
          }
        `}
      >

        <MessageSquare size={17} />

        <span className="truncate">

          {chat.title}

        </span>

      </button>

    ))}

  </div>

</div>                 

      </div>

      {/* Upgrade */}

      <div
        className="
        mt-6
        rounded-2xl
        border
        border-violet-500/20
        bg-violet-500/10
        p-4
      "
      >

        <div className="flex items-center gap-3">

          <Crown
            size={20}
            className="text-violet-400"
          />

          <div>

            <h3 className="font-semibold">

              NOX Pro

            </h3>

            <p className="text-xs text-gray-400">

              Unlimited AI Access

            </p>

          </div>

        </div>

        <button
          className="
          mt-4
          w-full
          rounded-xl
          bg-violet-600
          py-2.5
          font-semibold
          hover:bg-violet-500
          transition
        "
        >

          Upgrade

        </button>

      </div>

    </div>
  );
}