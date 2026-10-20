"use client";

import { motion, useReducedMotion } from "framer-motion";

const GLOWS = [
  { cls: "left-[-8rem] top-[8%] h-[32rem] w-[32rem] bg-blue-400", delay: 0, dur: 9 },
  { cls: "right-[-10rem] top-[42%] h-[36rem] w-[36rem] bg-blue-700", delay: 2, dur: 10 },
  { cls: "bottom-[-10rem] left-[25%] h-[28rem] w-[28rem] bg-sky-500", delay: 4, dur: 8 },
] as const;

/** Large, heavily blurred circles that slowly breathe. Static under reduced motion; dark theme only (see CSS). */
export function AmbientGlows() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="dark-only pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {GLOWS.map((g, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[160px] ${g.cls}`}
          initial={{ scale: 1, opacity: 0.1 }}
          animate={reduce ? undefined : { scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: g.dur, delay: g.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
