import type { Lang } from "./i18n";

export type Pitch = { title: string; body: string; cta: string };

// Category-specific concierge offers (sq + en). Other languages fall back to
// the generic translated CTA (returns null below).
const PITCHES: Record<string, { sq: Pitch; en: Pitch }> = {
  "tour-guides": {
    en: {
      title: "Want a personalized tour designed by our local agents?",
      body: "Tell us your dates and interests — we'll build a custom Albania itinerary just for you.",
      cta: "Plan my tour — free",
    },
    sq: {
      title: "Doni një turë të personalizuar nga agjentët tanë vendas?",
      body: "Na tregoni datat dhe interesat — ju ndërtojmë një itinerar në Shqipëri sipas dëshirës.",
      cta: "Planifiko turën time — falas",
    },
  },
  "boat-yacht": {
    en: {
      title: "Want a private boat or yacht trip arranged for you?",
      body: "Tell us your dates and group size — we'll book the best boat on the Riviera for you.",
      cta: "Arrange my boat trip — free",
    },
    sq: {
      title: "Doni një udhëtim privat me varkë ose jaht?",
      body: "Na tregoni datat dhe numrin e personave — rezervojmë varkën më të mirë në Riviera.",
      cta: "Organizo udhëtimin — falas",
    },
  },
  "buy-property": {
    en: {
      title: "Want a curated list of properties that fit your budget?",
      body: "Tell us your budget and area — we'll send you the best available properties in Albania.",
      cta: "Get my property list — free",
    },
    sq: {
      title: "Doni një listë pronash sipas buxhetit tuaj?",
      body: "Na tregoni buxhetin dhe zonën — ju dërgojmë pronat më të mira në dispozicion në Shqipëri.",
      cta: "Merr listën e pronave — falas",
    },
  },
  "rent-home": {
    en: {
      title: "Want handpicked rentals for your budget and dates?",
      body: "Tell us your budget, area and dates — we'll send matching homes available now.",
      cta: "Get my rental list — free",
    },
    sq: {
      title: "Doni banesa të përzgjedhura sipas buxhetit dhe datave?",
      body: "Na tregoni buxhetin, zonën dhe datat — ju dërgojmë shtëpitë që përputhen, në dispozicion tani.",
      cta: "Merr listën e banesave — falas",
    },
  },
  "rent-villa": {
    en: {
      title: "Want handpicked villas for your dates?",
      body: "Tell us your budget and dates — we'll send available villas across Albania.",
      cta: "Get my villa list — free",
    },
    sq: {
      title: "Doni vila të përzgjedhura për datat tuaja?",
      body: "Na tregoni buxhetin dhe datat — ju dërgojmë vilat në dispozicion në Shqipëri.",
      cta: "Merr listën e vilave — falas",
    },
  },
  "rent-car": {
    en: {
      title: "Want the best cars available for your dates?",
      body: "Tell us your dates and pickup point (airport included) — we'll send the best cars available now.",
      cta: "See available cars — free",
    },
    sq: {
      title: "Doni makinat më të mira në dispozicion për datat tuaja?",
      body: "Na tregoni datat dhe vendin e marrjes (përfshirë aeroportin) — ju dërgojmë makinat në dispozicion tani.",
      cta: "Shiko makinat në dispozicion — falas",
    },
  },
  "taxi-transfers": {
    en: {
      title: "Want a private driver booked for your route?",
      body: "Tell us your route and time — we'll arrange a reliable driver or airport transfer.",
      cta: "Book my transfer — free",
    },
    sq: {
      title: "Doni një shofer privat për rrugën tuaj?",
      body: "Na tregoni rrugën dhe orarin — organizojmë një transfertë të besueshme.",
      cta: "Rezervo transfertën — falas",
    },
  },
  "rent-helicopter": {
    en: {
      title: "Want a helicopter charter arranged?",
      body: "Tell us your route and date — we'll arrange your flight.",
      cta: "Arrange my flight — free",
    },
    sq: {
      title: "Doni të organizoni një fluturim me helikopter?",
      body: "Na tregoni rrugën dhe datën — organizojmë fluturimin tuaj.",
      cta: "Organizo fluturimin — falas",
    },
  },
  lawyer: {
    en: {
      title: "Want us to match you with the right lawyer?",
      body: "Tell us about your case — we'll connect you with the best-fit lawyer in Albania.",
      cta: "Find my lawyer — free",
    },
    sq: {
      title: "Doni t'ju lidhim me avokatin e duhur?",
      body: "Na tregoni çështjen tuaj — ju lidhim me avokatin më të përshtatshëm në Shqipëri.",
      cta: "Gjej avokatin — falas",
    },
  },
  accountants: {
    en: {
      title: "Want the right accountant for your business?",
      body: "Tell us your needs — we'll match you with a trusted accountant or tax advisor.",
      cta: "Find my accountant — free",
    },
    sq: {
      title: "Doni kontabilistin e duhur për biznesin tuaj?",
      body: "Na tregoni nevojat — ju lidhim me një kontabilist ose këshilltar taksash të besuar.",
      cta: "Gjej kontabilistin — falas",
    },
  },
  banks: {
    en: {
      title: "Want help choosing the best bank or loan?",
      body: "Tell us what you need — we'll guide you to the right bank, account or loan in Albania.",
      cta: "Get guidance — free",
    },
    sq: {
      title: "Doni ndihmë për të zgjedhur bankën ose kredinë?",
      body: "Na tregoni çfarë ju nevojitet — ju udhëzojmë te banka, llogaria ose kredia e duhur.",
      cta: "Merr këshillë — falas",
    },
  },
  invest: {
    en: {
      title: "Want a tailored plan to invest in Albania?",
      body: "Tell us your goals and budget — we'll guide your investment step by step.",
      cta: "Get my plan — free",
    },
    sq: {
      title: "Doni një plan të posaçëm për të investuar në Shqipëri?",
      body: "Na tregoni qëllimet dhe buxhetin — ju udhëzojmë investimin hap pas hapi.",
      cta: "Merr planin tim — falas",
    },
  },
};

export function getPitch(categoryId: string | null, lang: Lang): Pitch | null {
  if (!categoryId) return null;
  const p = PITCHES[categoryId];
  if (!p) return null;
  if (lang === "sq") return p.sq;
  if (lang === "en") return p.en;
  return null; // other languages use the generic translated CTA
}
