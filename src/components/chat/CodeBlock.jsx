import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  language = "text",
  children,
}) {
  console.log("CodeBlock Rendered");
  const [copied, setCopied] = useState(false);

  const code = String(children).replace(/\n$/, "");

  const copyCode = async () => {
    console.log("Copy button clicked");

    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (err) {
      console.error(err);
      alert("Clipboard failed");
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/10">

      <div className="flex items-center justify-between bg-[#1B1725] px-4 py-2">

        <span className="text-xs text-gray-400">
          {language}
        </span>

        <button
          type="button"
          onClick={copyCode}
          className="cursor-pointer rounded-lg bg-violet-600 px-3 py-1 text-xs text-white hover:bg-violet-500"
        >
          {copied ? (
            <>
              <Check size={14} className="inline mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} className="inline mr-1" />
              Copy
            </>
          )}
        </button>

      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>

    </div>
  );
}