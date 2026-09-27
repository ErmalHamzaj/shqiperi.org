"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { LangToggle } from "@/components/LangToggle";

type NavKey = "visit" | "live" | "invest" | "discover" | "destinations" | "services";
const NAV: { key: NavKey; href: string; mega?: boolean }[] = [
  { key: "visit", href: "/blog/travel", mega: true },
  { key: "live", href: "/blog/living" },
  { key: "invest", href: "/blog/real-estate" },
  { key: "discover", href: "/blog" },
  { key: "destinations", href: "/#explore" },
  { key: "services", href: "/#popular" },
];

type Col = { title: string; links: [string, string][] };

const VISIT_COLUMNS: Col[] = [
  {
    title: "Destinations",
    links: [
      ["Tirana", "/blog/post/tirana-travel-guide"],
      ["Durrës", "/blog/travel"],
      ["Vlorë", "/blog/post/vlora-travel-guide"],
      ["Sarandë", "/blog/post/saranda-travel-guide"],
      ["Ksamil", "/blog/post/ksamil-travel-guide"],
      ["Himarë", "/blog/post/himara-dhermi-travel-guide"],
      ["Berat", "/blog/post/berat-travel-guide"],
      ["Gjirokastër", "/blog/post/gjirokaster-travel-guide"],
      ["Shkodër", "/blog/post/shkodra-travel-guide"],
      ["Theth", "/blog/post/theth-national-park-guide"],
      ["Albanian Riviera", "/blog/post/the-albanian-riviera-travel-guide"],
      ["Explore All →", "/blog/travel"],
    ],
  },
  {
    title: "Plan your trip",
    links: [
      ["Albania Trip Planner", "/search"],
      ["Itineraries", "/blog/post/7-days-in-albania-itinerary"],
      ["Road Trips", "/blog/post/albania-north-to-south-road-trip"],
      ["Best Time to Visit", "/blog/post/best-time-to-visit-albania"],
      ["Travel Budget Calculator", "/blog/post/budget-guide-for-a-trip-to-albania"],
      ["Albania Travel Guide", "/blog/post/first-trip-to-albania-a-beginners-guide"],
    ],
  },
  {
    title: "Stay",
    links: [
      ["Hotels", "/blog/travel"],
      ["Villas & Apartments", "/blog/travel"],
      ["Best Areas to Stay", "/blog/travel"],
      ["Family-Friendly Stays", "/blog/travel"],
      ["Luxury Stays", "/blog/luxury"],
    ],
  },
  {
    title: "Get around",
    links: [
      ["Car Rental", "/blog/cars"],
      ["Airport Transfers", "/blog/post/airport-transfer-guide-in-albania"],
      ["Buses & Minibuses", "/blog/post/intercity-buses-minibuses-in-albania"],
      ["Ferries", "/blog/post/komani-lake-ferry-boat-trip"],
      ["Flights", "/blog/travel"],
      ["Driving in Albania", "/blog/post/traffic-rules-in-albania"],
    ],
  },
  {
    title: "Do & experience",
    links: [
      ["Beaches", "/blog/post/the-best-beaches-in-albania"],
      ["Restaurants", "/blog/food"],
      ["Tours & Experiences", "/blog/post/best-boat-yacht-tours-in-albania"],
      ["Nightlife", "/blog/travel"],
      ["Outdoor & Adventure", "/blog/post/nature-adventure-tourism-in-albania"],
      ["Culture & History", "/blog/post/unesco-world-heritage-sites-in-albania"],
      ["Events", "/blog/post/festivals-events-calendar-in-albania"],
    ],
  },
  {
    title: "Quick links",
    links: [
      ["🇦🇱 Albania Map", "/directory"],
      ["🇦🇱 Albania Right Now", "/"],
      ["Ask Albania →", "/search"],
    ],
  },
];

export function SiteNav() {
  const { tr } = useLang();
  const nav = tr.home.nav;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const label = (k: NavKey) => nav[k];

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur"
      onMouseLeave={() => setMega(false)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex select-none items-center gap-2" aria-label="Shqipëri.org">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Albanian_eagle.png" alt="" className="h-7 w-7 object-contain" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Shqipëri.<span className="text-flag-red">org</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((l) =>
            l.mega ? (
              <button
                key={l.key}
                type="button"
                onMouseEnter={() => setMega(true)}
                onClick={() => setMega(true)}
                aria-expanded={mega}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  mega ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {label(l.key)}
                <Caret open={mega} />
              </button>
            ) : (
              <Link
                key={l.key}
                href={l.href}
                onMouseEnter={() => setMega(false)}
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {label(l.key)}
                <Caret />
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label={tr.search}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 sm:inline-flex"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
          <LangToggle />
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <SparkleIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{nav.ask}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span className="text-base leading-none">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* VISIT mega menu (desktop) */}
      {mega && (
        <div className="absolute inset-x-0 top-full hidden border-t border-slate-200 bg-white shadow-xl lg:block">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-3 xl:col-span-9">
                {VISIT_COLUMNS.map((col) => (
                  <div key={col.title}>
                    <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      {col.title}
                    </p>
                    <ul className="space-y-1">
                      {col.links.map(([text, href]) => (
                        <li key={text}>
                          <Link
                            href={href}
                            onClick={() => setMega(false)}
                            className="block rounded py-1 text-sm text-slate-600 transition-colors hover:text-blue-600"
                          >
                            {text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Link
                href="/blog/post/the-albanian-riviera-travel-guide"
                onClick={() => setMega(false)}
                className="group relative col-span-12 hidden overflow-hidden rounded-2xl xl:col-span-3 xl:block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/imagesalbania/dhermi.jpg"
                  alt="Albanian Riviera"
                  className="h-full min-h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">
                    Featured
                  </p>
                  <p className="mt-1 text-lg font-bold leading-tight text-white">
                    Discover the Albanian Riviera →
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {NAV.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                {label(l.key)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Caret({ open }: { open?: boolean }) {
  return (
    <svg
      className={`h-3 w-3 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparkleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l1.6 4.3L18 8.4l-4.4 1.6L12 14.3l-1.6-4.3L6 8.4l4.4-1.6L12 2.5z" />
      <path d="M18.5 13l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" opacity=".7" />
    </svg>
  );
}
