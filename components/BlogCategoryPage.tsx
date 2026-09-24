"use client";

import Link from "next/link";
import { Logo, EagleMark } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { SearchBox } from "@/components/SearchBox";
import { useLang } from "@/components/LanguageProvider";
import type { PostCard } from "@/components/BlogIndex";
import type { LangText } from "@/lib/directory";
import { localize } from "@/lib/directory";

const READ: Record<string, string> = {
  sq: "min lexim", en: "min read", tr: "dk okuma", it: "min di lettura", ar: "دقيقة قراءة",
};
const BACK: Record<string, string> = {
  sq: "Të gjitha kategoritë", en: "All categories", tr: "Tüm kategoriler", it: "Tutte le categorie", ar: "كل الفئات",
};
const COUNT: Record<string, string> = {
  sq: "shkrime", en: "articles", tr: "yazı", it: "articoli", ar: "مقالة",
};

export function BlogCategoryPage({
  name,
  icon,
  posts,
}: {
  name: LangText;
  icon: string;
  posts: PostCard[];
}) {
  const { lang } = useLang();
  const readLabel = READ[lang] ?? READ.en;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
          <div className="flex shrink-0 items-center gap-2">
            <EagleMark className="h-7 w-7" />
            <span className="hidden sm:block"><Logo size="sm" /></span>
          </div>
          <div className="flex-1"><SearchBox size="sm" /></div>
          <div className="hidden sm:block"><LangToggle /></div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/blog" className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-flag-red transition-colors">
          <span aria-hidden="true">←</span> {BACK[lang] ?? BACK.en}
        </Link>

        <h1 className="flex items-center gap-2.5 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          <span aria-hidden="true">{icon}</span>
          {localize(name, lang)}
        </h1>
        <p className="mb-7 mt-1 text-sm text-zinc-400">
          {posts.length} {(COUNT[lang] ?? COUNT.en)}
        </p>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/post/${p.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 shadow-sm transition hover:border-flag-red/40 hover:shadow"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-flag-red/10 text-xl">
                  {p.cover ?? "📄"}
                </div>
                <h2 className="font-bold leading-snug text-zinc-900 dark:text-zinc-50 group-hover:text-flag-red transition-colors">
                  {localize(p.title, lang)}
                </h2>
                <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {localize(p.excerpt, lang)}
                </p>
                {p.readingMinutes ? (
                  <span className="mt-3 text-xs font-medium text-zinc-400">{p.readingMinutes} {readLabel}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
