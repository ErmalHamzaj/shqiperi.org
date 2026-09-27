"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { SiteNav, SparkleIcon } from "@/components/SiteNav";
import { HeroSlider } from "@/components/HeroSlider";
import { useLang } from "@/components/LanguageProvider";
import { adsLink } from "@/lib/representative";

const IMG = "/images/home";

const HERO_IMAGES = Array.from(
  { length: 24 },
  (_, i) => `${IMG}/hero/${String(i + 1).padStart(2, "0")}.jpg`
);

const PILLARS = [
  { key: "visit", img: "visit", href: "/blog/travel", icon: <PlaneIcon /> },
  { key: "live", img: "live", href: "/blog/living", icon: <HomeIcon /> },
  { key: "invest", img: "invest", href: "/blog/real-estate", icon: <ChartIcon /> },
  { key: "discover", img: "discover", href: "/blog", icon: <BookIcon /> },
] as const;

const DESTINATIONS = [
  { name: "Tirana", img: "tirana", href: "/blog/post/tirana-travel-guide", tag: 0 },
  { name: "Albanian Riviera", img: "riviera", href: "/blog/post/the-albanian-riviera-travel-guide", tag: 1 },
  { name: "Theth", img: "theth", href: "/blog/post/theth-national-park-guide", tag: 2 },
  { name: "Berat", img: "berat", href: "/blog/post/berat-travel-guide", tag: 3 },
  { name: "Gjirokastër", img: "gjirokaster", href: "/blog/post/gjirokaster-travel-guide", tag: 4 },
  { name: "Sarandë", img: "sarande", href: "/blog/post/saranda-travel-guide", tag: 5 },
];

const POPULAR = [
  { href: "/blog/cars", icon: <CarIcon />, color: "text-rose-500 bg-rose-50" },
  { href: "/blog/travel", icon: <BedIcon />, color: "text-violet-500 bg-violet-50" },
  { href: "/blog/real-estate", icon: <HomeIcon />, color: "text-emerald-500 bg-emerald-50" },
  { href: "/blog/business", icon: <BriefcaseIcon />, color: "text-blue-600 bg-blue-50" },
  { href: "/blog/immigration", icon: <ShieldIcon />, color: "text-orange-500 bg-orange-50" },
  { href: "/blog/post/budget-guide-for-a-trip-to-albania", icon: <CalculatorIcon />, color: "text-amber-500 bg-amber-50" },
];

