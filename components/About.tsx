"use client";

import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePreferences } from "./Preferences";

export function About() {
  const { t } = usePreferences();
  const paragraphs = [t.about.p1, t.about.p2, t.about.p3, t.about.p4];

  return (
    <section id="about" className="section-pad bg-surface">
      <div className="container-content">
        <SectionHeading eyebrow={t.about.kicker} title={t.about.title} />

        <Reveal>
          <p className="max-w-4xl text-[clamp(1.5rem,2.6vw,1.875rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">
            {t.about.lead}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          <Reveal delay={0.05} className="content-reading space-y-5 text-base leading-[1.7] text-muted">
            {paragraphs.map((text) => (
              <p key={text.slice(0, 32)}>{text}</p>
            ))}
            <a href="#vision" className="interactive-target group inline-flex items-center gap-1 text-base text-accent hover:underline">
              {t.about.headed}
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="divide-y divide-line border-y border-line bg-canvas px-6 py-2 sm:px-8">
              {t.about.facts.map((fact) => (
                <div key={fact.label} className="py-4">
                  <dt className="type-caption font-medium text-muted">{fact.label}</dt>
                  <dd className="mt-1 text-base font-medium leading-snug text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="type-meta mt-4 px-2 text-muted">{t.about.accreditation}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
