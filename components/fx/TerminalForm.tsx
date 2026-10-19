"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

type State = "idle" | "sending" | "done" | "error";

const field =
  "mt-1.5 w-full border-0 border-b border-line bg-transparent px-0 py-2 font-mono text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-0";

/** Terminal-style contact form. Validates on the server, then opens the visitor's mail client with the message drafted. */
export function TerminalForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), message: form.get("message") }),
      });
      const data = (await res.json()) as { ok: boolean; mailto?: string; error?: string };
      if (!data.ok || !data.mailto) {
        setError(
          data.error === "name" ? "Sender name is too short." : data.error === "email" ? "That channel address does not look valid." : "Spec needs at least 10 characters.",
        );
        setState("error");
        return;
      }
      setState("done");
      window.location.href = data.mailto;
    } catch {
      setError("Transmission failed. Try again, or use the email link.");
      setState("error");
    }
  }

  return (
    <div className="relative border border-line bg-surface/80 p-6 backdrop-blur-sm sm:p-8">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      {(["left-0 top-0", "right-0 top-0", "bottom-0 left-0", "bottom-0 right-0"] as const).map((pos) => (
        <span key={pos} aria-hidden="true" className={`absolute ${pos} h-3 w-3 text-accent/70`}>
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        </span>
      ))}

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">$ open channel --to meriem</p>

      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-12 text-center" role="status">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent text-accent shadow-[0_0_24px_rgb(var(--accent)/0.4)]">
              <Check size={26} />
            </span>
            <p className="mt-5 font-display text-3xl text-ink">SIGNAL RECEIVED</p>
            <p className="type-meta mt-2 max-w-[34ch] text-muted">Your mail app should open with the message drafted. Press send to finish.</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="mt-6 space-y-6" noValidate>
            <label className="block font-mono text-xs text-muted">
              {"// SENDER"}
              <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
            </label>
            <label className="block font-mono text-xs text-muted">
              {"// CHANNEL"}
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
            </label>
            <label className="block font-mono text-xs text-muted">
              {"// SPEC"}
              <textarea name="message" required rows={4} placeholder="What should we build or figure out together?" className={`${field} resize-none`} />
            </label>

            {state === "error" && (
              <p role="alert" className="font-mono text-xs text-red-400">
                ! {error}
              </p>
            )}

            <button
              type="submit"
              data-hot
              disabled={state === "sending"}
              className="interactive-target inline-flex items-center rounded-none border border-accent px-6 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-canvas disabled:opacity-60"
            >
              {state === "sending" ? "Transmitting…" : "Execute dispatch ↗"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
