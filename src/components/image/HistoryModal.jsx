import { X } from "lucide-react";

export default function HistoryModal({
  open,
  images,
  onClose,
  onPreview,
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[95%] max-w-5xl rounded-3xl border border-white/10 bg-[#14101D] p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Image History
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 p-3 hover:bg-red-600"
          >
            <X />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-5">

          {images.length === 0 ? (
            <p className="text-gray-400">
              No History Yet
            </p>
          ) : (
            images.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt=""
                onClick={() => onPreview(img)}
                className="aspect-square cursor-pointer rounded-2xl object-cover transition hover:scale-105"
              />
            ))
          )}

        </div>
      </div>
    </div>
  );
}