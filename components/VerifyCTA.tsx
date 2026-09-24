"use client";

import { useLang } from "./LanguageProvider";
import { verifyLink } from "@/lib/representative";

/** "Need to verify a business? Contact us on WhatsApp" prompt. */
export function VerifyCTA({ className = "" }: { className?: string }) {
  const { lang, tr } = useLang();
  const link = verifyLink(lang);
  if (!link) return null;
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700 px-4 py-3 text-sm ${className}`}
    >
      <span className="text-zinc-500 dark:text-zinc-400">{tr.verifyLine}</span>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-semibold text-flag-red hover:underline"
      >
        <WhatsAppIcon />
        {tr.verifyCta}
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
