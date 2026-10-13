"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { SiteControls } from "./SiteControls";
import { usePreferences } from "./Preferences";

/** Tracks which section is under the header so the matching link can be highlighted. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// "top" (the hero) is tracked too, so no link is highlighted before the first section.
const sectionIds = ["top", ...navigation.map((item) => item.href.slice(1))];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = usePreferences();
  const active = useActiveSection(sectionIds);
  const onHero = !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? "border-b border-line bg-canvas/85 backdrop-blur-md" : "border-b border-transparent"
      } ${onHero ? "hero-nav" : ""}`}
    >
      <div className="container-content flex h-16 items-center justify-between gap-3 sm:gap-6">
        <a
          href="#top"
          aria-label="Meriem Lmoubariki — home"
          className="flex h-11 w-11 shrink-0 items-center justify-center font-display text-xl font-semibold tracking-[-0.04em] text-accent"
        >
          ML
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`interactive-target inline-flex items-center rounded-full px-3 text-sm transition-colors ${
                  onHero
                    ? isActive ? "bg-ink/10 text-ink" : "text-muted hover:text-ink"
                    : isActive ? "bg-ink/[0.06] text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {t.nav[item.label] ?? item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <SiteControls compact />
          <button
            type="button"
            aria-label={t.menu}
            aria-expanded={open}
            className="interactive-target inline-flex w-11 items-center justify-center rounded-full text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Primary" className="flex flex-col border-t border-line bg-canvas px-6 py-3 lg:hidden">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`interactive-target flex items-center text-base transition-colors ${active === item.href.slice(1) ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              {t.nav[item.label] ?? item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
