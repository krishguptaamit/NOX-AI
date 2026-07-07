import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { AI_PROVIDERS } from "../../config/providers";

export default function ModelSelector({
  provider,
  setProvider,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", close);

    return () => window.removeEventListener("click", close);
  }, []);

  const models = [
    {
      id: AI_PROVIDERS.AUTO,
      icon: "⚡",
      name: "Auto",
    },
    {
      id: AI_PROVIDERS.GROQ,
      icon: "🚀",
      name: "Groq",
    },
    {
      id: AI_PROVIDERS.OPENROUTER,
      icon: "🌐",
      name: "OpenRouter",
    },
  ];

  const current = models.find(
    (m) => m.id === provider
  );

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1B1725] px-4 py-2 hover:border-violet-500 transition"
      >
        <span>{current.icon}</span>

        <span className="text-sm">
          {current.name}
        </span>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#14101D] shadow-2xl z-50">

          {models.map((item) => (

            <button
              key={item.id}
              onClick={() => {
                setProvider(item.id);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-3 hover:bg-violet-500/10 transition"
            >
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>

              {provider === item.id && (
                <Check
                  size={16}
                  className="text-violet-400"
                />
              )}

            </button>

          ))}

        </div>
      )}

    </div>
  );
}