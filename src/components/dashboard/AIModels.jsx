const models = [
  "GPT-5.5",
  "Claude",
  "Gemini",
  "DeepSeek",
  "Llama",
  "Mistral",
];

export default function AIModels() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Trending AI Models
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {models.map((model) => (
          <div
            key={model}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-5 hover:scale-105 transition"
          >
            <h3 className="font-semibold text-center">
              {model}
            </h3>
          </div>
        ))}

      </div>
    </section>
  );
}