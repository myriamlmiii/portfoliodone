export type Theme = "light" | "dark";

export function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? "#0c0e0f" : "#f7f6f1");
  }
}

/** Read an `r g b` CSS variable (e.g. "--accent") as a hex string, for libraries that can't use CSS variables. */
export function readRgbToken(token: string) {
  const parts = getComputedStyle(document.documentElement).getPropertyValue(token).trim().split(/\s+/).map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return "#888888";
  return `#${parts.map((n) => Math.round(n).toString(16).padStart(2, "0")).join("")}`;
}
