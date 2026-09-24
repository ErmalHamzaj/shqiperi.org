import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { BlogArticle, type ArticleData } from "@/components/BlogArticle";
import { listPublishedPosts, getPost, getBlogCategory, ctaForCategory } from "@/lib/blog";
import { LANGS, type Lang } from "@/lib/i18n";

const SITE = "https://shqiperi.org";

export const revalidate = 300;
export const dynamicParams = true;

export function generateStaticParams() {
  return listPublishedPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found" };
  const title = post.title.tr ?? post.title.en ?? post.title.sq;
  const description = post.description.tr ?? post.description.en ?? post.description.sq;
  return {
    title,
    description,
    alternates: { canonical: `/blog/post/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/blog/post/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const html: Partial<Record<Lang, string>> = {};
  for (const lang of LANGS) {
    const md = post.body[lang];
    if (md) html[lang] = String(marked.parse(md));
  }

  const cat = getBlogCategory(post.category);

  const data: ArticleData = {
    slug: post.slug,
    cover: post.cover,
    categoryId: cat?.id,
    categoryName: cat?.name,
    categoryIcon: cat?.icon,
    ctaCategory: ctaForCategory(post.category),
    hideCta: cat?.editorial ?? false,
    readingMinutes: post.readingMinutes,
    title: post.title,
    html,
    ctaQuery: post.title.tr ?? post.title.en ?? post.title.sq,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.tr ?? post.title.en ?? post.title.sq,
    description: post.description.tr ?? post.description.en ?? post.description.sq,
    inLanguage: LANGS.filter((l) => post.body[l]),
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    mainEntityOfPage: `${SITE}/blog/post/${post.slug}`,
    articleSection: cat?.name.en,
    author: { "@type": "Organization", name: "Shqipëri" },
    publisher: {
      "@type": "Organization",
      name: "Shqipëri",
      logo: { "@type": "ImageObject", url: `${SITE}/icon.svg` },
    },
    about: { "@type": "Country", name: "Albania" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogArticle data={data} />
    </>
  );
}
