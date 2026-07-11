import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileText,
  Trash2,
  LoaderCircle,
} from "lucide-react";

import PDFInfo from "./PDFInfo";
import PDFPreview from "./PDFPreview";

export default function UploadPanel({ pdf }) {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      const selectedFile = acceptedFiles[0];

      await pdf.uploadPDF(selectedFile);
    },
    [pdf]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,

    accept: {
      "application/pdf": [".pdf"],
    },

    multiple: false,

    disabled: pdf.loadingPDF,
  });

  return (
    <div className="rounded-[28px] border border-white/10 bg-[#14101D] p-4 sm:p-6">

      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        Upload PDF
      </h2>

      {!pdf.file ? (
        <div
          {...getRootProps()}
          className={`
            flex
            min-h-[280px]
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            p-6
            text-center
            transition-all
            sm:min-h-[320px]

            ${
              isDragActive
                ? "border-violet-500 bg-violet-500/10"
                : "border-white/10 bg-[#090511] hover:border-violet-500/50"
            }
          `}
        >
          <input {...getInputProps()} />

          {pdf.loadingPDF ? (
            <>
              <LoaderCircle
                size={52}
                className="animate-spin text-violet-400"
              />

              <h3 className="mt-6 text-lg font-semibold sm:text-xl">
                Reading PDF...
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Extracting pages and document text.
              </p>
            </>
          ) : (
            <>
              <Upload
                size={52}
                className="text-violet-400"
              />

              <h3 className="mt-6 text-lg font-semibold sm:text-xl">
                Drag & Drop your PDF
              </h3>

              <p className="mt-2 text-sm text-gray-400 sm:text-base">
                or click to browse your computer
              </p>

              <div
                className="
                  mt-8
                  rounded-2xl
                  bg-gradient-to-r
                  from-violet-600
                  to-fuchsia-600
                  px-6
                  py-3
                  font-semibold
                  sm:px-8
                "
              >
                Browse PDF
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="rounded-3xl border border-white/10 bg-[#090511] p-4 sm:p-6">

            <div className="flex items-center gap-3 sm:gap-4">

              <div className="shrink-0 rounded-2xl bg-violet-600/20 p-3 sm:p-4">
                <FileText
                  size={30}
                  className="text-violet-400"
                />
              </div>

              <div className="min-w-0 flex-1">

                <h3 className="truncate font-semibold">
                  {pdf.file.name}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {(pdf.file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

              <button
                onClick={pdf.removePDF}
                className="
                  shrink-0
                  rounded-xl
                  bg-red-500/20
                  p-3
                  transition
                  hover:bg-red-600
                "
              >
                <Trash2 size={18} />
              </button>

            </div>

            <div className="mt-6 rounded-2xl bg-green-500/10 p-4 text-sm text-green-400 sm:text-base">
              ✅ PDF uploaded and processed successfully
            </div>

          </div>

          <PDFInfo
            file={pdf.file}
            pages={pdf.pages}
          />

         <PDFPreview
  file={pdf.file}
  pageTexts={pdf.pageTexts}
/>
        </>
      )}

    </div>
  );
}