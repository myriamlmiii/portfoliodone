import { emailsInline } from "@/data/contact";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { record } from "@/data/record";

/**
 * Retrieval for the site assistant. The knowledge base is built from the same data the pages render, split into
 * small cited chunks and ranked with BM25 (the lexical half of the hybrid setup in the RAG Class Assistant).
 * The model only sees the top chunks, so answers stay grounded and every reply can name its sources.
 */
export type Chunk = { id: string; source: string; text: string };

const EMAIL = emailsInline;

const profile: Chunk[] = [
  {
    id: "profile",
    source: "About",
    text: "Meriem Lmoubariki is a final-year Computer Science student (B.Sc. in Computer Science with a double specialization in AI and Big Data Analytics, and a minor in Business Administration) at Al Akhawayn University in Morocco, graduating December 2026. Based in Morocco and North America. She is an AI engineer and researcher applying to graduate programs and scholarships, with a record spanning peer-reviewed publication, funded international research, production AI systems, and entrepreneurship.",
  },
  {
    id: "scholarship",
    source: "Research record",
    text: "Graduate admissions and scholarship profile: published, Scopus-indexed paper at ICEF 2026 (Materials Research Proceedings) with King Fahd University of Petroleum and Minerals; funded research internship at KMUTT in Thailand (only undergraduate, first Moroccan); research assistantship with Prof. Sofiane Grira on a production RAG system serving 600 students; Merit Scholarship (60%) and Dean's List; three papers presented at IBRS 2026; Best Startup Award twice for the agrifood startup Bliss Bites; LeadGreen Fellowship Cohort 4.",
  },
  {
    id: "contact",
    source: "Contact",
    text: `Contact: ${EMAIL}. GitHub myriamlmiii. A 30-minute call can be booked from the Contact section. The CV, recommendation letters and references are private and sent by email on request, so ask by email.`,
  },
];

const fromProjects: Chunk[] = projects.map((p) => ({
  id: `project:${p.slug}`,
  source: `Project: ${p.title}`,
  text: [
    `${p.title} (${p.category}${p.year ? `, ${p.year}` : ""}). ${p.tagline ?? ""} ${p.outcome}`,
    p.metrics?.length ? "Results: " + p.metrics.map((m) => `${m.value} ${m.label}`).join("; ") + "." : "",
    p.problem ? `Problem: ${p.problem}` : "",
    p.solution ? `Solution: ${p.solution}` : "",
    p.impact ? `Impact: ${p.impact}` : "",
    p.stack?.length ? "Stack: " + p.stack.join(", ") + "." : "",
    p.highlights?.length ? "Highlights: " + p.highlights.join("; ") + "." : "",
  ]
    .filter(Boolean)
    .join(" "),
}));

const fromExperience: Chunk[] = experience.map((e) => ({
  id: `experience:${e.id}`,
  source: `Experience: ${e.title}, ${e.org}`,
  text: `${e.title} at ${e.org}, ${e.location} (${e.dateRange}). ${e.detail ?? ""} ${e.description} ${(e.bullets ?? []).join(" ")}`,
}));

const fromEducation: Chunk[] = education.map((e) => ({
  id: `education:${e.id}`,
  source: `Education: ${e.school}`,
  text: `Education: she studied at ${e.school}, ${e.location}${e.dateRange ? ` (${e.dateRange})` : ""}. Degree and program: ${e.degree}. ${e.highlights.join("; ")}.`,
}));

const fromRecord: Chunk[] = record
  .filter((g) => !g.compact)
  .flatMap((g) =>
    g.items.map((i) => ({
      id: `record:${i.title}`,
      source: `${g.label}: ${i.title.length > 60 ? i.title.slice(0, 57) + "..." : i.title}`,
      text: `${g.label}: ${i.title}${i.year ? ` (${i.year})` : ""}${i.status ? `, ${i.status}` : ""}. ${i.detail}`,
    }))
  );

const certifications: Chunk = {
  id: "certifications",
  source: "Certifications",
  text:
    "Certifications: " +
    (record.find((g) => g.compact)?.items.map((i) => `${i.title} (${i.detail})`).join("; ") ?? ""),
};

export const knowledge: readonly Chunk[] = [...profile, ...fromProjects, ...fromExperience, ...fromEducation, ...fromRecord, certifications];

