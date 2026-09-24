import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/directory";
import { listPublishedGuides } from "@/lib/guides";

const SITE = "https://shqiperi.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/directory`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Published guide articles.
  const guidePages: MetadataRoute.Sitemap = listPublishedGuides().map((g) => ({
    url: `${SITE}/guides/${g.slug}`,
    lastModified: g.publishedAt ? new Date(g.publishedAt) : now,
    changeFrequency: "monthly",
    priority: 0.7,
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

  return [...core, ...guidePages, ...categoryPages];
}
