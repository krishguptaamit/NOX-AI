import { motion } from "framer-motion";
export default function NotificationDropdown({
  notifications,
  markAllAsRead,
}) {
  return (
    <motion.div
  initial={{
    opacity: 0,
    y: -10,
    scale: 0.95,
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  exit={{
    opacity: 0,
    y: -10,
    scale: 0.95,
  }}
  transition={{
    duration: 0.25,
  }}
  className="absolute right-0 top-16 w-80 rounded-3xl border border-white/10 bg-[#120A22]/95 backdrop-blur-2xl shadow-2xl p-4"
>
      <div className="flex items-center justify-between mb-4">
  <h3 className="text-lg font-bold text-white">
    Notifications
  </h3>

  <button
  onClick={markAllAsRead}
  className="text-sm text-violet-400 hover:text-violet-300"
>
  Mark all
</button>
</div>

    <div className="space-y-3">
  {notifications.map((item) => (
    <div
      key={item.id}
      className={`rounded-2xl p-4 transition ${
        item.read
          ? "bg-white/5 opacity-60"
          : "bg-white/10 hover:bg-white/15"
      }`}
    >
      <div className="flex items-center gap-2">
        {!item.read && (
          <span className="w-2 h-2 rounded-full bg-violet-500"></span>
        )}

        <p className="font-medium text-white">
          {item.title}
        </p>
      </div>

      <span className="text-sm text-gray-400">
        {item.read ? "Read" : "New notification"}
      </span>
    </div>
  ))}
</div>
      
    </motion.div>
  );
}