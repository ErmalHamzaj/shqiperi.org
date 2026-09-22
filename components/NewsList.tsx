"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";

type NewsItem = { title: string; url: string; source?: string };
type NewsData = {
  source: { name: string; url: string };
  items: NewsItem[];
  error?: string;
};

export function NewsList({ limit = 5 }: { limit?: number }) {
  const { lang, tr } = useLang();
  const [data, setData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/news?lang=${lang}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d: NewsData) => {
        if (active) setData(d);
      })
      .catch(() => {
        if (active) setData(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [lang]);

  return (
    <section className="w-full">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flag-red opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-flag-red" />
          </span>
          {tr.newsTitle}
        </h2>
        {data?.source?.url && (
          <a
            href={data.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-flag-red"
          >
            {tr.newsVia}: {data.source.name} ↗
          </a>
        )}
      </div>

      {loading ? (
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="shimmer h-4 w-full rounded" />
          ))}
        </ul>
      ) : !data || data.items.length === 0 ? (
        <p className="text-sm text-zinc-400">
          {tr.newsError}{" "}
          {data?.source && (
            <a
              href={data.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-flag-red hover:underline"
            >
              {data.source.name} ↗
            </a>
          )}
        </p>
      ) : (
        <ol className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {data.items.slice(0, limit).map((item, i) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3 py-2.5"
              >
                <span className="mt-0.5 w-5 shrink-0 text-right text-sm font-semibold text-zinc-300 dark:text-zinc-600">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="text-[15px] leading-snug text-zinc-700 dark:text-zinc-200 group-hover:text-flag-red">
                    {item.title}
                  </span>
                  {item.source && (
                    <span className="ml-2 whitespace-nowrap text-xs font-medium text-flag-red/80">
                      · {item.source}
                    </span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
