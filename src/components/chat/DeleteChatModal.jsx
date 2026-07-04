import { Trash2, X } from "lucide-react";

export default function DeleteChatModal({
  open,
  onClose,
  onDelete,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-[92%] max-w-md rounded-3xl border border-white/10 bg-[#16111F] p-7 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold">
            Delete Chat
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-white/10"
          >
            <X size={18} />
          </button>

        </div>

        <div className="mt-6 flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">

            <Trash2
              size={40}
              className="text-red-400"
            />

          </div>

        </div>

        <p className="mt-6 text-center text-gray-400 leading-7">

          Are you sure you want to delete this chat?

          <br />

          This action cannot be undone.

        </p>

        <div className="mt-8 flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-white/10 py-3 hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold hover:bg-red-500"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}