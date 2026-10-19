"use client";

import { useState, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const SPRING = { damping: 18, stiffness: 220 } as const;

/**
 * Spring-physics 3D tilt with a mouse-tracked spotlight. With `holo`, adds the holographic extras:
 * corner L-brackets, a rotating conic glow ring, drifting embers and a laser edge sweep.
 */
export function SpringTilt({
  children,
  className = "",
  max = 16,
  holo = false,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  holo?: boolean;
}) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useMotionValue(-999);
  const py = useMotionValue(-999);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), SPRING);
  const spotlight = useMotionTemplate`radial-gradient(circle 240px at ${px}px ${py}px, rgb(var(--accent) / 0.2), transparent 70%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    px.set(-999);
    py.set(-999);
    setHover(false);
  };

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        onPointerMove={onMove}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={onLeave}
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full"
      >
        {holo && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70"
            style={{ background: "conic-gradient(from 0deg, rgb(var(--accent)), transparent 30%, rgb(34 130 200), transparent 70%, rgb(var(--accent)))" }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}

        {children}

        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: spotlight }} />

        {holo && (
          <>
            {(["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"] as const).map((c) => (
              <span
                key={c}
                aria-hidden="true"
                className={`pointer-events-none absolute h-3 w-3 border-accent transition-all duration-300 group-hover:h-7 group-hover:w-7 ${c}`}
              />
            ))}
            <span aria-hidden="true" className="laser-edge pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden" />
            {hover && !reduce &&
              [14, 38, 62, 84].map((left, i) => (
                <motion.span
                  key={left}
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 h-1 w-1 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent))]"
                  style={{ left: `${left}%` }}
                  animate={{ y: [0, -90 - i * 14], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                />
              ))}
          </>
        )}
      </motion.div>
    </div>
  );
}
