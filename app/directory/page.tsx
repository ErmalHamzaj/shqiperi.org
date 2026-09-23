"use client";

import { useState } from "react";
import { Logo, EagleMark } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { SearchBox } from "@/components/SearchBox";
import { CompanyCard } from "@/components/CompanyCard";
import { useLang } from "@/components/LanguageProvider";
import { CATEGORIES, localize, sortByRating, type Category } from "@/lib/directory";

const PER_CATEGORY = 6;

export default function DirectoryPage() {
  const { tr } = useLang();
  const filled = CATEGORIES.filter((c) => c.companies.length > 0);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
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

      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          {tr.dirTitle}
        </h1>
        <div className="space-y-10">
          {filled.map((cat) => (
            <CategoryBlock key={cat.id} category={cat} />
          ))}
        </div>
      </main>
    </div>
  );
}

function CategoryBlock({ category }: { category: Category }) {
  const { lang } = useLang();
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
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-flag-red">
        {localize(category.name, lang)}
        <span className="text-zinc-400">({category.companies.length})</span>
      </h2>
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
    </section>
  );
}
