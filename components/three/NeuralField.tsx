"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 520;
const LINK_DISTANCE = 0.42;
const MAX_LINKS_PER_NODE = 3;

/** Small seeded PRNG so the network has the same shape on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Nodes on a noisy sphere shell, each linked to a few nearby nodes, like a sparse neural graph. */
function buildNetwork() {
  const rand = mulberry32(7);
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    // Fibonacci sphere keeps the spread even; jitter the radius so it reads as a volume, not a ball.
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = i * Math.PI * (3 - Math.sqrt(5));
    const r = 1.55 + (rand() - 0.5) * 0.5;
    nodes.push(new THREE.Vector3(Math.cos(theta) * ring * r, y * r, Math.sin(theta) * ring * r));
  }

  const linkPositions: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    let made = 0;
    for (let j = i + 1; j < nodes.length && made < MAX_LINKS_PER_NODE; j++) {
      if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) {
        linkPositions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        made++;
      }
    }
  }

  const nodePositions = new Float32Array(nodes.flatMap((v) => [v.x, v.y, v.z]));
  return { nodePositions, linkPositions: new Float32Array(linkPositions) };
}

function Network({ nodeColor, linkColor, still }: { nodeColor: string; linkColor: string; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { nodePositions, linkPositions } = useMemo(buildNetwork, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (!still) g.rotation.y += delta * 0.06;
    // Ease toward the pointer for a gentle parallax tilt.
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.25, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, state.pointer.x * -0.12, 0.04);
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={linkColor} transparent opacity={0.28} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={nodeColor} size={0.028} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  );
}

export default function NeuralField({ nodeColor, linkColor }: { nodeColor: string; linkColor: string }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? "always" : "never"}
      >
        <Network nodeColor={nodeColor} linkColor={linkColor} still={still} />
      </Canvas>
    </div>
  );
}
