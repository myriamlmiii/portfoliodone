"use client";

import { SectionHeading } from "./SectionHeading";
import { SkillDrumSection } from "./SkillDrumSection";
import { TechLogos } from "./TechLogos";
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

        <TechLogos />
      </div>
    </section>
  );
}
