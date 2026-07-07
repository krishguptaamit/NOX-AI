import { useState, useRef, useEffect } from "react";
import NotificationDropdown from "./NotificationDropdown";
import {
  Search,
  Bell,
  Moon,
  Sparkles,
  Menu,
} from "lucide-react";

export default function Navbar({ setSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([
  {
    id: 1,
    title: "Welcome to NOXVERSE AI",
    read: false,
  },
  {
    id: 2,
    title: "Dashboard Updated",
    read: false,
  },
  {
    id: 3,
    title: "Premium Ready",
    read: false,
  },
]);

const unreadCount = notifications.filter(
  (item) => !item.read
).length;

const markAllAsRead = () => {
  setNotifications(
    notifications.map((item) => ({
      ...item,
      read: true,
    }))
  );
};

useEffect(() => {
  function handleClickOutside(event) {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  
  return (
    <header className="sticky top-0 z-50 bg-[#090511]/80 backdrop-blur-xl border-b border-white/10">

      <div className="flex items-center justify-between px-8 py-5">

        {/* Left */}

        <div className="flex items-center gap-5">

         <button
  onClick={() => setSidebarOpen(true)}
  className="xl:hidden p-2 rounded-xl hover:bg-white/5"
>
            <Menu size={22} />
          </button>

          {/* Search */}

          <div className="hidden md:flex flex-1 max-w-[420px] items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10">

            <Search size={18} className="text-gray-400"/>

            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none flex-1 text-sm placeholder:text-gray-500"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <button className="hidden md:flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition">

            <Sparkles size={18}/>

            Upgrade Pro

          </button>

          <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-violet-500/10 transition">

            <Moon size={20}/>

          </button>

          <div className="relative" ref={notificationRef}>

  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-violet-500/10 transition"
  >
    <Bell size={20} />

    {unreadCount > 0 && (
  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
    {unreadCount}
  </span>
)}
  </button>

  {showNotifications && 
 <NotificationDropdown
  notifications={notifications}
  markAllAsRead={markAllAsRead}
/>
  }

</div>

          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center font-bold">
  K
</div>
        </div>

      </div>

    </header>
  );
}