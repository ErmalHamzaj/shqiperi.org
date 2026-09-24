import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { BlogArticle, type ArticleData } from "@/components/BlogArticle";
import {
  listPublishedPosts,
  resolvePost,
  getBlogCategory,
  ctaForCategory,
  relatedPosts,
  postSlug,
  SLUG_LANGS,
} from "@/lib/blog";
import { LANGS, type Lang } from "@/lib/i18n";

const SITE = "https://shqiperi.org";

export const revalidate = 300;
export const dynamicParams = true;

export function generateStaticParams() {
  // Prebuild the base slugs; localized slugs render on-demand (and are cached).
  return listPublishedPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const resolved = resolvePost(params.slug);
  if (!resolved) return { title: "Not found" };
  const { post, forcedLang } = resolved;
  const L = forcedLang ?? "en";
  const title = post.title[L] ?? post.title.tr ?? post.title.en ?? post.title.sq;
  const description = post.description[L] ?? post.description.tr ?? post.description.en ?? post.description.sq;
  const images = post.ogImage
    ? [{ url: `${SITE}${post.ogImage}`, width: 1200, height: 675, alt: title }]
    : undefined;

  const languages: Record<string, string> = {};
  for (const l of SLUG_LANGS) {
    if (post.body[l]) languages[l] = `/blog/post/${postSlug(post, l)}`;
  }
  languages["ar"] = `/blog/post/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/post/${postSlug(post, L)}`, languages },
    openGraph: {
      title,
      description,
      url: `${SITE}/blog/post/${postSlug(post, L)}`,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images,
    },
    twitter: images
      ? { card: "summary_large_image", title, description, images: images.map((i) => i.url) }
      : undefined,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const resolved = resolvePost(params.slug);
  if (!resolved) notFound();
  const { post, forcedLang } = resolved;

  const html: Partial<Record<Lang, string>> = {};
  for (const lang of LANGS) {
    const md = post.body[lang];
    if (md) {
      html[lang] = String(marked.parse(md)).replace(
        /<a href="(https?:\/\/[^"]+)"/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer"',
      );
    }
  }

  const cat = getBlogCategory(post.category);

  // Language → this post's URL slug, for the in-article language switcher.
  const langSlugs: Partial<Record<Lang, string>> = {};
  for (const lang of LANGS) {
    if (post.body[lang]) langSlugs[lang] = postSlug(post, lang);
  }

  const metaLang = forcedLang ?? "en";
  const data: ArticleData = {
    slug: post.slug,
    forcedLang,
    langSlugs,
    cover: post.cover,
    categoryId: cat?.id,
    categoryName: cat?.name,
    categoryIcon: cat?.icon,
    ctaCategory: ctaForCategory(post.category),
    hideCta: cat?.editorial ?? false,
    date: post.publishedAt ?? post.createdAt,
    readingMinutes: post.readingMinutes,
    title: post.title,
    html,
    ctaQuery: post.title[metaLang] ?? post.title.tr ?? post.title.en ?? post.title.sq,
    related: relatedPosts(post.slug, 3).map((r) => ({
      slug: r.slug,
      slugs: r.slugs,
      title: r.title,
      cover: r.cover,
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[metaLang] ?? post.title.tr ?? post.title.en,
    description: post.description[metaLang] ?? post.description.tr ?? post.description.en,
    inLanguage: LANGS.filter((l) => post.body[l]),
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    mainEntityOfPage: `${SITE}/blog/post/${postSlug(post, metaLang)}`,
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
