import { NextResponse } from "next/server";
import { booking } from "@/data/booking";
import { SITE_HOST } from "@/data/site";
import { deliver } from "@/lib/mail";
import { rateLimited, tooLarge } from "@/lib/rateLimit";

function clean(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  if (tooLarge(request)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 413 });
  if (rateLimited(request, "mail", 5, 10 * 60_000)) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  let payload: { name?: unknown; email?: unknown; date?: unknown; time?: unknown; topic?: unknown };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 120);
  const date = clean(payload.date, 10);
  const time = clean(payload.time, 5);
  const topic = clean(payload.topic, 200);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ ok: false, error: "date" }, { status: 400 });
  }
  if (!(booking.slots as readonly string[]).includes(time)) {
    return NextResponse.json({ ok: false, error: "time" }, { status: 400 });
  }

  const [year, month, day] = date.split("-").map(Number);
  const when = new Date(Date.UTC(year, month - 1, day));
  // "Today" in the booking timezone (en-CA formats as YYYY-MM-DD), so the server's own timezone never matters.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: booking.timezone }).format(new Date());
  // Date.UTC rolls 2026-02-31 over to March, so also require the date to survive a round trip.
  if (Number.isNaN(when.getTime()) || when.toISOString().slice(0, 10) !== date || date < today) {
    return NextResponse.json({ ok: false, error: "date" }, { status: 400 });
  }
  const weekday = when.getUTCDay();
  if (weekday === 0 || weekday === 6) {
    return NextResponse.json({ ok: false, error: "date" }, { status: 400 });
  }

  const result = await deliver({
    subject: `Meeting request, ${name}, ${date} ${time}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Date: ${date}`,
      `Time: ${time} (${booking.timezoneLabel}, ${booking.durationMinutes} min)`,
      `Timezone: ${booking.timezone}`,
      `Topic: ${topic || "Intro conversation"}`,
      "",
      `Requested from ${SITE_HOST}`,
      "",
    ].join("\n"),
    replyTo: email,
  });

  return NextResponse.json({ ok: true, ...result });
}
