"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { useSceneMode } from "@/lib/capability";
import { readRgbToken } from "@/lib/theme";
import { usePreferences } from "./Preferences";

const AmbientParticles = dynamic(() => import("./three/AmbientParticles"), { ssr: false });

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Site-wide atmosphere. Renders nothing on low-power devices, reduced motion, or without WebGL. */
export function AmbientBackground() {
  const mode = useSceneMode();
  const { theme } = usePreferences();
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => setColor(readRgbToken("--accent")), [theme]);

  if (mode !== "full" || !color) return null;
  return (
    <Boundary>
      <AmbientParticles color={color} dark={theme === "dark"} />
    </Boundary>
  );
}
