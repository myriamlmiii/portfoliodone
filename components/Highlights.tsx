"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePreferences } from "./Preferences";

/** Each headline result links to the project or experience behind it. */
const highlights = [
  { value: "99.98%", href: "/projects/ai-drug-discovery" },
  { value: "94%", href: "/projects/rag-class-assistant" },
  { value: "35%", href: "/#ravel" },
  { value: "30%", href: "/#smart-city" },
  { value: "79.9%", href: "/projects/montreal-aqi-forecasting" },
  { value: "6", href: "/#education" },
] as const;

export function Highlights() {
  const { t } = usePreferences();

  return (
    <section aria-label="Highlights" className="bg-canvas py-7 md:py-8">
      <div className="container-content">
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => (
            <Link
              key={`${item.value}-${i}`}
              href={item.href}
              className="group flex min-h-[124px] flex-col border-t border-line py-4 transition-colors hover:border-accent focus-visible:outline-none"
            >
              <span className="flex items-start justify-between gap-4">
                <span className="font-display text-[2rem] font-medium leading-none tracking-[-0.025em] text-ink tabular transition-colors group-hover:text-accent">
                  {item.value}
                </span>
                <span className="font-mono tabular text-xs text-muted">0{i + 1}</span>
              </span>
              <span className="type-meta mt-2 max-w-[28ch] text-muted">{t.hero.stats[i]}</span>
              <ChevronRight size={16} className="mt-auto self-end text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 rtl:rotate-180" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
