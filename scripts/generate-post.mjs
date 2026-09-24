#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  BLOG POST GENERATOR  (autonomous, auto-publishing)
 *  Picks the next "pending" topic from content/blog/queue.json, writes a
 *  warm, human, multilingual article (canonical in the source language, then
 *  translated to the other four) and PUBLISHES it immediately.
 *
 *    node scripts/generate-post.mjs            one next pending topic
 *    node scripts/generate-post.mjs --id <id>  a specific topic
 *    node scripts/generate-post.mjs --force    overwrite an existing file
 *
 *  For the whole queue, use scripts/run-queue.mjs.
 * ─────────────────────────────────────────────────────────────────────────
 */
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";

const ROOT = process.cwd();
const QUEUE_PATH = path.join(ROOT, "content", "blog", "queue.json");
const POSTS_DIR = path.join(ROOT, "content", "blog", "posts");

export const LANG_NAME = { sq: "Albanian", en: "English", tr: "Turkish", it: "Italian", ar: "Arabic (Modern Standard Arabic)" };
const ALL_LANGS = ["sq", "en", "tr", "it", "ar"];

// ── env ─────────────────────────────────────────────────────────────────────
export function loadEnv() {
  if (process.env.ANTHROPIC_API_KEY) return;
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

// ── helpers ───────────────────────────────────────────────────────────────
const TR_MAP = { ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u", ë: "e", Ë: "e" };
function slugify(s) {
  return s
    .replace(/[çÇğĞıİöÖşŞüÜëË]/g, (c) => TR_MAP[c] || c)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Remove em/en dashes: keep number ranges as hyphens, turn the rest into commas. */
function stripDashes(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/(\d)\s*[–—]\s*(\d)/g, "$1-$2")
    .replace(/\s*[–—]\s*/g, ", ");
}
function cleanFields(obj) {
  for (const k of Object.keys(obj)) if (typeof obj[k] === "string") obj[k] = stripDashes(obj[k]);
  return obj;
}

// Escape raw control characters (newlines, tabs, etc.) that appear INSIDE JSON
// string literals, so JSON.parse accepts model output that left them unescaped.
function escapeStringControls(s) {
  let out = "";
  let inStr = false;
  let esc = false;
  for (const ch of s) {
    if (esc) { out += ch; esc = false; continue; }
    if (ch === "\\") { out += ch; esc = true; continue; }
    if (ch === '"') { inStr = !inStr; out += ch; continue; }
    if (inStr && ch.charCodeAt(0) < 0x20) {
      out += "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0");
      continue;
    }
    out += ch;
  }
  return out;
}

function extractJson(text) {
  let t = text.trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) t = fence[1].trim();
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in model reply");
  return JSON.parse(escapeStringControls(t.slice(start, end + 1)));
}

async function ask(client, model, system, user, maxTokens) {
  const msg = await client.messages.create({
    model, max_tokens: maxTokens, system,
    messages: [{ role: "user", content: user }],
  });
  return msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
}

const BRAND = [
  "You write for Shqipëri, a free personal concierge for Albania that helps visitors and newcomers with tours, rentals, property, paperwork and more.",
  "VOICE: write like a warm, real human expert, not a robot. Natural and conversational, first person plural ('we', 'you'). Vary sentence length. No clichés, no filler, no AI-sounding phrasing.",
  "NEVER use em dashes or en dashes. Use commas, periods or parentheses instead.",
  "TONE ABOUT ALBANIA: always warm, positive and welcoming. Albania is safe, friendly and hospitable. Never describe or imply crime, theft, danger, insecurity, fraud or scams, and never portray Albania as risky. If a topic hints at caution, reframe it as friendly, practical tips for a smooth and confident experience, and reassure the reader that Albania is safe and welcoming. No fear based language.",
  "Never invent exact prices as guarantees; use ranges and words like 'around'. Do not include phone numbers, emails or booking links.",
].join("\n");

async function generateCanonical(client, model, topic, langName, target) {
  const system = BRAND + "\nYou are an expert writer producing an original, genuinely useful SEO blog article about Albania.";
  const user = [
    `Write a complete, engaging blog article in ${langName} of about ${target} words.`,
    `Topic / working title: ${topic.title}`,
    topic.keywords ? `Weave in these ideas naturally (no keyword stuffing): ${topic.keywords}` : "",
    "",
    "Start with a short, human intro paragraph (no heading). Then use ## H2 sections and bullet lists where they help. Add a short FAQ section near the end with 2 to 4 real questions.",
    "Do NOT repeat the title as a heading. End with ONE short, warm sentence inviting the reader to ask our team for free help (no contact details).",
    "",
    "Output ONLY a JSON object, no code fences, no commentary:",
    '{"title": "final SEO title", "description": "meta description up to 155 chars", "excerpt": "1-2 sentence teaser", "readingMinutes": 6, "body": "markdown body"}',
  ].filter(Boolean).join("\n");
  return cleanFields(extractJson(await ask(client, model, system, user, 6000)));
}

