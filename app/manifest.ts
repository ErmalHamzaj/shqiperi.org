import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shqipëri — Search Albania",
    short_name: "Shqipëri",
    description:
      "Search engine and business directory for Albania and Albanians — businesses, services and news.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#E41E20",
    lang: "sq",
    categories: ["business", "travel", "news", "directory"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
