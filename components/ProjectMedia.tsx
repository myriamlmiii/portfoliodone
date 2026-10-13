"use client";

import Image from "next/image";
import { SHOW_PENDING } from "@/lib/pending";
import { useInViewOnce } from "@/lib/useInViewOnce";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

export const visibleMetrics = (project: Project) =>
  (project.metrics ?? []).filter((metric) => SHOW_PENDING || !metric.pending);

function LazyVideo({ project, sizes }: { project: Project; sizes: string }) {
  const [holder, near] = useInViewOnce<HTMLDivElement>("200px");
  const poster = project.poster ?? project.image;
  return (
    <div ref={holder} className="relative h-full w-full">
      {near ? (
        <video
          src={project.video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : poster ? (
        <Image src={poster} alt={`${project.title} preview`} fill sizes={sizes} className="object-cover object-top" />
      ) : (
        <ProjectCover project={project} size="sm" bare />
      )}
    </div>
  );
}

export function Media({ project, sizes }: { project: Project; sizes: string }) {
  if (project.video) return <LazyVideo project={project} sizes={sizes} />;
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
