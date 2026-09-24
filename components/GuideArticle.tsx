"use client";

import Link from "next/link";
import { Logo, EagleMark } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { SearchBox } from "@/components/SearchBox";
import { RepresentativeCTA } from "@/components/RepresentativeCTA";
import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";
import type { LangText } from "@/lib/directory";
import { localize } from "@/lib/directory";

export type ArticleData = {
  slug: string;
  cover?: string;
  category?: string;
  readingMinutes?: number;
  title: LangText;
  /** Pre-rendered HTML body per language. */
  html: Partial<Record<Lang, string>>;
  /** Plain query used to pre-fill the concierge message. */
  ctaQuery: string;
};

const READ: Record<string, string> = {
  sq: "min lexim", en: "min read", tr: "dk okuma", it: "min di lettura", ar: "دقيقة قراءة",
};

const BACK: Record<string, string> = {
  sq: "Të gjitha guidat", en: "All guides", tr: "Tüm rehberler", it: "Tutte le guide", ar: "كل الأدلة",
};

export function GuideArticle({ data }: { data: ArticleData }) {
  const { lang } = useLang();
  const body = data.html[lang] ?? data.html.en ?? data.html.sq ?? "";

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

      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/guides"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-flag-red transition-colors"
        >
          <span aria-hidden="true">←</span> {BACK[lang] ?? BACK.en}
        </Link>

        <article>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-flag-red/10 text-3xl">
            {data.cover ?? "📄"}
          </div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
            {localize(data.title, lang)}
          </h1>
          {data.readingMinutes ? (
            <p className="mt-2 text-sm text-zinc-400">
              {data.readingMinutes} {READ[lang] ?? READ.en}
            </p>
          ) : null}

          <div
            className="prose prose-zinc dark:prose-invert mt-6 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-flag-red prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </article>

        <RepresentativeCTA
          query={data.ctaQuery}
          categoryId={data.category ?? null}
          prominent
        />
      </main>
    </div>
  );
}
