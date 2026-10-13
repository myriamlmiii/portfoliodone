import Image from "next/image";

/**
 * Organization mark with no tile behind it. Logos render as a single-color silhouette
 * (white in dark mode, black in light mode) so every brand sits evenly on the page;
 * pass tone="color" to keep a logo's own colors. Falls back to initials.
 */
export function OrgLogo({ name, logo, tone, size = 44 }: { name: string; logo?: string; tone?: "light" | "dark" | "color"; size?: number }) {
  const initials = name
    .replace(/\(.*?\)/g, "")
    .split(/[\s,-]+/)
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  if (!logo) {
    return (
      <span
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-full border border-line text-sm font-semibold text-muted"
      >
        {initials}
      </span>
    );
  }

  return (
    <span style={{ width: size, height: size }} className="relative flex shrink-0 items-center justify-center">
      <Image
        src={logo}
        alt={name}
        fill
        sizes={`${size}px`}
        className={`object-contain ${tone === "color" ? "" : "opacity-85 brightness-0 dark:invert"}`}
      />
    </span>
  );
}
