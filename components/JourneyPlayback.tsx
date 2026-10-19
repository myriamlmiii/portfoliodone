"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Journey } from "./Journey";
import { useLenis } from "./LenisProvider";
import { usePreferences } from "./Preferences";

/** Viewport-heights of scroll given to each step. */
const VH_PER_STEP = 0.6;
/** Seconds of auto-play per step. */
const SECONDS_PER_STEP = 2.2;

export function JourneyPlayback() {
  const reduce = useReducedMotion();
  return reduce ? <Journey /> : <JourneyScrubber />;
}

function JourneyScrubber() {
  const { t } = usePreferences();
  const lenis = useLenis();
  const steps = t.journey;
  const count = steps.length;

  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setIndex(Math.min(count - 1, Math.max(0, Math.round(p * (count - 1)))));
  });

  /** Absolute scrollY range over which the timeline plays. */
  const range = useCallback(() => {
    const el = ref.current;
    if (!el) return null;
    const start = el.getBoundingClientRect().top + window.scrollY;
    return { start, end: start + el.offsetHeight - window.innerHeight };
  }, []);

  const seek = useCallback(
    (fraction: number, duration = 0.9) => {
      const r = range();
      if (!r) return;
      const y = r.start + (r.end - r.start) * fraction;
      if (lenis) lenis.scrollTo(y, { duration });
      else window.scrollTo({ top: y, behavior: "smooth" });
    },
    [lenis, range]
  );

  // Auto-play: advance scroll at a constant rate; any manual input pauses it.
  useEffect(() => {
    if (!playing) return;
    const r = range();
    if (!r) return;

    const total = (count - 1) * SECONDS_PER_STEP;
    let frame = 0;
    let last = performance.now();
    let y = Math.max(window.scrollY, r.start);
    if (y >= r.end - 1) y = r.start;

    const stop = () => setPlaying(false);
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      y += ((r.end - r.start) / total) * dt;
      if (y >= r.end) {
        lenis?.scrollTo(r.end, { immediate: true });
        if (!lenis) window.scrollTo(0, r.end);
        stop();
        return;
      }
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    const events = ["wheel", "touchstart", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { passive: true }));
    return () => {
      cancelAnimationFrame(frame);
      events.forEach((e) => window.removeEventListener(e, stop));
    };
  }, [playing, lenis, range, count]);

  const label = `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
  const isLast = index === count - 1;

  return (
    <section
      ref={ref}
      id="journey"
      aria-label={t.journeyKicker}
      className="relative border-b border-line"
      style={{ height: `${100 + (count - 1) * VH_PER_STEP * 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden py-10 sm:py-14">
        <div className="container-content flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t.journeyKicker}</p>
          <p className="font-mono text-xs tabular text-muted" aria-hidden="true">
            {label}
          </p>
        </div>

        <div className="container-content flex flex-1 items-center justify-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -28, filter: "blur(6px)" }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className={`max-w-4xl text-center font-display leading-[1] ${
                isLast ? "text-accent" : "text-ink"
              } text-[clamp(2.5rem,7.5vw,6rem)]`}
            >
              {steps[index]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="container-content">
          {/* Timeline track: click a marker to seek. */}
          <div className="relative mb-6 h-6">
            <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
            <motion.div style={{ width: fill }} className="absolute inset-y-0 start-0 top-1/2 h-px bg-accent" />
            {steps.map((step, i) => (
              <button
                key={step}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  seek(count > 1 ? i / (count - 1) : 0);
                }}
                aria-label={`${i + 1}: ${step}`}
                aria-current={i === index ? "step" : undefined}
                className="group absolute top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ insetInlineStart: `${count > 1 ? (i / (count - 1)) * 100 : 0}%` }}
              >
                <span
                  className={`block rounded-full transition-all ${
                    i <= index ? "h-2.5 w-2.5 bg-accent" : "h-2 w-2 bg-line group-hover:bg-muted"
                  } ${i === index ? "ring-4 ring-accent/25" : ""}`}
                />
              </button>
            ))}
          </div>

          {/* Transport controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                seek(0, 1.1);
              }}
              aria-label="Rewind to start"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <RotateCcw size={18} />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? "Pause journey" : "Play journey"}
              aria-pressed={playing}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-canvas transition-opacity hover:opacity-90"
            >
              {playing ? <Pause size={20} /> : <Play size={20} className="translate-x-px" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
