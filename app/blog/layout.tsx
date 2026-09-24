import type { Metadata } from "next";

const SITE = "https://shqiperi.org";

export const metadata: Metadata = {
  title: "Arnavutluk Blog — gezi, yaşam, gayrimenkul & iş",
  description:
    "Arnavutluk hakkında pratik ve güncel yazılar: gezi rehberleri, gayrimenkul, araç kiralama, oturum, şirket kurma ve daha fazlası. Ekibimizden ücretsiz kişisel yardım.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Arnavutluk Blog — Shqipëri",
    description: "Arnavutluk hakkında pratik yazılar ve ücretsiz kişisel yardım.",
    url: `${SITE}/blog`,
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
