"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { method } from "@/data/method";
import { usePreferences } from "./Preferences";

function Step({
  index,
  total,
  progress,
  title,
  body,
  n,
  animate,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  body: string;
  n: string;
  animate: boolean;
}) {
  // A step lights up as the scroll line reaches it, and stays lit once passed.
  const at = index / total;
  const lit = useTransform(progress, [Math.max(0, at - 0.14), at + 0.04], [0.28, 1]);
  const shift = useTransform(progress, [Math.max(0, at - 0.14), at + 0.04], [18, 0]);

  return (
    <motion.li
      style={animate ? { opacity: lit, x: shift } : undefined}
      className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-8 first:border-t sm:py-10"
    >
      <span className="font-mono text-xs text-accent">{n}</span>
      <div>
        <h3 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-ink">{title}</h3>
        <p className="type-body mt-3 max-w-[40ch] text-muted">{body}</p>
      </div>
    </motion.li>
  );
}

export function Method() {
  const { t } = usePreferences();
  const reduce = useReducedMotion();
  const animate = !reduce;
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // Whole-section progress drives the parallax layers.
  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const numeralY = useTransform(sectionProgress, [0, 1], [90, -90]);
  const gridY = useTransform(sectionProgress, [0, 1], [-40, 40]);

  // List progress drives the step highlight and the vertical guide line.
  const { scrollYProgress: listProgress } = useScroll({ target: listRef, offset: ["start 0.7", "end 0.55"] });
  const lineScale = useTransform(listProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="method" className="relative overflow-hidden border-b border-line section-pad">
      <motion.div
        aria-hidden="true"
        style={animate ? { y: gridY } : undefined}
        className="pointer-events-none absolute inset-x-0 -top-20 h-[130%] opacity-[0.35] [background-image:radial-gradient(rgb(var(--line)/0.55)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]"
      />
      <motion.span
        aria-hidden="true"
        style={animate ? { y: numeralY } : undefined}
        className="pointer-events-none absolute -start-4 top-1/3 select-none font-display text-[clamp(14rem,32vw,30rem)] leading-none text-accent/[0.06]"
      >
        04
      </motion.span>

      <div className="container-content relative grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <p className="type-eyebrow mb-4 font-mono uppercase tracking-wider text-accent">{t.method.kicker}</p>
          <h2 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] text-ink">
            {t.method.titleBefore}
            <span className="text-accent">{t.method.titleAccent}</span>
          </h2>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -start-4 bottom-0 top-0 w-px bg-line/60 md:-start-6">
            <motion.div
              style={animate ? { scaleY: lineScale } : undefined}
              className="h-full w-full origin-top bg-accent"
            />
          </div>
          <ol ref={listRef}>
            {method.map((step, i) => (
              <Step
                key={step.n}
                index={i}
                total={method.length}
                progress={listProgress}
                n={step.n}
                title={t.method.steps[i]?.title ?? step.title}
                body={t.method.steps[i]?.body ?? step.body}
                animate={animate}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
