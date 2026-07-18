import { useState } from "react";
import {
  Eye,
  Trash2,
  X,
  Search,
} from "lucide-react";

import ConfirmModal from "../common/ConfirmModal";

export default function HistoryModal({
  open,
  onClose,
  history = [],
  viewHistoryCode,
  deleteHistory,
  clearHistory,
}) {
  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [confirmType, setConfirmType] =
    useState("");

  const [selectedId, setSelectedId] =
    useState(null);

  const [search, setSearch] = useState("");

  if (!open) return null;

  function handleConfirm() {
    if (confirmType === "delete") {
      deleteHistory(selectedId);
    } else if (confirmType === "clear") {
      clearHistory();
    }

    setConfirmOpen(false);
    setConfirmType("");
    setSelectedId(null);
  }

  const filteredHistory = history.filter(
    (item) =>
      item.prompt
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.language
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.style
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
        <div className="flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#14101D] shadow-2xl">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <h2 className="text-xl font-bold text-white">
              Code History
            </h2>

            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  onClick={() => {
                    setConfirmType("clear");
                    setConfirmOpen(true);
                  }}
                  className="rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/30"
                >
                  Clear All
                </button>
              )}

              <button
                onClick={onClose}
                className="rounded-xl bg-white/10 p-2 transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Search */}

          <div className="border-b border-white/10 p-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search history..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
              />
            </div>
          </div>

          {/* Body */}

          <div className="flex-1 overflow-y-auto p-5">

            {filteredHistory.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                {search
                  ? "No matching history found."
                  : "No code history found."}
              </div>
            ) : (
              <div className="space-y-3">

                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-violet-500/30"
                  >
                    <h3 className="line-clamp-1 font-semibold text-white">
                      {item.prompt}
                    </h3>

                    <p className="mt-2 text-xs text-gray-400">
                      {item.language} • {item.style}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                      <button
                        onClick={() =>
                          viewHistoryCode(item)
                        }
                        className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm transition hover:bg-violet-700"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        onClick={() => {
                          setSelectedId(item.id);
                          setConfirmType("delete");
                          setConfirmOpen(true);
                        }}
                        className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/30"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title={
          confirmType === "delete"
            ? "Delete History"
            : "Clear All History"
        }
        message={
          confirmType === "delete"
            ? "Are you sure you want to delete this history?"
            : "This action cannot be undone."
        }
        confirmText={
          confirmType === "delete"
            ? "Delete"
            : "Clear All"
        }
        cancelText="Cancel"
        onCancel={() => {
          setConfirmOpen(false);
          setConfirmType("");
          setSelectedId(null);
        }}
        onConfirm={handleConfirm}
      />
    </>
  );
}