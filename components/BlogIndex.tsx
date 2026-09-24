"use client";

import Link from "next/link";
import { Logo, EagleMark } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { SearchBox } from "@/components/SearchBox";
import { useLang } from "@/components/LanguageProvider";
import type { LangText } from "@/lib/directory";
import { localize } from "@/lib/directory";
import type { Lang } from "@/lib/i18n";

const SLUG_LANGS: Lang[] = ["sq", "en", "tr", "it"];
export function postCardSlug(item: { slug: string; slugs?: Partial<Record<Lang, string>> }, lang: Lang): string {
  return (SLUG_LANGS.includes(lang) && item.slugs?.[lang]) || item.slug;
}

export type PostCard = {
  slug: string;
  slugs?: Partial<Record<Lang, string>>;
  cover?: string;
  readingMinutes?: number;
  title: LangText;
  excerpt: LangText;
};

export type BlogSection = {
  id: string;
  name: LangText;
  icon: string;
  total: number;
  posts: PostCard[];
};

const LEAD: Record<string, string> = {
  sq: "Gjithçka që duhet të dini për të udhëtuar, jetuar dhe investuar në Shqipëri.",
  en: "Everything you need to travel, live and invest in Albania.",
  tr: "Arnavutluk'ta gezmek, yaşamak ve yatırım yapmak için bilmeniz gereken her şey.",
  it: "Tutto ciò che serve per viaggiare, vivere e investire in Albania.",
  ar: "كل ما تحتاجه للسفر والعيش والاستثمار في ألبانيا.",
};

const EMPTY: Record<string, string> = {
  sq: "Së shpejti, shkrimet e para.", en: "The first posts are coming soon.",
  tr: "İlk yazılar çok yakında.", it: "I primi articoli arrivano presto.", ar: "المقالات الأولى قريبًا.",
};

const READ: Record<string, string> = {
  sq: "min lexim", en: "min read", tr: "dk okuma", it: "min di lettura", ar: "دقيقة قراءة",
};

const ALL: Record<string, string> = {
  sq: "Shiko të gjitha", en: "See all", tr: "Tümünü gör", it: "Vedi tutto", ar: "عرض الكل",
};

export function BlogIndex({ sections }: { sections: BlogSection[] }) {
  const { lang, tr } = useLang();

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
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{tr.blogTitle}</h1>
        <p className="mb-6 mt-1 text-sm text-zinc-500 dark:text-zinc-400">{LEAD[lang] ?? LEAD.en}</p>

        {sections.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 p-8 text-center text-zinc-400">
            {EMPTY[lang] ?? EMPTY.en}
          </p>
        ) : (
          <>
            {/* Category chips */}
            <nav className="mb-9 flex flex-wrap gap-2">
              {sections.map((s) => (
                <Link
                  key={s.id}
                  href={`/blog/${s.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 px-3.5 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:border-flag-red hover:text-flag-red transition-colors"
                >
                  <span aria-hidden="true">{s.icon}</span>
                  {localize(s.name, lang)}
                </Link>
              ))}
            </nav>

            {/* Per-category rows */}
            <div className="space-y-10">
              {sections.map((s) => (
                <section key={s.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-800 dark:text-zinc-100">
                      <span aria-hidden="true">{s.icon}</span>
                      {localize(s.name, lang)}
                    </h2>
                    {s.total > s.posts.length && (
                      <Link href={`/blog/${s.id}`} className="text-sm font-medium text-flag-red hover:underline">
                        {ALL[lang] ?? ALL.en} ({s.total})
                      </Link>
                    )}
                  </div>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {s.posts.map((p) => (
                      <PostTile key={p.slug} post={p} readLabel={READ[lang] ?? READ.en} lang={lang} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function PostTile({ post, readLabel, lang }: { post: PostCard; readLabel: string; lang: ReturnType<typeof useLang>["lang"] }) {
  return (
    <li>
      <Link
        href={`/blog/post/${postCardSlug(post, lang)}`}
        className="group flex h-full flex-col rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 shadow-sm transition hover:border-flag-red/40 hover:shadow"
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-flag-red/10 text-xl">
          {post.cover ?? "📄"}
        </div>
        <h3 className="font-bold leading-snug text-zinc-900 dark:text-zinc-50 group-hover:text-flag-red transition-colors">
          {localize(post.title, lang)}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-zinc-600 dark:text-zinc-300">
          {localize(post.excerpt, lang)}
        </p>
        {post.readingMinutes ? (
          <span className="mt-3 text-xs font-medium text-zinc-400">{post.readingMinutes} {readLabel}</span>
        ) : null}
      </Link>
    </li>
  );
}
