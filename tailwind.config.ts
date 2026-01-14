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
        brand: {
          green: "#00A651",     // Vibrant Accent
          dark: "#006747",      // Deep Green
          black: "#1A1A1A",     // Soft Black
          light: "#F5F5F7",     // Premium Gray
        },
        slate: {
          850: "#1e293b",
        }
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(0, 103, 71, 0.8))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
export default config;
