import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / var(--line-a))",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "var(--font-arabic)", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "Impact", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: { display: "-0.03em" },
      maxWidth: { content: "1200px" },
    },
  },
  plugins: [],
};

export default config;
