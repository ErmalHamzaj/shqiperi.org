import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { GuideArticle, type ArticleData } from "@/components/GuideArticle";
import { listPublishedGuides, getGuide } from "@/lib/guides";
import { LANGS, type Lang } from "@/lib/i18n";

const SITE = "https://shqiperi.org";

// New posts (slugs not returned below) render on-demand and are then cached.
export const revalidate = 300;
export const dynamicParams = true;

export function generateStaticParams() {
  return listPublishedGuides().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getGuide(params.slug);
  if (!post) return { title: "Guide not found" };
  const title = post.title.en ?? post.title.sq;
  const description = post.description.en ?? post.description.sq;
  return {
    title,
    description,
    alternates: { canonical: `/guides/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/guides/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
    },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const post = getGuide(params.slug);
  if (!post) notFound();

  // Convert each language's Markdown to HTML on the server.
  const html: Partial<Record<Lang, string>> = {};
  for (const lang of LANGS) {
    const md = post.body[lang];
    if (md) html[lang] = String(marked.parse(md));
  }

  const data: ArticleData = {
    slug: post.slug,
    cover: post.cover,
    category: post.category,
    readingMinutes: post.readingMinutes,
    title: post.title,
    html,
    ctaQuery: post.title.en ?? post.title.sq,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.en ?? post.title.sq,
    description: post.description.en ?? post.description.sq,
    inLanguage: LANGS.filter((l) => post.body[l]),
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    mainEntityOfPage: `${SITE}/guides/${post.slug}`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GuideArticle data={data} />
    </>
  );
}
