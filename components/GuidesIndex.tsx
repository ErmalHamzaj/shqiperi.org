"use client";

import Link from "next/link";
import { Logo, EagleMark } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { SearchBox } from "@/components/SearchBox";
import { useLang } from "@/components/LanguageProvider";
import type { LangText } from "@/lib/directory";
import { localize } from "@/lib/directory";

export type GuideCard = {
  slug: string;
  cover?: string;
  category?: string;
  readingMinutes?: number;
  publishedAt?: string | null;
  title: LangText;
  excerpt: LangText;
};

const LEAD: Record<string, string> = {
  sq: "Guida praktike për të udhëtuar, jetuar dhe investuar në Shqipëri, nga ekipi ynë.",
  en: "Practical guides to travel, live and invest in Albania, from our team.",
  tr: "Arnavutluk'ta seyahat, yaşam ve yatırım için ekibimizden pratik rehberler.",
  it: "Guide pratiche per viaggiare, vivere e investire in Albania, dal nostro team.",
  ar: "أدلة عملية للسفر والعيش والاستثمار في ألبانيا، من فريقنا.",
};

const EMPTY: Record<string, string> = {
  sq: "Së shpejti, guidat e para.",
  en: "The first guides are coming soon.",
  tr: "İlk rehberler çok yakında.",
  it: "Le prime guide arrivano presto.",
  ar: "الأدلة الأولى قريبًا.",
};

const READ: Record<string, string> = {
  sq: "min lexim", en: "min read", tr: "dk okuma", it: "min di lettura", ar: "دقيقة قراءة",
};

export function GuidesIndex({ guides }: { guides: GuideCard[] }) {
  const { lang, tr } = useLang();

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
          {tr.guidesTitle}
        </h1>
        <p className="mb-7 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {LEAD[lang] ?? LEAD.en}
        </p>

        {guides.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 p-8 text-center text-zinc-400">
            {EMPTY[lang] ?? EMPTY.en}
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 shadow-sm transition hover:border-flag-red/40 hover:shadow"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-flag-red/10 text-2xl">
                    {g.cover ?? "📄"}
                  </div>
                  <h2 className="font-bold leading-snug text-zinc-900 dark:text-zinc-50 group-hover:text-flag-red transition-colors">
                    {localize(g.title, lang)}
                  </h2>
                  <p className="mt-1.5 line-clamp-3 flex-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {localize(g.excerpt, lang)}
                  </p>
                  {g.readingMinutes ? (
                    <span className="mt-3 text-xs font-medium text-zinc-400">
                      {g.readingMinutes} {READ[lang] ?? READ.en}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
