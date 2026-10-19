"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/chat";

const SECTION_IDS = ["top", "about", "work", "experience", "education", "record", "places", "vision", "causes", "contact"];

/** Tracks which page section is most visible, so replies can be context-aware. */
function useCurrentSection() {
  const [section, setSection] = useState("top");
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setSection(visible.target.id);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return section;
}

export function useAICharacter() {
  const section = useCurrentSection();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(
    async (input: string) => {
      const content = input.trim();
      if (!content || pending) return;
      const history: ChatMessage[] = [...messages, { role: "user", content }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setPending(true);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, section }),
          signal: controller.signal,
        });
        if (!res.body) throw new Error("empty");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let reply = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          reply += decoder.decode(value, { stream: true });
          setMessages([...history, { role: "assistant", content: reply }]);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setMessages([...history, { role: "assistant", content: "Something went wrong. Please try again, or email lmeriem28@gmail.com." }]);
        }
      } finally {
        setPending(false);
      }
    },
    [messages, pending, section]
  );

  useEffect(() => () => abortRef.current?.abort(), []);

  return { messages, pending, send, section, reset: () => setMessages([]) };
}
