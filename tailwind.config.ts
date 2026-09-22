import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Albanian flag palette
        flag: {
          red: "#E41E20",
          dark: "#B71518",
          black: "#0B0B0C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        search: "0 1px 6px rgba(32,33,36,0.28)",
        "search-hover": "0 2px 10px rgba(32,33,36,0.32)",
      },
    },
  },
  plugins: [],
};

export default config;
