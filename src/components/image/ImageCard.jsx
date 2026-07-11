import {
  Download,
  Heart,
  Eye,
  Trash2,
} from "lucide-react";

export default function ImageCard({
  image,
  onPreview,
  onFavorite,
  onDelete,
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-[#090511]
        transition-all
        duration-300
        hover:border-violet-500/40
        hover:shadow-2xl
        hover:shadow-violet-700/20
      "
    >
      {/* Image */}

    <img
  src={image.url}
  alt={image.prompt}
  onClick={() => {
    console.log("clicked");
    onPreview(image)}
  }
  className="
    aspect-square
    w-full
    object-cover
    transition-all
    duration-500
    group-hover:scale-105
  "
  loading="lazy"
/>

      {/* Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/10
          to-transparent
          opacity-0
          transition-all
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Top Buttons */}

      <div
        className="
          absolute
          top-4
          right-4
          flex
          gap-2
          opacity-0
          transition-all
          duration-300
          group-hover:opacity-100
        "
      >
        <button
  onClick={() => onFavorite(image.id)}
  className={`
    rounded-xl
    p-3
    backdrop-blur
    transition
    ${
      image.favorite
        ? "bg-pink-600"
        : "bg-black/40 hover:bg-pink-600"
    }
  `}
>
  <Heart
    size={18}
    fill={image.favorite ? "white" : "none"}
  />
</button>

        <button className="rounded-xl bg-black/40 p-3 backdrop-blur transition hover:bg-violet-600">
          <Download size={18} />
        </button>
      </div>

      {/* Bottom */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-5
          opacity-0
          transition-all
          duration-300
          group-hover:opacity-100
        "
      >
        <p className="line-clamp-2 text-sm leading-6 text-white">
          {image.prompt}
        </p>

        <div className="mt-4 flex gap-3">

          <button
          onClick={() => onPreview(image)}
            className="
              flex-1
              rounded-xl
              bg-violet-600
              py-3
              font-medium
              transition
              hover:bg-violet-500
            "
          >
            <span className="flex items-center justify-center gap-2">
              <Eye size={18} />
              Preview
            </span>
          </button>

  <button
  onClick={() => onDelete(image.id)}
  className="
    rounded-xl
    bg-red-500/20
    px-4
    transition
    hover:bg-red-600
  "
>
  <Trash2 size={18}/>
</button>

        </div>

      </div>

    </div>
  );
}