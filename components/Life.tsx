"use client";

import Image from "next/image";
import { life } from "@/data/life";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePreferences } from "./Preferences";

export function Life() {
  const { t } = usePreferences();

  return (
    <section id="life" className="section-pad">
      <div className="container-content">
        <SectionHeading eyebrow={t.life.kicker} title={t.life.titleBefore} accent={t.life.titleAccent} intro={t.life.intro} />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {life.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="h-full rounded-xl bg-surface p-5 sm:p-6">
                {item.year && <p className="type-meta mb-2 tabular text-accent">{item.year}</p>}
                <div className="mb-2 flex items-center justify-between gap-4">
                  <h3 className="font-display text-lg font-medium text-ink">{t.life.items[i]?.title ?? item.title}</h3>
                  {item.logo && (
                    <Image src={item.logo} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-contain" />
                  )}
                </div>
                <p className="type-meta text-muted">{t.life.items[i]?.detail ?? item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
