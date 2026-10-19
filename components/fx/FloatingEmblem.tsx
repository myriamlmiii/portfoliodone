"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Faint "ML" emblem that gently bobs behind the hero 3D accent. */
export function FloatingEmblem({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      animate={reduce ? undefined : { y: [-3, 3, -3], scale: [1, 1.03, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.28" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.14" strokeDasharray="2 6" />
        <text x="100" y="122" textAnchor="middle" fontFamily="Bebas Neue, Impact, sans-serif" fontSize="76" fill="rgb(var(--accent))" fillOpacity="0.16">
          ML
        </text>
      </svg>
    </motion.div>
  );
}
