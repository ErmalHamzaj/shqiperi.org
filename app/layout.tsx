import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "Shqipëri — Kërkimi për Shqipërinë dhe shqiptarët",
  description:
    "Gjithçka për Shqipërinë dhe shqiptarët: lajme, investime, prona, qira, biznese dhe më shumë. Everything about Albania and Albanians.",
  metadataBase: new URL("https://shqiperi.org"),
  openGraph: {
    title: "Shqipëri — Search for Albania",
    description: "Everything about Albania and Albanians — news, investment, property, rentals and more.",
    url: "https://shqiperi.org",
    siteName: "Shqipëri",
    locale: "sq_AL",
    type: "website",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#E41E20",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
