import { NextRequest } from "next/server";
import { presetAnswer, SYSTEM_PROMPT, type ChatMessage } from "@/lib/chat";

export const runtime = "nodejs";

const MODEL = "claude-haiku-5-5";
const MAX_MESSAGES = 8;
const MAX_CHARS = 600;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

// Best-effort per-instance limiter; swap for a shared store (e.g. Upstash) if traffic warrants.
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const text = (body: string, status = 200) =>
  new Response(body, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return text("You're sending messages quickly. Please try again in a minute.", 429);

  let payload: { messages?: ChatMessage[]; section?: string };
  try {
    payload = await req.json();
  } catch {
    return text("Invalid request.", 400);
  }

  const messages = (payload.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  const last = messages.at(-1);
  if (!last || last.role !== "user") return text("Invalid request.", 400);

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return text(presetAnswer(last.content));

  const section = typeof payload.section === "string" ? payload.section.slice(0, 40) : "";
  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 300,
      stream: true,
      system: SYSTEM_PROMPT + (section ? `\nThe visitor is currently viewing the "${section}" section.` : ""),
      messages,
    }),
  }).catch(() => null);

  if (!upstream?.ok || !upstream.body) return text(presetAnswer(last.content));

  // Convert Anthropic's SSE stream into a plain text stream of deltas.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const evt = JSON.parse(line.slice(6));
            if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
              controller.enqueue(encoder.encode(evt.delta.text));
            }
          } catch {
            /* ignore keep-alives and partial frames */
          }
        }
      },
    })
  );
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
