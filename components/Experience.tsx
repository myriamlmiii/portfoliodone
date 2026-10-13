"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { moreProjects, projects } from "@/data/projects";
import { OrgLogo } from "./OrgLogo";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePreferences } from "./Preferences";

type GroupKey = "professional" | "campus" | "other";

const groups: Record<GroupKey, typeof experience> = {
  professional: experience.filter((role) => (role.group ?? "professional") === "professional" && role.id !== "grira"),
  campus: experience.filter((role) => role.group === "campus" || role.id === "grira"),
  other: experience.filter((role) => role.group === "other"),
};

function linkedProjects(roleId: string) {
  return [
    ...projects.filter((project) => project.experienceId === roleId).map((project) => ({ name: project.title, slug: project.slug as string | undefined })),
    ...moreProjects.filter((item) => item.experienceId === roleId && !item.slug).map((item) => ({ name: item.name, slug: undefined })),
  ];
}

export function Experience() {
  const { t } = usePreferences();
  const [active, setActive] = useState<GroupKey>("professional");

  return (
    <section id="experience" className="section-pad bg-surface">
      <div className="container-content">
        <SectionHeading eyebrow={t.experience.kicker} title={t.experience.titleBefore} accent={t.experience.titleAccent} />

        <div role="tablist" aria-label={t.experience.kicker} className="mb-8 grid w-full max-w-full grid-cols-1 gap-1 rounded-xl bg-canvas p-1 sm:inline-flex sm:w-auto sm:grid-cols-none sm:rounded-full">
          {(Object.keys(groups) as GroupKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className={`interactive-target flex min-w-0 items-center justify-between gap-2 rounded-full px-3 text-start text-sm transition-colors sm:px-4 ${
                active === key ? "bg-ink text-canvas" : "text-muted hover:text-ink"
              }`}
            >
              {t.experience.groups[key]}
              <span className={`ms-2 tabular text-xs ${active === key ? "text-canvas/70" : "text-muted/70"}`}>{groups[key].length}</span>
            </button>
          ))}
        </div>

        <ol role="tabpanel" className="relative max-w-4xl">
          {groups[active].map((role, i) => {
            const copy = t.experience.roles[role.id];
            const linked = linkedProjects(role.id);
            const bullets = copy ? [copy.description] : (role.bullets ?? [role.description]);
            const isLast = i === groups[active].length - 1;

            return (
              <li id={role.id} key={role.id} className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 pb-8 sm:gap-x-5">
                {!isLast && <span aria-hidden="true" className="absolute start-[23px] top-14 bottom-0 w-px bg-line" />}
                <OrgLogo name={role.org} logo={role.logo} tone={role.logoTone} size={48} />

                <Reveal delay={Math.min(i * 0.03, 0.15)}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-base font-semibold leading-snug text-ink sm:text-lg">
                      {copy?.title ?? role.title}
                      {role.dateRange.includes("Present") && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                          {t.experience.current}
                        </span>
                      )}
                    </h3>
                    <span className="type-meta inline-flex shrink-0 items-center gap-1.5 tabular text-muted">
                      <Calendar size={13} aria-hidden="true" />
                      {copy?.dateRange ?? role.dateRange}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink/80">
                    {role.href ? (
                      <a href={role.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
                        {role.org}
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      role.org
                    )}
                  </p>
                  <p className="type-meta mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                    {(copy?.location ?? role.location) && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} aria-hidden="true" />
                        {copy?.location ?? role.location}
                      </span>
                    )}
                    {(copy?.detail ?? role.detail) && <span>{copy?.detail ?? role.detail}</span>}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="relative ps-4 text-sm leading-[1.7] text-muted before:absolute before:start-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-accent sm:text-base">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {role.metrics && role.metrics.length > 0 && (
                    <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                      {role.metrics.map((metric) => (
                        <div key={metric.label}>
                          <dt className="sr-only">{metric.label}</dt>
                          <dd className="font-display text-xl font-semibold leading-none text-ink tabular">{metric.value}</dd>
                          <dd className="type-caption mt-1 text-muted">{metric.label}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {linked.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {linked.map((item) =>
                        item.slug ? (
                          <Link
                            key={item.name}
                            href={`/projects/${item.slug}`}
                            className="inline-flex min-h-9 items-center gap-1 rounded-full bg-canvas px-3 py-1 text-sm text-ink transition-colors hover:text-accent"
                          >
                            {item.name}
                            <ArrowUpRight size={13} />
                          </Link>
                        ) : (
                          <span key={item.name} className="inline-flex min-h-9 items-center rounded-full bg-canvas px-3 py-1 text-sm text-ink">
                            {item.name}
                          </span>
                        ),
                      )}
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
