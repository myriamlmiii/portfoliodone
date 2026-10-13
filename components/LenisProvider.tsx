"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

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
    };
  }, []);

  return children as React.ReactElement;
}
