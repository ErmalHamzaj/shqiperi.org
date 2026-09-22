"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { useLang } from "./LanguageProvider";

export function SearchBox({
  initialQuery = "",
  autoFocus = false,
  size = "lg",
}: {
  initialQuery?: string;
  autoFocus?: boolean;
  size?: "sm" | "lg";
}) {
  const { tr } = useLang();
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  const pad = size === "lg" ? "py-3.5" : "py-2.5";

  return (
    <form onSubmit={submit} className="w-full" role="search">
      <div
        className={`group flex items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-5 ${pad} shadow-search hover:shadow-search-hover focus-within:shadow-search-hover transition-shadow`}
      >
        <SearchIcon />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tr.placeholder}
          autoFocus={autoFocus}
          aria-label={tr.search}
          className="flex-1 bg-transparent outline-none text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 text-base"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              inputRef.current?.focus();
            }}
            aria-label="Clear"
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xl leading-none"
          >
            ×
          </button>
        )}
      </div>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5 text-flag-red shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
