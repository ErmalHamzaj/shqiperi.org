#!/usr/bin/env node
/**
 * Generate and publish blog posts from the queue, one after another, until it
 * is empty (or --max is reached). Safe to stop and re-run: it always continues
 * from the next pending topic.
 *
 *   node scripts/run-queue.mjs                 # run the whole queue
 *   node scripts/run-queue.mjs --max 10        # only the next 10
 *   node scripts/run-queue.mjs --delay 3000    # ms between posts (default 1500)
 *
 * On the VPS, run it detached so it keeps going:
 *   nohup node scripts/run-queue.mjs > blog-run.log 2>&1 &
 */
import { generateOne } from "./generate-post.mjs";

const args = process.argv.slice(2);
const max = args.includes("--max") ? Number(args[args.indexOf("--max") + 1]) : Infinity;
const delay = args.includes("--delay") ? Number(args[args.indexOf("--delay") + 1]) : 1500;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let made = 0;
console.log(`[run-queue] starting (max ${max === Infinity ? "all" : max})`);
for (let i = 0; i < max; i++) {
  let r;
  try {
    r = await generateOne();
  } catch (err) {
    console.error(`[run-queue] error: ${err.message} — waiting 20s and retrying`);
    await sleep(20000);
    continue;
  }
  if (r.done) { console.log("[run-queue] queue empty."); break; }
  if (r.skipped) { console.log(`  · ${r.slug} (already existed)`); continue; }
  made++;
  console.log(`  ✅ ${made}. /blog/post/${r.slug}`);
  await sleep(delay);
}
console.log(`[run-queue] done. Published ${made} new post(s).`);
