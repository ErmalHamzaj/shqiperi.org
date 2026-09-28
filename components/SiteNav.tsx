"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { LangToggle } from "@/components/LangToggle";

type NavKey = "visit" | "live" | "invest" | "discover" | "destinations" | "services";
const NAV: { key: NavKey; href: string }[] = [
  { key: "visit", href: "/blog/travel" },
  { key: "live", href: "/blog/living" },
  { key: "invest", href: "/blog/real-estate" },
  { key: "discover", href: "/blog" },
  { key: "destinations", href: "/#explore" },
  { key: "services", href: "/#popular" },
];

type Col = { title: string; links: [string, string][] };
type Feature = {
  kicker?: string;
  emoji?: string;
  title: string;
  desc?: string;
  cta: string;
  href: string;
  img: string;
};
type Menu = { columns: Col[]; feature: Feature };

const MENUS: Partial<Record<NavKey, Menu>> = {
  visit: {
    columns: [
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
    ],
    feature: {
      kicker: "Featured",
      title: "Discover the Albanian Riviera",
      desc: "Beaches, coves and clifftop villages along Albania's southern coast.",
      cta: "Explore the Riviera →",
      href: "/blog/post/the-albanian-riviera-travel-guide",
      img: "/imagesalbania/dhermi.jpg",
    },
  },
  live: {
    columns: [
      {
        title: "Live in Albania",
        links: [
          ["Cost of Living", "/blog/living"],
          ["Rent a Home", "/blog/real-estate"],
          ["Buy a Home", "/blog/real-estate"],
          ["Best Places to Live", "/blog/living"],
          ["Life in Albania", "/blog/living"],
          ["Moving to Albania", "/blog/living"],
        ],
      },
      {
        title: "Residency",
        links: [
          ["Residence Permits", "/blog/immigration"],
          ["Digital Nomad", "/blog/immigration"],
          ["Family Residency", "/blog/immigration"],
          ["Citizenship", "/blog/immigration"],
          ["Visa Information", "/blog/immigration"],
          ["Documents & Requirements", "/blog/immigration"],
        ],
      },
      {
        title: "Daily life",
        links: [
          ["Healthcare", "/blog/living"],
          ["Schools & Education", "/blog/living"],
          ["Banks & Banking", "/blog/living"],
          ["SIM & Internet", "/blog/living"],
          ["Utilities", "/blog/living"],
          ["Transport", "/blog/living"],
        ],
      },
      {
        title: "Find services",
        links: [
          ["Real Estate Agents", "/directory"],
          ["Lawyers", "/directory"],
          ["Accountants", "/directory"],
          ["Doctors & Clinics", "/directory"],
          ["Schools", "/directory"],
          ["Relocation Services", "/directory"],
        ],
      },
      {
        title: "Quick links",
        links: [
          ["Albania Cost Calculator", "/search"],
          ["Residence Eligibility", "/search"],
          ["Property Search", "/blog/real-estate"],
          ["🇦🇱 Albania Map", "/directory"],
          ["Ask Albania →", "/search"],
        ],
      },
    ],
    feature: {
      emoji: "🏠",
      title: "Thinking about moving to Albania?",
      desc: "Explore cities, costs, housing and everything you need to settle in.",
      cta: "Explore Living →",
      href: "/blog/living",
      img: "/imagesalbania/tirana2.webp",
    },
  },
  invest: {
    columns: [
      {
        title: "Property",
        links: [
          ["Buy Property", "/blog/real-estate"],
          ["Property for Sale", "/blog/real-estate"],
          ["Commercial Property", "/blog/real-estate"],
          ["Land", "/blog/real-estate"],
          ["New Developments", "/blog/real-estate"],
          ["Property Prices", "/blog/real-estate"],
          ["Property Guide", "/blog/real-estate"],
        ],
      },
      {
        title: "Start a business",
        links: [
          ["Start a Company", "/blog"],
          ["Company Types", "/blog"],
          ["Registration", "/blog"],
          ["Costs & Taxes", "/blog"],
          ["Business Licenses", "/blog"],
          ["Accounting", "/blog"],
          ["Legal Services", "/directory"],
        ],
      },
      {
        title: "Investment",
        links: [
          ["Investment Opportunities", "/blog"],
          ["Investment Sectors", "/blog"],
          ["Tourism", "/blog/travel"],
          ["Real Estate", "/blog/real-estate"],
          ["Agriculture & Food", "/blog"],
          ["Manufacturing", "/blog"],
          ["Technology", "/blog"],
        ],
      },
      {
        title: "Business services",
        links: [
          ["Lawyers", "/directory"],
          ["Accountants", "/directory"],
          ["Banks & Finance", "/directory"],
          ["Consultants", "/directory"],
          ["Real Estate Agencies", "/directory"],
          ["Business Services", "/directory"],
        ],
      },
      {
        title: "Data & research",
        links: [
          ["Property Market", "/blog/real-estate"],
          ["Business Directory", "/directory"],
          ["Albania Business Data", "/directory"],
          ["Investment Statistics", "/directory"],
          ["Economic Indicators", "/directory"],
        ],
      },
      {
        title: "Quick links",
        links: [
          ["Investment Guide", "/blog"],
          ["Business Setup Guide", "/blog"],
          ["Property Calculator", "/search"],
          ["Ask Albania →", "/search"],
        ],
      },
    ],
    feature: {
      emoji: "💼",
      title: "Invest in Albania",
      desc: "Discover opportunities, understand the market and connect with local businesses.",
      cta: "Explore Investment →",
      href: "/blog/real-estate",
      img: "/imagesalbania/berati.png",
    },
  },
  discover: {
    columns: [
      {
        title: "Albania",
        links: [
          ["Albania Guide", "/blog"],
          ["History", "/blog"],
          ["Culture", "/blog"],
          ["People", "/blog"],
          ["Geography", "/blog"],
          ["Cities & Regions", "/#explore"],
          ["Albanian Language", "/blog"],
        ],
      },
      {
        title: "Food & lifestyle",
        links: [
          ["Albanian Cuisine", "/blog/food"],
          ["Traditional Food", "/blog/food"],
          ["Restaurants", "/blog/food"],
          ["Markets", "/blog/food"],
          ["Coffee & Cafés", "/blog/food"],
          ["Nightlife", "/blog/travel"],
        ],
      },
      {
        title: "News & current",
        links: [
          ["Albania News", "/blog"],
          ["Business News", "/blog"],
          ["Tourism News", "/blog"],
          ["Events", "/blog/post/festivals-events-calendar-in-albania"],
          ["Albania Today", "/"],
          ["Trending Now", "/blog"],
        ],
      },
      {
        title: "Know Albania",
        links: [
          ["Cost of Living", "/blog/living"],
          ["Prices", "/blog/living"],
          ["Weather", "/blog/post/best-time-to-visit-albania"],
          ["Safety", "/blog"],
          ["Useful Information", "/blog"],
          ["FAQs", "/blog"],
        ],
      },
      {
        title: "Explore",
        links: [
          ["Photo Gallery", "/blog"],
          ["Videos", "/blog"],
          ["Stories", "/blog"],
          ["Local Guides", "/blog"],
          ["Ask Locals", "/search"],
          ["Albania Map", "/directory"],
        ],
      },
      {
        title: "Quick links",
        links: [
          ["🇦🇱 Albania Right Now", "/"],
          ["📊 Albania Data", "/directory"],
          ["🗺️ Explore the Map", "/directory"],
          ["Ask Albania →", "/search"],
        ],
      },
    ],
    feature: {
      emoji: "🇦🇱",
      title: "Discover Albania",
      desc: "The places, people, stories, food and information behind the country.",
      cta: "Discover Albania →",
      href: "/blog",
      img: "/imagesalbania/kruja.jpg",
    },
  },
  destinations: {
    columns: [
      {
        title: "Most popular",
        links: [
          ["Tirana", "/blog/post/tirana-travel-guide"],
          ["Sarandë", "/blog/post/saranda-travel-guide"],
          ["Ksamil", "/blog/post/ksamil-travel-guide"],
          ["Vlorë", "/blog/post/vlora-travel-guide"],
          ["Durrës", "/blog/travel"],
          ["Himarë", "/blog/post/himara-dhermi-travel-guide"],
          ["Berat", "/blog/post/berat-travel-guide"],
          ["Gjirokastër", "/blog/post/gjirokaster-travel-guide"],
        ],
      },
      {
        title: "Albanian Riviera",
        links: [
          ["Dhërmi", "/blog/post/himara-dhermi-travel-guide"],
          ["Himarë", "/blog/post/himara-dhermi-travel-guide"],
          ["Borsh", "/blog/post/the-albanian-riviera-travel-guide"],
          ["Qeparo", "/blog/post/the-albanian-riviera-travel-guide"],
          ["Sarandë", "/blog/post/saranda-travel-guide"],
          ["Ksamil", "/blog/post/ksamil-travel-guide"],
          ["Vlorë", "/blog/post/vlora-travel-guide"],
        ],
      },
      {
        title: "Mountains & nature",
        links: [
          ["Theth", "/blog/post/theth-national-park-guide"],
          ["Valbona", "/blog/travel"],
          ["Shkodër", "/blog/post/shkodra-travel-guide"],
          ["Korçë", "/blog/travel"],
          ["Përmet", "/blog/travel"],
          ["Llogara", "/blog/travel"],
          ["Lake Koman", "/blog/post/komani-lake-ferry-boat-trip"],
        ],
      },
      {
        title: "Cities & culture",
        links: [
          ["Tirana", "/blog/post/tirana-travel-guide"],
          ["Berat", "/blog/post/berat-travel-guide"],
          ["Gjirokastër", "/blog/post/gjirokaster-travel-guide"],
          ["Shkodër", "/blog/post/shkodra-travel-guide"],
          ["Korçë", "/blog/travel"],
          ["Krujë", "/blog/travel"],
          ["Elbasan", "/blog/travel"],
        ],
      },
      {
        title: "Plan by interest",
        links: [
          ["🏖️ Beaches", "/blog/post/the-best-beaches-in-albania"],
          ["🏔️ Mountains", "/blog/post/nature-adventure-tourism-in-albania"],
          ["🏛️ History & Culture", "/blog/post/unesco-world-heritage-sites-in-albania"],
          ["🍷 Food & Wine", "/blog/food"],
          ["👨‍👩‍👧 Family", "/blog/travel"],
          ["💎 Luxury", "/blog/luxury"],
          ["🎒 Adventure", "/blog/post/nature-adventure-tourism-in-albania"],
        ],
      },
      {
        title: "Quick",
        links: [
          ["All Destinations →", "/#explore"],
          ["Explore Albania Map →", "/directory"],
          ["Ask Albania →", "/search"],
        ],
      },
    ],
    feature: {
      kicker: "Not sure where to go?",
      title: "Where should I go?",
      desc: "Get a personalized recommendation for your trip.",
      cta: "Ask Albania →",
      href: "/search",
      img: "/imagesalbania/ksamil.jpg",
    },
  },
  services: {
    columns: [
      {
        title: "Travel services",
        links: [
          ["Car Rental", "/blog/cars"],
          ["Airport Transfers", "/blog/post/airport-transfer-guide-in-albania"],
          ["Private Drivers", "/directory"],
          ["Tours & Guides", "/blog/post/best-boat-yacht-tours-in-albania"],
          ["Boat & Yacht", "/blog/post/best-boat-yacht-tours-in-albania"],
          ["Travel Agencies", "/directory"],
          ["Travel Insurance", "/directory"],
        ],
      },
      {
        title: "Property",
        links: [
          ["Real Estate Agencies", "/directory"],
          ["Property Management", "/directory"],
          ["Property Valuation", "/directory"],
          ["Architects", "/directory"],
          ["Construction", "/directory"],
          ["Interior Design", "/directory"],
        ],
      },
      {
        title: "Business",
        links: [
          ["Lawyers", "/directory"],
          ["Accountants", "/directory"],
          ["Company Formation", "/directory"],
          ["Business Consultants", "/directory"],
          ["Translation & Notary", "/directory"],
          ["Recruitment", "/directory"],
          ["Marketing & Agencies", "/directory"],
        ],
      },
      {
        title: "Everyday life",
        links: [
          ["Doctors & Clinics", "/directory"],
          ["Dentists", "/directory"],
          ["Schools", "/directory"],
          ["Childcare", "/directory"],
          ["Banks", "/directory"],
          ["Insurance", "/directory"],
          ["Telecom & Internet", "/directory"],
        ],
      },
      {
        title: "Home & relocation",
        links: [
          ["Moving Services", "/directory"],
          ["Cleaning", "/directory"],
          ["Repairs", "/directory"],
          ["Plumbers & Electricians", "/directory"],
          ["Security", "/directory"],
          ["Furniture & Home Services", "/directory"],
        ],
      },
      {
        title: "Quick access",
        links: [
          ["Find a Service →", "/directory"],
          ["Verified Businesses →", "/directory"],
          ["Ask Albania →", "/search"],
        ],
      },
    ],
    feature: {
      kicker: "Need something?",
      title: "Tell us what you need",
      desc: "Tell us what you need in Albania and we'll help you find it.",
      cta: "Ask Albania →",
      href: "/search",
      img: "/imagesalbania/tirana.avif",
    },
  },
};

