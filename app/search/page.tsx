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
import { renderMarkdown } from "@/lib/markdown";
import { getRefinement } from "@/lib/refine";
import { matchCategory, companyNote, localize, type Company } from "@/lib/directory";

type Source = { title: string; url: string; age?: string };
type Status = "idle" | "loading" | "streaming" | "done" | "error";
type WikiSummary = {
  title: string;
  extract: string;
  url: string;
  thumbnail?: string;
};
type WebResult = { title: string; snippet: string; url: string };
type WebData = { summary: WikiSummary | null; results: WebResult[] };

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

  // Free web results (Wikipedia) — the default, no AI.
  const [web, setWeb] = useState<WebData | null>(null);
  const [webLoading, setWebLoading] = useState(true);
  // AI is opt-in: only runs when the user asks, or when free results are empty.
  const [showAI, setShowAI] = useState(false);
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const abortRef = useRef<AbortController | null>(null);

  const refinement = getRefinement(query, lang);
  const category = matchCategory(query);
  const isNews = /(news|lajm|haber|notiz|أخبار|الأخبار)/i.test(query);
  // High-intent: someone wants a custom/organized plan or a service/purchase.
  const customPlan =
    /\b(plan|organi[sz]|itinerar|transfer|package|paket[ëe]|then|from there|pastaj|nga atje|custom|trip|udh[ëe]tim|tour|tur[ëa]?)\b/i.test(
      query,
    );
  const highIntent = customPlan || category !== null;

  // Fetch free web results whenever the query changes.
  useEffect(() => {
    if (!query || isNews) return;
    let active = true;
    setWeb(null);
    setWebLoading(true);
    setShowAI(false);
    setAnswer("");
    setSources([]);
    setStatus("idle");

    fetch(`/api/websearch?q=${encodeURIComponent(query)}&lang=${lang}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((d: WebData) => {
        if (!active) return;
        setWeb(d);
        setWebLoading(false);
        // Nothing free to show → AI is genuinely needed, run it automatically.
        if (!d.summary && (!d.results || d.results.length === 0)) setShowAI(true);
      })
      .catch(() => {
        if (!active) return;
        setWebLoading(false);
        setShowAI(true);
      });

    return () => {
      active = false;
    };
  }, [query, lang, isNews]);

  // Stream the AI answer — only when requested (showAI).
  useEffect(() => {
    if (!query || isNews || !showAI) return;
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    setAnswer("");
    setSources([]);
    setStatus("loading");

    (async () => {
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: query, lang }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";
          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            let evt: any;
            try {
              evt = JSON.parse(payload);
            } catch {
              continue;
            }
            if (evt.type === "text") {
              setStatus("streaming");
              setAnswer((a) => a + evt.text);
            } else if (evt.type === "sources") {
              setSources(evt.sources ?? []);
            } else if (evt.type === "done") {
              setStatus("done");
            } else if (evt.type === "error") {
              setStatus("error");
            }
          }
        }
        setStatus((s) => (s === "error" ? s : "done"));
      } catch (e) {
        if ((e as Error).name !== "AbortError") setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [query, lang, isNews, showAI]);

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
          /* News query → aggregated Albanian news feed, no AI answer */
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

            {/* Free summary (Wikipedia) — no AI */}
            {webLoading ? (
              <section className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 sm:p-6 shadow-sm">
                <LoadingSkeleton label={tr.searching} />
              </section>
            ) : web?.summary ? (
              <WikiSummary summary={web.summary} via={tr.webVia} readMore={tr.readMore} />
            ) : null}

            {/* AI answer — opt-in (or auto when there's nothing free to show) */}
            {showAI ? (
              <section className="mt-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 sm:p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <BookIcon />
                  <h2 className="text-sm font-semibold tracking-wide text-flag-red uppercase">
                    {tr.overview}
                  </h2>
                </div>

                {status === "loading" && answer === "" ? (
                  <LoadingSkeleton label={tr.searching} />
                ) : status === "error" ? (
                  <p className="text-zinc-600 dark:text-zinc-300">{tr.error}</p>
                ) : (
                  <div
                    className={`answer text-[15px] text-zinc-800 dark:text-zinc-100 ${
                      status === "streaming" ? "caret" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(answer) }}
                  />
                )}

                {sources.length > 0 && (
                  <div className="mt-5 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <h3 className="mb-2 text-xs font-semibold uppercase text-zinc-400">
                      {tr.sources}
                    </h3>
                    <ol className="space-y-2.5">
                      {sources.map((s, idx) => (
                        <SourceRow key={s.url} source={s} index={idx + 1} />
                      ))}
                    </ol>
                  </div>
                )}

                <p className="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-3 text-xs text-zinc-400">
                  {tr.disclaimer}
                </p>
              </section>
            ) : (
              !webLoading && (
                <DetailedAnswerButton
                  label={tr.detailedBtn}
                  hint={tr.detailedHint}
                  onClick={() => setShowAI(true)}
                />
              )
            )}

            {/* Free representative / concierge — shown for high-intent queries */}
            {highIntent && <RepresentativeCTA query={query} prominent />}

            {/* Related articles (Wikipedia) */}
            {web?.results && web.results.length > 0 && (
              <WebResults results={web.results} title={tr.related} />
            )}

            {/* Company directory */}
            {category && (
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

function WikiSummary({
  summary,
  via,
  readMore,
}: {
  summary: WikiSummary;
  via: string;
  readMore: string;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:p-6">
        <div className="min-w-0 flex-1">
          <a
            href={summary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-zinc-800 hover:text-flag-red dark:text-zinc-100"
          >
            {summary.title}
          </a>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {summary.extract}
          </p>
          <a
            href={summary.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-flag-red hover:underline"
          >
            {readMore} ↗
          </a>
          <p className="mt-3 text-xs text-zinc-400">{via}</p>
        </div>
        {summary.thumbnail && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={summary.thumbnail}
            alt=""
            className="h-32 w-full shrink-0 rounded-xl object-cover sm:h-28 sm:w-40"
          />
        )}
      </div>
    </section>
  );
}

function WebResults({ results, title }: { results: WebResult[]; title: string }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        {title}
      </h2>
      <ol className="space-y-4">
        {results.map((r) => (
          <li key={r.url}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-medium text-flag-red hover:underline"
            >
              {r.title}
            </a>
            {r.snippet && (
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                {r.snippet}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function DetailedAnswerButton({
  label,
  hint,
  onClick,
}: {
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <div className="mt-6 flex flex-col items-start gap-2 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{hint}</p>
      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-full bg-flag-red px-4 py-2 text-sm font-semibold text-white hover:bg-flag-dark transition-colors"
      >
        <SparkIcon />
        {label}
      </button>
    </div>
  );
}

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
  return (
    <section className="mt-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 sm:p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <TagIcon />
        <h2 className="text-sm font-semibold tracking-wide text-flag-red uppercase">
          {title} · {categoryName}
        </h2>
      </div>

      {companies.length === 0 ? (
        <p className="text-sm text-zinc-400">
          {tr.dirEmpty}{" "}
          <span className="text-zinc-500 dark:text-zinc-300">{tr.dirListCta}</span>
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {companies.map((c) => (
            <li
              key={c.name}
              className="rounded-xl border border-zinc-100 dark:border-zinc-700 p-4"
            >
              <div className="font-semibold text-zinc-800 dark:text-zinc-100">
                {c.name}
              </div>
              {companyNote(c, lang) && (
                <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                  {companyNote(c, lang)}
                </p>
              )}
              <div className="mt-2 space-y-0.5 text-sm">
                {c.city && (
                  <div className="text-zinc-500">📍 {c.city}</div>
                )}
                {c.phone && (
                  <a href={`tel:${c.phone}`} className="block text-flag-red hover:underline">
                    📞 {c.phone}
                  </a>
                )}
                {c.email && (
                  <a href={`mailto:${c.email}`} className="block text-flag-red hover:underline">
                    ✉️ {c.email}
                  </a>
                )}
                {c.website && (
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-flag-red hover:underline"
                  >
                    🔗 {c.website.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function SourceRow({ source, index }: { source: Source; index: number }) {
  let host = source.url;
  try {
    host = new URL(source.url).hostname.replace(/^www\./, "");
  } catch {
    /* keep raw */
  }
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 text-xs font-semibold text-zinc-500">
        {index}
      </span>
      <div className="min-w-0">
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="line-clamp-1 text-[15px] text-flag-red hover:underline"
        >
          {source.title}
        </a>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
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
          {source.age && <span>· {source.age}</span>}
        </div>
      </div>
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

function BookIcon() {
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
      <path d="M4 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H6a2 2 0 0 1-2-2z" />
      <path d="M17 3h1a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2h-1" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.6 4.8L18.5 8l-4.9 1.2L12 14l-1.6-4.8L5.5 8l4.9-1.2L12 2zM5 14l.8 2.4L8 17l-2.2.6L5 20l-.8-2.4L2 17l2.2-.6L5 14z" />
    </svg>
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
