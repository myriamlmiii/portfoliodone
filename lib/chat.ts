import { contact, emailsInline } from "@/data/contact";
import { education } from "@/data/education";
import { projects } from "@/data/projects";

export type ChatMessage = { role: "user" | "assistant"; content: string };

const featured = projects.filter((p) => p.featured);

/** Grounding for the model. Built from the same data the site renders, so the two never drift. */
export const SYSTEM_PROMPT = [
  "You are AI Meriem, the friendly guide on Meriem Lmoubariki's portfolio site. You speak warmly and naturally, as if Meriem herself is walking visitors through her work. Answer briefly (max 4 sentences) in a conversational, welcoming tone.",
  "Guide visitors to the right section of the site when relevant (e.g. 'scroll down to the Work section', 'check the Experience section'). Help them explore and discover Meriem's work.",
  `Only state facts listed below. If you don't know, say you're not sure and suggest emailing ${emailsInline}. Never invent employers, dates, numbers or links.`,
  "Meriem: final-year CS student (B.Sc. in Computer Science with a double specialization in AI and Big Data Analytics, and a minor in Business Administration) at Al Akhawayn University, Morocco, graduating December 2026. Positioned as a builder of systems: engineer, researcher, business mind. She also works in quantitative finance — algorithmic trading, crypto analytics, and ML-driven price forecasting.",
  "Education: " + education.map((e) => `${e.school} (${e.dateRange}): ${e.highlights.join("; ")}`).join(" | "),
  "Featured projects: " + featured.map((p) => `${p.title} - ${p.tagline ?? p.outcome}`).join(" | "),
  `Contact: ${contact.email} (personal), ${contact.academicEmail} (university), GitHub myriamlmiii, a 30-minute booking link is in the Contact section.`,
].join("\n");

export const PRESETS: { q: string; a: string; match: RegExp }[] = [
  {
    q: "What does Meriem build?",
    match: /build|project|work|made|portfolio|trad|quant|crypto/i,
    a: "She builds AI systems that do real work: drug-discovery screening pipelines, a RAG assistant for course notes, the AgriVerse sustainable-farming project, and quantitative finance work like algorithmic trading and crypto price forecasting. Scroll to the Work section for the full list.",
  },
  {
    q: "Where did she study?",
    match: /stud|school|universit|educat|exchange|ufv|aui/i,
    a: "Al Akhawayn University in Morocco (B.S. Computer Science, AI & Big Data, minor in Business), plus a Fall 2025 exchange semester at the University of the Fraser Valley in Canada.",
  },
  {
    q: "Tell me about her research.",
    match: /research|kmutt|drug|cancer|compound|thailand|paper/i,
    a: "At KMUTT in Bangkok she screened 51,837 compounds for breast cancer medication research (ROC-AUC 0.978 with Extra Trees) and narrowed them to 8 candidates; the strongest docked at -8.96 kcal/mol.",
  },
  {
    q: "How can I reach her?",
    match: /contact|reach|email|hire|meet|book/i,
    a: `Email ${emailsInline}, or book a 30-minute call from the Contact section at the bottom of the page.`,
  },
];

export function presetAnswer(input: string) {
  const hit = PRESETS.find((p) => p.match.test(input));
  return (
    hit?.a ??
    `I can answer questions about Meriem's projects, education and how to reach her. For anything else, email ${emailsInline}.`
  );
}
