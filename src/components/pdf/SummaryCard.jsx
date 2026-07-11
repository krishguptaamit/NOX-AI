import { useState } from "react";
import {
  Copy,
  Check,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

export default function SummaryCard({
  summary,
  loading,
}) {

  const [copied, setCopied] = useState(false);

  async function copySummary() {
  if (!summary) return;

  try {
    await navigator.clipboard.writeText(summary);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  } catch (error) {
    console.error("Copy Summary Error:", error);
  }
}

  return (
    <div className="rounded-[28px] border border-white/10 bg-[#14101D] p-6">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-violet-600/20 p-3">
          <Sparkles className="text-violet-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Summary
          </h2>

          <p className="text-sm text-gray-400">
            Generated using NOXVERSE AI
          </p>
        </div>

      </div>

      {loading ? (

        <div className="space-y-4">

          <div className="h-4 animate-pulse rounded bg-white/10"></div>

          <div className="h-4 w-3/4 animate-pulse rounded bg-white/10"></div>

          <div className="h-4 w-2/3 animate-pulse rounded bg-white/10"></div>

        </div>

      ) : summary ? (

        <>
          <div className="whitespace-pre-wrap leading-8">
            {summary}
          </div>

         <button
  type="button"
  onClick={copySummary}
  disabled={!summary}
  className="
    mt-6
    flex
    items-center
    gap-2
    rounded-xl
    border
    border-white/10
    bg-[#090511]
    px-4
    py-3
    text-sm
    text-gray-300
    transition-all
    hover:border-violet-500
    hover:bg-violet-600/10
    hover:text-white
    disabled:cursor-not-allowed
    disabled:opacity-40
  "
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

      Copy Summary
    </>
  )}
</button>
        </>

      ) : (

        <div className="py-12 text-center text-gray-500">
          Upload a PDF to generate an AI summary.
        </div>

      )}

    </div>
  );
}