import { useMemo, useState } from "react";

import {
  Search,
  X,
  FileSearch,
  ArrowRight,
} from "lucide-react";

export default function PDFSearch({
  pageTexts = [],
  onPageSelect,
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return pageTexts
      .filter((page) =>
        page.text.toLowerCase().includes(search)
      )
      .map((page) => {
        const lowerText =
          page.text.toLowerCase();

        const matchIndex =
          lowerText.indexOf(search);

        const start = Math.max(
          0,
          matchIndex - 70
        );

        const end = Math.min(
          page.text.length,
          matchIndex + search.length + 70
        );

        const snippet = page.text.slice(
          start,
          end
        );

        return {
          ...page,
          snippet,
          hasStart: start > 0,
          hasEnd: end < page.text.length,
        };
      });
  }, [query, pageTexts]);

  function highlightText(text) {
    const search = query.trim();

    if (!search) return text;

    const parts = text.split(
      new RegExp(
        `(${escapeRegExp(search)})`,
        "gi"
      )
    );

    return parts.map((part, index) =>
      part.toLowerCase() ===
      search.toLowerCase() ? (
        <mark
          key={index}
          className="
            rounded
            bg-yellow-400/20
            px-1
            text-yellow-300
          "
        >
          {part}
        </mark>
      ) : (
        <span key={index}>
          {part}
        </span>
      )
    );
  }

  function escapeRegExp(value) {
    return value.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
  }

  function selectPage(page) {
    onPageSelect(page);
    setQuery("");
  }

  return (
    <div className="mb-5">

      {/* Search Input */}

      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-[#090511]
          px-4
          transition
          focus-within:border-violet-500
          focus-within:shadow-lg
          focus-within:shadow-violet-700/10
        "
      >
        <Search
          size={18}
          className="shrink-0 text-gray-500"
        />

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search inside PDF..."
          className="
            min-w-0
            flex-1
            bg-transparent
            py-3
            text-sm
            text-white
            outline-none
            placeholder:text-gray-500
          "
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="
              shrink-0
              rounded-lg
              p-1
              text-gray-500
              transition
              hover:bg-white/5
              hover:text-white
            "
          >
            <X size={17} />
          </button>
        )}

      </div>

      {/* Results */}

      {query && (
        <div
          className="
            mt-3
            max-h-[350px]
            overflow-y-auto
            rounded-2xl
            border
            border-white/10
            bg-[#090511]
            p-3
          "
        >

          {results.length === 0 ? (

            <div className="py-8 text-center">

              <FileSearch
                size={36}
                className="mx-auto text-gray-600"
              />

              <p className="mt-3 text-sm text-gray-400">
                No results found
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Try another keyword
              </p>

            </div>

          ) : (

            <>
              {/* Result Count */}

              <div className="mb-3 flex items-center justify-between px-2">

                <p className="text-xs text-gray-500">
                  Found on {results.length}{" "}
                  {results.length === 1
                    ? "page"
                    : "pages"}
                </p>

                <span className="rounded-full bg-violet-600/10 px-3 py-1 text-xs text-violet-300">
                  {results.length} results
                </span>

              </div>

              {/* Result Cards */}

              <div className="space-y-2">

                {results.map((result) => (

                  <button
                    key={result.page}
                    type="button"
                    onClick={() =>
                      selectPage(result.page)
                    }
                    className="
                      group
                      w-full
                      rounded-xl
                      border
                      border-transparent
                      bg-white/[0.02]
                      p-4
                      text-left
                      transition-all
                      hover:border-violet-500/30
                      hover:bg-violet-600/10
                    "
                  >

                    {/* Page */}

                    <div className="flex items-center justify-between">

                      <span className="font-medium text-white">
                        Page {result.page}
                      </span>

                      <span className="flex items-center gap-1 text-xs text-violet-400">

                        View

                        <ArrowRight
                          size={14}
                          className="
                            transition-transform
                            group-hover:translate-x-1
                          "
                        />

                      </span>

                    </div>

                    {/* Snippet */}

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">

                      {result.hasStart && "... "}

                      {highlightText(
                        result.snippet
                      )}

                      {result.hasEnd && " ..."}

                    </p>

                  </button>

                ))}

              </div>

            </>

          )}

        </div>
      )}

    </div>
  );
}