"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERT = /* glsl */ `
  attribute vec4 aData; // x, y (NDC), depth 0..1, seed 0..1
  attribute float aSize;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uDpr;
  uniform float uAspect;
  varying float vAlpha;

  void main() {
    float depth = aData.z;
    float seed = aData.w;

    float x = aData.x + sin(uTime * 0.15 + seed * 6.2831) * 0.04 * depth;
    // Slow upward drift; nearer particles also shift more with page scroll (parallax).
    float y = aData.y + uTime * 0.012 * (0.4 + depth) + uScroll * 0.00035 * (0.3 + depth);
    y = mod(y + 1.0, 2.0) - 1.0;
    vec2 p = vec2(x, y);

    // Gentle push away from the pointer.
    vec2 d = p - uPointer;
    d.x *= uAspect;
    float r = length(d);
    p += normalize(d + vec2(1e-5)) * smoothstep(0.35, 0.0, r) * 0.05 * depth;

    gl_Position = vec4(p, 0.0, 1.0);
    gl_PointSize = aSize * uDpr * (0.6 + depth);

    float twinkle = 0.65 + 0.35 * sin(uTime * 0.8 + seed * 40.0);
    vAlpha = twinkle * (0.25 + 0.75 * depth);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
  }
`;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Layer({
  count,
  size,
  opacity,
  seed,
  color,
  additive,
  pointer,
  speed = 1,
}: {
  count: number;
  size: [number, number];
  opacity: number;
  seed: number;
  color: string;
  additive: boolean;
  pointer: React.MutableRefObject<THREE.Vector2>;
  speed?: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const { data, sizes } = useMemo(() => {
    const rand = mulberry32(seed);
    const data = new Float32Array(count * 4);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      data.set([rand() * 2 - 1, rand() * 2 - 1, rand(), rand()], i * 4);
      sizes[i] = size[0] + rand() * (size[1] - size[0]);
    }
    return { data, sizes };
  }, [count, size, seed]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2(9, 9) },
      uDpr: { value: 1 },
      uAspect: { value: 1 },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
    }),
    // Colour and opacity are synced in useFrame below so a theme change never rebuilds the buffers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += delta * speed;
    uniforms.uScroll.value = window.scrollY;
    uniforms.uPointer.value.copy(pointer.current);
    uniforms.uDpr.value = state.gl.getPixelRatio();
    uniforms.uAspect.value = state.size.width / state.size.height;
    uniforms.uColor.value.set(color);
    uniforms.uOpacity.value = opacity;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(count * 3), 3]} />
        <bufferAttribute attach="attributes-aData" args={[data, 4]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

/** Fixed, click-through particle field: fine drifting dust plus a few large, faint smoke blobs. */
export default function AmbientParticles({ color, dark }: { color: string; dark: boolean }) {
  const pointer = useRef(new THREE.Vector2(9, 9));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    const onLeave = () => pointer.current.set(9, 9);
    const onVisibility = () => setVisible(!document.hidden);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Kept low on purpose: it should read as atmosphere, never compete with text.
  const dustOpacity = dark ? 0.55 : 0.28;
  const smokeOpacity = dark ? 0.07 : 0.05;

  return (
    <Canvas
      aria-hidden="true"
      className="!pointer-events-none"
      style={{ position: "fixed", inset: 0, zIndex: 1 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      frameloop={visible ? "always" : "never"}
    >
      <Layer count={14} size={[260, 520]} opacity={smokeOpacity} seed={11} color={color} additive={dark} pointer={pointer} speed={0.6} />
      <Layer count={200} size={[2, 5]} opacity={dustOpacity} seed={42} color={color} additive={dark} pointer={pointer} />
    </Canvas>
  );
}
