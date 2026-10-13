"use client";

import { Moon, Sun } from "lucide-react";
import { localeMeta, locales } from "@/lib/i18n";
import { usePreferences } from "./Preferences";

export function SiteControls({ compact = false }: { compact?: boolean }) {
  const { locale, theme, setLocale, setTheme, t } = usePreferences();
  const night = theme === "dark";

  return (
    <div
      className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}
      role="group"
      aria-label={`${t.language}, ${night ? t.themeDark : t.themeLight}`}
    >
      <div className="flex items-center rounded-full border border-line bg-surface p-0.5 sm:p-1">
        {locales.map((code) => {
          const active = locale === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={active}
              aria-label={localeMeta[code].label}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-1.5 text-xs font-semibold transition-colors sm:min-w-10 sm:px-2.5 ${
                active ? "bg-ink text-canvas" : "text-muted hover:text-ink"
              }`}
            >
              {localeMeta[code].label}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setTheme(night ? "light" : "dark")}
        aria-pressed={night}
        aria-label={night ? t.themeLight : t.themeDark}
        title={night ? t.themeLight : t.themeDark}
        className={`inline-flex h-10 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
          compact ? "w-10 px-0" : "gap-1.5 px-3"
        } ${
          night
            ? "border-accent bg-ink text-canvas hover:bg-accent"
            : "border-line bg-surface text-ink hover:border-accent hover:text-accent"
        }`}
      >
        {night ? <Sun size={15} /> : <Moon size={15} />}
        <span className={compact ? "hidden" : "hidden sm:inline"}>{night ? t.themeLight : t.themeDark}</span>
      </button>
    </div>
  );
}
