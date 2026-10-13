"use client";

import { ArrowUpRight } from "lucide-react";
import { stats } from "@/data/stats";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";
import { usePreferences } from "./Preferences";

export function Impact() {
  const { t } = usePreferences();

  return (
    <section id="impact" className="section-pad border-b border-line bg-surface">
      <div className="container-content grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="mb-4 text-[13px] text-muted">{t.impact.kicker}</p>
          <h2 className="mb-6 font-display text-[clamp(32px,4.5vw,56px)] font-medium leading-[1.02] text-ink">
            {t.impact.titleBefore}
            <em className="text-accent not-italic">{t.impact.titleAccent}</em>
          </h2>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-muted">{t.impact.body}</p>
          <a href="#record" className="inline-flex items-center gap-2 border-b border-ink pb-1 text-[13px] text-ink transition-colors hover:border-accent hover:text-accent">
            {t.impact.cta} <ArrowUpRight size={14} />
          </a>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-8">
          {stats.map((stat, i) => (
            <AnimatedCounter key={stat.icon} stat={{ ...stat, label: t.impact.stats[i] ?? stat.label }} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
