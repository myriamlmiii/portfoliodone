"use client";

import { useEffect, useRef } from "react";
import { lerp, live } from "@/lib/store";

const HOT = "a, button, [role='button'], input, textarea, select, summary, [data-hot]";
/** Afterimage rings trail the main ring with progressively more lag and less opacity. */
const GHOSTS = [
  { follow: 0.1, opacity: 0.32 },
  { follow: 0.065, opacity: 0.18 },
  { follow: 0.04, opacity: 0.09 },
] as const;

/**
 * Physics ring cursor: a teal ring that trails the pointer (lerp 0.16), stretches and rotates
 * along its direction of travel, and grows over interactive elements. A small dot sits on the pointer,
 * and faint afterimage rings trail behind. Skipped on touch devices and under reduced motion.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ghostRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!fine || reduced || !ring || !dot) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    const ghostPos = GHOSTS.map(() => ({ x: tx, y: ty }));
    let hot = false;
    let visible = false;
    let raf = 0;

    const setVisible = (on: boolean) => {
      visible = on;
      const o = on ? "1" : "0";
      ring.style.opacity = o;
      dot.style.opacity = o;
      ghostRefs.current.forEach((g, i) => g && (g.style.opacity = on ? String(GHOSTS[i].opacity) : "0"));
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      live.mouse.x = e.clientX / window.innerWidth - 0.5;
      live.mouse.y = e.clientY / window.innerHeight - 0.5;
      hot = !!(e.target as Element | null)?.closest?.(HOT);
      if (!visible) {
        x = tx;
        y = ty;
        ghostPos.forEach((g) => ((g.x = tx), (g.y = ty)));
        setVisible(true);
      }
    };
    const onLeave = () => setVisible(false);

    const tick = () => {
      const px = x;
      const py = y;
      x = lerp(x, tx, 0.16);
      y = lerp(y, ty, 0.16);
      const vx = x - px;
      const vy = y - py;
      // per-frame travel (px); ~20px/frame counts as full speed
      const speed = Math.min(1, Math.hypot(vx, vy) / 20);
      const angle = Math.atan2(vy, vx);
      const grow = hot ? 1.9 : 1;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${grow * (1 + speed * 0.6)}, ${grow * (1 - speed * 0.35)})`;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%) scale(${hot ? 0.4 : 1})`;
      GHOSTS.forEach((cfg, i) => {
        const g = ghostPos[i];
        g.x = lerp(g.x, x, cfg.follow);
        g.y = lerp(g.y, y, cfg.follow);
        const el = ghostRefs.current[i];
        if (el) el.style.transform = `translate3d(${g.x}px, ${g.y}px, 0) translate(-50%, -50%) scale(${grow})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      {GHOSTS.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            ghostRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="cursor-ring cursor-ghost"
        />
      ))}
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
