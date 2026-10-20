"use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { booking } from "@/data/booking";
import { usePreferences } from "./Preferences";

type Status = "idle" | "sending" | "sent" | "error";

function upcomingWeekdays(count: number) {
  const days: string[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  while (days.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      const year = cursor.getFullYear();
      const month = String(cursor.getMonth() + 1).padStart(2, "0");
      const date = String(cursor.getDate()).padStart(2, "0");
      days.push(`${year}-${month}-${date}`);
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function Booking() {
  const { t } = usePreferences();
  const dates = useMemo(() => upcomingWeekdays(booking.daysAhead), []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(dates[0] ?? "");
  const [time, setTime] = useState<(typeof booking.slots)[number]>(booking.slots[0]);
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  if (booking.href) {
    return (
      <div id="book" className="rounded-lg border border-line bg-surface p-6">
        <p className="mb-2 text-xs text-accent">{t.contact.book}</p>
        <p className="mb-5 text-sm text-muted">{t.contact.bookHint}</p>
        <a
          href={booking.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-[13px] text-canvas transition-colors hover:bg-accent"
        >
          <CalendarDays size={15} />
          {t.contact.bookSend}
        </a>
      </div>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date, time, topic }),
      });
      const data = (await response.json()) as { ok?: boolean; sent?: boolean; mailto?: string };
      if (!response.ok || !data.ok || (!data.sent && !data.mailto)) {
        setStatus("error");
        return;
      }
      if (!data.sent && data.mailto) window.location.href = data.mailto;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form id="book" onSubmit={onSubmit} className="rounded-lg border border-line bg-surface p-6">
      <p className="mb-2 flex items-center gap-2 text-xs text-accent">
        <CalendarDays size={14} />
        {t.contact.book}
      </p>
      <p className="mb-5 text-sm text-muted">{t.contact.bookHint}</p>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs text-muted">{t.contact.formName}</span>
          <input
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs text-muted">{t.contact.formEmail}</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="mb-4 block">
        <span className="mb-2 block text-xs text-muted">{t.contact.bookDate}</span>
        <select
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
        >
          {dates.map((day) => (
            <option key={day} value={day}>
              {new Date(`${day}T12:00:00`).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="mb-4">
        <legend className="mb-2 text-xs text-muted">{t.contact.bookTime}</legend>
        <div className="flex flex-wrap gap-2">
          {booking.slots.map((slot) => {
            const active = time === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(slot)}
                aria-pressed={active}
                className={`rounded-md border px-3 py-1.5 text-xs tabular transition-colors ${
                  active ? "border-ink bg-ink text-canvas" : "border-line bg-canvas text-ink hover:border-accent"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted">
          {booking.durationMinutes} min · {t.contact.bookZone}
        </p>
      </fieldset>

      <label className="mb-5 block">
        <span className="mb-2 block text-xs text-muted">{t.contact.bookTopic}</span>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-[13px] text-canvas transition-colors hover:bg-accent disabled:opacity-60"
      >
        <CalendarDays size={14} />
        {status === "sending" ? t.contact.bookSending : t.contact.bookSend}
      </button>
      {status === "sent" && <p className="mt-3 text-sm text-accent">{t.contact.bookSent}</p>}
      {status === "error" && <p className="mt-3 text-sm text-accent">{t.contact.bookError}</p>}
    </form>
  );
}
