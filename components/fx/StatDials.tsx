"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { stats } from "@/data/stats";
import { seg } from "@/lib/store";

const R = 44;
const C = 2 * Math.PI * R;
// The 94% RAG result already appears in the Highlights strip, so it is not repeated here.
const dialStats = stats.filter((s) => s.value !== 94);
const TICKS = Array.from({ length: 24 }, (_, i) => i);

function Dial({ index, progress, value, suffix, decimals = 0, label, still }: {
  index: number;
  progress: MotionValue<number>;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  still: boolean;
}) {
  // Each dial starts a little after the previous one.
  const local = useTransform(progress, (p) => (still ? 1 : seg(p, 0.05 + index * 0.1, 0.6 + index * 0.1)));
  const offset = useTransform(local, (l) => C * (1 - l));
  const shown = useTransform(local, (l) => {
    const v = decimals ? (value * l).toFixed(decimals) : Math.round(value * l).toLocaleString("en-US");
    return `${v}${suffix}`;
  });

  return (
    <li className="flex flex-col items-center text-center">
      <div className="relative h-32 w-32 sm:h-40 sm:w-40">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          {TICKS.map((i) => (
            <line
              key={i}
              x1="50"
              y1="2.5"
              x2="50"
              y2="6"
              stroke="rgb(var(--line))"
              strokeOpacity="0.5"
              strokeWidth="0.8"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgb(var(--line))" strokeOpacity="0.25" strokeWidth="2" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={C}
            style={{ strokeDashoffset: offset, filter: "drop-shadow(0 0 4px rgb(var(--accent) / 0.8))" }}
          />
        </svg>
        <motion.span className="absolute inset-0 flex items-center justify-center font-display text-2xl tabular sm:text-3xl text-ink">{shown}</motion.span>
      </div>
      <p className="type-meta mt-3 max-w-[18ch] text-muted">{label}</p>
    </li>
  );
}

/** Scroll-driven ring dials: 24 ticks, a filling arc and a counting value. */
export function StatDials() {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "end 0.45"] });

  return (
    <ul ref={ref} className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3" aria-label="Key numbers">
      {dialStats.map((s, i) => (
        <Dial key={s.label} index={i} progress={scrollYProgress} value={s.value} suffix={s.suffix} decimals={s.decimals} label={s.label} still={!!reduce} />
      ))}
    </ul>
  );
}
