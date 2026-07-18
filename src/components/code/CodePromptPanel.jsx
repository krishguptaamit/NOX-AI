import { useEffect, useRef, useState } from "react";

import {
  Sparkles,
  RotateCcw,
  Trash2,
  ChevronDown,
  Check,
} from "lucide-react";

const languages = [
  "JavaScript",
  "React",
  "HTML",
  "CSS",
  "Python",
  "Java",
  "C++",
  "TypeScript",
];

const styles = [
  "Modern",
  "Clean",
  "Minimal",
  "Professional",
  "Beginner Friendly",
];

function CustomSelect({
  label,
  value,
  options,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  const selectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className="relative"
    >
      <label className="text-sm font-medium text-white">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          mt-3
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          border
          border-white/10
          bg-[#090511]
          px-4
          py-3
          text-left
          text-sm
          text-white
          outline-none
          transition
          hover:border-white/20
          focus:border-violet-500
        "
      >
        <span>{value}</span>

        <ChevronDown
          size={17}
          className={`
            text-gray-400
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-2
            max-h-64
            overflow-y-auto
            rounded-xl
            border
            border-white/10
            bg-[#100B18]
            p-2
            shadow-2xl
            shadow-black/60
          "
        >
          {options.map((option) => {
            const selected = value === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  transition

                  ${
                    selected
                      ? "bg-violet-600/20 text-violet-300"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <span>{option}</span>

                {selected && (
                  <Check
                    size={16}
                    className="text-violet-400"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CodePromptPanel({
  code,
}) {
 const {
  prompt,
  setPrompt,
  language,
  setLanguage,
  style,
  setStyle,
  loading,
  generateCode,
  regenerateCode,
  clearCode,
} = code;

  return (
    <div
      className="
        rounded-[28px]
        border
        border-white/10
        bg-[#14101D]
        p-4
        sm:p-5
        lg:p-6
      "
    >
      <h2 className="text-xl font-bold">
        Describe the code you want
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Tell NOXVERSE AI what you want to build.
      </p>

      {/* Prompt */}

      <div className="mt-6">
        <textarea
          value={prompt}
          onChange={(event) =>
            setPrompt(event.target.value)
          }
          placeholder="Example: Create a responsive navbar using React and Tailwind CSS..."
          maxLength={2000}
          className="
            min-h-[190px]
            w-full
            resize-none
            rounded-2xl
            border
            border-white/10
            bg-[#090511]
            p-4
            text-sm
            leading-6
            text-white
            outline-none
            transition
            placeholder:text-gray-600
            focus:border-violet-500
            focus:ring-4
            focus:ring-violet-500/10
          "
        />

        <p className="mt-2 text-right text-xs text-gray-500">
          {prompt.length} / 2000
        </p>
      </div>

      {/* Language */}

      <div className="mt-5">
        <CustomSelect
          label="Select Language"
          value={language}
          options={languages}
          onChange={setLanguage}
        />
      </div>

      {/* Style */}

      <div className="mt-5">
        <CustomSelect
          label="Select Style"
          value={style}
          options={styles}
          onChange={setStyle}
        />
      </div>


     {/* Generate */}

<button
  type="button"
  onClick={generateCode}
  disabled={loading}
  className="
    mt-6
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-gradient-to-r
    from-violet-600
    to-fuchsia-600
    px-5
    py-4
    font-semibold
    shadow-lg
    shadow-violet-700/20
    transition
    hover:scale-[1.01]
    active:scale-[0.99]
    disabled:cursor-not-allowed
    disabled:opacity-60
    disabled:hover:scale-100
  "
>
  {loading ? (
    <>
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

      Generating...
    </>
  ) : (
    <>
      <Sparkles size={19} />

      Generate Code
    </>
  )}
</button>
      {/* Actions */}

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
  type="button"
  onClick={regenerateCode}
  disabled={loading || !code.code}
  className="
    flex
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-white/10
    px-4
    py-3
    text-sm
    transition
    hover:border-violet-500
    hover:bg-violet-600/10
    disabled:cursor-not-allowed
    disabled:opacity-40
  "
>
  <RotateCcw
    size={16}
    className={loading ? "animate-spin" : ""}
  />

  Regenerate
</button>
        <button
          type="button"
          onClick={clearCode}
          disabled={!prompt}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-white/10
            px-4
            py-3
            text-sm
            transition
            hover:border-red-500/50
            hover:bg-red-500/10
            hover:text-red-400
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Trash2 size={16} />

          Clear
        </button>
      </div>
    </div>
  );
}