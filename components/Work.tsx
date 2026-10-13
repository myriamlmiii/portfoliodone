"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { moreProjects, projects } from "@/data/projects";
import { SHOW_PENDING } from "@/lib/pending";
import type { Project, ProjectArea } from "@/types";
import { PendingBadge, StatusBadge } from "./PendingBadge";
import { ProjectCover } from "./ProjectCover";
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

const visibleMetrics = (project: Project) => (project.metrics ?? []).filter((metric) => SHOW_PENDING || !metric.pending);

function Media({ project, sizes }: { project: Project; sizes: string }) {
  if (project.video) {
    return (
      <video
        src={project.video}
        poster={project.poster ?? project.image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        sizes={sizes}
        className={`transition-transform duration-500 group-hover:scale-[1.03] ${project.imageFit === "contain" ? "bg-white object-contain p-6" : "object-cover object-top"}`}
      />
    );
  }
  return <ProjectCover project={project} size="sm" bare />;
}

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

        {shownFeatured.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {shownFeatured.map((project, index) => {
              const copy = t.projects[project.slug];
              const metrics = visibleMetrics(project);
              return (
                <Reveal key={project.slug} delay={Math.min(index * 0.06, 0.24)}>
                  <ProjectTilt className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-accent/50">
                      <Link href={`/projects/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-ink/5" tabIndex={-1} aria-hidden="true">
                        <Media project={project} sizes="(min-width: 768px) 50vw, 100vw" />
                        {project.year && (
                          <span className="absolute end-3 top-3 rounded-full bg-ink/75 px-2.5 py-0.5 tabular text-xs text-canvas">{project.year}</span>
                        )}
                        {!project.video && project.image && project.imageNote && (
                          <span className="absolute bottom-3 start-3 rounded-full bg-ink/75 px-2.5 py-0.5 text-xs text-canvas">{project.imageNote}</span>
                        )}
                      </Link>

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <p className="text-sm text-accent">{copy?.category ?? project.category}</p>
                          {project.status && project.statusLabel && <StatusBadge status={project.status} label={project.statusLabel} />}
                        </div>
                        <h3 className="font-display text-[1.375rem] font-medium leading-snug text-ink">
                          <Link href={`/projects/${project.slug}`} className="hover:text-accent">{project.title}</Link>
                        </h3>
                        <p className="type-body content-reading mt-2 line-clamp-3 text-muted">{project.tagline ?? copy?.outcome ?? project.outcome}</p>

                        {metrics.length > 0 && (
                          <dl className={`mt-5 grid gap-3 border-y border-line py-4 ${metrics.length === 1 ? "grid-cols-1" : metrics.length === 2 ? "grid-cols-2" : metrics.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
                            {metrics.map((metric) => (
                              <div key={metric.label} className="flex flex-col-reverse">
                                <dt className="mt-0.5 text-xs leading-snug text-muted">{metric.label}</dt>
                                <dd className="tabular text-xl font-semibold text-ink">{metric.pending ? <PendingBadge /> : metric.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}

                        <div className="mt-auto pt-4">
                          <div className="flex flex-wrap gap-1.5 border-b border-line pb-4">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="rounded-full bg-canvas px-2.5 py-1 text-xs text-muted">{tag}</span>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
                            <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent">
                              {t.work.caseStudy} <ArrowUpRight size={15} />
                            </Link>
                            {project.href && (
                              <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
                                {project.demoLabel ?? "Live demo"} <ArrowUpRight size={14} />
                              </a>
                            )}
                            {project.secondaryHref && (
                              <a href={project.secondaryHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
                                {project.secondaryLabel ?? "More"} <ArrowUpRight size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </ProjectTilt>
                </Reveal>
              );
            })}
          </div>
        )}

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
