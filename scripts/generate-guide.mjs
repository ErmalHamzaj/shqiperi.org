#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUIDE GENERATOR
 *  Picks the next "pending" topic from content/guides/queue.json, writes a
 *  full multilingual article (EN generated, then translated to SQ/IT/TR/AR)
 *  as a DRAFT in content/guides/posts/<slug>.json, and marks the topic
 *  "drafted". Drafts are NOT public until you approve them:
 *      node scripts/publish-guide.mjs --list      # see drafts
 *      node scripts/publish-guide.mjs <slug>      # publish one
 *
 *  Run manually:   node scripts/generate-guide.mjs
 *  Options:        --id <topicId>   generate a specific topic
 *                  --force          overwrite an existing post file
 *
 *  Scheduled twice a week by cron (see DEPLOY-GUIDES.md).
 * ─────────────────────────────────────────────────────────────────────────
 */
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";

const ROOT = process.cwd();
const QUEUE_PATH = path.join(ROOT, "content", "guides", "queue.json");
const POSTS_DIR = path.join(ROOT, "content", "guides", "posts");

const TARGET_LANGS = [
  { code: "sq", name: "Albanian" },
  { code: "it", name: "Italian" },
  { code: "tr", name: "Turkish" },
  { code: "ar", name: "Arabic (Modern Standard Arabic)" },
];

// ── Load ANTHROPIC_API_KEY (cron doesn't inherit the PM2 env) ───────────────
function loadEnv() {
  if (process.env.ANTHROPIC_API_KEY) return;
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function extractJson(text) {
  let t = text.trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) t = fence[1].trim();
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in model reply");
  return JSON.parse(t.slice(start, end + 1));
}

async function ask(client, model, system, user, maxTokens) {
  const msg = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: user }],
  });
  return msg.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

async function generateEnglish(client, model, topic, wordTarget) {
  const system =
    "You are an expert travel and local-life writer for Shqipëri, a free personal concierge for Albania. " +
    "You write helpful, accurate, engaging, up-to-date SEO articles about Albania. " +
    "Tone: warm, practical, honest — like a knowledgeable local friend. " +
    "Never invent exact prices as guarantees; use ranges and words like 'around'. " +
    "Do NOT include phone numbers, emails, or booking links. Do NOT include the title as a heading.";
  const user = [
    `Write a complete SEO article of about ${wordTarget} words.`,
    `Topic / working title: ${topic.title}`,
    topic.keywords ? `Target keywords (weave in naturally, no stuffing): ${topic.keywords}` : "",
    "",
    "Structure: a short engaging intro paragraph (no heading), then several ## H2 sections, bullet lists where useful, and a short '## FAQ' section with 2-4 Q&As.",
    "End with ONE short sentence inviting the reader to ask our team for free help (no contact details).",
    "",
    "Output ONLY a JSON object, no code fences, no commentary:",
    '{"title": "final SEO title", "description": "meta description, max 155 chars", "excerpt": "1-2 sentence teaser", "readingMinutes": 6, "body": "markdown body starting with the intro paragraph, using ## for section headings"}',
  ]
    .filter(Boolean)
    .join("\n");
  return extractJson(await ask(client, model, system, user, 6000));
}

async function translate(client, model, en, langName) {
  const system =
    `You are a professional translator into ${langName}. Translate faithfully and naturally, ` +
    "preserving Markdown structure (headings, lists) and meaning. Keep proper nouns and place names. " +
    "Do not add or remove content.";
  const user =
    `Translate these article fields into ${langName}. Output ONLY JSON with the same keys, no code fences:\n` +
    JSON.stringify({
      title: en.title,
      description: en.description,
      excerpt: en.excerpt,
      body: en.body,
    });
  return extractJson(await ask(client, model, system, user, 8000));
}

async function main() {
  loadEnv();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[guides] ANTHROPIC_API_KEY is not set (env or .env.local). Aborting.");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const idArg = args.includes("--id") ? args[args.indexOf("--id") + 1] : null;

  const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
  const model = queue.model || "claude-sonnet-5";
  const wordTarget = queue.wordTarget || 1400;

  const topic = idArg
    ? queue.topics.find((t) => t.id === idArg)
    : queue.topics.find((t) => (t.status || "pending") === "pending");

  if (!topic) {
    console.log("[guides] Nothing to generate (no pending topics).");
    return;
  }

  const slug = topic.id ? slugify(topic.id) : slugify(topic.title);
  const outPath = path.join(POSTS_DIR, `${slug}.json`);
  if (fs.existsSync(outPath) && !force) {
    console.log(`[guides] ${slug}.json already exists — skipping (use --force to overwrite).`);
    return;
  }

  console.log(`[guides] Generating "${topic.title}" (${slug}) with ${model}…`);
  const client = new Anthropic({ apiKey });

  const en = await generateEnglish(client, model, topic, wordTarget);
  console.log("[guides]   ✓ English draft written");

  const title = { en: en.title };
  const description = { en: en.description };
  const excerpt = { en: en.excerpt };
  const body = { en: en.body };

  for (const { code, name } of TARGET_LANGS) {
    try {
      const tr = await translate(client, model, en, name);
      title[code] = tr.title || en.title;
      description[code] = tr.description || en.description;
      excerpt[code] = tr.excerpt || en.excerpt;
      body[code] = tr.body || en.body;
      console.log(`[guides]   ✓ ${name}`);
    } catch (err) {
      console.error(`[guides]   ✗ ${name} failed (${err.message}) — falling back to English`);
      title[code] = en.title;
      description[code] = en.description;
      excerpt[code] = en.excerpt;
      body[code] = en.body;
    }
  }

  const post = {
    slug,
    status: "draft",
    category: topic.category || undefined,
    cover: topic.cover || "📄",
    readingMinutes: Number(en.readingMinutes) || Math.max(3, Math.round(en.body.split(/\s+/).length / 200)),
    createdAt: new Date().toISOString(),
    publishedAt: null,
    title,
    description,
    excerpt,
    body,
  };

  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(post, null, 2) + "\n", "utf8");

  topic.status = "drafted";
  topic.slug = slug;
  topic.draftedAt = new Date().toISOString();
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n", "utf8");

  console.log(`[guides] ✅ Draft saved: content/guides/posts/${slug}.json`);
  console.log(`[guides]    Review, then publish:  node scripts/publish-guide.mjs ${slug}`);
}

main().catch((err) => {
  console.error("[guides] Fatal:", err);
  process.exit(1);
});
