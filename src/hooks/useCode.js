import { useEffect, useState } from "react";

import { askAIStream } from "../services/aiService";

import { AI_PROVIDERS } from "../config/providers";
import toast from "react-hot-toast";

export default function useCode() {
  const [prompt, setPrompt] = useState("");

  const [language, setLanguage] =
    useState("JavaScript");

  const [style, setStyle] =
    useState("Modern");

  const [code, setCode] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [codeHistory, setCodeHistory] =
    useState(() => {
      try {
        const saved = localStorage.getItem(
          "nox-code-history"
        );

        return saved
          ? JSON.parse(saved)
          : [];
      } catch (error) {
        console.error(
          "Code History Load Error:",
          error
        );

        return [];
      }
    });

  const [historyOpen, setHistoryOpen] =
    useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        "nox-code-history",
        JSON.stringify(codeHistory)
      );
    } catch (error) {
      console.error(
        "Code History Save Error:",
        error
      );
    }
  }, [codeHistory]);

  async function generateCode() {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");

      return;
    }

    if (loading) return;

    setCode("");

    setLoading(true);

    try {
      let fullCode = "";

      await askAIStream(
        [
          {
            role: "system",
            content: `
You are NOXVERSE AI Code Generator.

Generate high-quality ${language} code.

Code style:
${style}

Rules:
- Return ONLY code.
- Do not use Markdown code fences.
- Do not write explanations before or after the code.
- Generate complete working code.
- Follow modern best practices.
- Keep code clean and readable.
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        AI_PROVIDERS.GROQ,
        (chunk) => {
          fullCode += chunk;

          setCode(fullCode);
        }
      );

      if (fullCode.trim()) {
        const historyItem = {
          id: crypto.randomUUID(),

          prompt,

          language,

          style,

          code: fullCode,

          createdAt: new Date().toISOString(),
        };

        setCodeHistory((prev) => [
          historyItem,
          ...prev,
        ]);
      }
    } catch (error) {
      console.error(
        "Code Generation Error:",
        error
      );

      toast.error("Code generation failed.");
    } finally {
      setLoading(false);
    }
  }

  async function regenerateCode() {
    if (!prompt.trim()) {
      alert(
        "No prompt available to regenerate."
      );

      return;
    }

    if (loading) return;

    setCode("");

    setLoading(true);

    try {
      let fullCode = "";

      await askAIStream(
        [
          {
            role: "system",
            content: `
You are NOXVERSE AI Code Generator.

Regenerate and improve the requested ${language} code.

Code style:
${style}

Rules:
- Return ONLY code.
- Do not use Markdown code fences.
- Do not add explanations.
- Generate complete working code.
- Improve code quality.
- Follow modern best practices.
- Keep code clean and readable.
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        AI_PROVIDERS.GROQ,
        (chunk) => {
          fullCode += chunk;

          setCode(fullCode);
        }
      );

      if (fullCode.trim()) {
        const historyItem = {
          id: crypto.randomUUID(),

          prompt,

          language,

          style,

          code: fullCode,

          createdAt: new Date().toISOString(),
        };

        setCodeHistory((prev) => [
          historyItem,
          ...prev,
        ]);
      }
    } catch (error) {
      console.error(
        "Code Regenerate Error:",
        error
      );

      toast.error("Code generation failed.");
    } finally {
      setLoading(false);
    }
  }

  function clearCode() {
    setPrompt("");

    setCode("");
  }

  function openHistory() {
    setHistoryOpen(true);
  }

  function closeHistory() {
    setHistoryOpen(false);
  }

  function viewHistoryCode(item) {
    if (!item) return;

    setPrompt(item.prompt || "");

    setLanguage(
      item.language || "JavaScript"
    );

    setStyle(item.style || "Modern");

    setCode(item.code || "");

    setHistoryOpen(false);
  }

  function deleteHistory(id) {
    setCodeHistory((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  function clearHistory() {
    setCodeHistory([]);
  }

  return {
    prompt,
    setPrompt,

    language,
    setLanguage,

    style,
    setStyle,

    code,

    loading,

    generateCode,

    regenerateCode,

    clearCode,

    codeHistory,

    historyOpen,

    openHistory,

    closeHistory,

    viewHistoryCode,

    deleteHistory,

    clearHistory,
  };
}