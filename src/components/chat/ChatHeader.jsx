import { useState } from "react";
import {
  Menu,
  Sparkles,
  Plus,
  Share2,
  Trash2,
} from "lucide-react";
import DeleteChatModal from "./DeleteChatModal";
import ModelSelector from "./ModelSelector";
import { Settings } from "lucide-react";
import SettingsModal from "../settings/SettingsModal";

export default function ChatHeader({
  setSidebarOpen,
  createNewChat,
  deleteChat,
  currentChatId,
  provider,
  setProvider,
  theme,
setTheme,
voiceLanguage,
setVoiceLanguage,
}){
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  return (
    <>
    <header className="flex items-center justify-between border-b border-white/10 bg-[#14101D] px-4 py-4 md:px-6">
    

      {/* Left */}

      <div className="flex min-w-0 items-center gap-3">

        <button
          onClick={() => setSidebarOpen(true)}
          className="xl:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/10 transition"
        >
          <Menu size={20} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
          <Sparkles size={20} />
        </div>

       <div className="min-w-[180px] xl:min-w-[220px]">

  <h2 className="truncate whitespace-nowrap text-lg font-bold xl:text-xl">
    NOXVERSE <span className="text-violet-400">AI</span>
  </h2>

  <p className="hidden xl:block truncate text-sm text-gray-400">
    One AI. Infinite Possibilities.
  </p>

</div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-1.5 xl:gap-2">

       <button
  onClick={createNewChat}
 className="
hidden
md:flex
items-center
gap-2
rounded-xl
border
border-white/10
bg-white/5
px-4
py-2
hover:bg-violet-500/10
transition
"
>

          <Plus size={16} />

          <span className="hidden lg:block">
            New Chat
          </span>

        </button>

  <div className="hidden lg:block">
  <ModelSelector
    provider={provider}
    setProvider={setProvider}
  />
</div>

        <button className="hidden lg:flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/10 transition">
          <Share2 size={18} />
        </button>

        <button
  onClick={() => setShowSettings(true)}
  className="hidden lg:flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/10 transition"
>
  <Settings size={18} />
</button>

        <button
    onClick={() => setShowDeleteModal(true)}
  className="hidden lg:flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/20 transition"
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

<SettingsModal
  open={showSettings}
  onClose={() => setShowSettings(false)}

  theme={theme}
  setTheme={setTheme}

  provider={provider}
  setProvider={setProvider}

  voiceLanguage={voiceLanguage}
setVoiceLanguage={setVoiceLanguage}
/>
</>
  );
}