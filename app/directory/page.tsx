"use client";

import { useState } from "react";
import { Logo, EagleMark } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { SearchBox } from "@/components/SearchBox";
import { CompanyCard } from "@/components/CompanyCard";
import { useLang } from "@/components/LanguageProvider";
import { CATEGORIES, localize, sortByRating, type Category } from "@/lib/directory";

const PER_CATEGORY = 8;

const CAT_ICON: Record<string, string> = {
  "rent-car": "🚗",
  "rent-home": "🏠",
  "rent-villa": "🏡",
  "rent-land": "🌿",
  "rent-helicopter": "🚁",
  "boat-yacht": "⛵",
  "taxi-transfers": "🚕",
  "buy-property": "🏢",
  "tour-guides": "🧭",
  lawyer: "⚖️",
  accountants: "🧾",
  banks: "🏦",
  invest: "📈",
  "investment-centers": "🏛️",
  business: "💼",
};

export default function DirectoryPage() {
  const { lang, tr } = useLang();
  const filled = CATEGORIES.filter((c) => c.companies.length > 0);
  const total = filled.reduce((n, c) => n + c.companies.length, 0);

  const summary: Record<string, string> = {
    sq: `${total} biznese · ${filled.length} kategori`,
    en: `${total} businesses · ${filled.length} categories`,
    tr: `${total} işletme · ${filled.length} kategori`,
    it: `${total} attività · ${filled.length} categorie`,
    ar: `${total} نشاط · ${filled.length} فئة`,
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3">
          <div className="flex shrink-0 items-center gap-2">
            <EagleMark className="h-7 w-7" />
            <span className="hidden sm:block">
              <Logo size="sm" />
            </span>
          </div>
          <div className="flex-1">
            <SearchBox size="sm" />
          </div>
          <div className="hidden sm:block">
            <LangToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          {tr.dirTitle}
        </h1>
        <p className="mb-6 mt-1 text-sm text-zinc-400">
          {summary[lang] ?? summary.en}
        </p>

        <div className="space-y-2.5">
          {filled.map((cat) => (
            <CategoryAccordion key={cat.id} category={cat} />
          ))}
        </div>
      </main>
    </div>
  );
}

function CategoryAccordion({ category }: { category: Category }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const moreLabel: Record<string, string> = {
    sq: "Shiko të gjitha", en: "Show all", tr: "Tümünü gör", it: "Mostra tutto", ar: "عرض الكل",
  };
  const lessLabel: Record<string, string> = {
    sq: "Shfaq më pak", en: "Show less", tr: "Daha az göster", it: "Mostra meno", ar: "عرض أقل",
  };

  const sorted = sortByRating(category.companies);
  const shown = expanded ? sorted : sorted.slice(0, PER_CATEGORY);

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-flag-red/10 text-lg">
          {CAT_ICON[category.id] ?? "🏷️"}
        </span>
        <span className="flex-1 font-semibold text-zinc-800 dark:text-zinc-100">
          {localize(category.name, lang)}
        </span>
        <span className="rounded-full bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 text-xs font-semibold text-zinc-500 dark:text-zinc-300">
          {category.companies.length}
        </span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 p-4 sm:p-5">
          <ul className="grid gap-3 sm:grid-cols-2">
            {shown.map((c) => (
              <CompanyCard key={c.name} company={c} />
            ))}
          </ul>
          {category.companies.length > PER_CATEGORY && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-4 rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:border-flag-red hover:text-flag-red transition-colors"
            >
              {expanded
                ? lessLabel[lang] ?? lessLabel.en
                : `${moreLabel[lang] ?? moreLabel.en} (${category.companies.length})`}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
