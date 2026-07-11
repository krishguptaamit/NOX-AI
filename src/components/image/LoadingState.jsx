export default function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

      {[1,2,3,4,5,6].map((item)=>(
        <div
          key={item}
          className="
            animate-pulse
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-[#14101D]
          "
        >

          {/* Image */}

          <div className="aspect-square bg-[#201a2d]" />

          {/* Content */}

          <div className="space-y-4 p-5">

            <div className="h-5 w-3/4 rounded bg-[#201a2d]" />

            <div className="h-4 w-full rounded bg-[#201a2d]" />

            <div className="h-4 w-2/3 rounded bg-[#201a2d]" />

            <div className="mt-6 flex gap-3">

              <div className="h-12 flex-1 rounded-xl bg-[#201a2d]" />

              <div className="h-12 w-12 rounded-xl bg-[#201a2d]" />

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}