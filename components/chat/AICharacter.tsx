"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send, X } from "lucide-react";
import { PRESETS } from "@/lib/chat";
import { useAICharacter } from "./useAICharacter";

/** Abstract avatar: a node ringed by orbits, echoing the hero network. Pulses only while "thinking". */
function Orb({ busy, size = 36 }: { busy: boolean; size?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 40 40" width={size} height={size}>
        <circle cx="20" cy="20" r="17" fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.35" strokeDasharray="2 5" />
        <circle cx="20" cy="20" r="11" fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.6" />
        <motion.circle
          cx="20"
          cy="20"
          r="4"
          fill="rgb(var(--accent))"
          animate={busy && !reduce ? { r: [4, 6, 4], opacity: [1, 0.6, 1] } : { r: 4, opacity: 1 }}
          transition={{ duration: 1.1, repeat: busy && !reduce ? Infinity : 0 }}
        />
      </svg>
    </span>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1" role="status" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted" style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </span>
  );
}

export function AICharacter() {
  const reduce = useReducedMotion();
  const { messages, pending, send, section } = useAICharacter();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    void send(draft);
    setDraft("");
  };

  return (
    <div className="fixed bottom-4 end-4 z-50 sm:bottom-6 sm:end-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ask about Meriem"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex h-[min(32rem,75svh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-line bg-canvas/80 shadow-2xl backdrop-blur-xl"
          >
            <header className="flex items-center gap-3 border-b border-line px-4 py-3">
              <Orb busy={pending} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">Ask about Meriem</p>
                <p className="truncate font-mono text-[11px] text-muted">Viewing: {section}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close chat"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-ink/[0.06] hover:text-ink"
              >
                <X size={18} />
              </button>
            </header>

            <div ref={logRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4" data-lenis-prevent>
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted">Hi, I can answer questions about Meriem&apos;s work, studies, and how to reach her.</p>
                  <div className="flex flex-col items-start gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.q}
                        type="button"
                        onClick={() => void send(p.q)}
                        className="rounded-full border border-line px-3 py-1.5 text-start text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                      >
                        {p.q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.role === "user" ? "bg-accent text-canvas" : "bg-surface text-ink"
                    }`}
                  >
                    {m.content || <TypingDots />}
                  </p>
                </motion.div>
              ))}
            </div>

            <form onSubmit={submit} className="flex items-center gap-2 border-t border-line p-3">
              <label htmlFor="ai-chat-input" className="sr-only">
                Your question
              </label>
              <input
                id="ai-chat-input"
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={300}
                placeholder="Ask a question…"
                className="min-w-0 flex-1 rounded-full border border-line bg-transparent px-4 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={pending || !draft.trim()}
                aria-label="Send message"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-canvas transition-opacity disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Ask about Meriem"}
        className="ms-auto flex h-12 w-12 items-center justify-center rounded-full border border-line bg-canvas/80 shadow-lg backdrop-blur-xl transition-colors hover:border-accent"
      >
        <Orb busy={false} size={30} />
      </button>
    </div>
  );
}
