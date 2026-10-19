"use client";

import { motion, useReducedMotion } from "framer-motion";

const char = {
  h: { opacity: 0, y: "0.6em", filter: "blur(6px)" },
  s: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/** Per-character staggered reveal (0.035s per character). Words stay unbroken so wrapping is natural. */
export function CharReveal({
  text,
  className = "",
  delay = 0,
  play,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  /** When given, the reveal is driven by this flag instead of by scrolling into view. */
  play?: boolean;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  let i = 0;
  return (
    <Tag className={className} aria-label={text}>
      {text.split(" ").map((word, w, words) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {word.split("").map((c, k) => (
            <motion.span
              key={k}
              className="inline-block"
              variants={char}
              initial={reduce ? "s" : "h"}
              {...(reduce ? { animate: "s" } : play === undefined ? { whileInView: "s", viewport: { once: true, amount: 0.6 } } : { animate: play ? "s" : "h" })}
              transition={{ duration: 0.6, delay: delay + i++ * 0.035, ease: [0.16, 1, 0.3, 1] }}
            >
              {c}
            </motion.span>
          ))}
          {w < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
