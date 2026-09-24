import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/directory";

const SITE = "https://shqiperi.org";
const total = CATEGORIES.reduce((n, c) => n + c.companies.length, 0);

export const metadata: Metadata = {
  title: "Kompani & kontakte të verifikuara në Shqipëri",
  description: `${total}+ biznese në Shqipëri, me ndihmë personale falas për t'i kontaktuar e organizuar: makina me qira, prona, avokatë, guida turistike, tura me varkë, taksi e më shumë. ${total}+ verified Albanian businesses, with free personal help to book them.`,
  alternates: { canonical: "/directory" },
  openGraph: {
    title: "Albania Business Directory — Shqipëri",
    description: `${total}+ Albanian businesses across ${CATEGORIES.filter((c) => c.companies.length).length} categories.`,
    url: `${SITE}/directory`,
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Albania Business Directory",
  url: `${SITE}/directory`,
  isPartOf: { "@id": `${SITE}/#website` },
  about: { "@type": "Country", name: "Albania" },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: CATEGORIES.filter((c) => c.companies.length > 0).length,
    itemListElement: CATEGORIES.filter((c) => c.companies.length > 0).map(
      (c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name.en,
        url: `${SITE}/search?q=${encodeURIComponent(`${c.name.en} in Albania`)}`,
      }),
    ),
  },
};

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
