"use client";

import { useEffect, useState } from "react";

type IntroWindow = Window & { __introDone?: boolean };

/** Called by the intro as it starts opening, so hero animations can begin behind the splitting panels. */
export function markIntroDone() {
  (window as IntroWindow).__introDone = true;
  window.dispatchEvent(new Event("intro-done"));
}

export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if ((window as IntroWindow).__introDone) {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener("intro-done", on);
    return () => window.removeEventListener("intro-done", on);
  }, []);
  return done;
}
