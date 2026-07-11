import { useState } from "react";

const styles = [
  "🎨 Realistic",
  "🌸 Anime",
  "🏰 Fantasy",
  "🌌 Sci-Fi",
  "🎬 Cinematic",
  "🧸 3D",
];

const ratios = [
  "1:1",
  "16:9",
  "9:16",
  "4:3",
];

const counts = [1, 2, 4];

export default function SettingsPanel() {
  const [style, setStyle] = useState(styles[0]);
  const [ratio, setRatio] = useState("1:1");
  const [count, setCount] = useState(1);

  return (
    <div className="mt-8 rounded-[28px] border border-white/10 bg-[#1A1624] p-6">

      <h2 className="mb-6 text-xl font-bold">
        Image Settings
      </h2>

      {/* Style */}

      <div className="mb-7">

        <h3 className="mb-3 text-sm text-gray-400">
          Style
        </h3>

        <div className="grid grid-cols-2 gap-3">

          {styles.map((item)=>(
            <button
              key={item}
              onClick={()=>setStyle(item)}
              className={`
                rounded-2xl
                border
                p-3
                text-sm
                transition-all
                duration-300

                ${
                  style===item
                    ? "border-violet-500 bg-violet-600 shadow-lg shadow-violet-700/30"
                    : "border-white/10 bg-[#090511] hover:border-violet-500"
                }
              `}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Aspect Ratio */}

      <div className="mb-7">

        <h3 className="mb-3 text-sm text-gray-400">
          Aspect Ratio
        </h3>

        <div className="grid grid-cols-2 gap-3">

          {ratios.map((item)=>(
            <button
              key={item}
              onClick={()=>setRatio(item)}
              className={`
                rounded-xl
                border
                py-3
                transition-all

                ${
                  ratio===item
                    ? "border-violet-500 bg-violet-600"
                    : "border-white/10 bg-[#090511] hover:border-violet-500"
                }
              `}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Images */}

      <div>

        <h3 className="mb-3 text-sm text-gray-400">
          Number of Images
        </h3>

        <div className="flex gap-3">

          {counts.map((item)=>(
            <button
              key={item}
              onClick={()=>setCount(item)}
              className={`
                flex-1
                rounded-xl
                border
                py-3
                transition-all

                ${
                  count===item
                    ? "border-violet-500 bg-violet-600"
                    : "border-white/10 bg-[#090511] hover:border-violet-500"
                }
              `}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}