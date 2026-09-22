import { type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type NewsItem = { title: string; url: string; source?: string; ts?: number };
type NewsSource = { name: string; url: string };

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

/**
 * Albanian-language sources aggregated for the "Lajme" feed.
 * Only feeds that are reachable server-side are listed — several outlets
 * (Gazeta Express, Top Channel, Syri, Koha, Panorama, Nacionale, Ora News)
 * block server requests via Cloudflare and can't be fetched reliably.
 */
const ALB_FEEDS: NewsSource[] = [
  { name: "Telegrafi", url: "https://telegrafi.com/feed/" },
  { name: "Euronews Albania", url: "https://euronews.al/feed/" },
  { name: "BalkanWeb", url: "https://www.balkanweb.com/feed/" },
  { name: "Bota Sot", url: "https://www.botasot.info/rss/" },
  { name: "ABC News", url: "https://abcnews.al/feed/" },
  { name: "Lajmpress", url: "https://lajmpress.org/feed/" },
];

// English source (single, HTML scrape of the Albania tag page).
const EN_SOURCE = {
  name: "Euronews",
  url: "https://www.euronews.com/tag/albania",
  origin: "https://www.euronews.com",
  match: /^\/[a-z-]+\/20\d\d\/\d\d\/\d\d\/[a-z0-9-]+/i,
};

export async function GET(req: NextRequest) {
  // Albanian UI → aggregated Albanian-language feeds.
  // Every other UI language → English Albania coverage (Euronews).
  const isAlbanian = req.nextUrl.searchParams.get("lang") === "sq";
  return isAlbanian ? handleAlbanian() : handleEnglish();
}

const jsonHeaders = {
  "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800",
};

/** Aggregate every reachable Albanian feed, merge, dedupe, sort by date. */
async function handleAlbanian() {
  const results = await Promise.allSettled(
    ALB_FEEDS.map((f) => fetchFeed(f)),
  );

  const seenUrl = new Set<string>();
  const seenTitle = new Set<string>();
  const merged: NewsItem[] = [];

  for (const r of results) {
    if (r.status !== "fulfilled") continue;
    for (const item of r.value) {
      const titleKey = item.title.toLowerCase().replace(/\s+/g, " ").trim();
      if (seenUrl.has(item.url) || seenTitle.has(titleKey)) continue;
      seenUrl.add(item.url);
      seenTitle.add(titleKey);
      merged.push(item);
    }
  }

  merged.sort((a, b) => (b.ts ?? 0) - (a.ts ?? 0));

  return Response.json(
    {
      source: { name: "Burime shqiptare", url: "" },
      items: merged.slice(0, 40),
    },
    { headers: jsonHeaders },
  );
}

async function fetchFeed(feed: NewsSource): Promise<NewsItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "application/rss+xml, text/xml, */*" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml, feed.name);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

async function handleEnglish() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    const res = await fetch(EN_SOURCE.url, {
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "text/html" },
      next: { revalidate: 600 },
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const items = extractArticles(html, EN_SOURCE.origin, EN_SOURCE.match);
    return Response.json(
      { source: { name: EN_SOURCE.name, url: EN_SOURCE.url }, items },
      { headers: jsonHeaders },
    );
  } catch (err) {
    return Response.json({
      source: { name: EN_SOURCE.name, url: EN_SOURCE.url },
      items: [] as NewsItem[],
      error: err instanceof Error ? err.message : "fetch failed",
    });
  }
}

/** Parse an RSS feed into news items, tagged with the source name. */
function parseRss(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRe = /<item\b[\s\S]*?<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[0];
    const title = decode(tagContent(block, "title"));
    const link = tagContent(block, "link").trim();
    const pub = tagContent(block, "pubDate");
    const ts = pub ? Date.parse(pub) || 0 : 0;
    if (title.length >= 15 && /^https?:\/\//.test(link)) {
      items.push({ title: truncate(title, 140), url: link, source, ts });
    }
    if (items.length >= 15) break;
  }
  return items;
}

function tagContent(block: string, tag: string): string {
  const m = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i").exec(block);
  if (!m) return "";
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

/** Pull anchor tags whose href matches the source's article pattern. */
function extractArticles(html: string, origin: string, match: RegExp): NewsItem[] {
  const byUrl = new Map<string, string>();
  const re = /<a\b([^>]*?)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi;

  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const href = m[2] ?? "";
    if (!match.test(href)) continue;

    const attrs = (m[1] ?? "") + " " + (m[3] ?? "");
    const aria = /(?:aria-label|title)=["']([^"']+)["']/i.exec(attrs)?.[1] ?? "";
    const text = cleanText(m[4] ?? "");
    const title = decode(pick(aria, text));

    if (title.length < 20 || title.length > 200) continue;
    if (title.split(/\s+/).length < 3) continue;

    const full = href.startsWith("http")
      ? href
      : origin + (href.startsWith("/") ? href : "/" + href);

    const prev = byUrl.get(full);
    if (!prev || title.length > prev.length) byUrl.set(full, title);
  }

  return Array.from(byUrl.entries())
    .slice(0, 12)
    .map(([url, title]) => ({ url, title: truncate(title, 120) }));
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

function cleanText(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function pick(a: string, b: string): string {
  const ca = cleanText(a);
  return ca.length >= b.length ? ca : b;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .trim();
}
