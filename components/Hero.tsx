"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Github, Linkedin } from "lucide-react";
import { HeroScene } from "./HeroScene";
import { Portrait } from "./Portrait";
import { usePreferences } from "./Preferences";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  const { t } = usePreferences();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Scroll-linked exit: copy drifts up and fades, the 3D accent swells and dissolves.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scrollStyle = reduceMotion ? undefined : { y: copyY, opacity: copyOpacity };
  const sceneStyle = reduceMotion ? undefined : { scale: sceneScale, opacity: sceneOpacity };

  return (
    <section ref={sectionRef} id="top" className="hero-section relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32">
      <div className="container-content relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div style={scrollStyle} className="relative z-10 text-center lg:text-start">
          <motion.p {...fade(0)} className="type-eyebrow text-accent">
            {t.hero.kicker}
          </motion.p>

          <motion.h1
            {...fade(0.06)}
            className="font-display mt-3 text-[clamp(3rem,6.2vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.03em] text-ink"
          >
            Meriem
            <br />
            Lmoubariki.
          </motion.h1>

          <motion.p
            {...fade(0.12)}
            className="mx-auto mt-6 max-w-[32rem] text-[clamp(1.25rem,2vw,1.5rem)] font-medium leading-[1.35] text-ink/90 lg:mx-0"
          >
            {t.hero.title}
          </motion.p>

          <motion.p {...fade(0.18)} className="content-reading type-body mx-auto mt-4 text-muted lg:mx-0">
            {t.hero.body}
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
            <a
              href="#work"
              className="interactive-target inline-flex items-center rounded-full bg-accent px-5 text-base font-medium text-canvas transition-opacity hover:opacity-90"
            >
              {t.hero.cta}
            </a>
            <a href="#contact" className="interactive-target group inline-flex items-center gap-1 text-base text-accent hover:underline">
              {t.contact.kicker}
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
            <span className="flex items-center gap-1">
              <a
                href="https://github.com/myriamlmiii"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="interactive-target inline-flex w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/[0.06] hover:text-ink"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/meriem-lmoubariki-591710351"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="interactive-target inline-flex w-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/[0.06] hover:text-ink"
              >
                <Linkedin size={20} />
              </a>
            </span>
          </motion.div>

          <motion.dl {...fade(0.3)} className="mx-auto mt-10 grid max-w-xl gap-5 text-start sm:grid-cols-2 lg:mx-0">
            {t.hero.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="type-caption font-medium text-muted">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative px-6 sm:px-10 lg:px-0"
        >
          <motion.div
            aria-hidden="true"
            style={sceneStyle}
            className="pointer-events-none absolute -inset-10 sm:-inset-16 lg:-inset-24"
          >
            <HeroScene />
          </motion.div>
          <div className="relative">
            <Portrait />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
