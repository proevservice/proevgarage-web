import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px", // max-w-6xl effectively
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-prompt)", "sans-serif"],
      },
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",

        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",

        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          2: "rgb(var(--primary-2) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
        },
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(0, 103, 71, 0.8))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
export default config;
