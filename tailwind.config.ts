import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { canvas: "#0b0c0e", surface: "#121316", line: "#292b30", ink: "#f4f4f1", muted: "#a4a6aa", accent: "#b8a6ff" },
      fontFamily: { sans: ["var(--font-sans)", "sans-serif"], serif: ["var(--font-serif)", "serif"], mono: ["var(--font-mono)", "monospace"] },
      letterSpacing: { display: "-0.065em" },
    },
  },
  plugins: [],
};

export default config;
