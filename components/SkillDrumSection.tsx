"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useMemo, useState, type ReactNode } from "react";
import { stackGroups } from "@/data/skills";
import { useSceneMode } from "@/lib/capability";
import { readRgbToken } from "@/lib/theme";
import { usePreferences } from "./Preferences";

const SkillDrum = dynamic(() => import("./three/SkillDrum"), { ssr: false });

/** If WebGL throws, render nothing: the chip list below the drum carries the same content. */
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Decorative 3D drum of the tech stack. Skips itself on low-power devices; the chips remain either way. */
export function SkillDrumSection() {
  const mode = useSceneMode();
  const { t, theme } = usePreferences();
  const [colors, setColors] = useState<{ accent: string; muted: string } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => setColors({ accent: readRgbToken("--accent"), muted: readRgbToken("--muted") }), [theme]);

  const items = useMemo(
    () => stackGroups.flatMap((group) => group.items.map((label) => ({ label, group: group.label }))),
    []
  );

  if (mode !== "full" || !colors) return null;
  const active = items[activeIndex];

  return (
    <div className="mb-10 border-t border-line pt-8">
      <div className="relative h-[22rem] sm:h-[26rem]" aria-hidden="true">
        <Boundary>
          <SkillDrum items={items} accent={colors.accent} muted={colors.muted} onActive={setActiveIndex} />
        </Boundary>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
      </div>
      <p className="mt-2 text-center font-mono text-xs uppercase tracking-[0.18em] text-muted" aria-hidden="true">
        <span className="text-accent">{active?.label}</span>
        {active && <span> · {t.skills.stackGroups[active.group] ?? active.group}</span>}
      </p>
    </div>
  );
}
