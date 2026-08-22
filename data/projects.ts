import type { Project } from "@/types";

/** Add a project by adding one typed object here; the grid updates automatically. */
export const projects: readonly Project[] = [
  {
    slug: "intelligent-systems",
    title: "Intelligent systems for complex decisions",
    outcome: "A case-study space for an AI product that turns fragmented information into a clear next action.",
    metric: "Case study in progress",
    tags: ["AI Systems", "Data", "Product"],
    category: "Applied intelligence",
  },
  {
    slug: "full-stack-product",
    title: "Products shaped around real behaviour",
    outcome: "A full-stack product narrative: a human need, a scalable system, and evidence of value created.",
    metric: "Build → learn → improve",
    tags: ["Full Stack", "UX", "APIs"],
    category: "Product engineering",
  },
  {
    slug: "research-impact",
    title: "Research with a route to impact",
    outcome: "An experiment-led project connecting a rigorous technical question to a problem worth solving.",
    metric: "Research direction",
    tags: ["Research", "ML", "Impact"],
    category: "Research × impact",
  },
];
