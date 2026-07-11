import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ImageCard from "./ImageCard";

export default function ImageGallery({
  loading,
  images,
  deleteImage,
  clearImages,
  toggleFavorite,
  onPreview,
}) {

  return (
   <section className="flex h-full min-h-0 flex-col rounded-[28px] border border-white/10 bg-[#14101D]">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 p-6">

        <div>

          <h2 className="text-2xl font-bold">

            Generated Images

          </h2>

          <p className="mt-1 text-sm text-gray-400">

            Your creations will appear here.

          </p>

        </div>

        <div className="rounded-full bg-violet-600/10 px-4 py-2 text-sm text-violet-300">

          <div className="flex items-center gap-3">

  <div
    className="
      rounded-full
      bg-violet-600/10
      px-4
      py-2
      text-sm
      text-violet-300
    "
  >
    {images.length} {images.length === 1 ? "Image" : "Images"}
  </div>

  {images.length > 0 && (

    <button
      onClick={clearImages}
      className="
        rounded-xl
        bg-red-500/20
        px-4
        py-2
        text-sm
        transition
        hover:bg-red-600
      "
    >
      Clear
    </button>

  )}

</div>

        </div>

      </div>

      {/* Body */}

    <div className="min-h-0 flex-1 overflow-y-auto p-6">

        {loading ? (

          <LoadingState />

        ) : images.length === 0 ? (

          <EmptyState />

        ) : (

          <div
            className="
              grid
              gap-6
              grid-cols-1
              md:grid-cols-2
              2xl:grid-cols-3
            "
          >

            {images.map((image)=>(

 <ImageCard
  key={image.id}
  image={image}
  onPreview={onPreview}
  onFavorite={toggleFavorite}
  onDelete={deleteImage}
/>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}