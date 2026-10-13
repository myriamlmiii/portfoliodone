"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { useState } from "react";
import { LOCATIONS } from "@/lib/geo";
import { GlobeReach } from "./GlobeReach";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePreferences } from "./Preferences";

// Listed in the order they happened, which differs from the globe's home-first order.
const ORDER = ["elJadida", "ifrane", "lisbon", "abbotsford", "vancouver", "bangkok"] as const;

export function Places() {
  const { t } = usePreferences();
  const places = ORDER.filter((id) => LOCATIONS.some((loc) => loc.id === id));
  const [activeId, setActiveId] = useState<string | null>(places[0] ?? null);

  return (
    <section id="places" className="section-pad scroll-mt-20">
      <div className="container-content">
        <SectionHeading eyebrow={t.places.kicker} title={t.places.titleBefore} accent={t.places.titleAccent} intro={t.places.intro} />

        <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <Reveal className="flex justify-center">
            <GlobeReach
              showLegend={false}
              className="h-[min(88vw,360px)] w-full max-w-[360px] sm:h-[420px] sm:max-w-[420px]"
              activeId={activeId}
              onSelect={setActiveId}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
              {places.map((id) => {
                const place = t.places.items[id];
                const location = LOCATIONS.find((item) => item.id === id);
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(id)}
                      aria-pressed={activeId === id}
                      className={`group flex min-h-11 w-full items-start gap-3 rounded-lg border p-3.5 text-start transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-4 ${
                        activeId === id
                          ? "border-accent/50 bg-surface"
                          : "border-transparent hover:border-line hover:bg-surface/65"
                      }`}
                    >
                      <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        activeId === id ? "bg-accent text-canvas" : "bg-accent/10 text-accent"
                      }`}>
                        <MapPin size={17} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-ink">{place?.name ?? id}</span>
                          {location?.home && (
                            <span className="type-caption rounded-full bg-accent/10 px-2 py-1 font-semibold text-accent">
                              {t.places.home}
                            </span>
                          )}
                          {!location?.home && <ArrowUpRight size={15} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" />}
                        </span>
                        <span className="type-meta mt-1 block text-muted">{place?.note}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
