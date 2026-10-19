export interface ProjectMetric {
  value: string;
  label: string;
  /** Not confirmed yet: renders a "Pending" badge instead of a guessed number. */
  pending?: boolean;
}

export type ProjectStatus = "live" | "in-progress" | "research";

export interface Project {
  slug: string;
  index: string;
  category: string;
  title: string;
  outcome: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  poster?: string;
  href?: string;
  secondaryHref?: string;
  pdf?: string;
  demoLabel?: string;
  secondaryLabel?: string;
  pdfLabel?: string;
  year?: string;
  org?: string;
  metrics?: readonly ProjectMetric[];
  problem?: string;
  solution?: string;
  impact?: string;
  stack?: readonly string[];
  highlights?: readonly string[];
  tagline?: string;
  tier?: 1 | 2 | 3;
  /** Shown as a card in the Work grid; the rest appear under "Also built" with a case-study link. */
  featured?: boolean;
  status?: ProjectStatus;
  statusLabel?: string;
  /** Stack details still to confirm, rendered with a "Pending" badge. */
  stackPending?: readonly string[];
  /** Open items to fill in later (links, metrics, visuals), rendered with a "Pending" badge. */
  pendingNotes?: readonly string[];
  /** Extra screenshots or photos shown below the hero on the case-study page. */
  gallery?: readonly ProjectImage[];
  /** Small label on the hero image, e.g. "Concept mockup" when it isn't a real screenshot. */
  imageNote?: string;
  /** "contain" for logos or square art that should not be cropped. */
  imageFit?: "cover" | "contain";
  /** Id of the role in data/experience.ts this project was built in, if it came from a job or internship. */
  /** Filter buckets for the Work section. */
  areas?: readonly ProjectArea[];
  experienceId?: string;
  /** Facts shown on the case-study page: organization, location, dates, supervisors. */
  details?: readonly { label: string; value: string }[];
}

export type ProjectArea = "ai" | "research" | "fullstack" | "data";

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface MoreProject {
  name: string;
  detail: string;
  slug?: string;
  experienceId?: string;
  metric?: ProjectMetric;
  areas?: readonly ProjectArea[];
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

export interface AuthorityItem {
  name: string;
  role: string;
  logo?: string;
  logoTone?: "light" | "dark" | "color";
  href?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  decimals?: number;
}

export interface Application {
  name: string;
  status: "accepted";
  detail?: string;
}

export interface MethodStep {
  n: string;
  title: string;
  body: string;
}

export interface ExperienceRole {
  id: string;
  /** Experience tab: jobs and internships, on-campus jobs, or other jobs and leadership. Defaults to "professional". */
  group?: "professional" | "campus" | "other";
  /** Organization website. */
  href?: string;
  /** Headline numbers shown under the role. */
  metrics?: readonly ProjectMetric[];
  logo?: string;
  /** "dark" puts the logo on a dark tile, for white-on-transparent marks. */
  logoTone?: "light" | "dark" | "color";
  dateRange: string;
  title: string;
  org: string;
  location?: string;
  detail?: string;
  description: string;
  /** Résumé-style bullet points (English); translated locales fall back to their description. */
  bullets?: readonly string[];
  compact?: boolean;
}

export interface RecordItem {
  title: string;
  detail: string;
  year?: string;
  href?: string;
  /** Companion material shown under the entry (e.g. the slides for a paper). */
  extra?: { label: string; href: string };
  /** Partner institution mark shown on the entry. */
  logo?: { src: string; alt: string; width: number; height: number };
  status?: "published" | "presented" | "submitted" | "in-progress";
  /** Sub-heading inside a compact group, e.g. "Cybersecurity" for certifications. */
  category?: string;
}

export interface RecordGroup {
  label: string;
  items: readonly RecordItem[];
  /** Rendered as a full-width strip of compact chips instead of a column. */
  compact?: boolean;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  location: string;
  /** Leave empty until confirmed; the UI simply omits it. */
  dateRange?: string;
  logo?: string;
  logoTone?: "light" | "dark" | "color";
  highlights: readonly string[];
  /** Slugs of projects built during this program. */
  projects?: readonly string[];
}
