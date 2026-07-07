export default function SettingsModal({
  open,
  onClose,

  theme,
  setTheme,

  provider,
  setProvider,

   voiceLanguage,
  setVoiceLanguage,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">

      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#14101D] p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Settings
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-white/5 px-3 py-2 hover:bg-white/10"
          >
            ✕
          </button>

        </div>

        <div className="mt-8 space-y-6">

          <div>

            <h3 className="mb-2 font-semibold">
              Appearance
            </h3>

           <div className="flex gap-3">

  <button
    onClick={() => setTheme("dark")}
    className={`flex-1 rounded-xl border p-4 transition ${
      theme === "dark"
        ? "border-violet-500 bg-violet-500/20"
        : "border-white/10 bg-white/5"
    }`}
  >
    🌙 Dark
  </button>

  <button
    onClick={() => setTheme("light")}
    className={`flex-1 rounded-xl border p-4 transition ${
      theme === "light"
        ? "border-violet-500 bg-violet-500/20"
        : "border-white/10 bg-white/5"
    }`}
  >
    ☀️ Light
  </button>

</div>

          </div>

          <div>

            <h3 className="mb-2 font-semibold">
              AI Provider
            </h3>

           <div className="space-y-2">

  <button
    onClick={() => setProvider("auto")}
    className={`w-full rounded-xl border p-3 text-left ${
      provider === "auto"
        ? "border-violet-500 bg-violet-500/20"
        : "border-white/10 bg-white/5"
    }`}
  >
    ⚡ Auto
  </button>

  <button
    onClick={() => setProvider("groq")}
    className={`w-full rounded-xl border p-3 text-left ${
      provider === "groq"
        ? "border-violet-500 bg-violet-500/20"
        : "border-white/10 bg-white/5"
    }`}
  >
    🚀 Groq
  </button>

  <button
    onClick={() => setProvider("openrouter")}
    className={`w-full rounded-xl border p-3 text-left ${
      provider === "openrouter"
        ? "border-violet-500 bg-violet-500/20"
        : "border-white/10 bg-white/5"
    }`}
  >
    🌐 OpenRouter
  </button>

</div>

          </div>

          <div>

  <h3 className="mb-2 font-semibold">
    Voice Language
  </h3>

  <div className="space-y-2">

    <button
      onClick={() => setVoiceLanguage("auto")}
      className={`w-full rounded-xl border p-3 text-left ${
        voiceLanguage === "auto"
          ? "border-violet-500 bg-violet-500/20"
          : "border-white/10 bg-white/5"
      }`}
    >
      🌐 Auto
    </button>

    <button
      onClick={() => setVoiceLanguage("en-IN")}
      className={`w-full rounded-xl border p-3 text-left ${
        voiceLanguage === "en-IN"
          ? "border-violet-500 bg-violet-500/20"
          : "border-white/10 bg-white/5"
      }`}
    >
      🇬🇧 English
    </button>

    <button
      onClick={() => setVoiceLanguage("hi-IN")}
      className={`w-full rounded-xl border p-3 text-left ${
        voiceLanguage === "hi-IN"
          ? "border-violet-500 bg-violet-500/20"
          : "border-white/10 bg-white/5"
      }`}
    >
      🇮🇳 Hindi
    </button>

  </div>

</div>

          <div>

            <h3 className="mb-2 font-semibold">
              About
            </h3>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">

              <h4 className="font-bold">
                NOXVERSE AI
              </h4>

              <p className="mt-2 text-sm text-gray-400">
                One AI. Infinite Possibilities.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}