"use client";

import {
  siDocker,
  siFastapi,
  siHuggingface,
  siNextdotjs,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siSupabase,
  siTypescript,
  siVercel,
} from "simple-icons";
import { Reveal } from "./Reveal";
import { usePreferences } from "./Preferences";

type Logo = { name: string; path?: string; hex: string };

const icon = (i: { title: string; path: string; hex: string }, name = i.title): Logo => ({ name, path: i.path, hex: `#${i.hex}` });
/** Tools without a public logo get a clean wordmark in their own colour. */
const word = (name: string, hex = "#2dd4bf"): Logo => ({ name, hex });

/** Each group is a verb, not a category: what I actually do with these tools. */
const groups: readonly { id: "build" | "train" | "simulate" | "ship"; logos: readonly Logo[] }[] = [
  { id: "build", logos: [icon(siPython), icon(siTypescript), icon(siNextdotjs, "Next.js"), icon(siFastapi, "FastAPI"), icon(siReact)] },
  { id: "train", logos: [icon(siPytorch), icon(siScikitlearn, "Scikit-learn"), icon(siHuggingface, "Hugging Face"), word("FAISS", "#4f8ff7"), word("Gensim", "#e6694a")] },
  { id: "simulate", logos: [word("RDKit"), word("GROMACS"), word("DeepChem"), word("AutoDock Vina", "#e6a23c")] },
  { id: "ship", logos: [icon(siVercel), icon(siSupabase), icon(siDocker), word("Power BI", "#f2c811"), word("Office.js", "#d83b01")] },
];

const verbs = {
  en: { build: "I build", train: "I train", simulate: "I simulate", ship: "I ship" },
  fr: { build: "Je construis", train: "J'entraîne", simulate: "Je simule", ship: "Je déploie" },
  ar: { build: "أبني", train: "أدرّب", simulate: "أحاكي", ship: "أنشر" },
} as const;

/** Brand colour, except for marks too dark to read on the dark theme, which fall back to the text colour. */
const brand = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum < 0.2 ? "currentColor" : hex;
};

export function TechLogos() {
  const { locale } = usePreferences();

  return (
    <div className="mt-12 border-t border-line">
      {groups.map((group, i) => (
        <Reveal key={group.id} delay={i * 0.06}>
          <div className="grid grid-cols-1 items-center gap-5 border-b border-line py-7 sm:grid-cols-[minmax(11rem,0.34fr)_1fr] sm:gap-10 sm:py-9">
            <h3 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-none text-ink">{verbs[locale][group.id]}</h3>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
              {group.logos.map((logo) => (
                <li
                  key={logo.name}
                  title={logo.name}
                  aria-label={logo.name}
                  className="group flex h-12 items-center text-ink/80 transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ ["--brand" as string]: brand(logo.hex) }}
                >
                  {logo.path ? (
                    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="h-9 w-9 [fill:var(--brand)]">
                      <path d={logo.path} />
                    </svg>
                  ) : (
                    <span className="font-mono text-[15px] font-medium tracking-tight [color:var(--brand)]">{logo.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
