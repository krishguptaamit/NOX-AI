import { createPortal } from "react-dom";
import { useState } from "react";

import {
  X,
  Sparkles,
  Copy,
  Check,
  Download,
} from "lucide-react";

export default function AIActionResultModal({
  open,
  type,
  result,
  onClose,
}) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const titles = {
    explain: "AI Explanation",
    notes: "AI Study Notes",
    simplify: "Simplified PDF",
  };

  async function copyResult() {
    if (!result) return;

    await navigator.clipboard.writeText(result);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  function exportResult() {
    if (!result) return;

    const blob = new Blob([result], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `nox-${type || "pdf-action"}.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-5">

      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#14101D] text-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-5 sm:p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20">
              <Sparkles className="text-violet-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                {titles[type] || "AI Result"}
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Generated using NOXVERSE AI
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white/5 p-3 transition hover:bg-red-600"
          >
            <X size={20} />
          </button>

        </div>

        {/* Result */}

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">

          <div className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-[#090511] p-5 text-sm leading-7 text-gray-300 sm:p-6">
            {result}
          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col gap-3 border-t border-white/10 bg-[#100B18] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

          <div className="flex gap-3">

            <button
              type="button"
              onClick={copyResult}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:border-violet-500 hover:bg-violet-600/10"
            >
              {copied ? (
                <>
                  <Check
                    size={17}
                    className="text-green-400"
                  />

                  <span className="text-green-400">
                    Copied
                  </span>
                </>
              ) : (
                <>
                  <Copy size={17} />
                  Copy
                </>
              )}
            </button>

            <button
              type="button"
              onClick={exportResult}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm transition hover:border-violet-500 hover:bg-violet-600/10"
            >
              <Download size={17} />

              Export TXT
            </button>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold"
          >
            Close
          </button>

        </div>

      </div>

    </div>,
    document.body
  );
}