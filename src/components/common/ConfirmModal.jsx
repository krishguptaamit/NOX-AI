import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#14101D] p-6">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/20">
          <AlertTriangle
            size={34}
            className="text-red-400"
          />
        </div>

        <h2 className="mt-5 text-center text-xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-center text-gray-400">
          {message}
        </p>

        <div className="mt-7 flex gap-3">

          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 hover:bg-white/10"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-3 hover:bg-red-700"
          >
            {confirmText}
          </button>

        </div>

      </div>
    </div>
  );
}