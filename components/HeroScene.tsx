"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { useSceneMode } from "@/lib/capability";
import { readRgbToken } from "@/lib/theme";
import { usePreferences } from "./Preferences";

const NeuralField = dynamic(() => import("./three/NeuralField"), { ssr: false });

/** Static stand-in: concentric rings echoing the network sphere. Also used when WebGL fails. */
function StaticFallback() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      {[190, 150, 110, 70].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeOpacity={0.08 + i * 0.05}
          strokeDasharray={i % 2 ? "2 7" : undefined}
        />
      ))}
      <circle cx="200" cy="200" r="3" fill="rgb(var(--accent))" fillOpacity="0.7" />
    </svg>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticFallback /> : this.props.children;
  }
}

/** Decorative hero 3D accent. Always aria-hidden; never required to read the page. */
export function HeroScene() {
  const mode = useSceneMode();
  const { theme } = usePreferences();
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => setColor(readRgbToken("--accent")), [theme]);

  if (mode === "pending") return <div className="h-full w-full" aria-hidden="true" />;
  if (mode === "static" || !color) return <StaticFallback />;

  return (
    <SceneBoundary>
      <NeuralField nodeColor={color} linkColor={color} bloom={theme === "dark"} />
    </SceneBoundary>
  );
}
