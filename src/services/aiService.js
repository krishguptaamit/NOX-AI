import { AI_MODELS } from "../config/models";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function askAI(messages) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AI_MODELS.DEFAULT,
        messages,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data = await response.json();

  return {
    content: data.choices[0].message.content,
  };
}