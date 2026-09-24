import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/directory";
import { listPublishedPosts, categoriesWithPosts, postSlug, SLUG_LANGS } from "@/lib/blog";

const SITE = "https://shqiperi.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/directory`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  // Blog category pages.
  const blogCategoryPages: MetadataRoute.Sitemap = categoriesWithPosts().map((c) => ({
    url: `${SITE}/blog/${c.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Published blog posts: base slug + each language's localized slug.
  const blogPosts: MetadataRoute.Sitemap = [];
  for (const p of listPublishedPosts()) {
    const lastModified = p.publishedAt ? new Date(p.publishedAt) : now;
    const urls = new Set<string>([`${SITE}/blog/post/${p.slug}`]);
    for (const lang of SLUG_LANGS) urls.add(`${SITE}/blog/post/${postSlug(p, lang)}`);
    for (const url of urls) {
      blogPosts.push({ url, lastModified, changeFrequency: "monthly", priority: 0.6 });
    }
  }

  // One indexable search URL per category that has listings.
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.filter(
    (c) => c.companies.length > 0,
  ).map((c) => ({
    url: `${SITE}/search?q=${encodeURIComponent(`${c.name.en} in Albania`)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...core, ...blogCategoryPages, ...blogPosts, ...categoryPages];
}
