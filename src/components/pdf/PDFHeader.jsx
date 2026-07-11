import { FileText } from "lucide-react";

export default function PDFHeader() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#14101D] p-6">
      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
          <FileText size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            NOXVERSE AI PDF
          </h1>

          <p className="text-gray-400">
            Upload PDFs and chat with AI.
          </p>
        </div>

      </div>
    </div>
  );
}