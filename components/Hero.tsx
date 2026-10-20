"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { HeroScene } from "./HeroScene";
import { CharacterVideo } from "./CharacterVideo";
import { usePreferences } from "./Preferences";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/**
 * Editorial hero: an oversized name that overlaps a portrait bleeding off the right edge, a small
 * caption-style line under it, and understated text links instead of filled buttons.
 */
export function Hero() {
  const { t, locale } = usePreferences();
  const ar = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const copyStyle = reduceMotion ? undefined : { y: copyY, opacity: copyOpacity };
  const portraitStyle = reduceMotion ? undefined : { y: portraitY };
  const sceneStyle = reduceMotion ? undefined : { scale: sceneScale, opacity: sceneOpacity };

  return (
    <section ref={sectionRef} id="top" className="hero-section relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32 lg:min-h-[100svh]">
      {/* network behind the portrait, pushed to the right and allowed to bleed */}
      <motion.div aria-hidden="true" style={sceneStyle} className="pointer-events-none absolute -end-[12vw] top-0 h-[85%] w-[78vw] max-w-[1100px] opacity-70 lg:opacity-100">
        <HeroScene />
      </motion.div>

      {/* portrait: bleeds off the right edge, no box */}
      <motion.div
        style={portraitStyle}
        className="relative mx-auto mt-10 w-[min(88vw,30rem)] lg:absolute lg:end-[1vw] lg:top-24 lg:mx-0 lg:mt-0 lg:w-[min(46vw,44rem)]"
      >
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          <CharacterVideo />
        </motion.div>
      </motion.div>

      <div className="container-content relative z-10 lg:-mt-[0.5rem]">
        <motion.div style={copyStyle} className="relative max-w-none">
          <motion.p
            {...fade(0)}
            className="inline-block rounded-sm border border-accent/50 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent"
          >
            {t.hero.kicker}
          </motion.p>

          <motion.h1
            {...fade(0.06)}
            className={`font-display mt-6 text-ink lg:mt-10 ${ar ? "text-[clamp(3.25rem,10vw,8rem)] leading-[1.15] lg:text-[clamp(5rem,9vw,9rem)]" : "text-[clamp(4.25rem,14.5vw,13.5rem)] leading-[0.84] tracking-[0.005em] lg:-ms-6 lg:text-[clamp(7rem,13.2vw,13.5rem)]"}`}
          >
            {ar ? "مريم" : "Meriem"}
            <br />
            <span>{ar ? "المباركي." : "Lmoubariki."}</span>
          </motion.h1>

          <motion.p {...fade(0.14)} className="mt-8 max-w-[22rem] text-[11px] font-medium uppercase leading-[1.9] tracking-[0.2em] text-muted lg:mt-10">
            {t.hero.title}
          </motion.p>

          <motion.div {...fade(0.22)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#work"
              className="interactive-target group inline-flex items-center gap-2 border-b border-ink/40 pb-1 text-sm tracking-[0.04em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {t.hero.cta}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </a>
            <a
              href="#contact"
              className="interactive-target inline-flex items-center border-b border-transparent pb-1 text-sm tracking-[0.04em] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {t.contact.kicker}
            </a>
            <span className="flex items-center gap-1 text-muted">
              <a
                href="https://github.com/myriamlmiii"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="interactive-target inline-flex w-10 items-center justify-center transition-colors hover:text-accent"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/meriem-lmoubariki-591710351"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="interactive-target inline-flex w-10 items-center justify-center transition-colors hover:text-accent"
              >
                <Linkedin size={18} />
              </a>
            </span>
          </motion.div>

          <motion.dl {...fade(0.3)} className="mt-12 grid max-w-xl gap-x-10 gap-y-6 text-start sm:grid-cols-[1.5fr_1fr] lg:mt-16">
            {t.hero.facts.map((fact) => (
              <div key={fact.label} className="border-t border-line pt-3">
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{fact.label}</dt>
                <dd className="mt-2 space-y-1 text-base font-medium leading-snug tracking-[-0.005em] text-ink">
                  {fact.value.split(" · ").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
