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
  const { messages, sendMessage } = useChat();

  return (
    <div className="relative h-[calc(100vh-96px)]">

      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 xl:hidden"
        />
      )}

      <div className="flex h-full gap-6">

        {/* Sidebar */}

        <aside
          className={`
          fixed xl:static
          top-0 left-0
          z-50
          h-screen xl:h-full
          w-[300px]
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
          />
        </aside>

        {/* Chat */}

        <section
          className="
          flex-1
          min-w-0
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
          />

          {/* ONLY ONE SCROLL */}

          <div className="flex-1 overflow-y-auto">

            <ChatMessages
  messages={messages}
/>

          </div>

          <ChatInput
  sendMessage={sendMessage}
/>

        </section>

        {/* Right */}

        <aside className="hidden 2xl:block w-[320px] shrink-0">

          <RightPanel />

        </aside>

      </div>

    </div>
  );
}