"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const LANG = { en: "en-US", fr: "fr-FR", ar: "ar-SA" } as const;

type RecognitionLike = {
  lang: string;
  interimResults: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type RecognitionCtor = new () => RecognitionLike;

/** Browser speech: text-to-speech for replies and speech-to-text for questions. Voice output is remembered across visits. */
export function useSpeech(locale: keyof typeof LANG) {
  const [canSpeak, setCanSpeak] = useState(false);
  const [canListen, setCanListen] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const recognition = useRef<RecognitionLike | null>(null);

  useEffect(() => {
    setCanSpeak("speechSynthesis" in window);
    const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
    setCanListen(!!(w.SpeechRecognition ?? w.webkitSpeechRecognition));
    setVoiceOn(window.localStorage.getItem("builder-voice") !== "off");
    return () => window.speechSynthesis?.cancel();
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!canSpeak || !voiceOn || !text.trim()) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = LANG[locale];
      u.rate = 1;
      u.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find((v) => v.lang.startsWith(u.lang.slice(0, 2)) && /natural|neural|google|samantha|aria|jenny/i.test(v.name)) ?? voices.find((v) => v.lang.startsWith(u.lang.slice(0, 2)));
      if (match) u.voice = match;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    },
    [canSpeak, voiceOn, locale],
  );

  const toggleVoice = useCallback(() => {
    setVoiceOn((on) => {
      const next = !on;
      window.localStorage.setItem("builder-voice", next ? "on" : "off");
      if (!next) window.speechSynthesis?.cancel();
      return next;
    });
    setSpeaking(false);
  }, []);

  const listen = useCallback(
    (onText: (text: string) => void) => {
      const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
      const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
      if (!Ctor) return;
      if (listening) {
        recognition.current?.stop();
        return;
      }
      stop();
      const r = new Ctor();
      r.lang = LANG[locale];
      r.interimResults = false;
      r.onresult = (e) => onText(e.results[0][0].transcript);
      r.onend = () => setListening(false);
      r.onerror = () => setListening(false);
      recognition.current = r;
      setListening(true);
      r.start();
    },
    [listening, locale, stop],
  );

  return { canSpeak, canListen, voiceOn, speaking, listening, speak, stop, toggleVoice, listen };
}
