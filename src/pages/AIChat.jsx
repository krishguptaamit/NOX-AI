import { useState } from "react";
import ChatMessages from "../components/chat/ChatMessages";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWelcome from "../components/chat/ChatWelcome";
import ChatInput from "../components/chat/ChatInput";
import RightPanel from "../components/chat/RightPanel";
import useChat from "../hooks/useChat";

export default function AIChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
const {
  conversations,
  currentChatId,
  setCurrentChatId,
  messages,
  sendMessage,
  regenerateResponse,

  editingMessageId,
  editingText,
  setEditingText,
  editMessage,
  saveEditedMessage,

  createNewChat,
  deleteChat,
  renameChat,
  isTyping,
  pinChat,

  provider,
  setProvider,

  theme,
  setTheme,

  voiceLanguage,
setVoiceLanguage,

clearCurrentChat,
} = useChat();

  return (
    <div className="relative h-[calc(100vh-96px)]">

      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 xl:hidden"
        />
      )}

      <div className="flex h-full gap-4 xl:gap-6 2xl:gap-8">

        {/* Sidebar */}

        <aside
          className={`
          fixed xl:static
          top-0 left-0
          z-50
          h-screen xl:h-full
          w-[85vw]
sm:w-[320px]
xl:w-[280px]
2xl:w-[300px]
          shrink-0
          transition-transform duration-300
          bg-[#090511]

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full xl:translate-x-0"
          }
        `}
        >
   <ChatSidebar
  setSidebarOpen={setSidebarOpen}
  conversations={conversations}
  currentChatId={currentChatId}
  setCurrentChatId={setCurrentChatId}
  createNewChat={createNewChat}
  deleteChat={deleteChat}
  renameChat={renameChat}
  pinChat={pinChat}
/>
        </aside>

        {/* Chat */}

        <section
          className="
          flex-1
          min-w-0
          w-0
          rounded-3xl
          border
          border-white/10
          bg-[#14101D]
          flex
          flex-col
          overflow-hidden
        "
        >
       <ChatHeader
  setSidebarOpen={setSidebarOpen}
  createNewChat={createNewChat}
  deleteChat={deleteChat}
  currentChatId={currentChatId}

  provider={provider}
  setProvider={setProvider}

   theme={theme}
  setTheme={setTheme}

  voiceLanguage={voiceLanguage}
setVoiceLanguage={setVoiceLanguage}
/>

          {/* ONLY ONE SCROLL */}

          <div className="flex-1 overflow-y-auto">
<ChatMessages
  messages={messages}
  isTyping={isTyping}
  regenerateResponse={regenerateResponse}

  editingMessageId={editingMessageId}
  editingText={editingText}
  setEditingText={setEditingText}
  editMessage={editMessage}
  saveEditedMessage={saveEditedMessage}
/>

          </div>

          <ChatInput
   sendMessage={sendMessage}
  voiceLanguage={voiceLanguage}
/>

        </section>

        {/* Right */}

       <aside
  className={`
    hidden
2xl:block
shrink-0
transition-all
duration-300
    shrink-0
    transition-all duration-300
    ${rightPanelOpen ? "w-[320px]" : "w-[56px]"}
  `}
>
  <RightPanel
    messages={messages}
    provider={provider}
    conversations={conversations}
    currentChatId={currentChatId}
    rightPanelOpen={rightPanelOpen}
    setRightPanelOpen={setRightPanelOpen}
    clearCurrentChat={clearCurrentChat}
  />
</aside>

      </div>

    </div>
  );
}