export function SiteNav() {
  const { tr } = useLang();
  const nav = tr.home.nav;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<NavKey | null>(null);
  const [openKey, setOpenKey] = useState<NavKey | null>(null);
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSub(null);
  };
  const label = (k: NavKey) => nav[k];
  const activeMenu = openKey ? MENUS[openKey] : undefined;

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur"
      onMouseLeave={() => setOpenKey(null)}
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
            MENUS[l.key] ? (
              <button
                key={l.key}
                type="button"
                onMouseEnter={() => setOpenKey(l.key)}
                onClick={() => setOpenKey(l.key)}
                aria-expanded={openKey === l.key}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  openKey === l.key ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {label(l.key)}
                <Caret open={openKey === l.key} />
              </button>
            ) : (
              <Link
                key={l.key}
                href={l.href}
                onMouseEnter={() => setOpenKey(null)}
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

      {/* Mega menu (desktop) */}
      {activeMenu && (
        <div className="absolute inset-x-0 top-full hidden border-t border-slate-200 bg-white shadow-xl lg:block">
          <div className="mx-auto flex max-h-[calc(100vh-4.5rem)] max-w-7xl gap-6 overflow-y-auto px-6 py-8 xl:gap-8">
            <div className="grid min-w-0 flex-1 grid-cols-3 gap-x-5 gap-y-8 lg:grid-cols-6">
              {activeMenu.columns.map((col) => (
                <div key={col.title} className="min-w-0">
                  <p className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-900">
                    {col.title}
                  </p>
                  <ul className="space-y-0.5">
                    {col.links.map(([text, href]) => (
                      <li key={text}>
                        <Link
                          href={href}
                          onClick={() => setOpenKey(null)}
                          className="block rounded py-1 text-sm leading-snug text-slate-600 transition-colors hover:text-blue-600"
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
              href={activeMenu.feature.href}
              onClick={() => setOpenKey(null)}
              className="group relative hidden w-56 shrink-0 self-stretch overflow-hidden rounded-2xl xl:block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeMenu.feature.img}
                alt=""
                className="h-full min-h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                {activeMenu.feature.kicker && (
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">
                    {activeMenu.feature.kicker}
                  </p>
                )}
                <p className="mt-1 text-lg font-bold leading-tight text-white">
                  {activeMenu.feature.emoji ? `${activeMenu.feature.emoji} ` : ""}
                  {activeMenu.feature.title}
                </p>
                {activeMenu.feature.desc && (
                  <p className="mt-1.5 text-sm leading-snug text-white/85">{activeMenu.feature.desc}</p>
                )}
                <p className="mt-3 text-sm font-semibold text-white">{activeMenu.feature.cta}</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* mobile menu */}
      {mobileOpen && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {NAV.map((l) => {
              const menu = MENUS[l.key];
              if (!menu) {
                return (
                  <Link
                    key={l.key}
                    href={l.href}
                    onClick={closeMobile}
                    className="border-b border-slate-100 px-2 py-3 text-sm font-semibold text-slate-900 last:border-0"
                  >
                    {label(l.key)}
                  </Link>
                );
              }
              const expanded = mobileSub === l.key;
              return (
                <div key={l.key} className="border-b border-slate-100 last:border-0">
                  <button
                    type="button"
                    onClick={() => setMobileSub(expanded ? null : l.key)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between px-2 py-3 text-sm font-semibold text-slate-900"
                  >
                    {label(l.key)}
                    <Caret open={expanded} />
                  </button>
                  {expanded && (
                    <div className="pb-3">
                      {menu.columns.map((col) => (
                        <div key={col.title} className="mb-3">
                          <p className="px-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                            {col.title}
                          </p>
                          <div className="mt-1 flex flex-col">
                            {col.links.map(([text, href]) => (
                              <Link
                                key={text}
                                href={href}
                                onClick={closeMobile}
                                className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                              >
                                {text}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Link
                        href={menu.feature.href}
                        onClick={closeMobile}
                        className="mx-2 mt-1 block rounded-lg bg-blue-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
                      >
                        {menu.feature.cta}
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
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
