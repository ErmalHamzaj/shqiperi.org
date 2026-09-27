import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand blue (master blueprint #032F50) + shades.
        brand: {
          50: "#eef3f8",
          100: "#d5e2ee",
          200: "#adc5dc",
          300: "#7ea3c4",
          400: "#4d7ba6",
          500: "#1f568a",
          600: "#0a4570",
          700: "#06375c",
          800: "#042d4c",
          900: "#032F50",
          DEFAULT: "#032F50",
        },
        // Albanian flag palette — use red only where functional / Albanian-inspired.
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
  plugins: [typography],
};

export default config;
