import { AI_MODELS } from "../config/models";
import { askGroq } from "./groqService";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function askAI(messages) {

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
          model: AI_MODELS.DEFAULT,
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

  } catch (error) {

    console.warn("OpenRouter Failed");

    return await askGroq(messages);

  }

}