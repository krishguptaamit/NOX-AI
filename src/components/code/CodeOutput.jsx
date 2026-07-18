import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  Code2,
  Copy,
  Download,
  Maximize2,
  Minimize2,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CodeOutput({ code }) {
  const {
    code: generatedCode,
    language,
    loading,
  } = code;

  const [copied, setCopied] = useState(false);

  const [fullscreen, setFullscreen] =
    useState(false);

  const languageMap = {
    JavaScript: "javascript",
    React: "jsx",
    HTML: "markup",
    CSS: "css",
    Python: "python",
    Java: "java",
    "C++": "cpp",
    TypeScript: "typescript",
  };

  const syntaxLanguage =
    languageMap[language] || "javascript";

  async function copyCode() {
    if (!generatedCode) return;

    try {
      await navigator.clipboard.writeText(
        generatedCode
      );

      setCopied(true);
toast.success("Copied to clipboard");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy Error:", error);

      toast.error("Copy failed");
    }
  }

  function downloadCode() {
    if (!generatedCode) return;

    const extensions = {
      JavaScript: "js",
      React: "jsx",
      HTML: "html",
      CSS: "css",
      Python: "py",
      Java: "java",
      "C++": "cpp",
      TypeScript: "ts",
    };

    const extension =
      extensions[language] || "txt";

    const blob = new Blob([generatedCode], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `noxverse-code.${extension}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  function toggleFullscreen() {
    setFullscreen((prev) => !prev);
  }

  useEffect(() => {
    if (!fullscreen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        setFullscreen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const codePanel = (
    <div
      className={
        fullscreen
          ? `
            fixed
            inset-0
            z-[999999]
            flex
            h-screen
            w-screen
            flex-col
            overflow-hidden
            bg-[#090511]
            text-white
          `
          : `
            flex
            min-h-[600px]
            flex-col
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-[#14101D]
            text-white
          `
      }
    >
      {/* Header */}

      <div
        className="
          flex
          shrink-0
          flex-col
          gap-4
          border-b
          border-white/10
          bg-[#14101D]
          p-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:p-5
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              shrink-0
              rounded-xl
              bg-violet-600/20
              p-2.5
            "
          >
            <Code2
              size={21}
              className="text-violet-400"
            />
          </div>

          <div className="min-w-0">
            <h2 className="font-bold text-white">
              Generated Code
            </h2>

            <p className="mt-1 truncate text-xs text-gray-400">
              AI generated code will appear here.
            </p>
          </div>
        </div>

        {/* Actions */}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyCode}
            disabled={!generatedCode}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-3
              py-2
              text-sm
              text-white
              transition
              hover:bg-white/10
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            {copied ? (
              <>
                <Check
                  size={16}
                  className="text-green-400"
                />

                <span className="text-green-400">
                  Copied
                </span>
              </>
            ) : (
              <>
                <Copy size={16} />

                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={downloadCode}
            disabled={!generatedCode}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-3
              py-2
              text-sm
              text-white
              transition
              hover:bg-white/10
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Download size={16} />

            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-violet-500/30
              bg-violet-600/10
              px-3
              py-2
              text-sm
              text-white
              transition
              hover:bg-violet-600/20
            "
          >
            {fullscreen ? (
              <Minimize2 size={16} />
            ) : (
              <Maximize2 size={16} />
            )}

            <span className="hidden sm:inline">
              {fullscreen
                ? "Exit Fullscreen"
                : "Fullscreen"}
            </span>
          </button>
        </div>
      </div>

      {/* Editor */}

      <div
        className={`
          min-h-0
          flex-1

          ${
            fullscreen
              ? "p-4"
              : "p-3 sm:p-4"
          }
        `}
      >
        <div
          className="
            h-full
            overflow-auto
            rounded-2xl
            border
            border-white/10
            bg-[#0D0814]
          "
        >
          {generatedCode || loading ? (
            <div className="relative min-h-full min-w-max">
              <SyntaxHighlighter
                language={syntaxLanguage}
                style={vscDarkPlus}
                showLineNumbers
                wrapLongLines={false}
                customStyle={{
                  margin: 0,
                  minHeight: "100%",
                  background: "#0D0814",
                  padding: "20px",
                  fontSize: "14px",
                  lineHeight: "1.75",
                }}
                lineNumberStyle={{
                  minWidth: "3em",
                  paddingRight: "1.5em",
                  color: "#8B8496",
                  userSelect: "none",
                }}
                codeTagProps={{
                  style: {
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  },
                }}
              >
                {generatedCode}
              </SyntaxHighlighter>

              {loading && (
                <span
                  className="
                    absolute
                    bottom-5
                    right-5
                    h-5
                    w-2
                    animate-pulse
                    bg-violet-500
                  "
                />
              )}
            </div>
          ) : (
            <div className="flex h-full min-h-[480px] items-center justify-center p-6">
              <div className="text-center">
                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-violet-600/20
                  "
                >
                  <Code2
                    size={30}
                    className="text-violet-400"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  Ready to generate code
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-400">
                  Describe what you want to build
                  and NOXVERSE AI will generate the
                  code for you.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (fullscreen) {
    return createPortal(
      codePanel,
      document.body
    );
  }

  return codePanel;
}