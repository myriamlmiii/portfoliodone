"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { markIntroDone } from "@/lib/intro";
import { lerp } from "@/lib/store";
import { useScrollApi } from "../LenisProvider";

const EASE = [0.76, 0, 0.24, 1] as const;
const MIN_MS = 1800;
const MAX_MS = 7000;

/**
 * Letterbox intro: two half-screen panels split open once fonts and page assets have loaded.
 * Locks scroll while visible. Skipped entirely under reduced motion.
 */
export function Intro() {
  const { setScrollLocked } = useScrollApi();
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    let target = 8;
    let shown = 0;
    let raf = 0;
    const started = performance.now();
    let done = false;

    document.fonts?.ready.then(() => (target = Math.max(target, 55)));
    const markLoaded = () => (target = 100);
    if (document.readyState === "complete") markLoaded();
    else window.addEventListener("load", markLoaded, { once: true });

    const tick = (now: number) => {
      shown = lerp(shown, target, 0.08);
      if (target === 100 && shown > 99.5) shown = 100;
      setPct(Math.round(shown));
      const elapsed = now - started;
      if (!done && ((shown >= 100 && elapsed > MIN_MS) || elapsed > MAX_MS)) {
        done = true;
        setVisible(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", markLoaded);
    };
  }, []);

  useEffect(() => {
    if (!visible) markIntroDone();
  }, [visible]);

  useEffect(() => {
    setScrollLocked(visible);
    return () => setScrollLocked(false);
  }, [visible, setScrollLocked]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="intro" role="status" aria-label="Loading" className="fixed inset-0 z-[10000]" exit={{ transition: { duration: 1.1 } }}>
          <motion.div className="absolute inset-x-0 top-0 h-1/2 bg-canvas" exit={{ y: "-100%" }} transition={{ duration: 1.1, ease: EASE }} />
          <motion.div className="absolute inset-x-0 bottom-0 h-1/2 bg-canvas" exit={{ y: "100%" }} transition={{ duration: 1.1, ease: EASE }} />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-4 text-center"
            exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="font-mono text-xs text-accent tabular">REEL 01 · {String(pct).padStart(3, "0")}</p>
            <p className="intro-title mt-6 max-w-full font-display uppercase text-ink">A Meriem Lmoubariki Portfolio</p>
            <div className="mt-10 h-px w-[min(60vw,22rem)] bg-line/60">
              <div className="h-full origin-left bg-accent shadow-[0_0_10px_rgb(var(--accent))]" style={{ transform: `scaleX(${pct / 100})` }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