// Extra native-quality guidance per target language.
const LANG_GUIDANCE = {
  sq:
    "Write in correct, natural, standard literary Albanian (gjuha standarde shqipe), as a professional native editor would. " +
    "Be very careful with noun definiteness and plural forms, gender agreement, and case (for example use 'çertifikatë' / 'çertifikata', never 'sertifikata'; 'dokument, dokumente, dokumentet, dokumentat' correctly; 'të gjitha dokumentet' not 'të gjithë dokumentet'). " +
    "Use proper Albanian orthography (ç, ë) and native terminology. Avoid Turkish, Serbian or English loan-forms and calques. Read it back and make sure the grammar is flawless.",
  ar: "Write in clear, correct Modern Standard Arabic with proper grammar and orthography.",
};

export async function translate(client, model, src, langName, code) {
  const guidance = LANG_GUIDANCE[code] ? "\n" + LANG_GUIDANCE[code] : "";
  const system =
    `You are a professional native translator and editor into ${langName}. Translate faithfully and naturally, preserving Markdown structure and meaning, keeping proper nouns and place names. Keep the warm, human, positive tone. NEVER use em or en dashes. Do not add or remove content.` +
    guidance;
  const user =
    `Translate these article fields into ${langName}. Output ONLY JSON with the same keys, no code fences:\n` +
    JSON.stringify({ title: src.title, description: src.description, excerpt: src.excerpt, body: src.body });
  return cleanFields(extractJson(await ask(client, model, system, user, 8000)));
}

export async function generateOne({ id = null, force = false } = {}) {
  loadEnv();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set (env or .env.local).");

  const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
  const model = queue.model || "claude-sonnet-5";
  // Model used for translations (per language override wins, then translateModel, then model).
  const translateModel = queue.translateModel || model;
  const langModels = queue.langModels || {};
  const modelFor = (code) => langModels[code] || translateModel;
  const sourceLang = queue.sourceLang || "tr";
  const sourceName = LANG_NAME[sourceLang] || "Turkish";
  const defaultTarget = queue.wordTarget || 1400;

  const topic = id
    ? queue.topics.find((t) => t.id === id)
    : queue.topics.find((t) => (t.status || "pending") === "pending");
  if (!topic) return { done: true };

  const slug = topic.id ? slugify(topic.id) : slugify(topic.title);
  const outPath = path.join(POSTS_DIR, `${slug}.json`);
  if (fs.existsSync(outPath) && !force) {
    topic.status = "published";
    fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n", "utf8");
    return { slug, skipped: true };
  }

  const target = topic.wordTarget || (topic.category === "answers" ? 650 : defaultTarget);
  const client = new Anthropic({ apiKey });

  const canonical = await generateCanonical(client, model, topic, sourceName, target);

  const title = {}, description = {}, excerpt = {}, body = {};
  title[sourceLang] = canonical.title;
  description[sourceLang] = canonical.description;
  excerpt[sourceLang] = canonical.excerpt;
  body[sourceLang] = canonical.body;

  for (const code of ALL_LANGS) {
    if (code === sourceLang) continue;
    try {
      const tr = await translate(client, modelFor(code), canonical, LANG_NAME[code], code);
      title[code] = tr.title || canonical.title;
      description[code] = tr.description || canonical.description;
      excerpt[code] = tr.excerpt || canonical.excerpt;
      body[code] = tr.body || canonical.body;
    } catch (err) {
      title[code] = canonical.title; description[code] = canonical.description;
      excerpt[code] = canonical.excerpt; body[code] = canonical.body;
      console.error(`  ! ${code} translation failed (${err.message}), used source`);
    }
  }

  const post = {
    slug,
    status: "published",
    category: topic.category || undefined,
    cover: topic.cover || "📄",
    readingMinutes: Number(canonical.readingMinutes) || Math.max(3, Math.round(String(canonical.body).split(/\s+/).length / 200)),
    createdAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    title, description, excerpt, body,
  };

  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(post, null, 2) + "\n", "utf8");

  topic.status = "published";
  topic.slug = slug;
  topic.publishedAt = post.publishedAt;
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n", "utf8");

  return { slug };
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const id = args.includes("--id") ? args[args.indexOf("--id") + 1] : null;
  const force = args.includes("--force");
  generateOne({ id, force })
    .then((r) => {
      if (r.done) console.log("[blog] No pending topics.");
      else if (r.skipped) console.log(`[blog] ${r.slug} already exists, marked published.`);
      else console.log(`[blog] ✅ Published: /blog/post/${r.slug}`);
    })
    .catch((err) => { console.error("[blog] Fatal:", err.message); process.exit(1); });
}
