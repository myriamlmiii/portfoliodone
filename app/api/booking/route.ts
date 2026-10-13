import { NextResponse } from "next/server";
import { booking } from "@/data/booking";

function clean(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
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
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  if (Number.isNaN(when.getTime()) || when.getTime() < todayUtc) {
    return NextResponse.json({ ok: false, error: "date" }, { status: 400 });
  }
  const weekday = when.getUTCDay();
  if (weekday === 0 || weekday === 6) {
    return NextResponse.json({ ok: false, error: "date" }, { status: 400 });
  }

  const subject = encodeURIComponent(`Meeting request, ${name}, ${date} ${time}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Date: ${date}`,
      `Time: ${time} (${booking.timezoneLabel}, ${booking.durationMinutes} min)`,
      `Timezone: ${booking.timezone}`,
      `Topic: ${topic || "Intro conversation"}`,
      "",
      "Requested from meriemlmoubariki.com",
      "",
    ].join("\n")
  );

  return NextResponse.json({
    ok: true,
    mailto: `mailto:${booking.email}?subject=${subject}&body=${body}`,
  });
}
