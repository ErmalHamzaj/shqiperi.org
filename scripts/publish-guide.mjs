#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PUBLISH / APPROVE A GUIDE
 *  Drafts created by generate-guide.mjs are not public until approved here.
 *
 *    node scripts/publish-guide.mjs --list        List all posts + status
 *    node scripts/publish-guide.mjs <slug>        Publish (make public)
 *    node scripts/publish-guide.mjs <slug> --unpublish   Revert to draft
 * ─────────────────────────────────────────────────────────────────────────
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const QUEUE_PATH = path.join(ROOT, "content", "guides", "queue.json");
const POSTS_DIR = path.join(ROOT, "content", "guides", "posts");

function readPosts() {
  let files = [];
  try {
    files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return files.map((f) => {
    const p = path.join(POSTS_DIR, f);
    return { path: p, data: JSON.parse(fs.readFileSync(p, "utf8")) };
  });
}

function setQueueStatus(slug, status) {
  if (!fs.existsSync(QUEUE_PATH)) return;
  const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
  const topic = queue.topics.find((t) => t.slug === slug || t.id === slug);
  if (topic) {
    topic.status = status;
    fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n", "utf8");
  }
}

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--list")) {
  const posts = readPosts();
  if (posts.length === 0) {
    console.log("No guide posts found. Generate one: node scripts/generate-guide.mjs");
    process.exit(0);
  }
  console.log("\nGuides:\n");
  for (const { data } of posts.sort((a, b) => (a.data.status > b.data.status ? 1 : -1))) {
    const flag = data.status === "published" ? "🟢 published" : "🟡 draft    ";
    console.log(`  ${flag}  ${data.slug}`);
    console.log(`               ${(data.title?.en || "").slice(0, 70)}`);
  }
  console.log("\nPublish a draft:  node scripts/publish-guide.mjs <slug>\n");
  process.exit(0);
}

const slug = args[0];
const unpublish = args.includes("--unpublish");
const file = path.join(POSTS_DIR, `${slug}.json`);

if (!fs.existsSync(file)) {
  console.error(`No such guide: ${slug}. Run --list to see available posts.`);
  process.exit(1);
}

const post = JSON.parse(fs.readFileSync(file, "utf8"));

if (unpublish) {
  post.status = "draft";
  fs.writeFileSync(file, JSON.stringify(post, null, 2) + "\n", "utf8");
  setQueueStatus(slug, "drafted");
  console.log(`↩️  ${slug} reverted to draft (no longer public).`);
  process.exit(0);
}

post.status = "published";
if (!post.publishedAt) post.publishedAt = new Date().toISOString();
fs.writeFileSync(file, JSON.stringify(post, null, 2) + "\n", "utf8");
setQueueStatus(slug, "published");
console.log(`✅ ${slug} is now published: https://shqiperi.org/guides/${slug}`);
