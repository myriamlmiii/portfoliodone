"use client";

import { method } from "@/data/method";
import { Reveal } from "./Reveal";
import { usePreferences } from "./Preferences";

export function Method() {
  const { t } = usePreferences();

  return (
    <section id="method" className="section-pad border-b border-line">
      <div className="container-content grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <Reveal>
          <p className="mb-4 text-[13px] text-muted">{t.method.kicker}</p>
          <h2 className="font-display text-[clamp(32px,4.5vw,56px)] font-medium leading-[1.02] text-ink">
            {t.method.titleBefore}
            <em className="text-accent not-italic">{t.method.titleAccent}</em>
          </h2>
        </Reveal>

        <div className="border-t border-line">
          {method.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.07}>
              <div className="grid grid-cols-[56px_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[56px_140px_1fr]">
                <span className="tabular text-xs text-muted">{step.n}</span>
                <h3 className="font-display text-lg font-medium text-ink">{t.method.steps[i]?.title ?? step.title}</h3>
                <p className="col-span-2 text-sm leading-relaxed text-muted sm:col-span-1">{t.method.steps[i]?.body ?? step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
