"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { LangToggle } from "@/components/LangToggle";

const NAV = [
  { key: "visit", href: "/blog/travel" },
  { key: "live", href: "/blog/living" },
  { key: "invest", href: "/blog/real-estate" },
  { key: "discover", href: "/blog" },
  { key: "destinations", href: "/#explore" },
  { key: "services", href: "/#popular" },
] as const;

export function SiteNav() {
  const { tr } = useLang();
  const nav = tr.home.nav;
  const [open, setOpen] = useState(false);
  const label = (k: (typeof NAV)[number]["key"]) => nav[k];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex select-none items-center gap-2" aria-label="Shqipëri.org">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Albanian_eagle.png" alt="" className="h-7 w-7 object-contain" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Shqipëri.<span className="text-flag-red">org</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {label(l.key)}
              <svg className="h-3 w-3 text-slate-400" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label={tr.search}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 sm:inline-flex"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
          <LangToggle />
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <SparkleIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{nav.ask}</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="text-base leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {NAV.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
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

export function SparkleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l1.6 4.3L18 8.4l-4.4 1.6L12 14.3l-1.6-4.3L6 8.4l4.4-1.6L12 2.5z" />
      <path d="M18.5 13l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" opacity=".7" />
    </svg>
  );
}
