import {
  Sparkles,
  NotebookPen,
  WandSparkles,
  LoaderCircle,
} from "lucide-react";

export default function PDFActions({ pdf }) {
  const actions = [
    {
      id: "explain",
      title: "Explain",
      description: "Understand the document clearly",
      icon: Sparkles,
    },
    {
      id: "notes",
      title: "Make Notes",
      description: "Create exam-friendly study notes",
      icon: NotebookPen,
    },
    {
      id: "simplify",
      title: "Simplify",
      description: "Convert content into simple English",
      icon: WandSparkles,
    },
  ];

  return (
    <div className="rounded-[28px] border border-white/10 bg-[#14101D] p-5 sm:p-6">

      <div>
        <h2 className="text-xl font-bold sm:text-2xl">
          AI Actions
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Transform your PDF with NOXVERSE AI.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          const isLoading =
            pdf.actionLoading &&
            pdf.actionType === action.id;

          return (
            <button
              key={action.id}
              type="button"
              disabled={pdf.actionLoading}
              onClick={() =>
                pdf.executePDFAction(action.id)
              }
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#090511]
                p-4
                text-left
                transition-all
                hover:border-violet-500/50
                hover:bg-violet-600/10
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600/20">

                {isLoading ? (
                  <LoaderCircle
                    size={21}
                    className="animate-spin text-violet-400"
                  />
                ) : (
                  <Icon
                    size={21}
                    className="text-violet-400"
                  />
                )}

              </div>

              <h3 className="mt-4 font-semibold text-white">
                {isLoading
                  ? "Generating..."
                  : action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                {action.description}
              </p>

            </button>
          );
        })}

      </div>

    </div>
  );
}