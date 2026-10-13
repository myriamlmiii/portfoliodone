import type { Skill } from "@/types";

export const skills: readonly Skill[] = [
  { name: "Applied AI & Data", description: "Building machine learning and data systems that improve a real decision, not just automate a task.", category: "Intelligence" },
  { name: "Computational Research", description: "Turning curiosity into structured inquiry: a question, a method, evidence, and a sharper next question.", category: "Research" },
  { name: "Product & Strategy", description: "Framing technical work around users, constraints, and the leverage worth pursuing.", category: "Strategy" },
  { name: "Software Engineering", description: "Designing dependable full-stack systems, from interfaces and APIs to the infrastructure they run on.", category: "Engineering" },
];

/** Tech stack grouped for the Skills section; labels are translated via `t.skills.stackGroups`. */
export const stackGroups: readonly { label: string; items: readonly string[] }[] = [
  { label: "Languages", items: ["Python", "Java", "TypeScript", "SQL", "C"] },
  { label: "ML / AI", items: ["PyTorch", "TensorFlow", "Hugging Face", "Scikit-learn"] },
  { label: "Scientific computing", items: ["RDKit", "DeepChem", "GROMACS"] },
  { label: "Data engineering", items: ["Spark", "Kafka"] },
  { label: "Web & mobile", items: ["React", "Next.js", "React Native"] },
  { label: "DevOps & cloud", items: ["Docker", "Azure", "AWS"] },
];
