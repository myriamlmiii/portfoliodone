export interface Project {
  slug: string;
  title: string;
  outcome: string;
  metric: string;
  tags: readonly string[];
  category: string;
}

export interface Skill {
  name: string;
  description: string;
  category: "Engineering" | "Intelligence" | "Research" | "Strategy";
}

export interface NavItem {
  label: string;
  href: `#${string}`;
}
