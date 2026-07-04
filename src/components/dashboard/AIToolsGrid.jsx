import {
  MessageCircle,
  ImageIcon,
  Video,
  Code2,
  Mic,
  FileText,
  ArrowUpRight,
} from "lucide-react";

import { motion } from "framer-motion";

const tools = [
  {
    title: "AI Chat",
    desc: "Chat with your intelligent AI assistant.",
    icon: MessageCircle,
    color: "from-violet-600 to-fuchsia-600",
  },
  {
    title: "AI Image",
    desc: "Generate high-quality AI images instantly.",
    icon: ImageIcon,
    color: "from-pink-500 to-violet-600",
  },
  {
    title: "AI Video",
    desc: "Create cinematic AI videos in seconds.",
    icon: Video,
    color: "from-indigo-500 to-violet-600",
  },
  {
    title: "AI Code",
    desc: "Generate clean and optimized code.",
    icon: Code2,
    color: "from-cyan-500 to-violet-600",
  },
  {
    title: "AI Voice",
    desc: "Voice generation & speech synthesis.",
    icon: Mic,
    color: "from-emerald-500 to-violet-600",
  },
  {
    title: "AI PDF",
    desc: "Summarize and analyze PDF documents.",
    icon: FileText,
    color: "from-orange-500 to-violet-600",
  },
];

export default function AIToolsGrid() {
  return (
    <section>

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold">
          AI Tools
        </h2>

        <button className="text-violet-400 hover:text-violet-300">
          View All
        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {tools.map((tool, index) => {

          const Icon = tool.icon;

          return (

            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * .1,
              }}
              whileHover={{
  scale: 1.03,
  y: -8,
  rotateX: 2,
}}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,.25)] transition-all duration-300"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}
              >

                <Icon size={30} />

              </div>

              <h3 className="mt-6 text-2xl font-semibold">

                {tool.title}

              </h3>

              <p className="mt-3 text-gray-400 leading-7">

                {tool.desc}

              </p>

              <button className="mt-8 flex items-center gap-2 text-violet-400 hover:text-white font-semibold transition-all duration-300">

                Launch

                <ArrowUpRight size={18} />

              </button>

              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-violet-600/20 blur-3xl"/>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}