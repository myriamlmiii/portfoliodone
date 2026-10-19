"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { createSequence, loadSequence, nearest } from "@/lib/frames";
import { clamp, seg } from "@/lib/store";
import { useScrollProgress } from "@/lib/useScrollProgress";

const HOLD_START = 0.05;
const HOLD_END = 0.9;

/** Where the frame is drawn: full-bleed-ish on desktop, padded and contained on mobile. */
function place(cw: number, ch: number, iw: number, ih: number) {
  const mobile = cw < 640;
  const maxW = cw * (mobile ? 0.94 : 0.62);
  const maxH = ch * (mobile ? 0.5 : 0.72);
  const s = Math.min(maxW / iw, maxH / ih);
  const w = iw * s;
  const h = ih * s;
  return { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
}

/**
 * Scroll-scrubbed project reel. A pinned canvas steps through project screenshots as you scroll,
 * cross-fading between neighbours, with hold zones at both ends. Frames load progressively.
 */
export function FrameReel() {
  const motionPref = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduce = mounted && motionPref;
  const frames = useMemo(() => projects.filter((p) => p.image).map((p) => ({ src: p.image as string, title: p.title, category: p.category })), []);
  const seq = useMemo(() => createSequence(frames.map((f) => f.src)), [frames]);
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const [label, setLabel] = useState(0);

  const draw = () => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const { width: cw, height: ch } = c;
    ctx.clearRect(0, 0, cw, ch);
    const f = seg(progress.current, HOLD_START, HOLD_END) * (frames.length - 1);
    const lo = Math.floor(f);
    const frac = f - lo;
    const paint = (index: number, alpha: number) => {
      const img = nearest(seq, index);
      if (!img || alpha <= 0) return;
      const p = place(cw, ch, img.naturalWidth, img.naturalHeight);
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, p.x, p.y, p.w, p.h);
    };
    paint(lo, 1 - frac);
    if (frac > 0) paint(Math.min(lo + 1, frames.length - 1), frac);
    ctx.globalAlpha = 1;
    const idx = clamp(Math.round(f), 0, frames.length - 1);
    setLabel((prev) => (prev === idx ? prev : idx));
  };

  useEffect(() => {
    if (reduce) return;
    loadSequence(seq);
    const resize = () => {
      const c = canvas.current;
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    const timer = window.setInterval(draw, 400); // pick up late-arriving frames while idle
    return () => {
      window.removeEventListener("resize", resize);
      window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, seq]);

  useScrollProgress(
    section,
    (p) => {
      progress.current = p;
      draw();
    },
    "pin",
  );

  if (reduce || frames.length < 2) return null;
  const current = frames[label];

  return (
    <section ref={section} aria-label="Project reel" className="relative border-b border-line" style={{ height: `${frames.length * 55 + 60}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-24 sm:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Reel</p>
          <p className="font-mono text-xs tabular text-muted">
            {String(label + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas to-transparent px-6 pb-10 pt-24 text-center sm:px-10" aria-live="polite">
          <p className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-none text-ink">{current.title}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">{current.category}</p>
        </div>
      </div>
    </section>
  );
}
