import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/directory";
import { listPublishedPosts, categoriesWithPosts } from "@/lib/blog";

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

  // Published blog posts.
  const blogPosts: MetadataRoute.Sitemap = listPublishedPosts().map((p) => ({
    url: `${SITE}/blog/post/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

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
