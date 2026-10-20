"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { education } from "@/data/education";
import { projects } from "@/data/projects";
import { usePreferences } from "./Preferences";

const PLACES = ["Morocco", "Canada", "Portugal", "Thailand"] as const;

const LABELS = {
  en: { role: "Builder of systems", built: "Systems built", studied: "Studied at", from: "From", thanks: "Thanks for reading." },
  fr: { role: "Bâtisseuse de systèmes", built: "Systèmes construits", studied: "Études à", from: "Depuis", thanks: "Merci d'avoir lu." },
  ar: { role: "بانية أنظمة", built: "أنظمة بُنيت", studied: "الدراسة في", from: "من", thanks: "شكرا لأنك وصلت إلى هنا." },
} as const;

function Block({ label, lines, ar }: { label: string; lines: readonly string[]; ar: boolean }) {
  return (
    <div className="text-center">
      <p className={`font-mono text-accent ${ar ? "text-sm" : "text-xs uppercase tracking-[0.2em]"}`}>{label}</p>
      <ul className="mt-4 space-y-1.5">
        {lines.map((line) => (
          <li key={line} className={`font-display leading-tight text-ink ${ar ? "text-[clamp(1.25rem,2.6vw,1.75rem)]" : "text-[clamp(1.5rem,3.2vw,2.25rem)]"}`}>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function useCredits() {
  const { t, locale } = usePreferences();
  const labels = LABELS[locale as keyof typeof LABELS] ?? LABELS.en;
  const ar = locale === "ar";
  const built = projects.filter((project) => project.featured).map((project) => project.title);
  const schools = education.map((entry) => entry.school.replace(/\s*\(.*\)$/, ""));
  const places = PLACES.map((place) => t.countries[place] ?? place);

  const content = (
    <div className="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-16">
      <div className="text-center">
        <h2 className={`font-display leading-none text-ink ${ar ? "text-[clamp(2.25rem,6vw,4.25rem)] leading-tight" : "text-[clamp(3rem,8vw,6rem)]"}`}>{ar ? "مريم المباركي" : "Meriem Lmoubariki"}</h2>
        <p className={`mt-3 font-mono text-xs text-muted ${ar ? "text-sm" : "uppercase tracking-[0.2em]"}`}>{labels.role}</p>
      </div>
      <Block label={labels.built} lines={built} ar={ar} />
      <Block label={labels.studied} lines={schools} ar={ar} />
      <Block label={labels.from} lines={places} ar={ar} />
      <p className="pb-6 text-center text-sm text-muted">{labels.thanks}</p>
    </div>
  );

  return { labels, content };
}

export function CreditsOutro() {
  const reduce = useReducedMotion();
  return reduce ? <StaticCredits /> : <ScrollCredits />;
}

function StaticCredits() {
  const { labels, content } = useCredits();
  return (
    <section aria-label={labels.role} className="border-t border-line bg-canvas">
      {content}
    </section>
  );
}

function ScrollCredits() {
  const { labels, content } = useCredits();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-88%"]);

  return (
    <section ref={ref} aria-label={labels.role} className="relative h-[320svh] border-t border-line bg-canvas">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Starts one viewport below the fold; ends with the closing line still on screen. */}
        <motion.div style={{ y, paddingTop: "100svh" }} className="will-change-transform">
          {content}
        </motion.div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-canvas to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-canvas to-transparent" />
      </div>
    </section>
  );
}
