import { useState } from "react";
import {
  Menu,
  Sparkles,
  Plus,
  Share2,
  Trash2,
} from "lucide-react";
import DeleteChatModal from "./DeleteChatModal";


export default function ChatHeader({
  setSidebarOpen,
  createNewChat,
  deleteChat,
  currentChatId,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
    <header className="flex items-center justify-between border-b border-white/10 bg-[#14101D] px-4 py-4 md:px-6">
    

      {/* Left */}

      <div className="flex items-center gap-3">

        <button
          onClick={() => setSidebarOpen(true)}
          className="xl:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/10 transition"
        >
          <Menu size={20} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
          <Sparkles size={20} />
        </div>

        <div>
          <h2 className="text-lg font-bold md:text-xl">
            NOX AI
          </h2>

          <p className="hidden lg:block text-sm text-gray-400">
            Your Personal AI Assistant
          </p>
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-2">

       <button
  onClick={createNewChat}
  className="hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-violet-500/10 transition"
>

          <Plus size={16} />

          <span className="hidden lg:block">
            New Chat
          </span>

        </button>

        <button className="hidden md:flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/10 transition">
          <Share2 size={18} />
        </button>

        <button
    onClick={() => setShowDeleteModal(true)}
  className="hidden md:flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/20 transition"
>
          <Trash2 size={18} />
        </button>

        {/* Mobile */}

        <button 
         onClick={createNewChat}
        className="sm:hidden flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600">

          <Plus size={20} />

        </button>

      </div>

    </header>

    <DeleteChatModal
  open={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onDelete={() => {
    deleteChat(currentChatId);
    setShowDeleteModal(false);
  }}
/>
</>
  );
}