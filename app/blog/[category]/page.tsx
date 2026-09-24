import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCategoryPage } from "@/components/BlogCategoryPage";
import { BLOG_CATEGORIES, getBlogCategory, listPostsByCategory } from "@/lib/blog";

const SITE = "https://shqiperi.org";
export const revalidate = 30;
export const dynamicParams = true;

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: c.id }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = getBlogCategory(params.category);
  if (!cat) return { title: "Not found" };
  const name = cat.name.en;
  return {
    title: `${name} — Albania blog`,
    description: `Articles about ${name.toLowerCase()} in Albania: practical, up-to-date guides with free personal help from our team.`,
    alternates: { canonical: `/blog/${cat.id}` },
    openGraph: { title: `${name} — Shqipëri`, url: `${SITE}/blog/${cat.id}`, type: "website" },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getBlogCategory(params.category);
  if (!cat) notFound();

  const posts = listPostsByCategory(cat.id).map((p) => ({
    slug: p.slug,
    slugs: p.slugs,
    cover: p.cover,
    readingMinutes: p.readingMinutes,
    title: p.title,
    excerpt: p.excerpt,
  }));

  return <BlogCategoryPage name={cat.name} icon={cat.icon} posts={posts} />;
}
