"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export type DrumItem = { label: string; group: string };

const FONT = "/fonts/bebas-neue-latin-400-normal.woff";
const RADIUS = 2.7;
const PER_TURN = 7;
const ROW_HEIGHT = 0.52;

type Spin = MutableRefObject<{ scroll: number; drag: number }>;

function Drum({
  items,
  spin,
  accent,
  muted,
  onActive,
  still,
}: {
  items: readonly DrumItem[];
  spin: Spin;
  accent: string;
  muted: string;
  onActive: (index: number) => void;
  still: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const refs = useRef<(THREE.Object3D | null)[]>([]);
  const active = useRef(-1);
  const rotation = useRef(0);

  // Helix: each item sits a fraction of a turn further round and one row lower.
  const placed = useMemo(() => {
    const mid = (items.length - 1) / 2;
    return items.map((item, i) => ({
      item,
      angle: (i / PER_TURN) * Math.PI * 2,
      y: (mid - i) * (ROW_HEIGHT / PER_TURN) * 1.6,
    }));
  }, [items]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const target = spin.current.scroll + spin.current.drag;
    rotation.current = still ? target : THREE.MathUtils.damp(rotation.current, target, 4, delta);
    g.rotation.y = rotation.current;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.1 + state.pointer.y * 0.06, 0.05);

    let best = -1;
    let bestFacing = -2;
    placed.forEach((p, i) => {
      // World-space angle of this item relative to the camera (front = 0).
      const facing = Math.cos(p.angle + rotation.current);
      if (facing > bestFacing) {
        bestFacing = facing;
        best = i;
      }
      const text = refs.current[i] as (THREE.Object3D & { fillOpacity: number }) | null;
      if (text) text.fillOpacity = 0.1 + 0.9 * Math.max(0, (facing + 0.15) / 1.15) ** 2;
    });
    if (best !== active.current) {
      const colorOf = (i: number) => refs.current[i] as (THREE.Object3D & { color: string }) | null;
      const prev = colorOf(active.current);
      if (prev) prev.color = muted;
      const next = colorOf(best);
      if (next) next.color = accent;
      active.current = best;
      onActive(best);
    }
  });

  return (
    <group ref={group}>
      {placed.map((p, i) => (
        <group key={p.item.label} position={[Math.sin(p.angle) * RADIUS, p.y, Math.cos(p.angle) * RADIUS]} rotation={[0, p.angle, 0]}>
          <Text
            ref={(node: THREE.Object3D | null) => {
              refs.current[i] = node;
            }}
            font={FONT}
            fontSize={0.42}
            anchorX="center"
            anchorY="middle"
            color={muted}
          >
            {p.item.label}
          </Text>
        </group>
      ))}
    </group>
  );
}

export default function SkillDrum({
  items,
  accent,
  muted,
  onActive,
}: {
  items: readonly DrumItem[];
  accent: string;
  muted: string;
  onActive: (index: number) => void;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const spin = useRef({ scroll: 0, drag: 0 });
  const dragging = useRef<{ x: number; start: number } | null>(null);
  const [visible, setVisible] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);

    // Page scroll turns the drum: ~1.25 turns while it crosses the viewport.
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = THREE.MathUtils.clamp(1 - (rect.top + rect.height / 2) / (vh + rect.height / 2), 0, 1);
      spin.current.scroll = p * Math.PI * 2.5;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapper}
      className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={(e) => {
        dragging.current = { x: e.clientX, start: spin.current.drag };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (dragging.current) spin.current.drag = dragging.current.start + (e.clientX - dragging.current.x) * 0.01;
      }}
      onPointerUp={() => (dragging.current = null)}
      onPointerCancel={() => (dragging.current = null)}
    >
      <Canvas camera={{ position: [0, 0, 7.4], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} frameloop={visible ? "always" : "never"}>
        <Drum items={items} spin={spin} accent={accent} muted={muted} onActive={onActive} still={still} />
      </Canvas>
    </div>
  );
}
