import {
  Code2,
  Image,
  Search,
  FileText,
  Wand2,
  Sparkles,
} from "lucide-react";

const cards = [
  {
    title: "Generate Code",
    desc: "Build apps & websites",
    icon: Code2,
  },
  {
    title: "Create Image",
    desc: "AI image generation",
    icon: Image,
  },
  {
    title: "Research",
    desc: "Find accurate answers",
    icon: Search,
  },
  {
    title: "Summarize PDF",
    desc: "Analyze documents",
    icon: FileText,
  },
  {
    title: "Creative Writing",
    desc: "Stories & blogs",
    icon: Wand2,
  },
  {
    title: "Brainstorm Ideas",
    desc: "Generate new concepts",
    icon: Sparkles,
  },
];

export default function ChatWelcome() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">

      {/* Heading */}

      <div className="mb-10 text-center">

        <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl xl:text-6xl">

          Welcome to{" "}

          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">

            NOXVERSE AI

          </span>

        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base md:text-lg">

           Experience the next generation of AI for coding, research,
  writing, creativity, and productivity—all in one place.

        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">

        {cards.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/10"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600">

                <Icon size={24} />

              </div>

              <h3 className="mt-5 text-xl font-bold">

                {item.title}

              </h3>

              <p className="mt-2 text-gray-400">

                {item.desc}

              </p>

            </button>

          );

        })}

      </div>

    </div>
  );
}