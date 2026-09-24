#!/usr/bin/env node
/**
 * Show blog topics so you can generate them manually, one by one.
 *
 *   node scripts/list-topics.mjs               # counts + next 25 pending
 *   node scripts/list-topics.mjs --all         # every pending topic
 *   node scripts/list-topics.mjs --category cars   # pending in one category
 *
 * Then generate one with:
 *   node scripts/generate-post.mjs --id <topic-id>
 */
import fs from "node:fs";
import path from "node:path";

const QUEUE_PATH = path.join(process.cwd(), "content", "blog", "queue.json");
const args = process.argv.slice(2);
const all = args.includes("--all");
const cat = args.includes("--category") ? args[args.indexOf("--category") + 1] : null;

const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
const topics = queue.topics || [];

const byStatus = {};
for (const t of topics) {
  const s = t.status || "pending";
  byStatus[s] = (byStatus[s] || 0) + 1;
}
console.log("Topics:", topics.length, "|", Object.entries(byStatus).map(([k, v]) => `${k}: ${v}`).join("  "));

let pending = topics.filter((t) => (t.status || "pending") === "pending");
if (cat) pending = pending.filter((t) => t.category === cat);

console.log(`\nPending${cat ? ` in "${cat}"` : ""}: ${pending.length}\n`);
const show = all ? pending : pending.slice(0, 25);
for (const t of show) {
  console.log(`  [${t.category || "-"}]  ${t.id}`);
  console.log(`        ${t.title}`);
}
if (!all && pending.length > show.length) {
  console.log(`\n  … and ${pending.length - show.length} more (use --all)`);
}
console.log(`\nGenerate one:  node scripts/generate-post.mjs --id <topic-id>`);
