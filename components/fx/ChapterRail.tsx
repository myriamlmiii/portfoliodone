"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { navigation } from "@/data/navigation";
import { useActiveChapter } from "@/lib/useActiveChapter";
import { usePreferences } from "../Preferences";

const ids = ["top", ...navigation.map((n) => n.href.slice(1))];

/** Vertical per-section progress rail on the right edge (wide screens only). */
export function ChapterRail() {
  const { t } = usePreferences();
  const reduce = useReducedMotion();
  const active = useActiveChapter(ids);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <nav aria-label="Chapters" className="fixed end-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
      <div className="relative flex flex-col items-end gap-4">
        <div aria-hidden="true" className="absolute inset-y-1 end-[3px] w-px bg-line/50">
          <motion.div style={{ scaleY: reduce ? scrollYProgress : scaleY }} className="h-full w-full origin-top bg-accent" />
        </div>
        {ids.map((id, i) => {
          const isActive = active === id;
          const label = id === "top" ? "Intro" : t.nav[navigation[i - 1].label] ?? navigation[i - 1].label;
          return (
            <a key={id} href={`#${id}`} aria-label={label} aria-current={isActive ? "true" : undefined} className="group relative flex items-center gap-3">
              <span
                className={`font-mono text-[10px] uppercase tracking-widest transition-opacity ${
                  isActive ? "text-accent opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
                }`}
              >
                {String(i).padStart(2, "0")} {label}
              </span>
              <span className={`relative z-10 block rounded-full transition-all ${isActive ? "h-2 w-2 bg-accent shadow-[0_0_8px_rgb(var(--accent))]" : "h-1.5 w-1.5 bg-line group-hover:bg-muted"}`} />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
