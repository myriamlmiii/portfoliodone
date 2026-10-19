"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { education } from "@/data/education";
import { projects } from "@/data/projects";
import { OrgLogo } from "./OrgLogo";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePreferences } from "./Preferences";

export function Education() {
  const { t } = usePreferences();

  return (
    <section id="education" className="section-pad">
      <div className="container-content">
        <SectionHeading eyebrow={t.education.kicker} title={t.education.titleBefore} accent={t.education.titleAccent} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {education.map((entry, i) => {
            const copy = t.education.entries[entry.id];
            const built = (entry.projects ?? []).map((slug) => projects.find((p) => p.slug === slug)).filter((p) => p !== undefined);

            return (
              <Reveal key={entry.id} delay={i * 0.08}>
                <article className="h-full border-t border-line bg-surface p-5 transition-colors hover:border-accent sm:p-6">
                  <div className="flex items-start gap-4">
                    <OrgLogo name={entry.school} logo={entry.logo} tone={entry.logoTone} size={48} />
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold leading-snug text-ink">{entry.school}</h3>
                      <p className="type-body mt-1 text-ink/80">{copy?.degree ?? entry.degree}</p>
                    </div>
                  </div>

                  <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} aria-hidden="true" />
                      {copy?.location ?? entry.location}
                    </span>
                    {(copy?.dateRange ?? entry.dateRange) && (
                      <span className="inline-flex items-center gap-1.5 tabular">
                        <Calendar size={13} aria-hidden="true" />
                        {copy?.dateRange ?? entry.dateRange}
                      </span>
                    )}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {(copy?.highlights ?? entry.highlights).map((item) => (
                      <li key={item} className="relative ps-4 text-sm leading-[1.7] text-muted before:absolute before:start-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-accent sm:text-base">
                        {item}
                      </li>
                    ))}
                  </ul>

                  {entry.id === "aui" && (
                    <Link
                      href="/#experience"
                      className="interactive-target mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-ink"
                    >
                      {t.education.campusRoles}
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                  {built.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                      <span className="text-sm text-muted">{t.education.builtHere}</span>
                      {built.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className="inline-flex min-h-9 items-center gap-1 rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                          {project.title}
                          <ArrowUpRight size={13} />
                        </Link>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="type-meta content-reading mt-6 text-muted">{t.about.accreditation}</p>
      </div>
    </section>
  );
}
