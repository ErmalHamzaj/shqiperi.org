"use client";

import { useLang } from "./LanguageProvider";
import {
  whatsappLink,
  emailLink,
  hasContact,
} from "@/lib/representative";
import { getPitch } from "@/lib/pitches";
import { t, type Lang } from "@/lib/i18n";

/**
 * Free concierge call-to-action, tailored per category (personalized tour,
 * property list by budget, available cars now, etc.). Shown for high-intent
 * queries where a visitor likely wants a person to organize things for them.
 */
export function RepresentativeCTA({
  query,
  categoryId = null,
  prominent = false,
  lang: langProp,
}: {
  query: string;
  categoryId?: string | null;
  prominent?: boolean;
  lang?: Lang;
}) {
  const { lang: providerLang } = useLang();
  const lang = langProp ?? providerLang;
  const tr = t(lang);
  const wa = whatsappLink(query, lang);
  const mail = emailLink(query, lang);

  const pitch = getPitch(categoryId, lang);
  const title = pitch?.title ?? tr.repTitle;
  const body = pitch?.body ?? tr.repBody;
  const ctaLabel = pitch?.cta ?? tr.repWhatsapp;

  return (
    <section
      className={`mt-8 overflow-hidden rounded-2xl border shadow-sm ${
        prominent
          ? "border-flag-red/30 bg-gradient-to-br from-flag-red/[0.10] via-flag-red/[0.04] to-transparent"
          : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40"
      } p-5 sm:p-6`}
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-flag-red text-white shadow-sm">
          <SparkleIcon />
        </div>
        <div className="min-w-0 flex-1">
          <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-flag-red/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-flag-red">
            ✦ {tr.repFree}
          </span>
          <h2 className="text-lg font-bold leading-snug text-zinc-900 dark:text-zinc-50">
            {title}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{body}</p>

          {hasContact() ? (
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:brightness-95 hover:shadow transition"
                >
                  <WhatsAppIcon />
                  {ctaLabel}
                </a>
              )}
              {mail && (
                <a
                  href={mail}
                  className="inline-flex items-center gap-2 rounded-full border border-flag-red px-4 py-2.5 text-sm font-semibold text-flag-red hover:bg-flag-red hover:text-white transition"
                >
                  <MailIcon />
                  {tr.repEmail}
                </a>
              )}
              <span className="text-xs text-zinc-400">
                {lang === "sq"
                  ? "Përgjigje brenda pak minutash"
                  : lang === "tr"
                    ? "Birkaç dakika içinde yanıt"
                    : lang === "it"
                      ? "Risposta in pochi minuti"
                      : lang === "ar"
                        ? "رد خلال دقائق"
                        : "Reply within minutes"}
              </span>
            </div>
          ) : (
            <p className="mt-3 text-xs text-zinc-400">{tr.repSoon}</p>
          )}
        </div>
      </div>
    </section>
  );
}

function SparkleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l1.9 5.6L19.5 9l-4.6 1.7L12 16l-1.9-5.3L4.5 9l5.6-1.4L12 2zM5 15l.9 2.6L8.5 18l-2.2.8L5 21l-.9-2.2L2 18l2.1-.4L5 15zM18 13l.8 2.4L21 16l-2.2.7L18 19l-.8-2.3L15 16l2.2-.6L18 13z" />
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
