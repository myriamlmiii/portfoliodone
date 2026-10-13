"use client";

import { stackGroups } from "@/data/skills";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SkillDrumSection } from "./SkillDrumSection";
import { usePreferences } from "./Preferences";

export function Skills() {
  const { t } = usePreferences();

  return (
    <section id="skills" className="section-pad bg-surface">
      <div className="container-content">
        <SectionHeading eyebrow={t.skills.kicker} title={t.skills.titleBefore} accent={t.skills.titleAccent} />

        <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {t.skills.items.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 0.06} className="border-b border-line sm:border-e sm:last:border-e-0">
              <div className="flex h-full min-h-[220px] flex-col justify-between p-5">
                <span className="font-mono tabular text-xs text-muted">0{i + 1}</span>
                <div>
                  <h3 className="mb-2 font-display text-xl font-medium text-ink">{skill.name}</h3>
                  <p className="type-meta text-muted">{skill.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <SkillDrumSection />
        </div>

        <Reveal delay={0.2}>
          <p className="type-meta mb-4 text-muted">{t.skills.stack}</p>
          <div className="grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.label}>
                <p className="type-meta mb-3 text-accent">{t.skills.stackGroups[group.label] ?? group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs text-ink">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
