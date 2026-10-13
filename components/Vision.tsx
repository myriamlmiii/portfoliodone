"use client";

import { CheckCircle2 } from "lucide-react";
import { accepted } from "@/data/applications";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePreferences } from "./Preferences";

export function Vision() {
  const { t } = usePreferences();

  return (
    <section id="vision" className="relative overflow-hidden bg-surface">
      <div className="section-pad container-content">
        <SectionHeading eyebrow={t.vision.kicker} title={t.vision.titleBefore} accent={t.vision.titleAccent} />

        <p className="type-eyebrow mb-4 text-accent">{t.vision.accepted}</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {accepted.map((program, i) => (
            <Reveal key={program.name} delay={i * 0.08}>
              <article className="flex h-full flex-col border-t border-line py-4 md:py-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <CheckCircle2 size={19} className="text-accent" strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug text-ink">
                  {t.vision.acceptedNames[i] ?? program.name}
                </h3>
                <p className="type-meta mt-2 text-muted">
                  {t.vision.acceptedDetails[i] ?? program.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
