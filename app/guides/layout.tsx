import type { Metadata } from "next";

const SITE = "https://shqiperi.org";

export const metadata: Metadata = {
  title: "Albania guides — travel, property & living",
  description:
    "Practical, honest guides to traveling, living and investing in Albania — the Riviera, car rental, property, tours and more, with free personal help from our team.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Albania guides — Shqipëri",
    description:
      "Practical guides to traveling, living and investing in Albania, with free personal help.",
    url: `${SITE}/guides`,
    type: "website",
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
