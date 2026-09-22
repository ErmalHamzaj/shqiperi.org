import { type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UA = "ShqiperiSearch/1.0 (https://shqiperi.org)";

type Summary = {
  title: string;
  extract: string;
  url: string;
  thumbnail?: string;
};
type Result = { title: string; snippet: string; url: string };

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim().slice(0, 300);
  const allowed = ["sq", "en", "tr", "it", "ar"];
  const raw = req.nextUrl.searchParams.get("lang") || "sq";
  const lang = allowed.includes(raw) ? raw : "sq";
  if (!q) return Response.json({ summary: null, results: [] });

  const wiki = `https://${lang}.wikipedia.org/w/api.php`;

  const [summary, results] = await Promise.all([
    fetchSummary(wiki, q),
    fetchResults(wiki, lang, q),
  ]);

  return Response.json(
    { summary, results },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}

async function fetchSummary(wiki: string, q: string): Promise<Summary | null> {
  try {
    const url =
      `${wiki}?action=query&format=json&redirects=1` +
      `&prop=extracts%7Cpageimages%7Cinfo&exintro&explaintext&exchars=600` +
      `&inprop=url&piprop=thumbnail&pithumbsize=200` +
      `&generator=search&gsrlimit=1&gsrsearch=${encodeURIComponent(q)}`;
    const data = await getJson(url);
    const pages = data?.query?.pages;
    if (!pages) return null;
    const page = pages[Object.keys(pages)[0]];
    if (!page?.extract) return null;
    return {
      title: page.title,
      extract: page.extract,
      url: page.fullurl,
      thumbnail: page.thumbnail?.source,
    };
  } catch {
    return null;
  }
}

async function fetchResults(
  wiki: string,
  lang: string,
  q: string,
): Promise<Result[]> {
  try {
    const url =
      `${wiki}?action=query&format=json&list=search&srlimit=6&srprop=snippet` +
      `&srsearch=${encodeURIComponent(q)}`;
    const data = await getJson(url);
    const search = data?.query?.search ?? [];
    return search.map((s: any) => ({
      title: s.title,
      snippet: stripHtml(s.snippet || ""),
      url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(
        s.title.replace(/ /g, "_"),
      )}`,
    }));
  } catch {
    return [];
  }
}

async function getJson(url: string): Promise<any> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": UA, Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
