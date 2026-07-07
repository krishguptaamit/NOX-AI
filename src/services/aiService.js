import { AI_MODELS } from "../config/models";
import { askGroq } from "./groqService";
import { AI_PROVIDERS } from "../config/providers";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function askAI(messages, provider, model = AI_MODELS.CHAT) {

  // 🚀 Groq Only
  if (provider === AI_PROVIDERS.GROQ) {
    return await askGroq(messages);
  }

  // 🌐 OpenRouter Only
  if (provider === AI_PROVIDERS.OPENROUTER) {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();

    return {
      content: data.choices[0].message.content,
    };
  }

  // ⚡ Auto (Default)
  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        model,
          messages,
        }),
      }
    );

   if (!response.ok) {
  const error = await response.text();

  console.error("OpenRouter Error:", error);

  throw new Error(error);
}

    const data = await response.json();

    return {
      content: data.choices[0].message.content,
    };

  } catch (error) {

    console.warn("OpenRouter Failed → Switching to Groq");

    return await askGroq(messages);

  }
}

export async function askAIStream(
  messages,
  provider,
  onChunk,
  model = null,
  // signal
) {
  const API_KEY =
    provider === AI_PROVIDERS.GROQ
      ? import.meta.env.VITE_GROQ_API_KEY
      : import.meta.env.VITE_OPENROUTER_API_KEY;

  const url =
    provider === AI_PROVIDERS.GROQ
      ? "https://api.groq.com/openai/v1/chat/completions"
      : "https://openrouter.ai/api/v1/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },

      // signal, 

   body: JSON.stringify({
  model:
    model ||
    (
      provider === AI_PROVIDERS.GROQ
        ? "llama-3.3-70b-versatile"
        : AI_MODELS.CHAT
    ),

  messages,
  stream: true,
}),
  });

  if (!response.ok) {
  const error = await response.text();

  console.error("========== OpenRouter Stream Error ==========");
  console.error(error);

  throw new Error(error);
}

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk.split("\n");

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;

      const data = line.replace("data: ", "");

      if (data === "[DONE]") return;

      try {
        const json = JSON.parse(data);

        const text =
          json.choices?.[0]?.delta?.content || "";

        if (text) {
  await new Promise((resolve) => setTimeout(resolve, 25));
  onChunk(text);
}
      } catch {}
    }
  }
}