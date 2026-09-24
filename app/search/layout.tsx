import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rezultate & ndihmë personale për Shqipërinë",
  description:
    "Gjej biznese e shërbime në Shqipëri dhe merr ndihmë personale falas nga ekipi ynë — tura, makina me qira, prona, avokatë, transferta e më shumë.",
  alternates: { canonical: "/search" },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
