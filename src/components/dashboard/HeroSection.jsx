import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Zap,
  LayoutGrid,
  Gem,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0A0614] min-h-[520px] lg:min-h-[600px]">

      {/* Hero Background */}

      <img
        src="/hero-bg2.png"
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover object-right brightness-110 contrast-110"
      />

      {/* Dark Overlay */}

     <div className="absolute inset-0 bg-gradient-to-r from-[#08040F] via-[#08040F]/55 to-transparent" />

      {/* Content */}

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] items-center min-h-[520px] px-5 sm:px-8 md:px-12 xl:px-16">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="max-w-2xl"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-3 rounded-full border border-violet-500/20 bg-violet-500/10 backdrop-blur-xl px-5 py-3">

            <span className="text-xl">
              👋
            </span>

            <span className="text-violet-300 font-medium">

              Welcome back, Krish

            </span>

          </div>

          {/* Heading */}

          <h1 className="mt-10 font-black leading-[1.02] tracking-tight">

            <span className="block text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-600 bg-clip-text text-transparent">

              The Future Of AI,

            </span>

            <span className="block mt-2 text-white text-5xl md:text-6xl xl:text-7xl lg:text-6xl leading-[1.05]">

              All In One Place.

            </span>

          </h1>

          {/* Description */}

          <p className="mt-8 text-gray-300 text-base lg:text-lg leading-9 max-w-lg">

            Chat, create, code, analyze and more with the most
            powerful AI tools in your pocket.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <button className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-600 px-8 py-4 font-semibold text-lg shadow-[0_0_35px_rgba(139,92,246,.45)] transition-all duration-300 hover:scale-105">

              <Zap size={20} />

              Start Chatting

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />

            </button>

            <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 text-lg font-medium hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300">

              <LayoutGrid size={20} />

              Explore Features

            </button>

          </div>

        </motion.div>
                {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden xl:flex items-center justify-end h-full"
        >
          {/* Floating Card */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-12 right-12 xl:right-8 w-[340px] rounded-3xl border border-white/10 bg-black/30 backdrop-blur-2xl p-6 shadow-[0_0_45px_rgba(139,92,246,.25)]"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_25px_rgba(168,85,247,.45)]">
                <Gem size={34} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  Unlimited Possibilities
                </h3>

                <p className="mt-8 text-gray-300 text-xl leading-9 max-w-xl">
                  One platform.
                  <br />
                  All AI models.
                  <br />
                  No limits.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating Glow */}

          <div className="absolute right-20 top-24 h-32 w-32 rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="absolute bottom-12 right-52 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-[80px]" />
        </motion.div>

      </div>

    </section>
  );
}