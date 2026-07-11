import {
  askAI,
  askAIStream,
} from "./aiService";

import { AI_MODELS } from "../config/models";
import { AI_PROVIDERS } from "../config/providers";

export async function summarizePDF(text) {
  if (!text?.trim()) {
    throw new Error("PDF text is empty.");
  }

  const response = await askAI(
    [
      {
        role: "system",
        content: `
You are NOXVERSE AI PDF Assistant.

Read the provided PDF text carefully.

Return:

# Summary

A concise summary of the document.

# Key Points

Important points from the document.

# Important Topics

Main topics covered in the document.

Rules:
- Maximum 250 words.
- Do not invent information.
- Use only the provided PDF content.
`,
      },
      {
        role: "user",
        content: text,
      },
    ],
    AI_PROVIDERS.OPENROUTER,
    AI_MODELS.CHAT
  );

  return response.content;
}

export async function askPDFQuestionStream(
  pdfText,
  question,
  onChunk
) {
  if (!pdfText?.trim()) {
    throw new Error("PDF text is empty.");
  }

  if (!question?.trim()) {
    throw new Error("Question is empty.");
  }

  await askAIStream(
    [
      {
        role: "system",
        content: `
You are NOXVERSE AI PDF Assistant.

Answer using ONLY the uploaded PDF content.

Rules:
- Do not invent information.
- If the answer is not in the PDF, say:
"I couldn't find this information in the uploaded PDF."
- Give clear answers.
- Use bullet points when useful.

PDF CONTENT:

${pdfText}
`,
      },
      {
        role: "user",
        content: question,
      },
    ],
    AI_PROVIDERS.OPENROUTER,
    onChunk,
    AI_MODELS.CHAT
  );
}