"use client";

import { record } from "@/data/record";
import { AwardSeal } from "./fx/AwardSeal";
import { Marquee } from "./fx/Marquee";
import { SectionHeading } from "./SectionHeading";

const group = (label: string) => record.find((g) => g.label === label)?.items ?? [];

const SEALS = [
  { n: "1st", title: "UFV Energy", subtitle: "Energy Hackathon, University of the Fraser Valley, 2024", ring: "First place" },
  { n: "1st", title: "AgriVerse", subtitle: "UFV Community Ideation Jam, 2025", ring: "First place · $500 prize" },
  { n: "2×", title: "Best Startup", subtitle: "Bliss Bites, AUI Entrepreneurship Week, 2023 and 2024", ring: "Best Startup Award" },
  { n: "6K", title: "LeadGreen", subtitle: "Selected from 6,000 applicants, Cohort 4, 2026", ring: "Climate leadership fellowship" },
] as const;

/** Certifications + awards marquee, followed by the achievement seals. */
export function Honors() {
  const top = group("Certifications").map((c) => c.title);
  const bottom = [...group("Awards & honors"), ...group("Hackathons & competitions")].map((a) => a.title);

  return (
    <section id="honors" aria-label="Honors" className="section-pad overflow-hidden border-b border-line">
      <div className="container-content">
        <SectionHeading eyebrow="Honors" title="Recognised for " accent="building." />
      </div>
      <Marquee top={top} bottom={bottom} />
      <div className="container-content mt-16 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
        {SEALS.map((s, i) => (
          <AwardSeal key={s.title} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}
