"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** An expanding, fading ring that fires once when it scrolls into view ("landing" feedback). */
export function Shockwave({ size = 120, className = "" }: { size?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();

  return (
    <span ref={ref} aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      {inView && !reduce && (
        <motion.span
          className="absolute rounded-full border border-accent"
          style={{ width: size, height: size, left: -size / 2, top: -size / 2 }}
          initial={{ scale: 0.1, opacity: 0.8 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.33, 1, 0.68, 1] }}
        />
      )}
    </span>
  );
}
