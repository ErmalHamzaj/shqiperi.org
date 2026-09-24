#!/usr/bin/env node
/**
 * Build content/blog/queue.json from content/blog/topics.tr.txt.
 * Splits the raw topic list by category header, turns each line into a queued
 * topic, de-duplicates by slug, and preserves the status of topics already in
 * the queue (so re-running never re-generates published posts).
 *
 *   node scripts/seed-queue.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "content", "blog", "topics.tr.txt");
const OUT = path.join(ROOT, "content", "blog", "queue.json");

// Header text (exactly as in topics.tr.txt) → blog category id + cover icon.
const CATEGORIES = [
  ["Citizenship, Residency & Immigration", "immigration", "🛂"],
  ["Şirket Kurma & İş Dünyası", "business", "🏢"],
  ["Hukuk & Hukuki Sorunlar", "legal", "⚖️"],
  ["Araç Kiralama, Trafik & Ulaşım", "cars", "🚗"],
  ["Gayrimenkul, Ev Alma & Kiralama", "real-estate", "🏡"],
  ["Turizm & Seyahat", "travel", "🏖️"],
  ["Para, Bankacılık & Vergi", "money", "🏦"],
  ["Yaşam & Yerleşim", "living", "🌇"],
  ["Yeme İçme", "food", "🍽️"],
  ["Aile & Çocuk", "family", "👨‍👩‍👧"],
  ["Lüks & VIP", "luxury", "✨"],
  ["Düğün & Etkinlikler", "weddings", "💍"],
  ["Dijital Yaşam & Teknoloji", "digital", "📱"],
  ["Pratik Bilgiler & Acil Durumlar", "practical", "🧭"],
  ["Diaspora", "diaspora", "🌍"],
  ["Albania Answers", "answers", "❓"],
];

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

const raw = fs.readFileSync(SRC, "utf8").replace(/\s+/g, " ").trim();

// Locate each header and slice the text between consecutive headers.
const found = CATEGORIES.map(([h, id, icon]) => ({ h, id, icon, at: raw.indexOf(h) }));
for (const f of found) if (f.at === -1) throw new Error(`Header not found: ${f.h}`);
found.sort((a, b) => a.at - b.at);

const topics = [];
const seen = new Set();
for (let i = 0; i < found.length; i++) {
  const seg = raw.slice(found[i].at + found[i].h.length, i + 1 < found.length ? found[i + 1].at : raw.length);
  const items = seg.split(/\s*\d+\.\s*/).map((s) => s.trim()).filter(Boolean);
  for (const title of items) {
    const id = slugify(title);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    topics.push({ id, title, category: found[i].id, cover: found[i].icon, status: "pending" });
  }
}

// Preserve statuses from an existing queue.
if (fs.existsSync(OUT)) {
  try {
    const prev = JSON.parse(fs.readFileSync(OUT, "utf8"));
    const byId = new Map((prev.topics || []).map((t) => [t.id, t]));
    for (const t of topics) {
      const old = byId.get(t.id);
      if (old && old.status && old.status !== "pending") {
        t.status = old.status;
        if (old.slug) t.slug = old.slug;
        if (old.publishedAt) t.publishedAt = old.publishedAt;
      }
    }
  } catch { /* ignore */ }
}

const queue = {
  _readme:
    "Auto-generated from topics.tr.txt by scripts/seed-queue.mjs. The generator writes canonical articles in sourceLang, then translates to the other languages, and AUTO-PUBLISHES. Run the whole queue with scripts/run-queue.mjs.",
  schedule: { days: [1, 2, 3, 4, 5], hour: 9 },
  model: "claude-haiku-4-5-20251001",
  translateModel: "claude-haiku-4-5-20251001",
  langModels: { sq: "claude-sonnet-5" },
  sourceLang: "tr",
  wordTarget: 1200,
  topics,
};

fs.writeFileSync(OUT, JSON.stringify(queue, null, 2) + "\n", "utf8");

const counts = {};
for (const t of topics) counts[t.category] = (counts[t.category] || 0) + 1;
console.log(`[seed] wrote ${topics.length} topics to content/blog/queue.json`);
for (const [k, v] of Object.entries(counts)) console.log(`   ${k}: ${v}`);
