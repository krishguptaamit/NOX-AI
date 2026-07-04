import {
  Sparkles,
  ImageIcon,
  Video,
  Code2,
} from "lucide-react";

const actions = [
  {
    title: "Generate Image",
    icon: ImageIcon,
  },
  {
    title: "Create Video",
    icon: Video,
  },
  {
    title: "Generate Code",
    icon: Code2,
  },
  {
    title: "AI Chat",
    icon: Sparkles,
  },
];

export default function QuickActions() {
  return (
    <section>

      <h2 className="text-3xl font-bold mb-6">

        Quick Actions

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {actions.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:scale-105 hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,.25)] transition-all duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center mx-auto">

                <Icon size={30} />

              </div>

              <h3 className="mt-6 text-lg font-semibold">

                {item.title}

              </h3>

            </button>

          );

        })}

      </div>

    </section>
  );
}