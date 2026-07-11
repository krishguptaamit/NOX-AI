export async function generateImage(prompt) {
  if (!prompt.trim()) {
    throw new Error("Prompt is empty");
  }

  const seed = Date.now();

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?width=1024&height=1024&seed=${seed}&model=flux`;
}