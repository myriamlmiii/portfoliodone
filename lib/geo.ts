import * as THREE from "three";

/** Places shown on the globe. `id` keys into t.places.items for the label. */
export const LOCATIONS = [
  { id: "elJadida", lat: 33.23, lng: -8.50, home: true },
  { id: "ifrane", lat: 33.53, lng: -5.11, home: false },
  { id: "lisbon", lat: 38.72, lng: -9.14, home: false },
  { id: "vancouver", lat: 49.28, lng: -123.12, home: false },
  { id: "abbotsford", lat: 49.05, lng: -122.33, home: false },
  { id: "bangkok", lat: 13.75, lng: 100.49, home: false },
] as const;

export const GLOBE_RADIUS = 1.6;

export function latLngToVec3(lat: number, lng: number, radius = GLOBE_RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function buildArc(a: THREE.Vector3, b: THREE.Vector3, radius = GLOBE_RADIUS) {
  const points: THREE.Vector3[] = [];
  const axis = new THREE.Vector3().crossVectors(a, b).normalize();
  const angle = a.angleTo(b);
  for (let i = 0; i <= 64; i++) {
    const t = i / 64;
    const point = a.clone().applyAxisAngle(axis, angle * t);
    const lift = 1 + Math.sin(Math.PI * t) * 0.22;
    points.push(point.normalize().multiplyScalar(radius * lift));
  }
  return points;
}
