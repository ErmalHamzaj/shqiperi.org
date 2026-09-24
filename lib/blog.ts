import fs from "node:fs";
import path from "node:path";
import type { Lang } from "./i18n";
import type { LangText } from "./directory";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  BLOG
 *  Posts live as JSON files in content/blog/posts/*.json and are generated
 *  by scripts/generate-post.mjs (which auto-publishes). Each post belongs to
 *  one blog category (below).
 * ─────────────────────────────────────────────────────────────────────────
 */

export type BlogCategory = {
  id: string;
  name: LangText;
  icon: string;
  /** Directory category for the concierge CTA on its posts (null = generic). */
  cta: string | null;
  /** Editorial/announcement section: no concierge CTA on its posts. */
  editorial?: boolean;
};

// (Post-level "manual" flag lives on the JSON; it marks hand-written posts
// that scripts/retranslate.mjs must not overwrite.)

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "partnership", icon: "🤝", cta: null, editorial: true,
    name: { en: "News & Partnerships", tr: "Haberler & İşbirlikleri", sq: "Lajme & Partneritete", it: "Notizie e partnership", ar: "أخبار وشراكات" } },
  { id: "travel", icon: "🏖️", cta: "tour-guides",
    name: { en: "Travel & Tourism", tr: "Gezi & Turizm", sq: "Udhëtim & Turizëm", it: "Viaggi e turismo", ar: "السفر والسياحة" } },
  { id: "real-estate", icon: "🏡", cta: "buy-property",
    name: { en: "Property & Rentals", tr: "Gayrimenkul & Kiralama", sq: "Prona & Qira", it: "Immobili e affitti", ar: "العقارات والإيجار" } },
  { id: "cars", icon: "🚗", cta: "rent-car",
    name: { en: "Car Rental & Transport", tr: "Araç Kiralama & Ulaşım", sq: "Makina me qira & Transport", it: "Noleggio auto e trasporti", ar: "تأجير السيارات والتنقل" } },
  { id: "immigration", icon: "🛂", cta: "lawyer",
    name: { en: "Immigration & Residency", tr: "Oturum & Vatandaşlık", sq: "Emigracion & Rezidencë", it: "Immigrazione e residenza", ar: "الهجرة والإقامة" } },
  { id: "business", icon: "🏢", cta: "accountants",
    name: { en: "Company & Business", tr: "Şirket & İş Dünyası", sq: "Kompani & Biznes", it: "Azienda e affari", ar: "الشركات والأعمال" } },
  { id: "legal", icon: "⚖️", cta: "lawyer",
    name: { en: "Legal Guide", tr: "Hukuk Rehberi", sq: "Udhëzues ligjor", it: "Guida legale", ar: "الدليل القانوني" } },
  { id: "money", icon: "🏦", cta: "banks",
    name: { en: "Money, Banking & Tax", tr: "Para, Bankacılık & Vergi", sq: "Para, Banka & Taksa", it: "Denaro, banche e tasse", ar: "المال والبنوك والضرائب" } },
  { id: "living", icon: "🌇", cta: null,
    name: { en: "Living in Albania", tr: "Arnavutluk'ta Yaşam", sq: "Të jetosh në Shqipëri", it: "Vivere in Albania", ar: "الحياة في ألبانيا" } },
  { id: "food", icon: "🍽️", cta: "tour-guides",
    name: { en: "Food & Drink", tr: "Yeme & İçme", sq: "Ushqim & Pije", it: "Cibo e bevande", ar: "الطعام والشراب" } },
  { id: "family", icon: "👨‍👩‍👧", cta: null,
    name: { en: "Family & Kids", tr: "Aile & Çocuk", sq: "Familje & Fëmijë", it: "Famiglia e bambini", ar: "العائلة والأطفال" } },
  { id: "luxury", icon: "✨", cta: "rent-villa",
    name: { en: "Luxury & VIP", tr: "Lüks & VIP", sq: "Luks & VIP", it: "Lusso e VIP", ar: "الفخامة و VIP" } },
  { id: "weddings", icon: "💍", cta: null,
    name: { en: "Weddings & Events", tr: "Düğün & Etkinlikler", sq: "Dasma & Evente", it: "Matrimoni ed eventi", ar: "الأعراس والمناسبات" } },
  { id: "digital", icon: "📱", cta: null,
    name: { en: "Digital Life", tr: "Dijital Yaşam", sq: "Jetë dixhitale", it: "Vita digitale", ar: "الحياة الرقمية" } },
  { id: "practical", icon: "🧭", cta: null,
    name: { en: "Practical Info", tr: "Pratik Bilgiler", sq: "Informacione praktike", it: "Info pratiche", ar: "معلومات عملية" } },
  { id: "diaspora", icon: "🌍", cta: "invest",
    name: { en: "Diaspora", tr: "Diaspora", sq: "Diaspora", it: "Diaspora", ar: "الشتات" } },
  { id: "answers", icon: "❓", cta: null,
    name: { en: "Albania Answers", tr: "Arnavutluk Cevaplıyor", sq: "Përgjigje për Shqipërinë", it: "Albania Risponde", ar: "إجابات ألبانيا" } },
];

