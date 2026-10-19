"use client";

import { useEffect, useRef, type RefObject } from "react";
import { clamp } from "./store";

/**
 * Calls `onProgress` (0..1) every animation frame the value changes.
 *  - "pin":  progress across a tall section that has a sticky child
 *  - "view": from the element entering the viewport bottom to leaving the top
 * Driven by rAF instead of scroll events, and never causes a React render by itself.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  mode: "pin" | "view" = "view",
) {
  const callback = useRef(onProgress);
  callback.current = onProgress;

  useEffect(() => {
    let raf = 0;
    let last = -1;

    const tick = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw =
          mode === "pin"
            ? -rect.top / Math.max(1, rect.height - vh)
            : (vh - rect.top) / (vh + rect.height);
        const p = clamp(raw);
        if (p !== last) {
          last = p;
          callback.current(p);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref, mode]);
}
