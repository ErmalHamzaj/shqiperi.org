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
  /** Blog category, for the badge/link. */
  categoryId?: string;
  categoryName?: LangText;
  categoryIcon?: string;
  /** Directory category id for the concierge CTA. */
  ctaCategory?: string | null;
  /** Hide the concierge CTA entirely (editorial sections). */
  hideCta?: boolean;
  /** ISO publish date, shown in the article header. */
  date?: string;
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
  sq: "Blog", en: "Blog", tr: "Blog", it: "Blog", ar: "المدونة",
};

// Deterministic month names (avoids server/client Intl mismatches).
const MONTHS: Record<string, string[]> = {
  sq: ["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  it: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
};

function formatDate(iso: string, lang: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const day = d.getUTCDate();
  const month = (MONTHS[lang] ?? MONTHS.en)[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return lang === "en" ? `${month} ${day}, ${year}` : `${day} ${month} ${year}`;
}

export function BlogArticle({ data }: { data: ArticleData }) {
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
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-flag-red transition-colors"
        >
          <span aria-hidden="true">←</span> {BACK[lang] ?? BACK.en}
        </Link>

        <article>
          {data.categoryId && data.categoryName ? (
            <Link
              href={`/blog/${data.categoryId}`}
              className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-flag-red/10 px-3 py-1 text-xs font-semibold text-flag-red hover:bg-flag-red/15 transition-colors"
            >
              <span aria-hidden="true">{data.categoryIcon}</span>
              {localize(data.categoryName, lang)}
            </Link>
          ) : null}

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
            {localize(data.title, lang)}
          </h1>
          {(() => {
            const dateStr = data.date ? formatDate(data.date, lang) : "";
            const readStr = data.readingMinutes
              ? `${data.readingMinutes} ${READ[lang] ?? READ.en}`
              : "";
            const parts = [dateStr, readStr].filter(Boolean);
            return parts.length ? (
              <p className="mt-2 text-sm text-zinc-400">{parts.join(" · ")}</p>
            ) : null;
          })()}

          <div
            className="prose prose-zinc dark:prose-invert mt-6 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-flag-red prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </article>

        {!data.hideCta && (
          <RepresentativeCTA
            query={data.ctaQuery}
            categoryId={data.ctaCategory ?? null}
            prominent
          />
        )}
      </main>
    </div>
  );
}
