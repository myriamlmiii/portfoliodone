"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlobeReach } from "./GlobeReach";
import { usePreferences } from "./Preferences";

const COUNTRY_KEYS = ["Morocco", "Canada", "Portugal", "Thailand"] as const;

// Four points evenly spaced around a circle, starting at the top.
const ANGLES = COUNTRY_KEYS.map((_, i) => (-90 + i * (360 / COUNTRY_KEYS.length)) * (Math.PI / 180));
const OFFSETS = ANGLES.map((rad) => ({ x: Math.cos(rad), y: Math.sin(rad) }));

function Label({ text, offset, progress, radius, delay }: { text: string; offset: { x: number; y: number }; progress: import("framer-motion").MotionValue<number>; radius: number; delay: number }) {
  const spread = useTransform(progress, [0.12 + delay, 0.42 + delay], [0, 1]);
  const opacity = useTransform(progress, [0.1 + delay, 0.28 + delay, 0.85, 1], [0, 1, 1, 0]);
  const x = useTransform(spread, (s) => s * offset.x * radius);
  const y = useTransform(spread, (s) => s * offset.y * radius);

  return (
    <motion.span
      style={{ x, y, opacity }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-line bg-canvas/80 px-4 py-2 text-[13px] text-ink"
    >
      {text}
    </motion.span>
  );
}

export function PortraitToGlobe() {
  const { t } = usePreferences();
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    function update() {
      setRadius(window.innerWidth < 640 ? 0 : Math.min(230, window.innerWidth * 0.16));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const portraitOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.62]);
  const globeOpacity = useTransform(scrollYProgress, [0.38, 0.68], [0, 1]);

  return (
    <section id="about" className="border-b border-line">
      <div ref={containerRef} className="relative" style={{ height: "260vh" }}>
        <div className="sticky top-20 flex h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden">
          <div className="container-content grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-16">
            <div className="relative mx-auto flex h-[380px] w-full max-w-[320px] items-center justify-center md:mx-0">
              <motion.div
                style={{ opacity: portraitOpacity, scale: portraitScale }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full max-w-[280px]">
                  <div className="absolute -inset-3 -z-10 rounded-lg bg-accent/10 blur-2xl" />
                  <div className="overflow-hidden rounded-lg border border-line bg-surface">
                    <Image
                      src="/photos/portrait.jpg"
                      alt="Portrait of Meriem Lmoubariki"
                      width={900}
                      height={1200}
                      className="aspect-[3/4] w-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              {radius > 0 &&
                COUNTRY_KEYS.map((label, i) => (
                  <Label key={label} text={t.countries[label]} offset={OFFSETS[i]} progress={scrollYProgress} radius={radius} delay={i * 0.04} />
                ))}

              <motion.div style={{ opacity: globeOpacity }} className="absolute inset-0 flex items-center justify-center">
                <GlobeReach showLegend={false} className="h-full w-full" />
              </motion.div>
            </div>

            <div>
              <p className="mb-4 text-[13px] text-muted">{t.about.kicker}</p>
              <h2 className="mb-6 font-display text-[clamp(28px,3.8vw,44px)] font-medium leading-[1.05] text-ink">
                {t.about.title}
              </h2>
              <div className="max-w-xl space-y-4 text-[15px] leading-relaxed text-muted">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
                <p>
                  {t.about.p4}{" "}
                  <a href="#vision" className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
                    {t.about.headed}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
