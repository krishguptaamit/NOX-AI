import { createPortal } from "react-dom";

import {
  X,
  FileText,
  Trash2,
  MessageSquare,
  History,
} from "lucide-react";

export default function PDFHistoryModal({
  open,
  history = [],
  onClose,
  onDelete,
  onClear,
  onViewChat,
}) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      {/* Modal */}

      <div
        className="
          flex
          max-h-[85vh]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-white/20
          bg-[#14101D]
          text-white
          shadow-2xl
          shadow-violet-950/50
        "
      >

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-white/10 p-5 sm:p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20">
              <History
                size={24}
                className="text-violet-400"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                PDF History
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Your recent PDF activity
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-white/10
              text-white
              transition
              hover:bg-red-600
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* BODY */}

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">

          {history.length === 0 ? (

            <div className="flex min-h-[350px] items-center justify-center">

              <div className="text-center">

                <FileText
                  size={56}
                  className="mx-auto text-violet-400"
                />

                <h3 className="mt-5 text-xl font-semibold text-white">
                  No PDF History
                </h3>

                <p className="mt-2 text-gray-400">
                  Uploaded PDFs will appear here.
                </p>

              </div>

            </div>

          ) : (

            <div className="space-y-4">

              {history.map((item) => (

                <div
                  key={item.id}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#090511]
                    p-4
                    transition
                    hover:border-violet-500/50
                    sm:p-5
                  "
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* PDF INFO */}

                    <div className="flex min-w-0 items-center gap-4">

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-600/20">

                        <FileText
                          size={25}
                          className="text-violet-400"
                        />

                      </div>

                      <div className="min-w-0">

                        <h3 className="truncate font-semibold text-white">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-sm text-gray-300">
                          {item.pages} Pages
                          {" · "}
                          {(item.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(
                            item.uploadedAt
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() => onViewChat(item)}
                        disabled={!item.messages?.length}
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-white/10
                          bg-white/5
                          px-4
                          py-3
                          text-sm
                          text-white
                          transition
                          hover:border-violet-500
                          hover:bg-violet-600/20
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                          sm:flex-none
                        "
                      >
                        <MessageSquare size={17} />

                        {item.messages?.length || 0} Messages
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          bg-red-500/15
                          text-red-400
                          transition
                          hover:bg-red-600
                          hover:text-white
                        "
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* FOOTER */}

        {history.length > 0 && (

          <div className="flex justify-end border-t border-white/10 bg-[#100B18] p-4 sm:p-5">

            <button
              type="button"
              onClick={onClear}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-500/15
                px-5
                py-3
                text-sm
                font-medium
                text-red-400
                transition
                hover:bg-red-600
                hover:text-white
              "
            >
              <Trash2 size={16} />

              Clear History
            </button>

          </div>

        )}

      </div>

    </div>,
    document.body
  );
}