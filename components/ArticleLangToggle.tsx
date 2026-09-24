"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { LANGS, LANG_LABEL, LANG_NAME, type Lang } from "@/lib/i18n";

/**
 * Language switcher for an article: each option links to that language's own
 * URL for this post (localized slug), and syncs the site language.
 */
export function ArticleLangToggle({
  current,
  langSlugs,
}: {
  current: Lang;
  langSlugs: Partial<Record<Lang, string>>;
}) {
  const { setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const options = LANGS.filter((l) => langSlugs[l]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-200 hover:border-flag-red hover:text-flag-red transition-colors"
      >
        <GlobeIcon />
        {LANG_LABEL[current]}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-20 mt-1 min-w-[9rem] overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-1 shadow-lg"
        >
          {options.map((l) => (
            <li key={l}>
              <Link
                href={`/blog/post/${langSlugs[l]}`}
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 px-3.5 py-2 text-sm ${
                  current === l
                    ? "bg-flag-red/10 text-flag-red font-semibold"
                    : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                }`}
              >
                <span>{LANG_NAME[l]}</span>
                <span className="text-xs text-zinc-400">{LANG_LABEL[l]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
