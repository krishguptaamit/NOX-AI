import { useState } from "react";
import {
  Sparkles,
  Wand2,
  ChevronRight,
} from "lucide-react";

import SettingsPanel from "./SettingsPanel";

const suggestions = [
  "Cyberpunk City",
  "Anime Girl",
  "Fantasy Castle",
  "Luxury Car",
  "Space Station",
  "Ghibli Village",
];

export default function PromptPanel({

prompt,

setPrompt,

loading,

onGenerate,

}) {


  return (
    <div className="rounded-[28px] border border-white/10 bg-[#14101D] p-7">

      {/* Hero */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-violet-600
              to-fuchsia-600
            "
          >
            <Sparkles size={22}/>
          </div>

          <div>

            <h2 className="text-2xl font-bold">

              Imagine Anything

            </h2>

            <p className="mt-1 text-sm text-gray-400">

              Describe anything and let NOXVERSE AI create it.

            </p>

          </div>

        </div>

      </div>

      {/* Prompt */}

      <label className="mb-3 block text-sm font-medium">

        Prompt

      </label>

      <textarea
        rows={8}
        maxLength={1000}
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        placeholder="A futuristic cyberpunk city at night with purple neon lights..."
        className="
          min-h-[220px]
          w-full
          resize-none
          rounded-3xl
          border
          border-white/10
          bg-[#090511]
          p-5
          outline-none
          transition
          focus:border-violet-500
        "
      />

      <div className="mt-2 flex justify-end text-xs text-gray-500">

        {prompt.length}/1000

      </div>
            {/* Quick Prompts */}

      <div className="mt-8">

        <div className="mb-3 flex items-center justify-between">

          <h3 className="font-medium">

            Quick Ideas

          </h3>

          <button className="flex items-center gap-1 text-sm text-violet-400">

            More

            <ChevronRight size={16}/>

          </button>

        </div>

        <div className="flex flex-wrap gap-2">

          {suggestions.map((item)=>(

            <button
              key={item}
              onClick={()=>setPrompt(item)}
              className="
                rounded-full
                border
                border-white/10
                bg-[#090511]
                px-4
                py-2
                text-sm
                transition
                hover:border-violet-500
                hover:bg-violet-600/10
              "
            >

              {item}

            </button>

          ))}

        </div>

      </div>
          <button
  onClick={onGenerate}
  disabled={loading}
  className="
    mt-8
    flex
    h-14
    w-full
    items-center
    justify-center
    gap-3
    rounded-2xl
    bg-gradient-to-r
    from-violet-600
    to-fuchsia-600
    text-lg
    font-semibold
    transition-all
    disabled:opacity-60
    disabled:cursor-not-allowed
    hover:scale-[1.02]
  "
>

  {loading ? (

    <>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      Generating...
    </>

  ) : (

    <>
      <Wand2 size={20}/>
      Generate Images
    </>

  )}

</button>
      <SettingsPanel/>

    </div>
  );
}