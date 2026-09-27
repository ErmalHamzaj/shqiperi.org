import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const SITE = "https://shqiperi.org";
const TITLE = "Shqipëria — The digital front door to Albania";
const DESC =
  "Your starting point for Albania. Travel, live, invest and do business: shqiperi.org helps you discover destinations, decide with clear guides and current data, and act with verified local options and real services.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s · Shqipëri",
  },
  description: DESC,
  applicationName: "Shqipëri",
  keywords: [
    "Shqipëri",
    "Albania",
    "Albania concierge",
    "personal Albania guide",
    "plan trip to Albania",
    "Albania travel help",
    "vizito Shqipërinë",
    "udhëto në Shqipëri",
    "personalized Albania tour",
    "makina me qira Shqipëri",
    "car rental Albania",
    "prona Shqipëri",
    "real estate Albania",
    "avokat Shqipëri",
    "lawyers Albania",
    "guida turistike Shqipëri",
    "tour guides Albania",
    "tura me varkë Shqipëri",
    "boat tours Albania",
    "taksi & transferta Shqipëri",
    "Albania airport transfer",
    "lajme Shqipëri",
    "Albania news",
  ],
  authors: [{ name: "Shqipëri" }],
  creator: "Shqipëri",
  publisher: "Shqipëri",
  category: "directory",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE,
    siteName: "Shqipëri",
    locale: "sq_AL",
    alternateLocale: ["en_US", "tr_TR", "it_IT", "ar"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#032F50",
};

// Structured data: enables Google sitelinks search box + Organization rich data.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Shqipëri",
      description: DESC,
      inLanguage: ["sq", "en", "tr", "it", "ar"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Shqipëri",
      url: SITE,
      logo: `${SITE}/icon.svg`,
      slogan: "Your starting point for Albania",
      description:
        "The digital front door to Albania — helping people travel, live, invest and do business with structured destinations, clear guides, current data and verified local options.",
      areaServed: { "@type": "Country", name: "Albania" },
      knowsAbout: [
        "Albania travel",
        "tours in Albania",
        "car rental in Albania",
        "real estate in Albania",
        "lawyers in Albania",
        "airport transfers in Albania",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
