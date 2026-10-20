import { NextResponse } from "next/server";
import { deliver } from "@/lib/mail";

function clean(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  let payload: { name?: unknown; email?: unknown; message?: unknown };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 120);
  const message = clean(payload.message, 2000);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ ok: false, error: "message" }, { status: 400 });
  }

  const result = await deliver({
    subject: `Portfolio, ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}\n`,
    replyTo: email,
  });

  return NextResponse.json({ ok: true, ...result });
}