export default function HomePage() {
  const { tr } = useLang();
  const h = tr.home;

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-800">
      <SiteNav />
      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section className="relative isolate flex h-[72vh] max-h-[680px] min-h-[500px] items-start overflow-hidden">
          <HeroSlider images={HERO_IMAGES} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-900/75 via-slate-900/45 to-slate-900/10" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-slate-900/85 via-slate-900/25 to-transparent" />
          {/* soft colour depth */}
          <div className="pointer-events-none absolute -left-24 top-4 -z-10 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="pointer-events-none absolute right-[-6rem] top-1/4 -z-10 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="mx-auto w-full max-w-7xl px-4 pt-11 sm:px-6 sm:pt-14 lg:pt-16">
            <div className="max-w-xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {h.finalCtaLine}
              </span>

              <h1 className="mt-5 bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-extrabold leading-none tracking-tight text-transparent sm:text-5xl">
                SHQIPËRIA
              </h1>
              <p className="mt-3 text-xl font-semibold sm:text-2xl">{h.heroTitle}</p>
              <p className="mt-1 text-base text-white/80 sm:text-lg">{h.heroSub}</p>

              <div className="mt-6">
                <HeroSearch placeholder={h.heroSearchPlaceholder} label={tr.search} />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="#explore"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-colors hover:bg-blue-700"
                >
                  {h.ctaExplore} <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="#ask"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  {h.nav.ask} <SparkleIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/75">
                <HeroStat n="10" label={h.nav.destinations} />
                <span className="h-4 w-px bg-white/25" />
                <span className="text-xs font-semibold tracking-[0.15em] text-white/70">
                  SHQIP · EN · TR · IT · AR
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ WHAT ARE YOU HERE FOR (overlaps hero) ============ */}
        <section className="relative z-20">
          <div className="mx-auto -mt-28 max-w-7xl px-4 pb-4 sm:-mt-32 sm:px-6 lg:-mt-44">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] sm:text-3xl">
                {h.pillarsTitle}
              </h2>
              <Link href="/blog" className="shrink-0 whitespace-nowrap text-sm font-semibold text-white/90 drop-shadow hover:text-white">
                {h.viewAll} →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => {
              const d = h.pillars[p.key];
              return (
                <Link
                  key={p.key}
                  href={p.href}
                  className="group relative block h-64 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  <img
                    src={`${IMG}/${p.img}.jpg`}
                    alt={d.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/35 to-slate-900/5" />
                  <div className="relative flex h-full flex-col justify-between p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                      {p.icon}
                    </span>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-extrabold uppercase tracking-wide text-white">
                          {d.title}
                        </h3>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-slate-900">
                          →
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                        {d.items.join(" · ")}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
            </div>
          </div>
        </section>

        {/* ============ ALBANIA RIGHT NOW ============ */}
        <Section>
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-900 to-brand-900 p-6 shadow-xl ring-1 ring-white/10 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-red-300 ring-1 ring-inset ring-red-500/30">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
                    </span>
                    LIVE
                  </span>
                  <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                    {h.nowTitle}
                  </h2>
                </div>
                <p className="mt-1 text-sm text-white/55">{h.liveInfo}</p>
              </div>
              <Link
                href="/search"
                className="shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 backdrop-blur transition-colors hover:bg-white/20"
              >
                {h.viewMoreData} →
              </Link>
            </div>

            <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
              <LiveTile icon="☀️" label="Tirana" value="26°C" sub={h.nowTiles.weatherSub} />
              <LiveTile icon="💶" label={h.nowTiles.eur} value="103.5" sub="▲ 0.2%" up />
              <LiveTile icon="⛽" label={h.nowTiles.fuel} value="€1.82" />
              <LiveTile icon="✈️" label={h.nowTiles.flights} value="24" sub={h.nowTiles.flightsSub} />
              <LiveTile icon="🚦" label={h.nowTiles.traffic} value={h.nowTiles.trafficVal} sub="Tirana" />
              <LiveTile icon="📅" label={h.nowTiles.events} value="12" sub={h.nowTiles.eventsSub} />
              <LiveTile icon="📰" label={h.nowTiles.news} value="5" sub={h.nowTiles.newsSub} />
            </div>
          </div>
        </Section>

        {/* ============ EXPLORE ALBANIA ============ */}
        <Section id="explore">
          <Head title={h.exploreTitle} desc={h.exploreDesc} action={h.viewAllDestinations} actionHref="/blog/travel" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.name}
                href={d.href}
                className="group relative block h-56 overflow-hidden rounded-2xl"
              >
                <img
                  src={`${IMG}/${d.img}.jpg`}
                  alt={d.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <div className="text-white">
                    <p className="text-base font-bold leading-tight">{d.name}</p>
                    <p className="text-xs text-white/80">{h.destTags[d.tag]}</p>
                  </div>
                  <span className="text-white/90 transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* ============ ASK ALBANIA ============ */}
        <Section id="ask">
          <div className="overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/70">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-7 sm:p-10">
                <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-blue-600">
                  <SparkleIcon className="h-4 w-4" /> {h.askKicker}
                </p>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {h.askHeading}
                </h2>
                <p className="mt-3 text-slate-600">{h.askDesc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {h.askChips.map((c) => (
                    <AskChip key={c} text={c} />
                  ))}
                </div>
                <div className="mt-5">
                  <AskPrompt placeholder={h.askPromptPlaceholder} label={h.nav.ask} />
                </div>
              </div>
              <div className="relative min-h-[280px] p-5 lg:p-6">
                <img
                  src={`${IMG}/ask.jpg`}
                  alt="Albania"
                  className="absolute inset-0 h-full w-full object-cover lg:rounded-none"
                />
                <div className="absolute inset-0 bg-slate-900/10" />
                <div className="absolute bottom-5 right-5 max-w-[230px] rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur">
                  <p className="text-sm font-bold text-slate-900">{h.askCardTitle}</p>
                  <ul className="mt-2 space-y-1.5">
                    {h.askCardItems.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ============ POPULAR RIGHT NOW ============ */}
        <Section id="popular">
          <Head title={h.popularTitle} desc={h.popularDesc} action={h.viewAll} actionHref="/directory" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {POPULAR.map((p, i) => (
              <Link
                key={i}
                href={p.href}
                className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${p.color}`}>
                  {p.icon}
                </span>
                <span className="mt-3 text-sm font-bold text-slate-900">{h.popular[i].label}</span>
                <span className="mt-0.5 text-xs text-slate-500">{h.popular[i].desc}</span>
              </Link>
            ))}
          </div>
        </Section>

        {/* ============ EXPLORE ON THE MAP ============ */}
        <section className="relative isolate overflow-hidden">
          <img src={`${IMG}/map.jpg`} alt="Albania" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-slate-900/45" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div className="text-white">
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{h.mapTitle}</h2>
                <p className="mt-3 max-w-md text-white/85">{h.mapDesc}</p>
                <Link
                  href="/directory"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {h.mapButton} <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <div className="rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur">
                  <p className="mb-3 text-sm font-bold text-slate-900">{tr.dirTitle}</p>
                  <ul className="grid grid-cols-1 gap-2">
                    {h.mapLegend.map((m, i) => (
                      <li key={m} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className={`h-2.5 w-2.5 rounded-full ${["bg-blue-500", "bg-rose-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500"][i]}`} />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------------- pieces ---------------- */

function HeroSearch({ placeholder, label }: { placeholder: string; label: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }
  return (
    <form onSubmit={submit} className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-xl">
      <svg className="h-5 w-5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
      </svg>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="min-w-0 flex-1 bg-transparent py-2 text-base text-slate-800 outline-none placeholder:text-slate-400"
      />
      <button type="submit" aria-label={label} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700">
        →
      </button>
    </form>
  );
}

function AskPrompt({ placeholder, label }: { placeholder: string; label: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }
  return (
    <form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pl-5 shadow-sm">
      <NavIcon className="h-4 w-4 shrink-0 text-slate-400" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
      <button type="submit" aria-label={label} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700">
        →
      </button>
    </form>
  );
}

function AskChip({ text }: { text: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(`/search?q=${encodeURIComponent(text)}`)}
      className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-700"
    >
      {text}
    </button>
  );
}

function LiveTile({
  icon,
  label,
  value,
  sub,
  up,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.05] p-3.5 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.09]">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-base leading-none" aria-hidden="true">
          {icon}
        </span>
        <p className="truncate text-[11px] font-medium text-white/55">{label}</p>
      </div>
      <p className="mt-2.5 text-xl font-extrabold leading-none text-white">{value}</p>
      {sub && (
        <p className={`mt-1 truncate text-[11px] font-medium ${up ? "text-emerald-400" : "text-white/45"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

function HeroStat({ n, label }: { n: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-lg font-extrabold text-white">{n}</span>
      <span className="text-xs font-medium tracking-wide text-white/70">{label}</span>
    </span>
  );
}

function Section({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">{children}</div>
    </section>
  );
}

function Head({
  title,
  desc,
  action,
  actionHref,
}: {
  title: string;
  desc?: string;
  action?: string;
  actionHref?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
        {desc && <p className="mt-2 max-w-2xl text-slate-500">{desc}</p>}
      </div>
      {action && actionHref && (
        <Link href={actionHref} className="shrink-0 whitespace-nowrap text-sm font-semibold text-blue-600 hover:text-blue-700">
          {action} →
        </Link>
      )}
    </div>
  );
}

function SiteFooter() {
  const { lang, tr } = useLang();
  const h = tr.home;
  const ads = adsLink(lang);
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Albanian_eagle.png" alt="" className="h-7 w-7 object-contain invert" />
              <span>Shqipëri.<span className="text-flag-red">org</span></span>
            </p>
            <p className="mt-2 text-sm text-slate-400">{h.finalCtaLine}</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
            <Link href="/blog/travel" className="text-slate-300 hover:text-white">{h.nav.visit}</Link>
            <Link href="/blog/living" className="text-slate-300 hover:text-white">{h.nav.live}</Link>
            <Link href="/blog/real-estate" className="text-slate-300 hover:text-white">{h.nav.invest}</Link>
            <Link href="/blog" className="text-slate-300 hover:text-white">{h.nav.discover}</Link>
            <Link href="/directory" className="text-slate-300 hover:text-white">{tr.dirTitle}</Link>
            <Link href="/search" className="text-slate-300 hover:text-white">{h.nav.ask}</Link>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Shqipëri.org · {h.finalCtaLine}</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#" className="hover:text-white">{tr.footerAbout}</a>
            <a href="#" className="hover:text-white">{tr.footerPrivacy}</a>
            <a href="#" className="hover:text-white">{tr.footerContact}</a>
            {ads && (
              <a href={ads} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-3.5 py-1.5 font-semibold text-white hover:bg-white/10">
                {tr.adCta}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- icons ---------------- */
function PlaneIcon() { return (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l3.9 4-2.2 2.2-2-.5a.5.5 0 0 0-.5.8L5 17l1.5 1.9a.5.5 0 0 0 .8-.1l2.2-2 4 3.9a.5.5 0 0 0 .8-.5Z"/></svg>); }
function HomeIcon() { return (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10 12 3l9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></svg>); }
function ChartIcon() { return (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 15l3-4 3 2 4-6"/></svg>); }
function BookIcon() { return (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4Z"/><path d="M20 4h-4a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H20Z"/></svg>); }
function CarIcon() { return (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13"/><path d="M4 13h16v4H4z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>); }
function BedIcon() { return (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8v11"/><path d="M3 14h18v5"/><path d="M21 19v-5a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="11.5" r="1.5"/></svg>); }
function BriefcaseIcon() { return (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></svg>); }
function ShieldIcon() { return (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6Z"/><path d="m9 12 2 2 4-4"/></svg>); }
function CalculatorIcon() { return (<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v4"/></svg>); }
function CheckIcon({ className = "h-4 w-4" }: { className?: string }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-11"/></svg>); }
function NavIcon({ className = "h-4 w-4" }: { className?: string }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>); }
