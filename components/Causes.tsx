"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePreferences } from "./Preferences";

/** The four causes I defend. */
export function Causes() {
  const { t } = usePreferences();

  return (
    <section id="causes" className="section-pad bg-surface">
      <div className="container-content">
        <SectionHeading eyebrow={t.causes.kicker} title={t.story?.defend ?? t.causes.titleBefore} intro={t.causes.intro} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {t.causes.items.map((cause, i) => (
            <Reveal key={cause.title} delay={i * 0.08}>
              <article className="flex h-full flex-col border-t border-line bg-canvas p-5 transition-colors hover:border-accent sm:p-6">
                <h3 className="text-lg font-semibold leading-snug text-ink">{cause.title}</h3>
                <p className="type-body mt-3 text-muted">{cause.body}</p>
                {cause.link && (
                  <Link href={cause.link} className="interactive-target group mt-auto inline-flex items-center gap-1 pt-5 text-base text-accent hover:underline">
                    AgriVerse
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
