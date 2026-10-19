"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { usePreferences } from "../Preferences";

type Panel = { arc: string; title: string; org: string; meta: string };

/**
 * Horizontally scrolling timeline pinned inside a tall section: vertical scroll drives translateX,
 * an SVG path draws itself along the track, and each panel gets a --c variable (0..1) for its position.
 */
export function HorizontalJourney() {
  const { t } = usePreferences();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [still, setStill] = useState(false);

  const panels = useMemo<Panel[]>(
    () => [
      ...education.map((e) => ({ arc: "Education", title: e.degree, org: e.school, meta: e.location })),
      ...experience
        .filter((r) => (r.group ?? "professional") === "professional")
        .slice(0, 6)
        .map((r) => ({ arc: "Experience", title: r.title, org: r.org, meta: r.dateRange })),
    ],
    [],
  );

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768), []);

  useScrollProgress(
    section,
    (p) => {
      const el = track.current;
      if (!el) return;
      const max = Math.max(0, el.scrollWidth - window.innerWidth);
      el.style.transform = `translate3d(${-p * max}px,0,0)`;
      if (path.current) path.current.style.strokeDashoffset = String(1 - p);
      panelsRef.current.forEach((panel) => {
        if (!panel) return;
        const r = panel.getBoundingClientRect();
        const c = Math.min(1, Math.max(0, (r.left + r.width / 2) / window.innerWidth));
        panel.style.setProperty("--c", c.toFixed(3));
      });
    },
    "pin",
  );

  const card = (panel: Panel, i: number) => (
    <div
      key={`${panel.org}-${i}`}
      ref={(el) => {
        panelsRef.current[i] = el;
      }}
      className="journey-panel w-[min(78vw,26rem)] shrink-0 border border-line bg-surface/80 p-6 backdrop-blur-sm"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        {String(i + 1).padStart(2, "0")} · {panel.arc}
      </p>
      <h3 className="mt-3 font-display text-3xl leading-none text-ink">{panel.title}</h3>
      <p className="mt-3 text-sm text-ink/80">{panel.org}</p>
      <p className="type-meta mt-1 text-muted">{panel.meta}</p>
    </div>
  );

  if (still) {
    return (
      <section aria-label={t.journeyKicker} className="section-pad border-b border-line">
        <div className="container-content grid gap-4 md:grid-cols-2">{panels.map(card)}</div>
      </section>
    );
  }

  return (
    <section ref={section} aria-label={t.journeyKicker} className="relative border-b border-line" style={{ height: `${(panels.length + 1) * 70 + 60}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <p className="container-content mb-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">Path</p>
        <div className="relative">
          <svg aria-hidden="true" className="absolute inset-x-0 top-1/2 h-2 w-full -translate-y-1/2" viewBox="0 0 100 2" preserveAspectRatio="none">
            <path d="M0 1 H100" stroke="rgb(var(--line))" strokeOpacity="0.4" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none" />
            <path
              ref={path}
              d="M0 1 H100"
              pathLength={1}
              stroke="rgb(var(--accent))"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              fill="none"
              strokeDasharray={1}
              strokeDashoffset={1}
              style={{ filter: "drop-shadow(0 0 4px rgb(var(--accent)))" }}
            />
          </svg>
          <div ref={track} className="relative flex w-max items-center gap-8 px-[8vw] will-change-transform">
            {panels.map(card)}
          </div>
        </div>
      </div>
    </section>
  );
}
