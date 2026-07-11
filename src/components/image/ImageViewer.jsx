import {
  X,
  Download,
  Heart,
  Copy,
} from "lucide-react";
import { createPortal } from "react-dom";

export default function ImageViewer({
  image,
  open,
  onClose,
}) {
  if (!open || !image) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        bg-black/90
        backdrop-blur-md
      "
    >
      {/* Close */}

      <button
        onClick={onClose}
        className="
          absolute
          right-6
          top-6
          z-50
          rounded-xl
          bg-white/10
          p-3
          transition
          hover:bg-red-600
        "
      >
        <X size={24} />
      </button>

      {/* Modal */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          flex
          h-[90vh]
          w-[92vw]
          max-w-7xl
          overflow-hidden
          rounded-[30px]
          border
          border-white/10
          bg-[#14101D]
        "
      >
        {/* Image */}

        <div className="flex flex-1 items-center justify-center bg-black">
          <img
            src={image.url}
            alt={image.prompt}
            className="
              max-h-full
              max-w-full
              object-contain
            "
          />
        </div>

        {/* Right */}

        <div
          className="
            w-[360px]
            overflow-y-auto
            border-l
            border-white/10
            p-8
          "
        >
          <h2 className="text-3xl font-bold">
            Image Details
          </h2>

          <p className="mt-6 leading-8 text-gray-400">
            {image.prompt}
          </p>

          <div className="mt-10 space-y-4">

           <button
  onClick={async () => {
    try {
      const response = await fetch(image.url);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;

      link.download = `NOXVERSE-${Date.now()}.png`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(error);

      // Fallback
      window.open(image.url, "_blank");

      alert(
        "Direct download is blocked by the image provider. The image has been opened in a new tab."
      );
    }
  }}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-3
    rounded-2xl
    bg-gradient-to-r
    from-violet-600
    to-fuchsia-600
    py-4
    text-lg
    font-semibold
    transition
    hover:opacity-90
  "
>
  <Download size={20} />
  Download Image
</button>

            <button
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-white/10
                py-4
                transition
                hover:bg-white/5
              "
            >
              <Heart size={20} />
              Favorite
            </button>

           <button
  onClick={async () => {
    try {
      await navigator.clipboard.writeText(image.prompt);

      alert("✅ Prompt copied!");
    } catch (error) {
      console.error(error);

      try {
        const textarea = document.createElement("textarea");

        textarea.value = image.prompt;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);

        alert("✅ Prompt copied!");
      } catch {
        alert("❌ Copy failed.");
      }
    }
  }}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-3
    rounded-2xl
    border
    border-white/10
    py-4
    transition
    hover:bg-white/5
  "
>
  <Copy size={20} />
  Copy Prompt
</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}