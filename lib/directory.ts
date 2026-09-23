import type { Lang } from "./i18n";

/** Per-language text; sq/en required, others optional (fall back to English). */
export type LangText = {
  sq: string;
  en: string;
  tr?: string;
  it?: string;
  ar?: string;
};

/** Resolve localized text for a language, falling back to English. */
export function localize(t: LangText, lang: Lang): string {
  return t[lang] ?? t.en;
}

export type Company = {
  name: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
  /** Short description; string or per-language. */
  note?: string | LangText;
};

export type Category = {
  id: string;
  name: LangText;
  /** When a search matches this pattern, this category's companies are shown. */
  match: RegExp;
  companies: Company[];
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  BUSINESS DIRECTORY
 *  Add the contacts/companies you collect into the `companies` arrays below.
 *  Each entry supports: name, city, phone, email, website, note.
 *
 *  Example:
 *    {
 *      name: "Auto Rent Tirana",
 *      city: "Tiranë",
 *      phone: "+355 69 000 0000",
 *      email: "info@example.com",
 *      website: "https://example.com",
 *      note: { sq: "Makina me qira 24/7", en: "Car rental 24/7" },
 *    }
 * ─────────────────────────────────────────────────────────────────────────
 */

// Reused across the property categories (rent + buy).
const century21Yllka: Company = {
  name: "Century 21 Albania — Yllka Tule",
  city: "Tiranë",
  phone: "+355 67 650 7008",
  website: "https://www.century21albania.com/en/agent/1963-yllka-tule.html",
  note: {
    sq: "Agjente pronash — qira & blerje (apartamente, vila, prona)",
    en: "Property agent — rent & buy (apartments, villas, homes)",
  },
};

const edisonLami: Company = {
  name: "Edison Lami",
  phone: "+355 68 806 5088",
  note: {
    sq: "Prona — qira & blerje (apartamente, vila, prona, tokë)",
    en: "Property — rent & buy (apartments, villas, homes, land)",
  },
};

export const CATEGORIES: Category[] = [
  {
    id: "rent-car",
    name: { sq: "Makina me qira", en: "Car rental" },
    match: /\b(cars?|makin|auto)\b.*\b(rent|rental|qira|qera)\b|\b(rent|rental|qira)\b.*\b(cars?|makin|auto)\b|araç kirala|araba kirala|kiralık ara|noleggio auto|noleggiare un.?auto|autonoleggio|تأجير سيار|استئجار سيار/i,
    companies: [
      {
        name: "Enterprise Rent-A-Car",
        city: "Shqipëri",
        website: "https://www.enterprise.com/en/car-rental-locations/al.html",
        note: {
          sq: "Makina me qira, disa lokacione në Shqipëri",
          en: "Car rental with multiple locations across Albania",
        },
      },
    ],
  },
  {
    id: "rent-home",
    name: { sq: "Shtëpi & apartamente me qira", en: "Homes & apartments for rent" },
    match: /\b(home|house|apartment|apartament|sht[ëe]pi|banes)\b.*\b(rent|qira|qera)\b|\b(rent|qira)\b.*\b(home|house|apartment|apartament|sht[ëe]pi)\b|kiralık ev|kiralık daire|affitto casa|affittare una casa|casa in affitto|استئجار منزل|إيجار منزل|استئجار شقة/i,
    companies: [century21Yllka, edisonLami],
  },
  {
    id: "rent-villa",
    name: { sq: "Vila me qira", en: "Villas for rent" },
    match: /\b(villa|vil[ëe])\b.*\b(rent|qira|qera)\b|\b(rent|qira)\b.*\b(villa|vil[ëe])\b|kiralık villa|affitto villa|villa in affitto|استئجار فيلا/i,
    companies: [century21Yllka, edisonLami],
  },
  {
    id: "rent-land",
    name: { sq: "Tokë me qira", en: "Land for rent" },
    match: /\b(land|tok[ëe])\b.*\b(rent|qira|qera)\b|\b(rent|qira)\b.*\b(land|tok[ëe])\b/i,
    companies: [edisonLami],
  },
  {
    id: "rent-helicopter",
    name: { sq: "Helikopter me qira", en: "Helicopter charter" },
    match: /\b(helicopter|helikopter|heliski|heli)\b|elicottero|هليكوبتر|مروحية/i,
    companies: [
      {
        name: "VIVA Helicopters",
        city: "Tiranë",
        phone: "+355 69 202 0002",
        email: "fly@vivahelicopters.com",
        website: "https://www.vivahelicopters.com/",
        note: {
          sq: "Fluturime turistike, VIP, heliski, foto/filmim, shërbime ajrore",
          en: "Flightseeing, VIP, heliski, photo/film and air services",
        },
      },
    ],
  },
  {
    id: "buy-property",
    name: { sq: "Blerje pronash", en: "Buy property" },
    match: /\b(buy|blej|bli)\b.*\b(property|pron[ëe]|apartment|apartament|villa|vil[ëe]|land|tok[ëe]|house|sht[ëe]pi)\b|\breal estate\b|\bpatundsh|mülk satın al|ev satın al|emlak|gayrimenkul|comprare casa|acquistare casa|immobiliare|شراء عقار|شراء منزل|عقارات/i,
    companies: [century21Yllka, edisonLami],
  },
  {
    id: "tour-guides",
    name: { sq: "Guida turistike", en: "Tour guides" },
    match: /\b(tour guide|tour guides|guided tour|guida|guid[ëe]|udh[ëe]rr[ëe]fyes|sightseeing|tura turistike|ekskursion|komani|shala)\b|tur rehber|gezi rehber|guida turistica|دليل سياحي|مرشد سياحي|جولة سياحية/i,
    companies: [
      {
        name: "Komani Guide",
        city: "Koman, Vau i Dejës",
        phone: "+355 68 386 2527",
        email: "komaniguide1@gmail.com",
        website: "https://komaniguide.com/",
        note: {
          sq: "Tura me varkë në Liqenin e Komanit, Lumi i Shalës, Alpet Shqiptare",
          en: "Komani Lake boat tours, Shala River, Albanian Alps",
        },
      },
      {
        name: "Albanian Tour Guide",
        city: "Durrës / Tiranë",
        phone: "+355 69 794 1693",
        email: "albaniantourguide8@gmail.com",
        website: "https://albaniantourguide.com/",
        note: {
          sq: "Tura me guidë në të gjithë Shqipërinë, ekskursione ditore",
          en: "Guided tours across Albania, day trips",
        },
      },
    ],
  },
  {
    id: "lawyer",
    name: { sq: "Avokatë & shërbime ligjore", en: "Lawyers & legal services" },
    match: /\b(lawyers?|attorneys?|legal|law firm|avokat|jurist|juridik|ligjor|noter|kontrat)\b|avukat|avvocato|legale|محامي|محاماة|قانوني/i,
    companies: [
      {
        name: "Av. Anxhela Lami",
        city: "Shqipëri",
        phone: "+355 68 806 5055",
        note: {
          sq: "Avokate — shërbime ligjore, kontrata, prona, biznes",
          en: "Lawyer — legal services, contracts, property, business",
        },
      },
    ],
  },
  {
    id: "invest",
    name: { sq: "Investime në Shqipëri", en: "Invest in Albania" },
    match: /\b(invest|investo|investim|investment)\b|yatırım|investire|investimento|استثمار/i,
    companies: [],
  },
  {
    id: "investment-centers",
    name: { sq: "Qendra investimi", en: "Investment centers" },
    match: /\b(investment center|qendr[ae] (e|të) investim)\b/i,
    companies: [],
  },
  {
    id: "business",
    name: { sq: "Biznese shqiptare", en: "Albanian businesses" },
    match: /\b(business|biznes|compan|kompani)\b|işletme|şirket|aziend|impresa|شركات|أعمال/i,
    companies: [],
  },
];

/** First category whose pattern matches the query (with companies to show). */
export function matchCategory(query: string): Category | null {
  for (const c of CATEGORIES) {
    if (c.match.test(query)) return c;
  }
  return null;
}

export function companyNote(c: Company, lang: Lang): string | undefined {
  if (!c.note) return undefined;
  return typeof c.note === "string" ? c.note : localize(c.note, lang);
}

export type Featured = { company: Company; category: string; query: string };

/** A curated set of real listed businesses to showcase on the home page. */
export function getFeatured(lang: Lang, limit = 6): Featured[] {
  const order = ["buy-property", "rent-car", "rent-helicopter", "tour-guides", "lawyer"];
  const seen = new Set<string>();
  const out: Featured[] = [];
  for (const id of order) {
    const cat = CATEGORIES.find((c) => c.id === id);
    if (!cat) continue;
    for (const company of cat.companies) {
      if (seen.has(company.name)) continue;
      seen.add(company.name);
      out.push({
        company,
        category: localize(cat.name, lang),
        query: localize(cat.name, lang),
      });
      if (out.length >= limit) return out;
    }
  }
  return out;
}
