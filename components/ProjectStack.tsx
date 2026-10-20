"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { PendingBadge, StatusBadge } from "./PendingBadge";
import { Media, visibleMetrics } from "./ProjectMedia";
import { Reveal } from "./Reveal";
import { dirOf } from "@/lib/bidi";
import { usePreferences } from "./Preferences";

const STACK_TOP_REM = 6;
const STACK_STEP_PX = 14;
/** How much each covered card shrinks per card stacked on top of it. */
const SHRINK = 0.035;

function useStackMode() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return wide && !reduce;
}

function CardBody({ project, detail }: { project: Project; detail?: { opacity: MotionValue<number>; x: MotionValue<number> } }) {
  const wide = detail !== undefined;
  const { t } = usePreferences();
  const copy = t.projects[project.slug];
  const metrics = visibleMetrics(project);
  const px = t.projectText;
  const label = (text: string | undefined) => (text ? (px?.labels[text] ?? text) : text);
  const tagline = px?.taglines[project.slug] ?? project.tagline ?? copy?.outcome ?? project.outcome;
  const category = copy?.category ?? project.category;

  return (
    <>
      <Link
        href={`/projects/${project.slug}`}
        className={`relative block overflow-hidden bg-ink/5 ${wide ? "h-full" : "aspect-[16/10]"}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Media project={project} sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw" />
        {project.year && (
          <span className="absolute end-3 top-3 rounded-full bg-ink/75 px-2.5 py-0.5 tabular text-xs text-canvas">{project.year}</span>
        )}
        {!project.video && project.image && project.imageNote && (
          <span className="absolute bottom-3 start-3 rounded-full bg-ink/75 px-2.5 py-0.5 text-xs text-canvas">{project.imageNote}</span>
        )}
      </Link>

      <motion.div style={detail ? { opacity: detail.opacity, x: detail.x } : undefined} className={`flex min-h-0 flex-1 flex-col p-5 sm:p-6 ${wide ? "lg:p-8" : ""}`}>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <p dir={dirOf(category)} className={`${dirOf(category) ? "font-mono uppercase tracking-wider" : "font-medium"} text-xs text-accent rtl:text-right`}>{category}</p>
          {project.status && project.statusLabel && <StatusBadge status={project.status} label={label(project.statusLabel) ?? project.statusLabel} />}
        </div>
        <h3 dir={dirOf(project.title)} className="rtl:text-right font-display text-[1.75rem] leading-none text-ink lg:text-[2.25rem]">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p dir={dirOf(tagline)} className="rtl:text-right type-body mt-3 line-clamp-3 text-muted">{tagline}</p>

        {metrics.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-4 sm:grid-cols-3">
            {metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse">
                <dt dir={dirOf(px?.metrics[metric.label] ?? metric.label)} className="mt-0.5 text-xs leading-snug text-muted rtl:text-right">{px?.metrics[metric.label] ?? metric.label}</dt>
                <dd className="tabular font-mono text-lg font-medium text-ink">{metric.pending ? <PendingBadge /> : metric.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-1.5 pb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} dir="ltr" className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={`/projects/${project.slug}`} className="interactive-target inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent">
              {t.work.caseStudy} <ArrowUpRight size={15} />
            </Link>
            {project.href && (
              <a href={project.href} target="_blank" rel="noreferrer" className="interactive-target inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
                {label(project.demoLabel ?? "Live demo")} <ArrowUpRight size={14} />
              </a>
            )}
            {project.secondaryHref && (
              <a href={project.secondaryHref} target="_blank" rel="noreferrer" className="interactive-target inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
                {label(project.secondaryLabel ?? "More")} <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function StackedCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Cards beneath shrink and dim slightly as later cards pile on top.
  const buried = useTransform(progress, (p) => Math.min(total - 1 - index, Math.max(0, p * total - (index + 1))));
  const scale = useTransform(buried, (b) => 1 - b * SHRINK);
  const dim = useTransform(buried, (b) => Math.max(0.55, 1 - b * 0.12));

  // Details slide in as the card travels up to its pinned position.
  const { scrollYProgress: entry } = useScroll({ target: ref, offset: ["start end", "start 0.4"] });
  const detailOpacity = useTransform(entry, [0.25, 1], [0, 1]);
  const detailX = useTransform(entry, [0.25, 1], [28, 0]);

  return (
    <div
      ref={ref}
      className="sticky mb-8 lg:mb-10"
      style={{ top: `calc(${STACK_TOP_REM}rem + ${Math.min(index, 8) * STACK_STEP_PX}px)` }}
    >
      <motion.article
        style={{ scale, opacity: dim, transformOrigin: "50% 0%" }}
        className="group grid h-[min(30rem,70svh)] grid-cols-[1.15fr_1fr] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_-12px_32px_-18px_rgb(0_0_0/0.55)]"
      >
        <CardBody project={project} detail={{ opacity: detailOpacity, x: detailX }} />
      </motion.article>
    </div>
  );
}

/** Scroll-linked stack. Kept separate so the scroll target ref is always mounted when useScroll runs. */
function StackedProjects({ projects }: { projects: readonly Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <div ref={containerRef} className="relative">
      {projects.map((project, index) => (
        <StackedCard key={project.slug} project={project} index={index} total={projects.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

export function ProjectStack({ projects }: { projects: readonly Project[] }) {
  const stacked = useStackMode();

  if (!stacked) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={Math.min(index * 0.06, 0.24)}>
            <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-accent/50">
              <CardBody project={project} />
            </article>
          </Reveal>
        ))}
      </div>
    );
  }

  return <StackedProjects projects={projects} />;
}
