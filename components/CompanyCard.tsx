"use client";

import { useLang } from "./LanguageProvider";
import { companyNote, type Company } from "@/lib/directory";

/**
 * A listed (admin-added) business card. Visually distinct from AI web results:
 * red left accent + a "Listed" mark, plus a star rating badge when available.
 */
export function CompanyCard({ company: c }: { company: Company }) {
  const { lang } = useLang();
  const note = companyNote(c, lang);
  return (
    <li className="relative rounded-xl border border-zinc-100 dark:border-zinc-700 border-l-4 border-l-flag-red bg-flag-red/[0.02] p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <CheckIcon />
            <span className="font-semibold text-zinc-800 dark:text-zinc-100">{c.name}</span>
          </div>
          {note && (
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{note}</p>
          )}
        </div>
        {typeof c.rating === "number" && (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-amber-100 dark:bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
            ★ {c.rating.toFixed(1)}
          </span>
        )}
      </div>
      <div className="mt-2 space-y-0.5 text-sm">
        {c.city && <div className="text-zinc-500">📍 {c.city}</div>}
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
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-flag-red"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.1 14.3-3.6-3.6 1.4-1.4 2.2 2.2 4.6-4.6 1.4 1.4-6 6z" />
    </svg>
  );
}
