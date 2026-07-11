import { askAI } from "./aiService";

export async function enhancePrompt(prompt, provider) {
  const result = await askAI(
    [
      {
        role: "system",
        content: `
You are an AI prompt engineer.

Improve the user's prompt for AI image generation.

Rules:
- Keep original meaning.
- Make it highly detailed.
- Add cinematic lighting.
- Add ultra realistic.
- Add masterpiece.
- Add highly detailed.
- Return ONLY the improved prompt.
`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    provider
  );

  return result.content.trim();
}