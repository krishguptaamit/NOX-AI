import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PDFSearch from "./PDFSearch";

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFPreview({
  file,
  pageTexts,
}) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  if (!file) return null;

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setScale(1);
  }

  function zoomIn() {
    setScale((prev) =>
      Math.min(Number((prev + 0.25).toFixed(2)), 2)
    );
  }

  function zoomOut() {
    setScale((prev) =>
      Math.max(Number((prev - 0.25).toFixed(2)), 0.5)
    );
  }

  function resetZoom() {
    setScale(1);
  }

  return (
    <div className="mt-6 rounded-[28px] border border-white/10 bg-[#14101D] p-4">

      {/* Header */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <h2 className="font-bold">
          PDF Preview
        </h2>

        <div className="flex flex-wrap items-center gap-2">

          {/* Page Navigation */}

          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() =>
              setPageNumber((prev) => prev - 1)
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

          <span className="min-w-[65px] text-center text-sm text-gray-400">
            {pageNumber} / {numPages || "--"}
          </span>

          <button
            type="button"
            disabled={
              !numPages ||
              pageNumber >= numPages
            }
            onClick={() =>
              setPageNumber((prev) => prev + 1)
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

          <div className="mx-1 hidden h-7 w-px bg-white/10 sm:block" />

          {/* Zoom */}

          <button
            type="button"
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="
              rounded-xl
              bg-white/10
              p-2
              transition
              hover:bg-violet-600
              disabled:opacity-30
            "
          >
            <ZoomOut size={18} />
          </button>

          <button
            type="button"
            onClick={resetZoom}
            className="
              min-w-[60px]
              rounded-xl
              bg-white/5
              px-3
              py-2
              text-sm
              text-violet-300
              transition
              hover:bg-violet-600/20
            "
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            type="button"
            onClick={zoomIn}
            disabled={scale >= 2}
            className="
              rounded-xl
              bg-white/10
              p-2
              transition
              hover:bg-violet-600
              disabled:opacity-30
            "
          >
            <ZoomIn size={18} />
          </button>

          <button
            type="button"
            onClick={resetZoom}
            className="
              rounded-xl
              bg-white/10
              p-2
              transition
              hover:bg-violet-600
            "
            title="Reset zoom"
          >
            <RotateCcw size={18} />
          </button>

        </div>

      </div>

      <PDFSearch
  pageTexts={pageTexts}
  onPageSelect={(page) => {
    setPageNumber(page);
  }}
/>

      {/* PDF */}

      <div
        className="
          flex
          min-h-[300px]
          max-h-[650px]
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
          onLoadError={(error) =>
            console.error(
              "PDF Preview Error:",
              error
            )
          }
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
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>

      </div>

    </div>
  );
}