// Shared math + mutable live state. `live` never triggers React renders; rAF loops read it directly.
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const live = {
  mouse: { x: 0, y: 0 }, // normalised -0.5..0.5 around the viewport centre
  scrollVelocity: 0,
  hero: 0,
  about: 0,
};
