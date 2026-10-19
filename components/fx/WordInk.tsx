"use client";

import { useEffect, useMemo, useRef } from "react";
import { clamp, seg } from "@/lib/store";
import { useScrollProgress } from "@/lib/useScrollProgress";

/**
 * A paragraph whose words light up one by one as you scroll. Words in `keywords` switch to the
 * accent colour once revealed. Updates the DOM directly, so scrolling never re-renders React.
 */
export function WordInk({ text, keywords = [], className = "" }: { text: string; keywords?: readonly string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(/\s+/), [text]);
  const keys = useMemo(() => new Set(keywords.map((k) => k.toLowerCase())), [keywords]);
  const spans = useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useRef(false);

  const apply = (progress: number) => {
    const n = words.length;
    spans.current.forEach((el, i) => {
      if (!el) return;
      const w = clamp(progress * (n + 3) - i);
      el.style.opacity = String(0.16 + 0.84 * w);
      el.dataset.lit = w >= 1 ? "1" : "0";
    });
  };

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) apply(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  useScrollProgress(ref, (p) => {
    if (!reduce.current) apply(seg(p, 0.3, 0.62));
  });

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const key = word.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, "");
        return (
          <span
            key={i}
            ref={(el) => {
              spans.current[i] = el;
            }}
            data-key={keys.has(key) ? "1" : undefined}
            className="word-ink"
            style={{ opacity: 0.16 }}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}