const STOP = new Set("a an the and or of to in on for with is are was were be do does did how what who which where when why her she me my i you your it its at as by from this that about tell can could would".split(" "));
const SYNONYMS: Record<string, string[]> = {
  cv: ["resume", "references", "contact"],
  resume: ["cv", "references", "contact"],
  scholarship: ["scholarship", "award", "fellowship", "merit", "funded"],
  paper: ["publication", "published", "proceedings", "research"],
  publication: ["paper", "published", "proceedings"],
  cancer: ["drug", "aromatase", "kmutt", "screening"],
  rag: ["retrieval", "assistant", "calculus"],
  chatbot: ["rag", "assistant"],
  study: ["education", "studied", "university", "degree"],
  studied: ["education", "university", "degree"], school: ["education", "studied", "university"],
  job: ["experience", "tech", "lead"],
  work: ["experience", "project"],
};

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1 && !STOP.has(w));

const docs = knowledge.map((c) => {
  const tokens = tokenize(c.text + " " + c.source);
  const tf = new Map<string, number>();
  tokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
  return { chunk: c, tf, len: tokens.length };
});
const avgLen = docs.reduce((s, d) => s + d.len, 0) / docs.length;
const df = new Map<string, number>();
docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1)));

/** BM25 over the knowledge chunks (k1 = 1.4, b = 0.75). Query terms are expanded with a few domain synonyms. */
export function retrieve(query: string, k = 4): { chunk: Chunk; score: number }[] {
  const base = tokenize(query);
  const terms = [...new Set([...base, ...base.flatMap((t) => SYNONYMS[t] ?? []).map((t) => t.toLowerCase())])];
  if (!terms.length) return [];
  const N = docs.length;
  return docs
    .map(({ chunk, tf, len }) => {
      let score = 0;
      for (const t of terms) {
        const f = tf.get(t);
        if (!f) continue;
        const n = df.get(t) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        const weight = base.includes(t) ? 1 : 0.5;
        score += weight * idf * ((f * 2.4) / (f + 1.4 * (0.25 + (0.75 * len) / avgLen)));
      }
      return { chunk, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

export const RAG_INSTRUCTIONS = [
  "You are AI Meriem, the friendly guide on Meriem Lmoubariki's portfolio. You speak warmly and naturally, as if Meriem herself is walking visitors through her work. Answer in at most 4 sentences.",
  "Guide visitors to the right section of the site when relevant (e.g. 'scroll down to the Work section to see the full project', 'check out the Experience section for more details'). Help them explore and discover.",
  "Answer ONLY from the numbered context passages provided. If they do not contain the answer, say you're not sure about that one and suggest emailing " + EMAIL + ". Never invent employers, dates, numbers or links.",
  "Cite the passages you used as [1], [2] after the claims they support. Reply in the language the visitor writes in.",
  "The CV and references are not on the site: say they are sent by email on request.",
].join("\n");

/** Context block for the model: the top passages, numbered so the answer can cite them. */
export function buildContext(hits: { chunk: Chunk }[]) {
  return hits.map((h, i) => `[${i + 1}] (${h.chunk.source}) ${h.chunk.text}`).join("\n\n");
}

/** Offline answer (no API key or upstream failure): the best-matching passages, quoted and sourced. */
export function extractiveAnswer(query: string) {
  const found = retrieve(query, 2);
  if (!found.length) {
    return `I can answer questions about Meriem's research, projects, education and how to reach her. For anything else, email ${EMAIL}.`;
  }
  // Quote whole sentences from the best passage (and the runner-up only if it is nearly as relevant).
  const hits = found.filter((h, i) => i === 0 || h.score >= found[0].score * 0.75);
  const sentences = (t: string) =>
    t
      .replace(/\b(Prof|Dr|Assoc|vs)\.\s/g, "$1\u0000 ")
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .map((s) => s.replace(/\u0000/g, "."));
  const quote = (t: string, budget: number) => {
    let out = "";
    for (const s of sentences(t)) {
      if (out && out.length + s.length > budget) break;
      out += (out ? " " : "") + s;
    }
    return out;
  };
  return hits.map((h, i) => quote(h.chunk.text, i === 0 ? 420 : 220)).join("\n\n") + sourcesLine(hits);
}

export const sourcesLine = (hits: { chunk: Chunk }[]) => `\n\nSources: ${hits.map((h) => h.chunk.source).join(" · ")}`;
