#!/usr/bin/env node
/**
 * Re-translate ONE language for already-generated posts, from their canonical
 * (source-language) text, using a stronger model. Use this to fix / upgrade a
 * language across the whole blog without regenerating everything.
 *
 *   node scripts/retranslate.mjs sq                      # Albanian, model from queue.langModels.sq
 *   node scripts/retranslate.mjs sq --model claude-opus-4-8   # force a model
 *   node scripts/retranslate.mjs sq --max 20             # only the first 20 posts
 *
 * Posts marked "manual": true (hand-written) are skipped.
 */
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { translate, loadEnv, LANG_NAME, slugify } from "./generate-post.mjs";

const SLUG_LANGS = ["sq", "en", "tr", "it"];

const ROOT = process.cwd();
const QUEUE_PATH = path.join(ROOT, "content", "blog", "queue.json");
const POSTS_DIR = path.join(ROOT, "content", "blog", "posts");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const args = process.argv.slice(2);
const lang = args.find((a) => !a.startsWith("--")) || "sq";
const modelArg = args.includes("--model") ? args[args.indexOf("--model") + 1] : null;
const max = args.includes("--max") ? Number(args[args.indexOf("--max") + 1]) : Infinity;
// Only re-translate posts where this language still equals the source (i.e. the
// translation failed at generation and fell back to the source language).
const onlyFailed = args.includes("--only-failed");

loadEnv();
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY is not set (env or .env.local).");
  process.exit(1);
}
if (!LANG_NAME[lang]) {
  console.error(`Unknown language '${lang}'. Use one of: ${Object.keys(LANG_NAME).join(", ")}`);
  process.exit(1);
}

const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
const sourceLang = queue.sourceLang || "tr";
const model =
  modelArg || (queue.langModels && queue.langModels[lang]) || queue.translateModel || queue.model || "claude-sonnet-5";
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
console.log(`[retranslate] ${lang} for up to ${max === Infinity ? files.length : max} posts, model ${model}`);

let done = 0;
for (const f of files) {
  if (done >= max) break;
  const p = path.join(POSTS_DIR, f);
  const post = JSON.parse(fs.readFileSync(p, "utf8"));
  if (post.manual) { console.log(`  · skip (manual): ${post.slug}`); continue; }
  if (lang === sourceLang) { console.log(`  · skip (source lang): ${post.slug}`); continue; }
  const src = {
    title: post.title?.[sourceLang],
    description: post.description?.[sourceLang],
    excerpt: post.excerpt?.[sourceLang],
    body: post.body?.[sourceLang],
  };
  if (!src.body) { console.log(`  · skip (no ${sourceLang} source): ${post.slug}`); continue; }
  if (onlyFailed) {
    const cur = post.body?.[lang];
    if (cur && cur !== src.body) continue; // already properly translated
  }
  try {
    const tr = await translate(client, model, src, LANG_NAME[lang], lang);
    post.title[lang] = tr.title || post.title[lang];
    post.description[lang] = tr.description || post.description[lang];
    post.excerpt[lang] = tr.excerpt || post.excerpt[lang];
    post.body[lang] = tr.body || post.body[lang];
    // Keep the localized URL slug in sync with the corrected title.
    if (SLUG_LANGS.includes(lang) && tr.title) {
      const s = slugify(post.title[lang]);
      if (s) { post.slugs = post.slugs || {}; post.slugs[lang] = s; }
    }
    fs.writeFileSync(p, JSON.stringify(post, null, 2) + "\n", "utf8");
    done++;
    console.log(`  ✓ ${done}. ${post.slug}`);
    await sleep(1200);
  } catch (e) {
    console.error(`  ✗ ${post.slug}: ${e.message} (waiting 15s)`);
    await sleep(15000);
  }
}
console.log(`[retranslate] done. Updated ${lang} for ${done} post(s).`);
