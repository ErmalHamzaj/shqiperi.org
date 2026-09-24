"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Logo, EagleMark } from "@/components/Logo";
import { SearchBox } from "@/components/SearchBox";
import { LangToggle } from "@/components/LangToggle";
import { NewsList } from "@/components/NewsList";
import { Weather } from "@/components/Weather";
import { RepresentativeCTA } from "@/components/RepresentativeCTA";
import { useLang } from "@/components/LanguageProvider";
import { getRefinement } from "@/lib/refine";
import { matchCategory, localize, sortByRating, type Company } from "@/lib/directory";
import { CompanyCard } from "@/components/CompanyCard";
import { VerifyCTA } from "@/components/VerifyCTA";

type Result = { title: string; url: string; rating?: string; snippet?: string };
type Status = "loading" | "done" | "error";

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}

function SearchResults() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const { lang, tr } = useLang();

  const [results, setResults] = useState<Result[]>([]);
  const [albania, setAlbania] = useState(true);
  const [status, setStatus] = useState<Status>("loading");
  const abortRef = useRef<AbortController | null>(null);

  const refinement = getRefinement(query, lang);
  const category = matchCategory(query);
  // Category with listings → show the database directly (no AI, no cost).
  const hasDb = category !== null && category.companies.length > 0;
  const isNews = /(news|lajm|haber|notiz|أخبار|الأخبار)/i.test(query);
  const customPlan =
    /\b(plan|organi[sz]|itinerar|transfer|package|paket[ëe]|then|from there|pastaj|nga atje|custom|trip|udh[ëe]tim|tour|tur[ëa]?)\b/i.test(
      query,
    );
  const highIntent = customPlan || category !== null;

  // Fetch AI results only when there's no local database for this query.
  useEffect(() => {
    if (!query || isNews || hasDb) return;
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    setResults([]);
    setAlbania(true);
    setStatus("loading");

    (async () => {
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: query, lang }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setAlbania(data.albania !== false);
        setResults(Array.isArray(data.results) ? data.results : []);
        setStatus("done");
      } catch (e) {
        if ((e as Error).name !== "AbortError") setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [query, lang, isNews, hasDb]);

  return (
    <div className="min-h-screen">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 border-b border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3">
          <div className="flex shrink-0 items-center gap-2">
            <EagleMark className="h-7 w-7" />
            <span className="hidden sm:block">
              <Logo size="sm" />
            </span>
          </div>
          <div className="flex-1">
            <SearchBox initialQuery={query} size="sm" />
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <Weather />
            <LangToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="mb-6 text-sm text-zinc-400">
          {tr.resultsFor}{" "}
          <span className="text-zinc-600 dark:text-zinc-300 font-medium">
            “{query}”
          </span>
        </p>

        {isNews ? (
          /* News query → aggregated Albanian news feed */
          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 sm:p-6 shadow-sm">
            <NewsList limit={30} />
          </div>
        ) : (
          <>
            {/* Disambiguation */}
            {refinement && (
              <section className="mb-6 rounded-2xl border border-flag-red/25 bg-flag-red/[0.04] p-4 sm:p-5">
                <h2 className="mb-3 text-sm font-semibold text-flag-dark dark:text-flag-red">
                  {refinement.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {refinement.chips.map((c) => (
                    <Link
                      key={c.query}
                      href={`/search?q=${encodeURIComponent(c.query)}`}
                      className="rounded-full border border-flag-red/40 bg-white dark:bg-zinc-800 px-3.5 py-1.5 text-sm text-flag-dark dark:text-zinc-100 hover:bg-flag-red hover:text-white hover:border-flag-red transition-colors"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {hasDb ? (
              /* We have a local database for this query → no AI needed */
              <DirectorySection
                title={tr.dirTitle}
                categoryName={localize(category!.name, lang)}
                companies={category!.companies}
              />
            ) : status === "loading" ? (
              <section className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 sm:p-6 shadow-sm">
                <LoadingSkeleton label={tr.searching} />
              </section>
            ) : !albania ? (
              <section className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-8 text-center shadow-sm">
                <div className="mb-3 text-3xl">🇦🇱</div>
                <p className="text-zinc-600 dark:text-zinc-300">{tr.notAlbania}</p>
              </section>
            ) : status === "error" ? (
              <p className="text-zinc-600 dark:text-zinc-300">{tr.error}</p>
            ) : results.length > 0 ? (
              <ol className="space-y-4">
                {results.map((r) => (
                  <ResultCard key={r.url} result={r} />
                ))}
              </ol>
            ) : (
              <p className="text-zinc-500 dark:text-zinc-400">{tr.noWebResults}</p>
            )}

            {/* Concierge — high-intent queries */}
            {highIntent && <RepresentativeCTA query={query} prominent />}

            {/* Empty category → invite to get listed */}
            {category && !hasDb && (
              <DirectorySection
                title={tr.dirTitle}
                categoryName={localize(category.name, lang)}
                companies={category.companies}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

const DIR_INITIAL = 6;

function DirectorySection({
  title,
  categoryName,
  companies,
}: {
  title: string;
  categoryName: string;
  companies: Company[];
}) {
  const { lang, tr } = useLang();
  const [expanded, setExpanded] = useState(false);

  const moreLabel: Record<string, string> = {
    sq: "Shiko të gjitha",
    en: "Show all",
    tr: "Tümünü gör",
    it: "Mostra tutto",
    ar: "عرض الكل",
  };
  const lessLabel: Record<string, string> = {
    sq: "Shfaq më pak",
    en: "Show less",
    tr: "Daha az göster",
    it: "Mostra meno",
    ar: "عرض أقل",
  };

  const sorted = sortByRating(companies);
  const shown = expanded ? sorted : sorted.slice(0, DIR_INITIAL);

  return (
    <section className="mt-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 sm:p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <TagIcon />
        <h2 className="text-sm font-semibold tracking-wide text-flag-red uppercase">
          {title} · {categoryName}
          {companies.length > 0 && (
            <span className="ml-1 text-zinc-400">({companies.length})</span>
          )}
        </h2>
      </div>

      {companies.length === 0 ? (
        <p className="text-sm text-zinc-400">
          {tr.dirEmpty}{" "}
          <span className="text-zinc-500 dark:text-zinc-300">{tr.dirListCta}</span>
        </p>
      ) : (
        <>
          <ul className="grid gap-3 sm:grid-cols-2">
            {shown.map((c) => (
              <CompanyCard key={c.name} company={c} />
            ))}
          </ul>

          {companies.length > DIR_INITIAL && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-4 w-full rounded-full border border-zinc-200 dark:border-zinc-700 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:border-flag-red hover:text-flag-red transition-colors"
            >
              {expanded
                ? lessLabel[lang] ?? lessLabel.en
                : `${moreLabel[lang] ?? moreLabel.en} (${companies.length})`}
            </button>
          )}
          <VerifyCTA className="mt-4" />
        </>
      )}
    </section>
  );
}

function ResultCard({ result }: { result: Result }) {
  let host = result.url;
  try {
    host = new URL(result.url).hostname.replace(/^www\./, "");
  } catch {
    /* keep raw */
  }
  return (
    <li className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-4 sm:p-5 shadow-sm hover:border-flag-red/40 transition-colors">
      <a href={result.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="mb-1 flex items-center gap-2 text-xs text-zinc-400">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://icons.duckduckgo.com/ip3/${host}.ico`}
            alt=""
            width={14}
            height={14}
            className="rounded-sm"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="truncate">{host}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[17px] font-semibold text-flag-red hover:underline">
            {result.title}
          </h3>
          {result.rating && (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-amber-100 dark:bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
              ★ {result.rating}
            </span>
          )}
        </div>
        {result.snippet && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{result.snippet}</p>
        )}
      </a>
    </li>
  );
}

function LoadingSkeleton({ label }: { label: string }) {
  return (
    <div>
      <p className="mb-4 flex items-center gap-2 text-sm text-zinc-400">
        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-flag-red border-t-transparent" />
        {label}
      </p>
      <div className="space-y-3">
        <div className="shimmer h-4 w-11/12 rounded" />
        <div className="shimmer h-4 w-full rounded" />
        <div className="shimmer h-4 w-4/5 rounded" />
        <div className="shimmer h-4 w-10/12 rounded" />
      </div>
    </div>
  );
}

function TagIcon() {
  return (
    <svg
      className="h-4 w-4 text-flag-red"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  );
}
