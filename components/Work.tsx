"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { moreProjects, projects } from "@/data/projects";
import type { ProjectArea } from "@/types";
import { Media, visibleMetrics } from "./ProjectMedia";
import { ProjectStack } from "./ProjectStack";
import { ProjectTilt } from "./ProjectTilt";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePreferences } from "./Preferences";

type Filter = "all" | ProjectArea;
const FILTERS: readonly Filter[] = ["all", "ai", "research", "fullstack", "data"];
const featured = projects.filter((project) => project.featured);
const others = [
  ...projects
    .filter((project) => !project.featured)
    .map((project) => ({ key: project.slug, project, name: project.title, areas: project.areas ?? [] })),
  ...moreProjects
    .filter((item) => !item.slug)
    .map((item) => ({ key: item.name, project: undefined, name: item.name, areas: item.areas ?? [], detail: item.detail, metric: item.metric })),
];

export function Work() {
  const { t } = usePreferences();
  const [filter, setFilter] = useState<Filter>("all");
  const match = (areas: readonly ProjectArea[]) => filter === "all" || areas.includes(filter);
  const shownFeatured = featured.filter((project) => match(project.areas ?? []));
  const shownOthers = others.filter((item) => match(item.areas));
  const count = (selected: Filter) =>
    [...featured.map((project) => project.areas ?? []), ...others.map((item) => item.areas)]
      .filter((areas) => selected === "all" || areas.includes(selected)).length;

  return (
    <section id="work" className="section-pad">
      <div className="container-content">
        <SectionHeading eyebrow={t.work.kicker} title={t.work.titleBefore} accent={t.work.titleAccent} />

        <div role="tablist" aria-label={t.work.kicker} className="-mt-5 mb-8 flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={`interactive-target rounded-full border px-4 text-sm transition-colors ${
                filter === item ? "border-ink bg-ink text-canvas" : "border-line bg-surface text-muted hover:border-ink/40 hover:text-ink"
              }`}
            >
              {t.work.filters[item]}
              <span className={`ms-1.5 tabular text-xs ${filter === item ? "text-canvas/70" : "text-muted/70"}`}>{count(item)}</span>
            </button>
          ))}
        </div>

        {shownFeatured.length > 0 && <ProjectStack key={filter} projects={shownFeatured} />}

        {shownOthers.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 text-sm font-medium text-muted">{t.work.also}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shownOthers.map((item, index) => {
                const metric = item.project ? visibleMetrics(item.project).find((entry) => !entry.pending) : item.metric;
                const body = (
                  <>
                    {item.project && (
                      <div className="relative aspect-[16/9] overflow-hidden bg-ink/5">
                        <Media project={item.project} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h4 className="flex items-start justify-between gap-3 text-base font-semibold leading-snug text-ink">
                        {item.name}
                        {item.project && <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-accent" />}
                      </h4>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                        {t.more[item.name] ?? item.project?.tagline ?? item.project?.outcome ?? ("detail" in item ? item.detail : "")}
                      </p>
                      {metric && (
                        <p className="mt-auto pt-4 text-sm text-muted">
                          <span className="tabular text-lg font-semibold text-ink">{metric.value}</span> {metric.label}
                        </p>
                      )}
                    </div>
                  </>
                );
                return (
                  <Reveal key={item.key} delay={Math.min(index * 0.04, 0.2)}>
                    {item.project ? (
                      <Link href={`/projects/${item.project.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-accent/50">
                        <ProjectTilt className="h-full">{body}</ProjectTilt>
                      </Link>
                    ) : (
                      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface">{body}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
