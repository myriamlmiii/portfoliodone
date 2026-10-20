"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { dirOf } from "@/lib/bidi";
import { ArrowUpRight, Award, BookOpen, Mic2, Stamp } from "lucide-react";
import { record } from "@/data/record";
import type { RecordGroup, RecordItem } from "@/types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { usePreferences } from "./Preferences";

const shelves = [
  { id: "research", groups: ["Papers"], icon: BookOpen },
  { id: "rooms", groups: ["Talks & conferences", "Hackathons & competitions", "Programs & fellowships"], icon: Mic2 },
  { id: "honors", groups: ["Awards & honors"], icon: Award },
  { id: "credentials", groups: ["Certifications"], icon: Stamp },
] as const;

type ShelfId = (typeof shelves)[number]["id"];

function findGroup(label: string): RecordGroup | undefined {
  return record.find((group) => group.label === label);
}

function RecordEntry({
  item,
  detail,
  status,
  groups,
}: {
  item: RecordItem;
  detail: string;
  status: Record<string, string>;
  groups: Record<string, string>;
}) {
  const content = (
    <div className="min-w-0">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <h3 dir={dirOf(item.title)} className="max-w-[52ch] text-base font-semibold leading-snug text-ink">
          {item.extra && item.href ? (
            <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-accent">
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
        {item.href && !item.extra && (
          <ArrowUpRight
            size={16}
            className="mt-0.5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {item.year && <span className="font-mono text-[11px] tabular-nums text-accent">{item.year}</span>}
        {item.status && (
          <span
            data-status={item.status}
            className="record-entry-status rounded-full border px-2 py-0.5 text-xs font-medium"
          >
            {status[item.status]}
          </span>
        )}
        {item.category && (
          <span className="type-caption text-muted">{groups[item.category] ?? item.category}</span>
        )}
      </div>
      <p className="type-meta content-reading mt-2 text-muted">{detail}</p>
      {(item.extra || item.logo) && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          {item.extra && (
            <a
              href={item.extra.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-medium text-accent transition-colors hover:border-accent"
            >
              {item.extra.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          {item.logo && (
            <Image
              src={item.logo.src}
              alt={item.logo.alt}
              width={item.logo.width}
              height={item.logo.height}
              className="h-7 w-auto opacity-85 dark:brightness-0 dark:invert"
            />
          )}
        </div>
      )}
    </div>
  );

  return item.href && !item.extra ? (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group block border-b border-line px-4 py-4 transition-colors hover:bg-surface/55 sm:px-5 sm:py-5"
    >
      {content}
    </a>
  ) : (
    <article className="block border-b border-line px-4 py-4 sm:px-5 sm:py-5">{content}</article>
  );
}

export function Record() {
  const { t } = usePreferences();
  // The tab highlights instantly; the heavier panel re-renders as a low-priority transition.
  const [tab, setTab] = useState<ShelfId>("research");
  const [active, setActiveDeferred] = useState<ShelfId>("research");
  const [, startTransition] = useTransition();
  const setActive = (id: ShelfId) => {
    setTab(id);
    startTransition(() => setActiveDeferred(id));
  };
  const selectedShelf = shelves.find((shelf) => shelf.id === active) ?? shelves[0];
  const selectedGroups = selectedShelf.groups
    .map(findGroup)
    .filter((group): group is RecordGroup => group !== undefined);
  const totalItems = record.reduce((count, group) => count + group.items.length, 0);

  return (
    <section id="record" className="record-section section-pad relative isolate overflow-hidden">
      <div className="record-watermark" aria-hidden="true">R.</div>
      <div className="container-content relative">
        <div className="grid gap-5 border-b border-line pb-6 md:grid-cols-[1fr_auto] md:items-end md:gap-8 md:pb-8">
          <SectionHeading
            eyebrow={t.record.kicker}
            title={t.record.titleBefore}
            accent={t.record.titleAccent}
            intro={t.record.intro}
            className="mb-0 max-w-3xl"
          />
          <div className="flex items-end gap-3 md:pb-1">
            <span className="font-display text-4xl font-semibold leading-none text-accent tabular-nums">{totalItems}</span>
            <span className="type-caption max-w-24 pb-1 text-muted">{t.record.totalLabel}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:mt-7 lg:grid-cols-[minmax(220px,0.68fr)_minmax(0,2fr)] lg:gap-10">
          <div>
            <nav
              role="tablist"
              aria-label={t.record.kicker}
              className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-1"
            >
              {shelves.map(({ id, groups, icon: Icon }, index) => {
                const count = groups.reduce((sum, label) => sum + (findGroup(label)?.items.length ?? 0), 0);
                const selected = tab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    id={`record-tab-${id}`}
                    role="tab"
                    aria-selected={selected}
                    aria-controls="record-panel"
                    onClick={() => setActive(id)}
                    className={`group grid min-h-11 w-full min-w-0 grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-2 border px-3 py-2.5 text-start transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:gap-3 sm:px-4 ${
                      selected
                        ? "border-accent bg-accent/10 text-ink"
                        : "border-line bg-transparent text-muted hover:bg-surface/60 hover:text-ink"
                    }`}
                  >
                    <span className="font-mono text-xs text-accent">0{index + 1}</span>
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon size={15} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
                      <span className="truncate text-sm font-medium">{t.record.groups[id] ?? id}</span>
                    </span>
                    <span className="font-mono text-xs tabular-nums text-muted">{String(count).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </nav>
            <p className="col-span-2 hidden max-w-[30ch] px-4 pt-4 text-sm leading-relaxed text-muted lg:col-span-1 lg:block">
              {t.record.indexNote}
            </p>
          </div>

          <div id="record-panel" role="tabpanel" aria-labelledby={`record-tab-${active}`}>
            <Reveal key={active} className="min-w-0">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <h3 className="mt-1 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                  {t.record.groups[active] ?? active}
                </h3>
                <span className="font-mono text-xs tabular-nums text-muted">
                  {selectedGroups.reduce((sum, group) => sum + group.items.length, 0)} {t.record.entriesLabel}
                </span>
              </div>

              <div className="overflow-hidden border border-line bg-canvas/80">
                {selectedGroups.map((group) => (
                  <div key={group.label}>
                    {selectedGroups.length > 1 && (
                      <div className="flex items-center gap-3 border-b border-line bg-surface/50 px-4 py-3 sm:px-6">
                        <span className="h-px w-5 bg-accent" />
                        <p className="type-meta text-muted">
                          {t.record.groups[group.label] ?? group.label}
                        </p>
                        <span className="font-mono text-xs text-muted">{String(group.items.length).padStart(2, "0")}</span>
                      </div>
                    )}
                    {group.compact ? (
                      <div className="grid gap-px bg-line sm:grid-cols-2">
                        {group.items.map((item) => (
                          <div key={item.title} className="bg-canvas p-4 sm:p-5">
                            <RecordEntry
                              item={item}
                              detail={item.detail}
                              status={t.record.status}
                              groups={t.record.groups}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      group.items.map((item) => (
                        <RecordEntry
                          key={item.title}
                          item={item}
                          detail={t.recordDetails[item.title] ?? item.detail}
                          status={t.record.status}
                          groups={t.record.groups}
                        />
                      ))
                    )}
                  </div>
                ))}
              </div>
              {active === "research" && (
                <p className="type-caption mt-3 text-muted">
                  {t.record.paperNote}
                </p>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
