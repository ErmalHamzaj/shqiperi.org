import Anthropic from "@anthropic-ai/sdk";
import { type NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const MODEL = process.env.SHQIPERI_MODEL || "claude-haiku-4-5-20251001";

type Source = {
  title: string;
  url: string;
  age?: string;
};

// ── Tiny in-memory cache ────────────────────────────────────────────────────
// Repeated identical searches (same query + language) are served from here
// without re-hitting the API. Per server instance; clears on restart.
type CacheEntry = { answer: string; sources: Source[]; expires: number };
const CACHE = new Map<string, CacheEntry>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const CACHE_MAX = 300;

function cacheKey(lang: string, q: string): string {
  return `${lang}:${q.toLowerCase().replace(/\s+/g, " ").trim()}`;
}

function cacheGet(key: string): CacheEntry | null {
  const e = CACHE.get(key);
  if (!e) return null;
  if (Date.now() > e.expires) {
    CACHE.delete(key);
    return null;
  }
  // Refresh recency (LRU-ish): re-insert so it's newest.
  CACHE.delete(key);
  CACHE.set(key, e);
  return e;
}

function cacheSet(key: string, answer: string, sources: Source[]): void {
  if (!answer.trim()) return;
  if (CACHE.size >= CACHE_MAX) {
    const oldest = CACHE.keys().next().value;
    if (oldest) CACHE.delete(oldest);
  }
  CACHE.set(key, { answer, sources, expires: Date.now() + CACHE_TTL });
}

type Lang = "sq" | "en" | "tr" | "it" | "ar";

const LANG_INSTRUCTION: Record<Lang, string> = {
  sq: "Përgjigju GJITHMONË në gjuhën shqipe.",
  en: "ALWAYS answer in English.",
  tr: "Yanıtı HER ZAMAN Türkçe ver.",
  it: "Rispondi SEMPRE in italiano.",
  ar: "أجب دائمًا باللغة العربية.",
};

function systemPrompt(lang: Lang): string {
  const language = LANG_INSTRUCTION[lang] ?? LANG_INSTRUCTION.en;
  return [
    "You are Shqipëri — an expert guide and encyclopedia for Albania, Albanians, and the Albanian world (including Kosovo, the diaspora, Arbëresh communities, and Albanian language and culture).",
    "IMPORTANT: Never describe yourself as an AI, assistant, chatbot, language model, or 'artificial intelligence'. Never say phrases like 'as an AI' or 'I am an AI'. Do not mention how the answer is generated. Simply present the information directly and confidently, as an authoritative Albania resource.",
    "You have access to web search. Use it to ground every factual answer in current, reliable sources. Prefer Albanian and reputable international sources.",
    "Areas you cover in depth: Albanian news and current events; Albanian businesses; investing in Albania; buying property in Albania; the best investment centers; renting a car, home, villa, land, or other services in Albania; investment risk factors; tourism, travel, history, culture, language and cuisine.",
    "BE CONCISE AND FAST. Keep answers SHORT — usually 2–4 sentences, or 3–5 tight bullet points for lists. Lead with the direct answer in the first sentence. No preamble, no filler, no repetition, no long wind-ups. Only add a detail if it is essential to the answer.",
    "For practical, business, investment, property, and rental questions: give a few concrete, actionable points (key steps, typical costs as dated ranges, useful institutions). Keep it brief.",
    "Be accurate; if something is uncertain, say so briefly. Never invent facts, statistics, prices, phone numbers, company names, or URLs.",
    "Do not include a 'Sources' list in your text — the interface renders sources separately.",
    language,
  ].join("\n");
}

function sse(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  let body: { q?: string; lang?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const query = (body.q || "").toString().trim().slice(0, 500);
  const allowed: Lang[] = ["sq", "en", "tr", "it", "ar"];
  const lang: Lang = allowed.includes(body.lang as Lang)
    ? (body.lang as Lang)
    : "sq";

  if (!query) {
    return new Response("Missing query", { status: 400 });
  }

  const encoder = new TextEncoder();
  const key = cacheKey(lang, query);

  // Cache hit → replay the stored answer, no API call.
  const cached = cacheGet(key);
  if (cached) {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(sse({ type: "text", text: cached.answer })),
        );
        controller.enqueue(
          encoder.encode(sse({ type: "sources", sources: cached.sources })),
        );
        controller.enqueue(encoder.encode(sse({ type: "done" })));
        controller.close();
      },
    });
    return new Response(stream, { headers: sseHeaders("HIT") });
  }

  // Graceful fallback when no key is configured, so the UI still works in dev.
  if (!apiKey) {
    const stream = new ReadableStream({
      start(controller) {
        const msg =
          lang === "sq"
            ? "⚠️ Çelësi i API-t (ANTHROPIC_API_KEY) nuk është vendosur. Shto çelësin në skedarin .env.local për të aktivizuar kërkimin.\n\nKy është një mesazh demonstrimi për pyetjen: "
            : "⚠️ The API key (ANTHROPIC_API_KEY) is not set. Add it to .env.local to enable search.\n\nThis is a demo message for your query: ";
        controller.enqueue(encoder.encode(sse({ type: "text", text: msg })));
        controller.enqueue(
          encoder.encode(sse({ type: "text", text: `"${query}"` })),
        );
        controller.enqueue(encoder.encode(sse({ type: "sources", sources: [] })));
        controller.enqueue(encoder.encode(sse({ type: "done" })));
        controller.close();
      },
    });
    return new Response(stream, { headers: sseHeaders() });
  }

  const client = new Anthropic({ apiKey });

  const stream = new ReadableStream({
    async start(controller) {
      const send = (d: unknown) =>
        controller.enqueue(encoder.encode(sse(d)));

      try {
        const llm = client.messages.stream({
          model: MODEL,
          max_tokens: 700,
          system: systemPrompt(lang),
          messages: [{ role: "user", content: query }],
          tools: [
            {
              type: "web_search_20250305",
              name: "web_search",
              max_uses: 1,
            },
          ],
        });

        let full = "";
        for await (const event of llm) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            full += event.delta.text;
            send({ type: "text", text: event.delta.text });
          }
        }

        const final = await llm.finalMessage();
        const sources = extractSources(final);
        cacheSet(key, full, sources);
        send({ type: "sources", sources });
        send({ type: "done" });
      } catch (err) {
        console.error("[search] error:", err);
        send({
          type: "error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: sseHeaders() });
}

function sseHeaders(cache: "HIT" | "MISS" = "MISS") {
  return {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Cache": cache,
  };
}

/** Pull unique web-search results (and citation targets) out of the final message. */
function extractSources(msg: Anthropic.Messages.Message): Source[] {
  const seen = new Set<string>();
  const sources: Source[] = [];

  const add = (url?: string, title?: string, age?: string) => {
    if (!url || seen.has(url)) return;
    seen.add(url);
    sources.push({
      url,
      title: title?.trim() || hostOf(url),
      age,
    });
  };

  for (const block of msg.content as any[]) {
    if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
      for (const r of block.content) {
        if (r.type === "web_search_result") {
          add(r.url, r.title, r.page_age);
        }
      }
    }
    // Citations attached to text blocks (cited sources take priority visually).
    if (block.type === "text" && Array.isArray(block.citations)) {
      for (const c of block.citations) {
        if (c.type === "web_search_result_location") {
          add(c.url, c.title);
        }
      }
    }
  }

  return sources.slice(0, 12);
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
