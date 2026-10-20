"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree, type ThreeElement } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { buildArc, GLOBE_RADIUS, latLngToVec3, LOCATIONS } from "@/lib/geo";

// `<line>` resolves to the SVG element in JSX, so register THREE.Line under another name.
extend({ ThreeLine: THREE.Line });

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeLine: ThreeElement<typeof THREE.Line>;
  }
}

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const next = new OrbitControls(camera, gl.domElement);
    next.enableDamping = true;
    next.dampingFactor = 0.06;
    next.enableZoom = false;
    next.enablePan = false;
    next.minPolarAngle = Math.PI * 0.25;
    next.maxPolarAngle = Math.PI * 0.75;
    controls.current = next;
    return () => next.dispose();
  }, [camera, gl]);

  useFrame(() => controls.current?.update());
  return null;
}

function Marker({
  id,
  lat,
  lng,
  home,
  active,
  accent,
  reduceMotion,
  onSelect,
}: {
  id: string;
  lat: number;
  lng: number;
  home: boolean;
  active: boolean;
  accent: string;
  reduceMotion: boolean;
  onSelect: (id: string) => void;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const position = useMemo(() => latLngToVec3(lat, lng, GLOBE_RADIUS * 1.008), [lat, lng]);

  useEffect(() => {
    ring.current?.lookAt(position.clone().multiplyScalar(2));
  }, [position]);

  useFrame(({ clock }) => {
    if (active && !reduceMotion && ring.current) {
      ring.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.4) * 0.12);
    } else if (ring.current) {
      ring.current.scale.setScalar(1);
    }
  });

  return (
    <group position={position.toArray()}>
      <mesh onClick={(event) => { event.stopPropagation(); onSelect(id); }}>
        <sphereGeometry args={[home ? 0.04 : 0.03, 20, 20]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[home ? 0.061 : 0.047, home ? 0.074 : 0.056, 40]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={active ? 0.85 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Globe({
  accent,
  core,
  activeId,
  reduceMotion,
  onSelect,
}: {
  accent: string;
  core: string;
  activeId: string | null;
  reduceMotion: boolean;
  onSelect: (id: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const curves = useMemo(() => {
    const meridians = Array.from({ length: 8 }, (_, index) => {
      const lng = -180 + index * 45;
      return Array.from({ length: 73 }, (_, point) =>
        latLngToVec3(-88 + point * 2.444, lng, GLOBE_RADIUS * 1.004),
      );
    });
    const parallels = Array.from({ length: 5 }, (_, index) => {
      const lat = -60 + index * 30;
      return Array.from({ length: 73 }, (_, point) =>
        latLngToVec3(lat, -180 + point * 5, GLOBE_RADIUS * 1.004),
      );
    });
    return [...meridians, ...parallels].map((points) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return geometry;
    });
  }, []);
  const arcs = useMemo(() => {
    const home = latLngToVec3(LOCATIONS[0].lat, LOCATIONS[0].lng);
    return LOCATIONS.filter((loc) => !loc.home).map((loc) =>
      new THREE.BufferGeometry().setFromPoints(
        buildArc(home, latLngToVec3(loc.lat, loc.lng)),
      ),
    );
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (!activeId || reduceMotion) return;
    const location = LOCATIONS.find((item) => item.id === activeId);
    if (!location) return;
    const point = latLngToVec3(location.lat, location.lng);
    const target = Math.atan2(point.z, point.x);
    const difference = Math.atan2(
      Math.sin(target - group.current.rotation.y),
      Math.cos(target - group.current.rotation.y),
    );
    group.current.rotation.y += difference * Math.min(1, delta * 3);
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 48]} />
        <meshStandardMaterial color={core} roughness={0.96} metalness={0} />
      </mesh>
      {curves.map((geometry, index) => (
        <threeLine key={`grid-${index}`} geometry={geometry}>
          <lineBasicMaterial
            color={accent}
            transparent
            opacity={index < 8 ? 0.2 : 0.16}
          />
        </threeLine>
      ))}
      {LOCATIONS.map((loc) => (
        <Marker
          key={loc.id}
          {...loc}
          active={activeId === loc.id}
          accent={accent}
          reduceMotion={reduceMotion}
          onSelect={onSelect}
        />
      ))}
      {arcs.map((geometry, index) => (
        <threeLine key={`route-${index}`} geometry={geometry}>
          <lineBasicMaterial color={accent} transparent opacity={0.42} />
        </threeLine>
      ))}
    </group>
  );
}

export function GlobeCanvas({
  accent,
  core,
  activeId = null,
  onSelect,
}: {
  accent: string;
  core: string;
  activeId?: string | null;
  onSelect: (id: string) => void;
}) {
  const reduceMotion = useReducedMotion() === true;
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className="h-full w-full">
    <Canvas
      camera={{ position: [0, 0.4, 5.4], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "default" }}
      frameloop={visible ? "always" : "demand"}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={1} />
      <directionalLight position={[3, 2, 4]} intensity={1.4} color="#fffaf0" />
      <pointLight position={[-3, -1, -2]} intensity={0.45} color={accent} />
      <Controls />
      <Globe
        accent={accent}
        core={core}
        activeId={activeId}
        reduceMotion={reduceMotion}
        onSelect={onSelect}
      />
    </Canvas>
    </div>
  );
}
