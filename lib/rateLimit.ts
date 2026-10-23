import type { NextRequest } from "next/server";

const buckets = new Map<string, number[]>();

/** Best-effort per-instance limiter keyed by caller and route; swap for a shared store if traffic warrants. */
export function rateLimited(req: Request | NextRequest, scope: string, max: number, windowMs = 60_000) {
  // The leftmost X-Forwarded-For entry is client-supplied; prefer the platform header, then the rightmost entry.
  const forwarded = req.headers.get("x-forwarded-for")?.split(",").map((s) => s.trim()).filter(Boolean);
  const ip = req.headers.get("x-real-ip") ?? forwarded?.at(-1) ?? "local";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [k, times] of buckets) if (now - (times.at(-1) ?? 0) >= windowMs) buckets.delete(k);
  }
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  return recent.length > max;
}

/** Rejects oversized bodies before they are parsed. */
export function tooLarge(req: Request, maxBytes = 10_000) {
  return Number(req.headers.get("content-length") ?? 0) > maxBytes;
}
