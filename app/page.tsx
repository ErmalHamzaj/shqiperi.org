"use client";

import Link from "next/link";
import { Logo, EagleMark } from "@/components/Logo";
import { SearchBox } from "@/components/SearchBox";
import { LangToggle } from "@/components/LangToggle";
import { Weather } from "@/components/Weather";
import { NewsList } from "@/components/NewsList";
import { BrandBanner } from "@/components/BrandBanner";
import { adsLink } from "@/lib/representative";
import { useLang } from "@/components/LanguageProvider";

export default function HomePage() {
  const { tr } = useLang();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-4 px-6 py-4 text-sm">
        <EagleMark className="h-8 w-8" />
        <div className="flex items-center gap-4">
          <Weather />
          <LangToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4">
        <h1 className="sr-only">
          Shqipëri — Guida & ndihma jote personale për Shqipërinë: tura, prona,
          makina me qira, avokatë e më shumë, falas | Your personal Albania
          concierge
        </h1>
        {/* Hero */}
        <div className="mt-[11vh] w-full max-w-xl flex flex-col items-center">
          <div className="mb-2">
            <Logo size="lg" />
          </div>
          <p className="mb-8 text-center text-zinc-500 dark:text-zinc-400">
            {tr.tagline}
          </p>

          <div className="w-full">
            <SearchBox autoFocus size="lg" />
          </div>

          {/* Topic quick links */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-sm">
            {tr.topics.map((topic) => (
              <Link
                key={topic.label}
                href={`/search?q=${encodeURIComponent(topic.query)}`}
                className="rounded-full border border-zinc-200 dark:border-zinc-700 px-3.5 py-1.5 text-zinc-600 dark:text-zinc-300 hover:border-flag-red hover:text-flag-red transition-colors"
              >
                {topic.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Brand message — real people help you, free */}
        <div className="mt-14 w-full max-w-xl">
          <BrandBanner />
        </div>

        {/* News panel */}
        <div className="mt-10 mb-12 w-full max-w-xl rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 p-5 sm:p-6 shadow-sm">
          <NewsList limit={5} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  const { lang, tr } = useLang();
  const ads = adsLink(lang);
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800 px-6 py-4 text-sm text-zinc-500">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row">
        <span>© {new Date().getFullYear()} Shqipëri</span>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/directory" className="hover:text-flag-red">
            {tr.dirTitle}
          </Link>
          <Link href="/guides" className="hover:text-flag-red">
            {tr.guidesTitle}
          </Link>
          <a href="#" className="hover:text-flag-red">
            {tr.footerAbout}
          </a>
          <a href="#" className="hover:text-flag-red">
            {tr.footerPrivacy}
          </a>
          <a href="#" className="hover:text-flag-red">
            {tr.footerContact}
          </a>
          {ads && (
            <a
              href={ads}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-flag-red px-3.5 py-1.5 font-semibold text-flag-red hover:bg-flag-red hover:text-white transition-colors"
            >
              📢 {tr.adCta}
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
