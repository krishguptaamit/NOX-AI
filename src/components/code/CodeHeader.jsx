import {
  Code2,
  Cpu,
  Zap,
  History,
} from "lucide-react";

export default function CodeHeader({
  openHistory,
}) {
  return (
    <div
      className="
        rounded-[28px]
        border
        border-white/10
        bg-[#14101D]
        p-4
        sm:p-5
        lg:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}

        <div className="flex min-w-0 items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-violet-600
              to-fuchsia-600
              shadow-lg
              shadow-violet-700/30
              sm:h-14
              sm:w-14
            "
          >
            <Code2 size={27} />
          </div>

          <div className="min-w-0">
            <h1
              className="
                text-xl
                font-bold
                tracking-tight
                sm:text-2xl
                lg:text-3xl
              "
            >
              NOXVERSE AI Code
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Generate any code using AI. Fast. Smart. Powerful.
            </p>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-violet-500/20
              bg-violet-600/10
              px-4
              py-3
              text-sm
              text-violet-300
            "
          >
            <Cpu size={17} />

            <span>AI Powered</span>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-4
              py-3
              text-sm
              text-emerald-400
            "
          >
            <Zap size={17} />

            <span>Fast Generate</span>
          </div>

          <button
  onClick={openHistory}
  className="
    flex
    items-center
    gap-2
    rounded-xl
    border
    border-white/10
    bg-white/5
    px-4
    py-3
    text-sm
    text-white
    transition
    hover:bg-white/10
  "
>
  <History size={17} />
  <span>History</span>
</button>
        </div>
      </div>
    </div>
  );
}