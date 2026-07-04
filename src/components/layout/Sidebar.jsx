import {
  LayoutDashboard,
  MessageCircle,
  Image,
  Video,
  Code2,
  Mic,
  FileText,
  Wrench,
  History,
  FileStack,
  Heart,
  CreditCard,
  Settings,
  CircleHelp,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const topMenu = [
  { icon: LayoutDashboard, title: "Dashboard", path: "/" },
  { icon: MessageCircle, title: "AI Chat", path: "/chat" },
  { icon: Image, title: "AI Image", path: "/image" },
  { icon: Video, title: "AI Video", path: "/video" },
  { icon: Code2, title: "AI Code", path: "/code" },
  { icon: Mic, title: "AI Voice", path: "/voice" },
  { icon: FileText, title: "AI PDF", path: "/pdf" },
  { icon: Wrench, title: "AI Tools", path: "/tools" },
];

const bottomMenu = [
  { icon: History, title: "History" },
  { icon: FileStack, title: "Templates" },
  { icon: Heart, title: "Saved" },
  { icon: CreditCard, title: "Subscriptions" },
  { icon: Settings, title: "Settings" },
  { icon: CircleHelp, title: "Help & Support" },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
  <>
  {/* Mobile Overlay */}
  {sidebarOpen && (
    <div
      onClick={() => setSidebarOpen(false)}
      className="fixed inset-0 z-[998] bg-black/60 xl:hidden"
    />
  )}

  <aside
    className={`
      fixed left-0 top-0 z-[999]
      w-[270px] h-screen
      bg-[#090511]/95
      backdrop-blur-xl
      border-r border-white/10
      flex flex-col
      overflow-y-auto
      transition-transform duration-300

      ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
      }

      xl:translate-x-0
    `}
  >
      {/* Logo */}

      <div className="px-6 py-6 border-b border-white/10 flex items-center gap-4">

        <img
          src="/logo.png"
          className="w-11 h-11"
          alt=""
        />

        <div>

          <h1 className="text-2xl font-extrabold tracking-wider text-white">
            NOX AI
          </h1>

        </div>

      </div>

      {/* Top Menu */}

      <div className="px-5 py-6 space-y-2">

        {topMenu.map((item) => {

          const Icon = item.icon;

          return (

           <NavLink
  key={item.title}
  to={item.path}
  end={item.path === "/"}
  onClick={() => setSidebarOpen(false)}
  className={({ isActive }) =>
    `relative w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_30px_rgba(168,85,247,.45)]"
        : "hover:bg-violet-500/10 hover:translate-x-1"
    }`
  }
>

              {({ isActive }) => (
  <>
    {isActive && (
      <span className="absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-full bg-white" />
    )}

    <Icon size={21} />

    <span className="text-[15px] font-medium">
      {item.title}
    </span>
  </>
)}
            </NavLink>

          );

        })}

      </div>

      {/* Bottom Menu */}

   <div className="px-5 py-5 border-t border-white/10 space-y-2">

        {bottomMenu.map((item) => {

          const Icon = item.icon;

          return (

            <button
              onClick={() => setSidebarOpen(false)}
              key={item.title}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-violet-500/10 transition-all duration-300"
            >

                

              <Icon size={20} />

              <span className="text-[15px]">
                {item.title}
              </span>

            </button>

          );

        })}

      </div>

      {/* User */}

      <div className="p-5 border-t border-white/10">

        <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-4">

          <div className="flex items-center gap-3">

            <div className="relative">

              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center font-bold text-lg">

                K

              </div>

              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#090511]" />

            </div>

            <div className="flex-1">

              <h2 className="font-semibold text-white">
                Krish Gupta
              </h2>

              <p className="text-xs text-gray-400">
                krish@example.com
              </p>

              <span className="inline-flex mt-2 px-2 py-1 rounded-full bg-violet-600 text-[10px] font-semibold">
                PRO
              </span>

            </div>

          </div>

        </div>

      </div>

    </aside>
</>
  );
}