"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SiteNav } from "@/components/SiteNav";
import { Weather } from "@/components/Weather";
import { NewsList } from "@/components/NewsList";
import { useLang } from "@/components/LanguageProvider";
import { adsLink } from "@/lib/representative";

const DESTINATIONS = [
  { name: "Tirana", href: "/blog/post/tirana-travel-guide", emoji: "🏙️" },
  { name: "Riviera", href: "/blog/post/the-albanian-riviera-travel-guide", emoji: "🏖️" },
  { name: "Theth", href: "/blog/post/theth-national-park-guide", emoji: "⛰️" },
  { name: "Berat", href: "/blog/post/berat-travel-guide", emoji: "🏛️" },
  { name: "Gjirokastër", href: "/blog/post/gjirokaster-travel-guide", emoji: "🏰" },
  { name: "Shkodër", href: "/blog/post/shkodra-travel-guide", emoji: "🚲" },
  { name: "Vlorë", href: "/blog/post/vlora-travel-guide", emoji: "⛵" },
  { name: "Sarandë", href: "/blog/post/saranda-travel-guide", emoji: "🌊" },
  { name: "Ksamil", href: "/blog/post/ksamil-travel-guide", emoji: "🏝️" },
  { name: "Himarë", href: "/blog/post/himara-dhermi-travel-guide", emoji: "🏖️" },
];

const PILLAR_HREF = {
  visit: "/blog/travel",
  live: "/blog/living",
  invest: "/blog/real-estate",
  discover: "/blog",
} as const;

const ACTION_HREFS = [
  "/blog/travel",
  "/blog/travel",
  "/blog/food",
  "/blog/cars",
  "/blog/real-estate",
  "/blog/business",
  "/blog/immigration",
];

const GUIDE_HREFS = [
  "/blog/post/first-trip-to-albania-a-beginners-guide",
  "/blog/post/buying-a-home-in-albania-full-guide",
  "/blog/post/how-to-get-a-residence-permit-in-albania",
  "/blog/post/albania-north-to-south-road-trip",
  "/blog/post/the-best-beaches-in-albania",
  "/blog/post/7-days-in-albania-itinerary",
];

export default function HomePage() {
  const { tr } = useLang();
  const h = tr.home;

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-800">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-brand-900 text-white">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
              Shqipëria
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              {h.heroTitle}
            </h1>
            <p className="mt-4 text-xl font-medium text-brand-100 sm:text-2xl">
              {h.heroSub}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-100/80">
              {h.heroLede}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#explore"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
              >
                {h.ctaExplore}
              </a>
              <a
                href="#ask"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {h.ctaAsk}
              </a>
            </div>
          </div>
        </section>

        {/* What are you here for — four pillars */}
        <Section>
          <SectionHead title={h.pillarsTitle} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(["visit", "live", "invest", "discover"] as const).map((key) => {
              const p = h.pillars[key];
              return (
                <Link
                  key={key}
                  href={PILLAR_HREF[key]}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand-300"
                >
                  <h3 className="text-lg font-semibold text-brand-900">{p.title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <span className="mt-4 inline-block text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                    {h.seeAll} →
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>

        {/* Albania Right Now */}
        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
            <SectionHead title={h.nowTitle} subtitle={h.nowSub} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <Weather />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                <NewsList limit={4} />
              </div>
            </div>
          </div>
        </section>

        {/* Explore Albania */}
        <Section id="explore">
          <SectionHead title={h.exploreTitle} subtitle={h.exploreSub} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.name}
                href={d.href}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-300"
              >
                <span className="text-2xl" aria-hidden="true">
                  {d.emoji}
                </span>
                <span className="mt-6 text-base font-semibold text-brand-900 group-hover:text-brand-600">
                  {d.name}
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* Ask Albania */}
        <section id="ask" className="bg-brand-900 text-white">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{h.askTitle}</h2>
            <p className="mt-3 text-brand-100">{h.askLede}</p>
            <div className="mt-7">
              <AskBox placeholder={h.askPlaceholder} button={h.askButton} />
            </div>
          </div>
        </section>

        {/* Popular actions */}
        <Section>
          <SectionHead title={h.actionsTitle} />
          <div className="flex flex-wrap gap-2.5">
            {h.actions.map((label, i) => (
              <Link
                key={label}
                href={ACTION_HREFS[i]}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-900"
              >
                {label}
              </Link>
            ))}
          </div>
        </Section>

        {/* Deep guides */}
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
            <SectionHead title={h.guidesTitle} subtitle={h.guidesSub} />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {h.guides.map((title, i) => (
                <Link
                  key={title}
                  href={GUIDE_HREFS[i]}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-300"
                >
                  <span className="text-base font-semibold text-brand-900 group-hover:text-brand-600">
                    {title}
                  </span>
                  <span className="text-brand-300 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand-900 text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-6">
            <p className="text-2xl font-bold tracking-tight sm:text-3xl">SHQIPËRIA.ORG</p>
            <p className="mt-2 text-brand-100">{h.finalCtaLine}</p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function AskBox({ placeholder, button }: { placeholder: string; button: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label={button}
        className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-base text-white outline-none placeholder:text-brand-100/60 focus:border-white/50"
      />
      <button
        type="submit"
        className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
      >
        {button}
      </button>
    </form>
  );
}

function Section({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id}>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">{children}</div>
    </section>
  );
}

function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-2 max-w-2xl text-slate-500">{subtitle}</p>}
    </div>
  );
}

function SiteFooter() {
  const { lang, tr } = useLang();
  const h = tr.home;
  const ads = adsLink(lang);
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight text-brand-900">SHQIPËRIA</p>
            <p className="mt-1 text-sm text-slate-500">{h.finalCtaLine}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/blog/travel" className="text-slate-600 hover:text-brand-900">
              {h.nav.visit}
            </Link>
            <Link href="/blog/living" className="text-slate-600 hover:text-brand-900">
              {h.nav.live}
            </Link>
            <Link href="/blog/real-estate" className="text-slate-600 hover:text-brand-900">
              {h.nav.invest}
            </Link>
            <Link href="/blog" className="text-slate-600 hover:text-brand-900">
              {h.nav.discover}
            </Link>
            <Link href="/directory" className="text-slate-600 hover:text-brand-900">
              {tr.dirTitle}
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Shqipëria</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#" className="hover:text-brand-900">
              {tr.footerAbout}
            </a>
            <a href="#" className="hover:text-brand-900">
              {tr.footerPrivacy}
            </a>
            <a href="#" className="hover:text-brand-900">
              {tr.footerContact}
            </a>
            {ads && (
              <a
                href={ads}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-brand-200 px-3.5 py-1.5 font-semibold text-brand-900 transition-colors hover:border-brand-900"
              >
                {tr.adCta}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
