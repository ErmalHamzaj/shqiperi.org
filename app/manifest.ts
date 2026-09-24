import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shqipëri — Your personal Albania guide",
    short_name: "Shqipëri",
    description:
      "Your personal concierge for Albania — we organize tours, rentals, property, lawyers, transfers and more for you, free.",
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
