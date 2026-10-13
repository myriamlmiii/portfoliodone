import Image from "next/image";
import { SHOW_PENDING } from "@/lib/pending";
import type { Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

export const visibleMetrics = (project: Project) =>
  (project.metrics ?? []).filter((metric) => SHOW_PENDING || !metric.pending);

export function Media({ project, sizes }: { project: Project; sizes: string }) {
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
