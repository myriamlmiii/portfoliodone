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
