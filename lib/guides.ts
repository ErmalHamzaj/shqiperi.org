import fs from "node:fs";
import path from "node:path";
import type { Lang } from "./i18n";
import type { LangText } from "./directory";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  GUIDES / BLOG
 *  Posts live as JSON files in content/guides/posts/*.json and are generated
 *  by scripts/generate-guide.mjs. A post is only shown publicly when its
 *  status is "published" (drafts wait for your approval — see
 *  scripts/publish-guide.mjs).
 * ─────────────────────────────────────────────────────────────────────────
 */

export type GuideStatus = "draft" | "published";

export type Guide = {
  slug: string;
  status: GuideStatus;
  /** Directory category this guide relates to (drives the concierge CTA). */
  category?: string;
  /** Emoji or image path shown as the cover. */
  cover?: string;
  readingMinutes?: number;
  createdAt?: string;
  publishedAt?: string | null;
  title: LangText;
  description: LangText; // meta description (SEO)
  excerpt: LangText; // short teaser for the listing
  body: LangText; // Markdown, per language
};

const POSTS_DIR = path.join(process.cwd(), "content", "guides", "posts");

function readAll(): Guide[] {
  let files: string[];
  try {
    files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return []; // directory not created yet
  }
  const posts: Guide[] = [];
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const post = JSON.parse(raw) as Guide;
      if (post && post.slug && post.title) posts.push(post);
    } catch {
      /* skip malformed file */
    }
  }
  return posts;
}

/** Published posts, newest first. */
export function listPublishedGuides(): Guide[] {
  return readAll()
    .filter((p) => p.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt || 0).getTime() -
        new Date(a.publishedAt || a.createdAt || 0).getTime(),
    );
}

/** A single published post by slug (drafts are not served publicly). */
export function getGuide(slug: string): Guide | null {
  const post = readAll().find((p) => p.slug === slug);
  if (!post || post.status !== "published") return null;
  return post;
}

/** Resolve localized text, falling back to English then Albanian. */
export function guideText(t: LangText | undefined, lang: Lang): string {
  if (!t) return "";
  return t[lang] ?? t.en ?? t.sq ?? "";
}
