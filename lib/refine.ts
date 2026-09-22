import type { Lang } from "./i18n";

export type Chip = { sq: string; en: string; tr?: string; it?: string; ar?: string };

const pick = (c: Chip, lang: Lang): string => c[lang] ?? c.en;

type RefineGroup = {
  id: string;
  /** Broad trigger — when the query is about this topic. */
  trigger: RegExp;
  /** If the query already contains one of these, it's specific enough — skip. */
  specific: RegExp;
  title: Chip;
  chips: Chip[];
};

/**
 * Disambiguation groups. When a user types something broad ("rent in Albania"),
 * we offer specific follow-ups instead of guessing. Add or edit groups freely.
 */
const GROUPS: RefineGroup[] = [
  {
    id: "rent",
    trigger: /\b(rent|renting|for rent|qira|qera|me qira|marr?\s?me\s?qira)\b/i,
    specific:
      /\b(car|makin|auto|home|house|apartment|apartament|sht[ëe]pi|villa|vil[ëe]|land|tok[ëe]|office|zyr[ëe]|helicopter|helikopter|boat|varka|yacht|jaht)\b/i,
    title: { sq: "Çfarë doni të merrni me qira?", en: "What would you like to rent?" },
    chips: [
      { sq: "Makinë me qira në Shqipëri", en: "Rent a car in Albania" },
      { sq: "Shtëpi me qira në Shqipëri", en: "Rent a home in Albania" },
      { sq: "Apartament me qira në Shqipëri", en: "Rent an apartment in Albania" },
      { sq: "Vilë me qira në Shqipëri", en: "Rent a villa in Albania" },
      { sq: "Tokë me qira në Shqipëri", en: "Rent land in Albania" },
      { sq: "Helikopter me qira në Shqipëri", en: "Rent a helicopter in Albania" },
    ],
  },
  {
    id: "invest",
    trigger: /\b(invest|investing|investment|investo|investoj|investim)\b/i,
    specific:
      /\b(property|pron[ëe]|real estate|patundsh|risk|rrezik|center|qendr|business|biznes|tourism|turiz|energy|energji|agricultur|bujq)\b/i,
    title: { sq: "Si doni të investoni në Shqipëri?", en: "How do you want to invest in Albania?" },
    chips: [
      { sq: "Bli pronë në Shqipëri", en: "Buy property in Albania" },
      { sq: "Qendrat më të mira të investimit në Shqipëri", en: "Best investment centers in Albania" },
      { sq: "Mundësi biznesi në Shqipëri", en: "Business opportunities in Albania" },
      { sq: "Investime në turizëm në Shqipëri", en: "Tourism investment in Albania" },
      { sq: "Investime në energji në Shqipëri", en: "Energy investment in Albania" },
    ],
  },
  {
    id: "property",
    trigger: /\b(buy|blej|bli|property|properties|pron[ëe]|real estate|patundsh|shtepi per shitje|sht[ëe]pi p[ëe]r shitje)\b/i,
    specific:
      /\b(apartment|apartament|villa|vil[ëe]|house|sht[ëe]pi|land|tok[ëe]|commercial|komerci|office|zyr[ëe]|beach|plazh)\b/i,
    title: { sq: "Çfarë prone kërkoni të blini?", en: "What property are you looking to buy?" },
    chips: [
      { sq: "Blej apartament në Shqipëri", en: "Buy an apartment in Albania" },
      { sq: "Blej vilë në Shqipëri", en: "Buy a villa in Albania" },
      { sq: "Blej tokë në Shqipëri", en: "Buy land in Albania" },
      { sq: "Pronë komerciale në Shqipëri", en: "Commercial property in Albania" },
      { sq: "Prona buzë detit në Shqipëri", en: "Beachfront property in Albania" },
      { sq: "Zonat më të mira për të blerë pronë", en: "Best areas to buy property" },
    ],
  },
  {
    id: "business",
    trigger: /\b(business|biznes|company|kompani|start a business|hap biznes)\b/i,
    specific:
      /\b(register|regjistr|tax|taks|open|hap|directory|direktori|opportunit|mund[ëe]si|law|ligj)\b/i,
    title: { sq: "Çfarë ju intereson për biznesin?", en: "What are you interested in about business?" },
    chips: [
      { sq: "Si të hap një biznes në Shqipëri", en: "How to start a business in Albania" },
      { sq: "Regjistrimi i biznesit në Shqipëri", en: "Business registration in Albania" },
      { sq: "Taksat për bizneset në Shqipëri", en: "Business taxes in Albania" },
      { sq: "Biznese shqiptare sipas sektorit", en: "Albanian businesses by sector" },
      { sq: "Mundësi biznesi në Shqipëri", en: "Business opportunities in Albania" },
    ],
  },
];

export type Refinement = { id: string; title: string; chips: { label: string; query: string }[] };

/** Returns a refinement prompt for a broad query, or null when it's specific. */
export function getRefinement(query: string, lang: Lang): Refinement | null {
  const q = query.toLowerCase();
  for (const g of GROUPS) {
    if (g.trigger.test(q) && !g.specific.test(q)) {
      return {
        id: g.id,
        title: pick(g.title, lang),
        chips: g.chips.map((c) => ({ label: pick(c, lang), query: pick(c, lang) })),
      };
    }
  }
  return null;
}
