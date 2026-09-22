"use client";

import { useLang } from "./LanguageProvider";
import {
  whatsappLink,
  emailLink,
  hasContact,
} from "@/lib/representative";

/**
 * Free online-representative call-to-action. Shown prominently for high-intent
 * queries (custom tours, buying property, transfers, rentals…), where a visitor
 * likely wants a person to organize things for them.
 */
export function RepresentativeCTA({
  query,
  prominent = false,
}: {
  query: string;
  prominent?: boolean;
}) {
  const { lang, tr } = useLang();
  const wa = whatsappLink(query, lang);
  const mail = emailLink(query, lang);

  return (
    <section
      className={`mt-8 overflow-hidden rounded-2xl border ${
        prominent
          ? "border-flag-red/30 bg-gradient-to-br from-flag-red/[0.07] to-transparent"
          : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40"
      } p-5 sm:p-6 shadow-sm`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flag-red/10">
          <HeadsetIcon />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
              {tr.repTitle}
            </h2>
            <span className="rounded-full bg-flag-red px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
              {tr.repFree}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {tr.repBody}
          </p>

          {hasContact() ? (
            <div className="mt-4 flex flex-wrap gap-2.5">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:brightness-95 transition"
                >
                  <WhatsAppIcon />
                  {tr.repWhatsapp}
                </a>
              )}
              {mail && (
                <a
                  href={mail}
                  className="inline-flex items-center gap-2 rounded-full border border-flag-red px-4 py-2 text-sm font-semibold text-flag-red hover:bg-flag-red hover:text-white transition"
                >
                  <MailIcon />
                  {tr.repEmail}
                </a>
              )}
            </div>
          ) : (
            <p className="mt-3 text-xs text-zinc-400">{tr.repSoon}</p>
          )}
        </div>
      </div>
    </section>
  );
}

function HeadsetIcon() {
  return (
    <svg
      className="h-5 w-5 text-flag-red"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
      <path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" />
      <path d="M3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z" />
      <path d="M18 18a4 4 0 0 1-4 3h-2" />
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

function MailIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
