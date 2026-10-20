import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE = "https://meriemlmoubariki.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${BASE}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
