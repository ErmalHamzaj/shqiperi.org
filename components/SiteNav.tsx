"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { LangToggle } from "@/components/LangToggle";

/** Primary navigation — the four pillars plus Ask Albania (master blueprint). */
export const NAV_LINKS = [
  { key: "visit", href: "/blog/travel" },
  { key: "live", href: "/blog/living" },
  { key: "invest", href: "/blog/real-estate" },
  { key: "discover", href: "/blog" },
  { key: "ask", href: "/search" },
] as const;

export function SiteNav() {
  const { tr } = useLang();
  const nav = tr.home.nav;
  const [open, setOpen] = useState(false);

  const label = (k: (typeof NAV_LINKS)[number]["key"]) => nav[k];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <Link
          href="/"
          className="select-none text-lg font-bold tracking-tight text-brand-900"
          aria-label="Shqipëria"
        >
          SHQIPËRIA
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                l.key === "ask"
                  ? "text-brand-900 hover:bg-brand-50"
                  : "text-slate-600 hover:bg-slate-100 hover:text-brand-900"
              }`}
            >
              {label(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-brand-900 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="text-base leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-900"
              >
                {label(l.key)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
