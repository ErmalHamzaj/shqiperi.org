import Anthropic from "@anthropic-ai/sdk";
import { type NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const MODEL = process.env.SHQIPERI_MODEL || "claude-haiku-4-5-20251001";

type Lang = "sq" | "en" | "tr" | "it" | "ar";

type Result = {
  title: string;
  url: string;
  rating?: string;
  snippet?: string;
};
type SearchPayload = { albania: boolean; results: Result[] };

// ── Tiny in-memory cache ────────────────────────────────────────────────────
type CacheEntry = { payload: SearchPayload; expires: number };
const CACHE = new Map<string, CacheEntry>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const CACHE_MAX = 300;

function cacheKey(lang: string, q: string): string {
  return `${lang}:${q.toLowerCase().replace(/\s+/g, " ").trim()}`;
}
function cacheGet(key: string): SearchPayload | null {
  const e = CACHE.get(key);
  if (!e) return null;
  if (Date.now() > e.expires) {
    CACHE.delete(key);
    return null;
  }
  CACHE.delete(key);
  CACHE.set(key, e);
  return e.payload;
}
function cacheSet(key: string, payload: SearchPayload): void {
  if (CACHE.size >= CACHE_MAX) {
    const oldest = CACHE.keys().next().value;
    if (oldest) CACHE.delete(oldest);
  }
  CACHE.set(key, { payload, expires: Date.now() + CACHE_TTL });
}

const LANG_NAME: Record<Lang, string> = {
  sq: "Albanian",
  en: "English",
  tr: "Turkish",
  it: "Italian",
  ar: "Arabic",
};

function systemPrompt(lang: Lang): string {
  return [
    "You are the search engine for Shqipëri — a search service ONLY about Albania and things located in or relevant to Albania (businesses, services, travel, property, people, news, culture, etc.).",
    "Return the TOP 4 most relevant, REAL results for the query, ranked best-first.",
    "For service or business queries (car rental, lawyers, hotels, restaurants, tour guides, real estate, clinics, etc.), return the HIGHEST-RATED providers in the relevant Albanian city — real companies with their star rating when available. Rank by rating.",
    "For places, people, topics or news, return the most relevant real pages (official sites, maps listings, reputable sources).",
    "Use web search to find real results. NEVER invent companies, URLs or ratings — only real ones from search.",
    "DO NOT explain, summarize, give instructions, or add any prose. Users know what to do. Output results only.",
    "A result's snippet is a SHORT descriptor (max ~10 words) — e.g. the city, category, or one distinguishing fact. Not an explanation.",
    `Write each title and snippet in ${LANG_NAME[lang]}.`,
    "If the query is NOT about Albania or not a need in/for Albania, set albania=false and return no results.",
    "",
    "Respond with ONLY a JSON object, no markdown, no code fences, no other text:",
    '{"albania": true, "results": [{"title": "Company Name", "url": "https://...", "rating": "4.8", "snippet": "Tirana · car rental"}]}',
    "rating is optional (omit when unknown). Include at most 4 results.",
  ].join("\n");
}

function json(payload: SearchPayload, cache: "HIT" | "MISS" = "MISS") {
  return Response.json(payload, {
    headers: { "Cache-Control": "no-store", "X-Cache": cache },
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  let body: { q?: string; lang?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const query = (body.q || "").toString().trim().slice(0, 300);
  const allowed: Lang[] = ["sq", "en", "tr", "it", "ar"];
  const lang: Lang = allowed.includes(body.lang as Lang) ? (body.lang as Lang) : "sq";
  if (!query) return new Response("Missing query", { status: 400 });

  const key = cacheKey(lang, query);
  const cached = cacheGet(key);
  if (cached) return json(cached, "HIT");

  if (!apiKey) {
    return json({
      albania: true,
      results: [
        {
          title: "ANTHROPIC_API_KEY not set",
          url: "https://console.anthropic.com/",
          snippet: "Add the key to .env.local to enable search results.",
        },
      ],
    });
  }

  const client = new Anthropic({ apiKey });

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 900,
      system: systemPrompt(lang),
      messages: [{ role: "user", content: query }],
      tools: [
        { type: "web_search_20250305", name: "web_search", max_uses: 3 },
      ],
    });

    const text = (msg.content as any[])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    const payload = parsePayload(text);
    cacheSet(key, payload);
    return json(payload);
  } catch (err) {
    console.error("[search] error:", err);
    return Response.json(
      { albania: true, results: [], error: err instanceof Error ? err.message : "error" },
      { status: 200 },
    );
  }
}

/** Extract the JSON object from the model's reply and normalize it. */
function parsePayload(text: string): SearchPayload {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return { albania: true, results: [] };
  try {
    const raw = JSON.parse(match[0]);
    const results: Result[] = Array.isArray(raw.results)
      ? raw.results
          .filter((r: any) => r && typeof r.url === "string" && /^https?:\/\//.test(r.url))
          .slice(0, 4)
          .map((r: any) => ({
            title: String(r.title || hostOf(r.url)).slice(0, 140),
            url: r.url,
            rating: r.rating ? String(r.rating).slice(0, 8) : undefined,
            snippet: r.snippet ? String(r.snippet).slice(0, 120) : undefined,
          }))
      : [];
    return { albania: raw.albania !== false, results };
  } catch {
    return { albania: true, results: [] };
  }
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
