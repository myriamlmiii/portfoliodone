"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Page-wide horizontal progress: scaleX(scrollY / maxScroll), pinned to the bottom edge of the nav. */
export function ScrollProgressBar() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent shadow-[0_0_8px_rgb(var(--accent)/0.8)]"
    />
  );
}
