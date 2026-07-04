import { motion } from "framer-motion";
import {
  Bot,
  ImageIcon,
  Video,
  Code2,
} from "lucide-react";

const stats = [
  {
    title: "AI Chats",
    value: "24.8K",
    change: "+18%",
    icon: Bot,
  },
  {
    title: "Images Generated",
    value: "12.3K",
    change: "+32%",
    icon: ImageIcon,
  },
  {
    title: "Videos Created",
    value: "3.2K",
    change: "+14%",
    icon: Video,
  },
  {
    title: "Code Generated",
    value: "8.6K",
    change: "+26%",
    icon: Code2,
  },
];

export default function StatsCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
          >

            {/* Glow */}
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-400">
                  {item.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-white">
                  {item.value}
                </h2>

                <span className="mt-4 inline-block rounded-full bg-violet-600/20 px-3 py-1 text-xs font-semibold text-violet-300">
                  {item.change} this month
                </span>

              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg">

                <Icon size={30} />

              </div>

            </div>

          </motion.div>
        );
      })}
    </section>
  );
}