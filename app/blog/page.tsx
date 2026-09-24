import { BlogIndex, type BlogSection } from "@/components/BlogIndex";
import { BLOG_CATEGORIES, listPostsByCategory } from "@/lib/blog";

// Pick up newly published posts quickly, without a rebuild.
export const revalidate = 30;

const PREVIEW_PER_CATEGORY = 3;

export default function BlogPage() {
  const sections: BlogSection[] = BLOG_CATEGORIES.map((c) => {
    const posts = listPostsByCategory(c.id);
    return {
      id: c.id,
      name: c.name,
      icon: c.icon,
      total: posts.length,
      posts: posts.slice(0, PREVIEW_PER_CATEGORY).map((p) => ({
        slug: p.slug,
        slugs: p.slugs,
        cover: p.cover,
        readingMinutes: p.readingMinutes,
        title: p.title,
        excerpt: p.excerpt,
      })),
    };
  }).filter((s) => s.total > 0);

  return <BlogIndex sections={sections} />;
}
