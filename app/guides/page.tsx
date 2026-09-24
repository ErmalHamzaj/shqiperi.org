import { GuidesIndex, type GuideCard } from "@/components/GuidesIndex";
import { listPublishedGuides } from "@/lib/guides";

// Re-check the content folder periodically so newly published posts appear
// without a rebuild.
export const revalidate = 300;

export default function GuidesPage() {
  const guides: GuideCard[] = listPublishedGuides().map((g) => ({
    slug: g.slug,
    cover: g.cover,
    category: g.category,
    readingMinutes: g.readingMinutes,
    publishedAt: g.publishedAt ?? null,
    title: g.title,
    excerpt: g.excerpt,
  }));

  return <GuidesIndex guides={guides} />;
}
