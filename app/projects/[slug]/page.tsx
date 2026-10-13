import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { SHOW_PENDING } from "@/lib/pending";
import { PendingBadge, StatusBadge } from "@/components/PendingBadge";
import { ProjectCover } from "@/components/ProjectCover";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.tagline ?? project.outcome,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const role = experience.find((item) => item.id === project.experienceId);
  const metrics = (project.metrics ?? []).filter((metric) => SHOW_PENDING || !metric.pending);
  // Skip a gallery shot that is already the hero image.
  const gallery = project.gallery?.filter((shot) => project.video || shot.src !== project.image) ?? [];
  const others = projects.filter((item) => item.slug !== project.slug);
  const related = [
    ...others.filter((item) => item.tier === project.tier),
    ...others.filter((item) => item.tier !== project.tier),
  ].slice(0, 3);

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="container-content py-6 md:py-8">
        <Link
          href="/"
          className="interactive-target inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={14} />
          Back to portfolio
        </Link>
      </div>

      <section className="container-content pb-10 md:pb-16">
        <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
          <div>
            <div className="type-meta mb-3 flex flex-wrap items-center gap-3 text-accent">
              <p>{project.category}</p>
              {project.status && project.statusLabel && (
                <StatusBadge status={project.status} label={project.statusLabel} />
              )}
            </div>
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-ink">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="type-body content-reading mt-4 text-muted">{project.tagline}</p>
            )}
          </div>

          {metrics.length > 0 && (
            <div className="rounded-lg border border-line bg-surface p-4 sm:p-5">
              <p className="type-meta text-muted">Key results</p>
              <div className={`mt-4 grid gap-3 ${metrics.length === 1 ? "grid-cols-1" : metrics.length === 2 ? "grid-cols-2" : metrics.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
                {metrics.map((metric) => (
                  <div key={`${project.slug}-${metric.label}`} className="rounded-lg border border-line bg-canvas p-3">
                    {metric.pending ? (
                      <PendingBadge />
                    ) : (
                      <p className="tabular text-xl font-semibold text-ink">{metric.value}</p>
                    )}
                    <p className="type-caption mt-1 text-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="container-content pb-10 md:pb-16">
        <div className="overflow-hidden rounded-lg border border-line bg-surface p-1.5">
          <div className="relative overflow-hidden rounded-lg bg-ink/5">
            {project.video ? (
              <video
                src={project.video}
                poster={project.poster ?? project.image}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="aspect-video w-full bg-black object-contain"
              />
            ) : project.image ? (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={project.image}
                  alt={`${project.title} project hero`}
                  fill
                  sizes="(min-width: 1240px) 1200px, 100vw"
                  priority
                  className={project.imageFit === "contain" ? "bg-white object-contain p-10" : "object-cover object-top"}
                />
                {project.imageNote && (
                  <span className="absolute bottom-4 left-4 rounded-full bg-ink/75 px-3 py-1 text-sm text-canvas backdrop-blur">
                    {project.imageNote}
                  </span>
                )}
              </div>
            ) : (
              <div className="relative aspect-[16/9] w-full">
                <ProjectCover project={project} size="lg" />
              </div>
            )}
          </div>
        </div>

        {gallery.length === 1 && (
          <figure className="mt-6 grid items-center gap-6 rounded-lg border border-line bg-surface p-1.5 md:grid-cols-[1.4fr_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink/5">
              <Image src={gallery[0].src} alt={gallery[0].alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-top" />
            </div>
            {gallery[0].caption && (
              <figcaption className="px-4 pb-4 text-sm leading-relaxed text-muted md:px-2 md:pb-0">{gallery[0].caption}</figcaption>
            )}
          </figure>
        )}

        {gallery.length > 1 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {gallery.map((shot) => (
              <figure key={shot.src} className="overflow-hidden rounded-lg border border-line bg-surface p-1.5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink/5">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                {shot.caption && <figcaption className="px-3 py-3 text-xs leading-relaxed text-muted">{shot.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="container-content pb-10 md:pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div>
              <p className="type-meta mb-3 text-muted">Overview</p>
              <p className="content-reading type-body text-muted">{project.outcome}</p>
            </div>

            {project.problem && project.solution && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-line bg-surface p-6">
                  <p className="type-meta mb-2 text-accent">Problem</p>
                  <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
                </div>
                <div className="rounded-lg border border-line bg-surface p-6">
                  <p className="type-meta mb-2 text-accent">Solution</p>
                  <p className="text-sm leading-relaxed text-muted">{project.solution}</p>
                </div>
              </div>
            )}

            {project.impact && (
              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="type-meta mb-3 text-accent">Impact</p>
                <p className="type-body text-ink">{project.impact}</p>
              </div>
            )}

            {SHOW_PENDING && project.pendingNotes && project.pendingNotes.length > 0 && (
              <div className="rounded-lg bg-amber-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <p className="type-meta text-muted">To confirm</p>
                  <PendingBadge />
                </div>
                <ul className="space-y-2">
                  {project.pendingNotes.map((note) => (
                    <li key={note} className="text-sm leading-relaxed text-muted">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="rounded-lg border border-line bg-surface p-6">
            {role && (
              <Link
                href="/#experience"
                className="mb-6 block rounded-lg border border-line bg-canvas p-4 transition-colors hover:border-accent"
              >
                <p className="type-meta text-accent">Built during</p>
                <p className="mt-1 text-sm font-semibold text-ink">{role.title}</p>
                  <p className="type-caption mt-0.5 text-muted">
                  {role.org} · {role.dateRange}
                </p>
              </Link>
            )}
            {project.details && project.details.length > 0 && (
              <dl className="mb-8 space-y-4">
                {project.details.map((item) => (
                  <div key={item.label}>
                    <dt className="type-meta text-accent">{item.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="type-meta mb-3 text-muted">Topics</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-ink/5 px-2.5 py-1 text-sm text-muted">
                  {tag}
                </span>
              ))}
            </div>

            {((project.stack?.length ?? 0) > 0 || (SHOW_PENDING && (project.stackPending?.length ?? 0) > 0)) && (
              <div className="mt-8">
                <p className="type-meta mb-3 text-accent">Stack</p>
                <ul className="space-y-3">
                  {project.stack?.map((item) => (
                    <li key={item} className="flex items-center justify-between border-b border-line pb-2 text-sm text-muted">
                      <span>{item}</span>
                    </li>
                  ))}
                  {SHOW_PENDING && project.stackPending?.map((item) => (
                    <li key={item} className="flex items-center justify-between gap-3 border-b border-line pb-2 text-sm text-muted">
                      <span>{item}</span>
                      <PendingBadge />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="interactive-target inline-flex items-center gap-2 rounded-md bg-ink px-4 text-sm text-canvas transition-colors hover:bg-accent"
                >
                  {project.demoLabel ?? "Live demo"}
                  <ArrowUpRight size={14} />
                </a>
              )}
              {project.secondaryHref && (
                <a
                  href={project.secondaryHref}
                  target="_blank"
                  rel="noreferrer"
                  className="interactive-target inline-flex items-center gap-2 rounded-md border border-line bg-canvas px-4 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {project.secondaryLabel ?? "More"}
                  <ArrowUpRight size={14} />
                </a>
              )}
              {project.pdf && (
                <a
                  href={project.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="interactive-target inline-flex items-center gap-2 rounded-md border border-line bg-canvas px-4 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {project.pdfLabel ?? "PDF slides"}
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </aside>
        </div>
      </section>

      {project.highlights && project.highlights.length > 0 && (
        <section className="container-content pb-12 md:pb-20">
          <div className="rounded-lg border border-line bg-surface p-6 md:p-8">
            <p className="type-meta mb-5 text-muted">Key highlights</p>
            <div className="grid gap-4 md:grid-cols-3">
              {project.highlights.map((highlight, i) => (
                <div key={highlight} className="rounded-lg border border-line bg-canvas p-5">
                  <div className="tabular mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm leading-relaxed text-ink">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-content pb-20">
        <div className="flex items-center justify-between gap-4 pb-6">
          <h2 className="font-display type-section-title text-ink">
            More projects
          </h2>
          <Link href="/#work" className="interactive-target inline-flex items-center text-sm text-accent hover:text-ink">
            View all
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className="group overflow-hidden rounded-lg border border-line bg-surface p-1.5 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="overflow-hidden rounded-lg bg-ink/5">
                <div className="relative h-52">
                  {item.video ? (
                    <video
                      src={item.video}
                      poster={item.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  ) : item.image ?? item.poster ? (
                    <Image
                      src={(item.image ?? item.poster)!}
                      alt={`${item.title} feature`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className={`transition-transform duration-300 group-hover:scale-[1.04] ${item.imageFit === "contain" ? "bg-white object-contain p-6" : "object-cover"}`}
                    />
                  ) : (
                    <ProjectCover project={item} size="sm" bare />
                  )}
                </div>
              </div>
              <div className="p-4">
                <p className="type-meta mb-2 text-accent">{item.category}</p>
                <h3 className="font-display text-xl font-medium text-ink">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
