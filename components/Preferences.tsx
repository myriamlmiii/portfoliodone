"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { localeMeta, translations, type Locale, type Theme } from "@/lib/i18n";
import { applyThemeToDocument } from "@/lib/theme";

type Preferences = {
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
  t: (typeof translations)[Locale];
};

const PreferencesContext = createContext<Preferences | null>(null);

function applyLocale(locale: Locale) {
  const root = document.documentElement;
  const meta = localeMeta[locale];
  root.lang = meta.htmlLang;
  root.dir = meta.dir;
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setThemeState] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("locale") as Locale | null;
    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const nextLocale = storedLocale && storedLocale in localeMeta ? storedLocale : "en";
    const nextTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
    setLocaleState(nextLocale);
    setThemeState(nextTheme);
    applyLocale(nextLocale);
    applyThemeToDocument(nextTheme);
    setReady(true);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem("locale", next);
    applyLocale(next);
  };

  const setTheme = (next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem("theme", next);
    applyThemeToDocument(next);
  };

  const value = useMemo(
    () => ({ locale, theme, setLocale, setTheme, t: translations[locale] }),
    [locale, theme]
  );

  return (
    <PreferencesContext.Provider value={value}>
      <div
        data-theme={ready ? theme : undefined}
        data-ready={ready ? "true" : "false"}
        className={`theme-frame min-h-dvh bg-canvas text-ink ${ready ? theme : ""}`}
      >
        {children}
      </div>
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
