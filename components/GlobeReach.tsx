"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LOCATIONS } from "@/lib/geo";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { usePreferences } from "./Preferences";

const GlobeCanvas = dynamic(() => import("./globe/GlobeCanvas").then((mod) => mod.GlobeCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-md bg-ink/5" />,
});

export function GlobeReach({
  showLegend = true,
  className = "h-[360px] w-full max-w-[420px] sm:h-[420px]",
  activeId = null,
  onSelect = () => undefined,
}: {
  showLegend?: boolean;
  className?: string;
  activeId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const { t, theme } = usePreferences();
  const [colors, setColors] = useState<{ accent: string; core: string } | null>(null);
  const [holder, near] = useInViewOnce<HTMLDivElement>();

  useEffect(() => {
    const cssHexColor = (token: string) => {
      const components = getComputedStyle(document.documentElement)
        .getPropertyValue(token)
        .trim()
        .split(/\s+/)
        .map(Number);
      if (components.length !== 3 || components.some((component) => !Number.isFinite(component))) {
        throw new Error(`Invalid theme color token: ${token}`);
      }
      return `#${components
        .map((component) => Math.round(Math.min(255, Math.max(0, component))).toString(16).padStart(2, "0"))
        .join("")}`;
    };
    setColors({ accent: cssHexColor("--accent"), core: cssHexColor("--surface") });
  }, [theme]);

  return (
    <div className="flex flex-col items-center gap-6">
      {colors && near ? (
        <div className={className}>
          <GlobeCanvas accent={colors.accent} core={colors.core} activeId={activeId} onSelect={onSelect} />
        </div>
      ) : <div ref={holder} className={className} aria-hidden="true" />}
      {showLegend && (
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-muted">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => onSelect(loc.id)}
              aria-pressed={activeId === loc.id}
              className="flex items-center gap-2 transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t.places.items[loc.id]?.name ?? loc.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
