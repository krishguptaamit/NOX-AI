import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFPreview({ file }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  if (!file) return null;

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onLoadError(error) {
    console.error("PDF Preview Error:", error);
  }

  return (
    <div className="mt-6 rounded-[28px] border border-white/10 bg-[#14101D] p-4">

      <div className="mb-5 flex items-center justify-between gap-3">

        <h2 className="font-bold">
          PDF Preview
        </h2>

        <div className="flex items-center gap-2">

          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() =>
              setPageNumber((page) => page - 1)
            }
            className="
              rounded-xl
              bg-white/10
              p-2
              transition
              hover:bg-violet-600
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ChevronLeft size={18} />
          </button>

          <span className="whitespace-nowrap text-sm text-gray-400">
            {pageNumber} / {numPages || "--"}
          </span>

          <button
            type="button"
            disabled={
              !numPages || pageNumber >= numPages
            }
            onClick={() =>
              setPageNumber((page) => page + 1)
            }
            className="
              rounded-xl
              bg-white/10
              p-2
              transition
              hover:bg-violet-600
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

      <div
        className="
          flex
          min-h-[300px]
          justify-center
          overflow-auto
          rounded-2xl
          bg-[#090511]
          p-3
        "
      >
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          loading={
            <p className="p-6 text-gray-400">
              Loading PDF...
            </p>
          }
          error={
            <p className="p-6 text-red-400">
              Failed to load PDF preview.
            </p>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={350}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>

      </div>

    </div>
  );
}