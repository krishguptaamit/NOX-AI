import { useMemo, useState } from "react";
import ChatActionMenu from "./ChatActionMenu";
import {
  Plus,
  MessageSquare,
  Crown,
  X,
  Pin,
} from "lucide-react";

export default function ChatSidebar({
  setSidebarOpen,
  conversations,
  currentChatId,
  setCurrentChatId,
  createNewChat,
  deleteChat,
  renameChat,
   pinChat,
}) {

const [editingChatId, setEditingChatId] = useState(null);
const [editingTitle, setEditingTitle] = useState("");
const [searchQuery, setSearchQuery] = useState("");

const filteredChats = useMemo(() => {
  return conversations.filter((chat) =>
    chat.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => Number(b.pinned) - Number(a.pinned));
}, [conversations, searchQuery]);

const pinnedChats = filteredChats.filter((chat) => chat.pinned);

const normalChats = filteredChats.filter((chat) => !chat.pinned);

const renderChat = (chat) => (
  <div
    key={chat.id}
    className={`
      group
      flex
      items-center
      justify-between
      rounded-xl
      px-3
      py-3
      transition-all
      duration-200
      ${
        currentChatId === chat.id
          ? "bg-violet-600 shadow-[0_0_20px_rgba(139,92,246,.25)]"
          : "hover:bg-violet-500/10 hover:shadow-[0_0_15px_rgba(139,92,246,.15)]"
      }
    `}
  >
    <button
      onClick={() => {
        setCurrentChatId(chat.id);
        setSidebarOpen(false);
      }}
      className="flex flex-1 items-center gap-3 text-left"
    >
      <MessageSquare size={17} />

      {editingChatId === chat.id ? (
        <input
          autoFocus
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          onBlur={() => {
            renameChat(chat.id, editingTitle);
            setEditingChatId(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              renameChat(chat.id, editingTitle);
              setEditingChatId(null);
            }

            if (e.key === "Escape") {
              setEditingChatId(null);
            }
          }}
          className="w-full bg-transparent outline-none text-white transition-all duration-200"
        />
      ) : (
        <span
          onDoubleClick={() => {
            setEditingChatId(chat.id);
            setEditingTitle(chat.title);
          }}
          className="truncate cursor-text"
        >
          {chat.title}
        </span>
      )}
    </button>

    {conversations.length > 1 && (

      <ChatActionMenu
  chat={chat}
  setEditingChatId={setEditingChatId}
  setEditingTitle={setEditingTitle}
  pinChat={pinChat}
  deleteChat={deleteChat}
/>
    )}
  </div>
);

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
      p-6 xl:mr-2
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
        py-3 md:py-4
        text-base
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

      <div className="mt-5 mb-8">

  <input
    type="text"
    placeholder="Search chats..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="
      w-full
      rounded-xl
      border
      border-white/10
      bg-white/5
      px-4
      py-2.5
      outline-none
      placeholder:text-gray-500
      focus:border-violet-500
    "
  />

</div>

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

  {/* <h3 className="text-xs uppercase tracking-[2px] text-gray-500 mb-4">
    Chats
  </h3> */}

  <div className="space-y-2">

  {pinnedChats.length > 0 && (
  <>
    <h3 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[2px] text-yellow-400">
  <Pin size={12} />
  Pinned
</h3>

<hr className="my-5 border-white/10" />

    <div className="space-y-2">
      {pinnedChats.map((chat) => renderChat(chat))}
    </div>
  </>
)}

{normalChats.length > 0 && (
  <>
    <h3
      className={`text-xs uppercase tracking-[2px] text-gray-500 ${
        pinnedChats.length > 0 ? "mt-6 mb-3" : "mb-3"
      }`}
    >
      Chats
    </h3>

    <div className="space-y-2">
      {normalChats.map((chat) => renderChat(chat))}
    </div>
  </>
)}


  {filteredChats.length === 0 && (
  <div className="py-8 text-center text-gray-500">
    No chats found
  </div>
)}

  </div>

</div>                 

      </div>

      {/* Upgrade */}

      {/* <div
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

      </div> */}

    </div>
  );
}