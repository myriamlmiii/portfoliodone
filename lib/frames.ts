// Progressive frame loader: coarse frames first (every 16th), then 8th, 4th, 2nd, every frame,
// so scrubbing works almost immediately and sharpens as the rest arrives.

export type FrameSequence = {
  urls: readonly string[];
  frames: (HTMLImageElement | null)[];
  loaded: number;
  listeners: Set<(loaded: number, total: number) => void>;
  started: boolean;
};

const STRIDES = [16, 8, 4, 2, 1];
const CONCURRENCY = 6;

export function createSequence(urls: readonly string[]): FrameSequence {
  return { urls, frames: urls.map(() => null), loaded: 0, listeners: new Set(), started: false };
}

/** Frame indexes in priority order, no duplicates. */
function loadOrder(count: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const stride of STRIDES) {
    for (let i = 0; i < count; i += stride) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (count > 0 && !seen.has(count - 1)) order.push(count - 1);
  return order;
}

export function onFrameProgress(seq: FrameSequence, cb: (loaded: number, total: number) => void) {
  seq.listeners.add(cb);
  return () => {
    seq.listeners.delete(cb);
  };
}

/** Starts loading (idempotent). Fetches at most CONCURRENCY images at once. */
export function loadSequence(seq: FrameSequence) {
  if (seq.started) return;
  seq.started = true;
  const queue = loadOrder(seq.urls.length);
  let next = 0;

  const pump = () => {
    if (next >= queue.length) return;
    const index = queue[next++];
    const img = new Image();
    img.decoding = "async";
    const settle = (ok: boolean) => {
      if (ok) seq.frames[index] = img;
      seq.loaded += 1;
      seq.listeners.forEach((cb) => cb(seq.loaded, seq.urls.length));
      pump();
    };
    img.onload = () => settle(true);
    img.onerror = () => settle(false);
    img.src = seq.urls[index];
  };
  for (let i = 0; i < Math.min(CONCURRENCY, queue.length); i++) pump();
}

/** The closest loaded frame to `index` (searching outward), or null if nothing has loaded yet. */
export function nearest(seq: FrameSequence, index: number): HTMLImageElement | null {
  const i = Math.round(index);
  for (let d = 0; d < seq.frames.length; d++) {
    const a = seq.frames[i - d];
    if (a) return a;
    const b = seq.frames[i + d];
    if (b) return b;
  }
  return null;
}
