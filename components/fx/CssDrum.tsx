"use client";

import { useRef, useState } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";

/**
 * CSS-3D rotating drum: panels sit on a circle (rotateY(i*STEP) translateZ(r)) and the whole drum turns
 * with scroll while a sticky container pins it. Pure CSS, so it works where WebGL does not.
 */
export function CssDrum({ items }: { items: readonly { label: string; group: string }[] }) {
  const section = useRef<HTMLDivElement>(null);
  const drum = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = items.length;
  const STEP = 360 / n;
  const RADIUS = Math.round(130 / Math.tan(Math.PI / n));

  useScrollProgress(
    section,
    (p) => {
      const rot = p * (n - 1) * STEP;
      if (drum.current) drum.current.style.transform = `translateZ(-${RADIUS}px) rotateX(-6deg) rotateY(${-rot}deg)`;
      setActive(Math.round(p * (n - 1)));
    },
    "pin",
  );

  return (
    <div ref={section} style={{ height: `${Math.max(140, n * 8 + 60)}svh` }} role="group" aria-label="Skills carousel">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        <div className="relative h-24 w-64" style={{ perspective: 1200 }}>
          <div ref={drum} className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: `translateZ(-${RADIUS}px) rotateX(-6deg)` }}>
            {items.map((item, i) => (
              <div
                key={item.label}
                aria-hidden={i !== active}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-line bg-surface/90 backdrop-blur-sm"
                style={{ transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`, backfaceVisibility: "hidden" }}
              >
                <span className="font-display text-2xl text-ink">{item.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{item.group}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-16 font-mono text-xs tabular text-muted" aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
