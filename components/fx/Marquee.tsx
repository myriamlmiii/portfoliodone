"use client";

import { useEffect, useRef } from "react";
import { clamp, lerp } from "@/lib/store";

/**
 * Two-row infinite marquee. Speed rises with scroll velocity and rows skew in the direction of travel;
 * the second row runs the other way. Falls back to wrapped static chips under reduced motion.
 */
export function Marquee({ top, bottom }: { top: readonly string[]; bottom: readonly string[] }) {
  const rows = useRef<(HTMLDivElement | null)[]>([null, null]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    const offsets = [0, 0];
    let lastY = window.scrollY;
    let velocity = 0;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      velocity = lerp(velocity, y - lastY, 0.12);
      lastY = y;
      const speed = 0.6 + Math.abs(velocity) * 0.35;
      const skew = clamp(-velocity * 0.4, -12, 12);
      rows.current.forEach((row, i) => {
        if (!row) return;
        const dir = i === 0 ? -1 : 1;
        const half = row.scrollWidth / 2;
        offsets[i] += dir * speed;
        if (dir < 0 && offsets[i] <= -half) offsets[i] += half;
        if (dir > 0 && offsets[i] >= 0) offsets[i] -= half;
        row.style.transform = `translate3d(${offsets[i]}px,0,0) skewX(${skew}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    // Row 2 starts at -half so it can travel right without a gap.
    rows.current[1] && (offsets[1] = -rows.current[1]!.scrollWidth / 2);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const renderRow = (items: readonly string[], i: number, accent: boolean) => (
    <div className="overflow-hidden" aria-hidden={i === 1 ? "true" : undefined}>
      <div
        ref={(el) => {
          rows.current[i] = el;
        }}
        className="flex w-max gap-3 will-change-transform motion-reduce:w-auto motion-reduce:flex-wrap"
      >
        {[...items, ...items].map((item, k) => (
          <span
            key={k}
            className={`whitespace-nowrap rounded-full border px-5 py-2.5 font-display text-xl tracking-wide ${
              accent ? "border-accent/50 text-accent" : "border-line text-ink/80"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-3 py-2" role="list" aria-label="Certifications and honors">
      {renderRow(top, 0, false)}
      {renderRow(bottom, 1, true)}
    </div>
  );
}
