#!/usr/bin/env node
/**
 * Backfill per-language URL slugs on existing posts (from their localized
 * titles), for Latin-script languages (sq, en, tr, it). Arabic keeps the base
 * slug. Idempotent: only adds missing slugs. Skips "manual" posts.
 *
 *   node scripts/add-slugs.mjs           # all posts
 *   node scripts/add-slugs.mjs --force   # recompute even if slugs exist
 */
import fs from "node:fs";
import path from "node:path";
import { slugify } from "./generate-post.mjs";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "blog", "posts");
const SLUG_LANGS = ["sq", "en", "tr", "it"];
const force = process.argv.includes("--force");

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
let updated = 0;
for (const f of files) {
  const p = path.join(POSTS_DIR, f);
  const post = JSON.parse(fs.readFileSync(p, "utf8"));
  if (post.manual) { console.log(`  · skip (manual): ${post.slug}`); continue; }
  if (post.slugs && !force) { continue; }
  const slugs = {};
  for (const lang of SLUG_LANGS) {
    const title = post.title?.[lang];
    if (title) {
      const s = slugify(title);
      if (s) slugs[lang] = s;
    }
  }
  post.slugs = slugs;
  fs.writeFileSync(p, JSON.stringify(post, null, 2) + "\n", "utf8");
  updated++;
  console.log(`  ✓ ${post.slug} -> ${JSON.stringify(slugs)}`);
}
console.log(`[add-slugs] updated ${updated} post(s).`);
