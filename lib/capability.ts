import { useEffect, useState } from "react";

export type SceneMode = "pending" | "full" | "static";

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Decide once on the client whether decorative 3D should render or fall back to a static visual. */
export function detectSceneMode(): SceneMode {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData) return "static";
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) return "static";
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return "static";
  if (window.matchMedia("(max-width: 639px)").matches) return "static";
  return hasWebGL() ? "full" : "static";
}

export function useSceneMode(): SceneMode {
  const [mode, setMode] = useState<SceneMode>("pending");
  useEffect(() => setMode(detectSceneMode()), []);
  return mode;
}
