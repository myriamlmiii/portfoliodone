"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Spinning award seal: curved text on a ring (<textPath>), inner rule, number + title in the centre. */
export function AwardSeal({
  n,
  title,
  subtitle,
  ring,
  index = 0,
}: {
  n: string;
  title: string;
  subtitle: string;
  /** Text that wraps around the outer ring. */
  ring: string;
  index?: number;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  const text = `${ring.toUpperCase()} · `.repeat(3);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative h-36 w-36 sm:h-48 sm:w-48">
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <path id={id} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
          </defs>
          <circle cx="100" cy="100" r="94" fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.5" />
          <circle cx="100" cy="100" r="66" fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.35" strokeDasharray="2 4" />
          <text fontSize="9.5" letterSpacing="3" fill="rgb(var(--accent))" fontFamily="JetBrains Mono, monospace">
            <textPath href={`#${id}`}>{text}</textPath>
          </text>
        </motion.svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-7 sm:px-9">
          <span className="font-display text-3xl leading-none sm:text-4xl text-accent">{n}</span>
          <span className="mt-1 font-display text-sm leading-tight sm:text-lg text-ink">{title}</span>
        </div>
      </div>
      <figcaption className="type-meta mt-3 max-w-[22ch] text-muted">{subtitle}</figcaption>
    </motion.figure>
  );
}
