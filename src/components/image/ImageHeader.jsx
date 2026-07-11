import {
  Sparkles,
  History,
  Images,
  Settings,
} from "lucide-react";

export default function ImageHeader() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#14101D] p-6">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-violet-600
              to-fuchsia-600
              shadow-lg
              shadow-violet-700/30
            "
          >
            <Sparkles size={28} />
          </div>

          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              NOXVERSE AI Images
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Create stunning AI artwork from text prompts.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-[#090511]
              px-5
              py-3
              transition-all
              hover:border-violet-500
              hover:bg-violet-600/10
            "
          >
            <History size={18} />
            <span>History</span>
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-[#090511]
              px-5
              py-3
              transition-all
              hover:border-violet-500
              hover:bg-violet-600/10
            "
          >
            <Images size={18} />
            <span>Gallery</span>
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-[#090511]
              px-5
              py-3
              transition-all
              hover:border-violet-500
              hover:bg-violet-600/10
            "
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

        </div>

      </div>
    </div>
  );
}