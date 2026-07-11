import { ImagePlus } from "lucide-react";

export default function EmptyState() {

  return (

    <div
      className="
        flex
        min-h-[650px]
        flex-col
        items-center
        justify-center
      "
    >

      <div
        className="
          mb-8
          flex
          h-28
          w-28
          items-center
          justify-center
          rounded-full
          bg-violet-600/10
        "
      >

        <ImagePlus
          size={60}
          className="text-violet-400"
        />

      </div>

      <h2 className="text-3xl font-bold">

        No Images Yet

      </h2>

      <p className="mt-4 max-w-lg text-center text-gray-400 leading-7">

        Enter a prompt, choose your preferred settings,
        and click
        <span className="text-violet-400">
          {" "}Generate Images{" "}
        </span>
        to create stunning AI artwork.

      </p>

    </div>

  );
}