"use client";

import { useLang } from "./LanguageProvider";
import { whatsappLink, hasContact } from "@/lib/representative";

/**
 * Home-page brand statement: makes clear this is not a random search engine —
 * a real team helps you get things done in Albania, for free.
 */
export function BrandBanner() {
  const { lang, tr } = useLang();
  const wa = whatsappLink("", lang);

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-flag-red/25 bg-gradient-to-br from-flag-red/[0.12] via-flag-red/[0.05] to-transparent p-6 sm:p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-flag-red text-white shadow-sm">
          <HeartHandshake />
        </span>
        <h2 className="text-xl font-bold leading-snug text-zinc-900 dark:text-zinc-50 sm:text-2xl">
          {tr.brandTitle}
        </h2>
        <p className="max-w-xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
          {tr.brandBody}
        </p>

        {hasContact() && wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-sm hover:brightness-95 hover:shadow transition"
          >
            <WhatsAppIcon />
            {tr.brandCta}
          </a>
        )}

        <p className="text-xs font-medium text-zinc-400">{tr.brandNote}</p>
      </div>
    </section>
  );
}

function HeartHandshake() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5.5C10.3 3.6 7.6 3.3 5.7 5a4.6 4.6 0 0 0-.3 6.6l6.6 6.7 6.6-6.7A4.6 4.6 0 0 0 18.3 5c-1.9-1.7-4.6-1.4-6.3.5z" />
      <path d="m8.5 12 2 2 2-2 2 2" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
