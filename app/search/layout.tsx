import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kërko në Shqipëri — Search Albania",
  description:
    "Kërko biznese, shërbime, prona, avokatë, makina me qira, tura e lajme në Shqipëri. Search Albania for businesses, services and news.",
  alternates: { canonical: "/search" },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