export function getBlogCategory(id?: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.id === id);
}

/** Directory category id for a post's concierge CTA (from its blog category). */
export function ctaForCategory(id?: string): string | null {
  return getBlogCategory(id)?.cta ?? null;
}

export type Post = {
  slug: string;
  status: "draft" | "published";
  /** Hand-written post that scripts/retranslate.mjs must not overwrite. */
  manual?: boolean;
  /** Blog category id (see BLOG_CATEGORIES). */
  category?: string;
  cover?: string;
  /** Social-share (Open Graph / Twitter) image, absolute path under /public. */
  ogImage?: string;
  readingMinutes?: number;
  createdAt?: string;
  publishedAt?: string | null;
  title: LangText;
  description: LangText;
  excerpt: LangText;
  body: LangText;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog", "posts");

function readAll(): Post[] {
  let files: string[];
  try {
    files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  const posts: Post[] = [];
  for (const file of files) {
    try {
      const post = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, file), "utf8")) as Post;
      if (post && post.slug && post.title) posts.push(post);
    } catch {
      /* skip malformed file */
    }
  }
  return posts;
}

function byDateDesc(a: Post, b: Post): number {
  return (
    new Date(b.publishedAt || b.createdAt || 0).getTime() -
    new Date(a.publishedAt || a.createdAt || 0).getTime()
  );
}

/** All published posts, newest first. */
export function listPublishedPosts(): Post[] {
  return readAll().filter((p) => p.status === "published").sort(byDateDesc);
}

/** Published posts in one blog category, newest first. */
export function listPostsByCategory(categoryId: string): Post[] {
  return listPublishedPosts().filter((p) => p.category === categoryId);
}

/** Blog categories that currently have at least one published post. */
export function categoriesWithPosts(): BlogCategory[] {
  const ids = new Set(listPublishedPosts().map((p) => p.category));
  return BLOG_CATEGORIES.filter((c) => ids.has(c.id));
}

/** Related posts for a given post: Türkiye-focused ones first, then recent. */
export function relatedPosts(currentSlug: string, limit = 3): Post[] {
  const others = listPublishedPosts().filter((p) => p.slug !== currentSlug);
  const rx = /t[üu]rk/i;
  const turkiye = others.filter(
    (p) => rx.test(p.slug) || rx.test(p.title.tr || "") || rx.test(p.title.en || ""),
  );
  const pick = turkiye.length ? turkiye : others;
  return pick.slice(0, limit);
}

/** A single published post by slug. */
export function getPost(slug: string): Post | null {
  const post = readAll().find((p) => p.slug === slug);
  if (!post || post.status !== "published") return null;
  return post;
}

/** Resolve localized text, falling back to English then Albanian. */
export function postText(t: LangText | undefined, lang: Lang): string {
  if (!t) return "";
  return t[lang] ?? t.en ?? t.sq ?? "";
}
