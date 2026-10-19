"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);

/** Lock or unlock page scrolling (used by the intro overlay). */
export function useScrollApi() {
  const lenis = useContext(LenisContext);
  const setScrollLocked = useCallback(
    (locked: boolean) => {
      if (locked) lenis?.stop();
      else lenis?.start();
    },
    [lenis],
  );
  return { setScrollLocked };
}

/** The page-wide smooth-scroll instance, or null before mount. */
export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [instance, setInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    setInstance(lenis);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest("a[href^='#']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.length < 2) return;
      const el = document.querySelector(href);
      if (!(el instanceof HTMLElement)) return;
      event.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
      history.pushState(null, "", href);
    }

    document.addEventListener("click", onClick);
    function onPopState() {
      const target = window.location.hash
        ? document.getElementById(window.location.hash.slice(1))
        : null;
      lenis.scrollTo(target ?? 0, { offset: target ? -80 : 0 });
    }
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setInstance(null);
    };
  }, []);

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>;
}
