import { createPortal } from "react-dom";
import {
  AlertTriangle,
  X,
  Trash2,
} from "lucide-react";

export default function ConfirmModal({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">

      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#14101D] p-6 text-white shadow-2xl">

        <div className="flex items-start justify-between gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15">
            <AlertTriangle
              size={26}
              className="text-red-400"
            />
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl bg-white/5 p-3 transition hover:bg-white/10"
          >
            <X size={20} />
          </button>

        </div>

        <h2 className="mt-6 text-2xl font-bold">
          {title}
        </h2>

        <p className="mt-3 leading-7 text-gray-400">
          {message}
        </p>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/10 px-6 py-3 font-medium transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-medium transition hover:bg-red-500"
          >
            <Trash2 size={18} />
            Clear History
          </button>

        </div>

      </div>

    </div>,
    document.body
  );
}