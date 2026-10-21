"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Mic, Pause, Play, Square, Volume2, VolumeX } from "lucide-react";
import { Lipsync } from "wawa-lipsync";
import { INTRO } from "@/lib/introText";
import { usePreferences } from "./Preferences";

const LANG = { en: "en-US", fr: "fr-FR", ar: "ar-SA" } as const;

/** Warm, natural-sounding female voices first; any voice in the right language as a fallback. */
const VOICE_PREFERENCE = [
  /aria.*(online|natural)|jenny.*(online|natural)|ava.*(online|natural|multilingual)|sonia.*(online|natural)|denise.*(online|natural)|hamed|zariyah/i, // Edge neural voices
  /samantha|ava\b|allison|susan|serena|amelie|audrey|ghada|maged|tarik|laila/i, // Siri / macOS voices
  /natural|neural|online/i,
  /google.*(us english|français|عربي)|libby|michelle|emma|zira|hortense|julie|karen|moira|female/i,
  /google/i,
];
function pickVoice(voices: SpeechSynthesisVoice[]) {
  for (const re of VOICE_PREFERENCE) {
    const hit = voices.find((v) => re.test(v.name));
    if (hit) return hit;
  }
  return voices[0] ?? null;
}

/** Mouth geometry on /photos/talk.webp (800x1000). */
const FACE = {
  src: "/photos/talk.webp",
  w: 800,
  h: 1000,
  mouthX: 402,
  lipY: 437,
  lipHalfW: 46,
  /** Lower lip and chin patch that drops with the jaw. */
  jaw: { x: 332, y: 436, w: 140, h: 96 },
  maxOpen: 9,
};

type Mouth = { open: number; round: number };
type Viseme = { at: number; open: number; round: number };

/** Rough mouth shape per letter: how far the jaw opens and how rounded the lips are. */
function shapeOf(ch: string): [number, number] {
  if ("aàâäáæ".includes(ch)) return [1, 0];
  if ("eéèêëi".includes(ch)) return [0.55, 0];
  if ("oòôöœ".includes(ch)) return [0.75, 0.8];
  if ("uùûüw".includes(ch)) return [0.35, 1];
  if ("mbp".includes(ch)) return [0, 0];
  if ("fv".includes(ch)) return [0.15, 0];
  if (/[a-z]/.test(ch)) return [0.3, 0];
  return [0.2, 0];
}

type Drive = { active: boolean; open: number; round: number };

/** Jaw opening and lip rounding (0..1) for each detected viseme. */
const VISEME_SHAPE: Record<string, [number, number]> = {
  viseme_sil: [0, 0],
  viseme_PP: [0.02, 0],
  viseme_FF: [0.18, 0],
  viseme_TH: [0.3, 0],
  viseme_DD: [0.4, 0],
  viseme_kk: [0.45, 0],
  viseme_CH: [0.4, 0.5],
  viseme_SS: [0.25, 0],
  viseme_nn: [0.3, 0],
  viseme_RR: [0.45, 0.3],
  viseme_aa: [1, 0],
  viseme_E: [0.65, 0],
  viseme_I: [0.5, 0],
  viseme_O: [0.8, 0.9],
  viseme_U: [0.45, 1],
};

/**
 * Introduction voice. Plays a soft neural voice pre-rendered to /audio (same in every browser, run scripts/render-intro.mjs after editing the text) and reads the
 * lip shapes from the audio itself. If that is unavailable it falls back to the browser's own speech engine,
 * lip-synced from word boundaries. Starts by itself on the first visit: right away if the browser allows
 * audio, otherwise on the visitor's first click, tap or key press.
 */
function useTalk(locale: keyof typeof LANG) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const mouth = useRef<Mouth>({ open: 0, round: 0 });
  const queue = useRef<Viseme[]>([]);
  const drive = useRef<Drive>({ active: false, open: 0, round: 0 });
  const run = useRef(0);
  const audio = useRef<HTMLAudioElement | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const meter = useRef(0);
  const localeRef = useRef(locale);
  localeRef.current = locale;

  const stopAll = () => {
    run.current++;
    cancelAnimationFrame(meter.current);
    drive.current.active = false;
    queue.current = [];
    audio.current?.pause();
    audio.current = null;
    window.speechSynthesis?.cancel();
  };

  /** Browser speech engine, used only when the neural voice cannot be played. */
  const speakWithBrowser = (id: number) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      setSpeaking(false);
      return;
    }
    const lang = LANG[localeRef.current];
    const full = INTRO[localeRef.current];
    const sentences = full.match(/[^.!?؟]+[.!?؟]*/g)?.map((x) => x.trim()).filter(Boolean) ?? [full];
    const voice = pickVoice(synth.getVoices().filter((v) => v.lang.startsWith(lang.slice(0, 2))));
    synth.cancel();
    // Chrome silently drops speech queued in the same tick as cancel(), so start it a moment later.
    window.setTimeout(() => {
      if (id !== run.current) return;
      synth.resume();
      sentences.forEach((sentence, i) => {
        const u = new SpeechSynthesisUtterance(sentence);
        u.lang = lang;
        u.rate = 0.92;
        u.pitch = 1.02;
        if (voice) u.voice = voice;
        u.onstart = () => {
          if (id !== run.current) return;
          window.sessionStorage.setItem("meriem-intro", "done");
          setSpeaking(true);
          setNeedsGesture(false);
        };
        u.onboundary = (e) => {
          if (id !== run.current || e.name === "sentence") return;
          const word = (e.charLength ? sentence.substr(e.charIndex, e.charLength) : (sentence.slice(e.charIndex).match(/^\S+/)?.[0] ?? "")).toLowerCase();
          const perChar = 62 / u.rate;
          const now = performance.now();
          queue.current = [...word].map((ch, k) => {
            const [open, round] = shapeOf(ch);
            return { at: now + k * perChar, open, round };
          });
          queue.current.push({ at: now + word.length * perChar, open: 0.05, round: 0 });
        };
        u.onend = () => {
          queue.current = [];
          if (id === run.current && i === sentences.length - 1) setSpeaking(false);
        };
        u.onerror = (e) => {
          if (id !== run.current || e.error === "interrupted" || e.error === "canceled") return;
          setSpeaking(false);
          if (e.error === "not-allowed") setNeedsGesture(true);
        };
        synth.speak(u);
      });
    }, 80);
  };

  /** Real-time viseme detection from the playing audio (wawa-lipsync), mapped to jaw opening and lip rounding. */
  const meterAudio = async (el: HTMLAudioElement, id: number) => {
    try {
      // Routing audio through a suspended AudioContext would silence it, so make sure one can run first.
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const probe = (audioCtx.current ??= new Ctx());
      await probe.resume();
      if (probe.state !== "running" || id !== run.current) throw new Error("audio context blocked");
      const lipsync = new Lipsync();
      lipsync.connectAudio(el);
      const tick = () => {
        if (id !== run.current) return;
        lipsync.processAudio();
        const shape = VISEME_SHAPE[lipsync.viseme] ?? [0, 0];
        const loud = Math.min(1, (lipsync.features?.volume ?? 0) * 6);
        drive.current.open = shape[0] * (0.55 + 0.45 * loud) * (loud < 0.04 ? 0 : 1);
        drive.current.round = shape[1];
        meter.current = requestAnimationFrame(tick);
      };
      drive.current.active = true;
      tick();
    } catch {
      drive.current.active = false; // plays normally; the mouth falls back to a speech-like rhythm
    }
  };

  const start = useRef<() => void>(() => {});
  start.current = () => {
    stopAll();
    const id = run.current;
    const el = new Audio(`/audio/intro-${localeRef.current}.mp3?v=${INTRO[localeRef.current].length}`);
    el.preload = "auto";
    audio.current = el;
    el.onplaying = () => {
      if (id !== run.current) return;
      window.sessionStorage.setItem("meriem-intro", "done");
      setSpeaking(true);
      setNeedsGesture(false);
      void meterAudio(el, id);
    };
    el.onended = () => {
      if (id !== run.current) return;
      drive.current.active = false;
      cancelAnimationFrame(meter.current);
      setSpeaking(false);
    };
    el.onerror = () => {
      if (id === run.current) speakWithBrowser(id);
    };
    el.play().catch((err: unknown) => {
      if (id !== run.current) return;
      if ((err as Error)?.name === "NotAllowedError") {
        setSpeaking(false);
        setNeedsGesture(true); // autoplay blocked: wait for the first click or tap
      } else {
        speakWithBrowser(id);
      }
    });
  };

  useEffect(() => {
    setSupported(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.sessionStorage.getItem("meriem-intro") === "done") return;

    const events = ["pointerdown", "keydown", "touchend"] as const;
    const onGesture = (ev: Event) => {
      events.forEach((e) => window.removeEventListener(e, onGesture));
      // A tap on a button or link does that control's job; it must not also start the intro (the two would fight).
      if ((ev.target as Element | null)?.closest?.("button, a, input, textarea, select")) return;
      start.current();
    };
    const timer = window.setTimeout(() => {
      start.current();
      events.forEach((e) => window.addEventListener(e, onGesture, { once: true }));
    }, 400);
    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, onGesture));
      stopAll();
      void audioCtx.current?.close();
      audioCtx.current = null;
    };
  }, []);

  const toggle = () => {
    if (speaking) {
      stopAll();
      setSpeaking(false);
    } else {
      setNeedsGesture(false);
      setSpeaking(true); // instant feedback on click; resets if playback fails
      start.current();
    }
  };

  return { supported, speaking, needsGesture, mouth, queue, drive, toggle };
}

/**
 * The real portrait on a 2D canvas. The jaw patch drops and a soft dark mouth opens behind it, driven by the
 * letter-by-letter mouth shapes. Redraws only while the mouth moves, and pauses when scrolled out of view.
 */
function Face({ speaking, mouth, queue, drive }: { speaking: boolean; mouth: MutableRefObject<Mouth>; queue: MutableRefObject<Viseme[]>; drive: MutableRefObject<Drive> }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const speakingRef = useRef(speaking);
  speakingRef.current = speaking;

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const img = new window.Image();
    let ready = false;
    img.onload = () => {
      ready = true;
      ctx.drawImage(img, 0, 0, FACE.w, FACE.h);
    };
    img.src = FACE.src;

    const jaw = document.createElement("canvas");
    jaw.width = FACE.jaw.w;
    jaw.height = FACE.jaw.h;
    const jctx = jaw.getContext("2d");

    let visible = true;
    const observer = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    observer.observe(cv);

    let raf = 0;
    let last = 0;
    let open = 0;
    let round = 0;
    let drawn = -1;
    let sway = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!ready || !visible || now - last < 33) return; // ~30 fps is plenty for a mouth
      last = now;

      // Follow the latest mouth shape from the speech queue.
      const t = performance.now();
      const q = queue.current;
      while (q.length > 1 && q[1].at <= t) q.shift();
      const cur = speakingRef.current && q.length && q[0].at <= t ? q[0] : null;
      const live = drive.current.active && speakingRef.current;
      // Real audio levels when available; otherwise word shapes from the speech engine, or a gentle talking rhythm.
      const rhythm = 0.25 + 0.4 * Math.abs(Math.sin(t / 135)) * (0.6 + 0.4 * Math.sin(t / 700));
      const tOpen = live ? drive.current.open : cur ? cur.open : speakingRef.current ? (q.length ? 0.1 : rhythm) : 0;
      const tRound = live ? drive.current.round : cur ? cur.round : 0;
      open += (tOpen - open) * 0.45;
      round += (tRound - round) * 0.4;
      mouth.current.open = open;
      mouth.current.round = round;

      // A barely perceptible sway while she talks keeps the portrait alive without distorting the face.
      sway += ((speakingRef.current ? Math.sin(now / 1100) * 0.35 : 0) - sway) * 0.1;
      cv.style.transform = `rotate(${sway.toFixed(3)}deg)`;

      const d = open * FACE.maxOpen;
      const key = Math.round(d * 4) + Math.round(round * 10) * 1000;
      if (key === drawn) return;
      drawn = key;

      ctx.clearRect(0, 0, FACE.w, FACE.h);
      ctx.drawImage(img, 0, 0, FACE.w, FACE.h);
      if (d < 1.2 || !jctx) return;

      const { x, y, w, h } = FACE.jaw;
      const halfW = FACE.lipHalfW - 6 - round * 9;
      const cy = FACE.lipY + d * 0.5;
      // Mouth interior: dark cavity, then upper teeth and a tongue, all clipped to the opening.
      const ry = d * 0.5 + 2;
      const grad = ctx.createRadialGradient(FACE.mouthX, cy, 1, FACE.mouthX, cy, halfW);
      grad.addColorStop(0, "#2a0b0e");
      grad.addColorStop(0.75, "#4a1a1e");
      grad.addColorStop(1, "rgba(74,26,30,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(FACE.mouthX, cy, halfW, ry, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(FACE.mouthX, cy, halfW - 2, ry - 0.5, 0, 0, Math.PI * 2);
      ctx.clip();
      if (d > 7) {
        const tg = ctx.createRadialGradient(FACE.mouthX, cy + ry, 1, FACE.mouthX, cy + ry, halfW * 0.7);
        tg.addColorStop(0, "rgba(168,86,92,0.8)");
        tg.addColorStop(1, "rgba(120,56,64,0)");
        ctx.fillStyle = tg;
        ctx.fillRect(FACE.mouthX - halfW, cy - ry, halfW * 2, ry * 2 + 2);
      }
      // Natural speech shows only a sliver of the upper teeth: warm ivory, soft-focus, shaded into the corners.
      const th = d > 3 ? Math.min(d * 0.3, 4) : 0;
      const left = FACE.mouthX - halfW * 0.7;
      const tw = halfW * 1.4;
      const tg2 = ctx.createLinearGradient(0, FACE.lipY, 0, FACE.lipY + th);
      tg2.addColorStop(0, "rgba(190,170,152,0.55)");
      tg2.addColorStop(0.4, "rgba(222,208,192,0.6)");
      tg2.addColorStop(1, "rgba(180,162,146,0.45)");
      ctx.filter = "blur(1.1px)";
      ctx.fillStyle = tg2;
      ctx.beginPath();
      ctx.roundRect(left, FACE.lipY - 1, tw, th + 1, [0, 0, th * 0.5, th * 0.5]);
      ctx.fill();
      ctx.filter = "none";
      const edge = ctx.createLinearGradient(left, 0, left + tw, 0);
      edge.addColorStop(0, "rgba(52,18,22,0.95)");
      edge.addColorStop(0.3, "rgba(52,18,22,0.15)");
      edge.addColorStop(0.7, "rgba(52,18,22,0.15)");
      edge.addColorStop(1, "rgba(52,18,22,0.95)");
      ctx.fillStyle = edge;
      ctx.fillRect(left, FACE.lipY - 1, tw, th + 2);
      ctx.restore();

      // Lower lip + chin slide down with the jaw, feathered on every edge so there is no seam.
      jctx.globalCompositeOperation = "source-over";
      jctx.clearRect(0, 0, w, h);
      jctx.drawImage(img, x, y, w, h, 0, 0, w, h);
      jctx.globalCompositeOperation = "destination-in";
      const mask = jctx.createRadialGradient(w / 2, 4, 6, w / 2, h * 0.35, w * 0.5);
      mask.addColorStop(0, "rgba(0,0,0,1)");
      mask.addColorStop(0.65, "rgba(0,0,0,1)");
      mask.addColorStop(1, "rgba(0,0,0,0)");
      jctx.fillStyle = mask;
      jctx.fillRect(0, 0, w, h);
      ctx.drawImage(jaw, x, y + d * 0.7);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [mouth, queue, drive]);

  // The whole cut-out portrait (hair, shoulders), background removed; it sits on the page with no card behind it.
  return <canvas ref={ref} width={FACE.w} height={FACE.h} className="absolute inset-0 h-full w-full object-contain object-bottom" style={{ transformOrigin: "50% 85%" }} />;
}

/**
 * Hero character: the real portrait of Meriem, introducing herself out loud
 * and lip-syncs. If public/video/hero.mp4 exists, that real clip is used instead.
 */
export function CharacterVideo() {
  const { locale } = usePreferences();
  const talk = useTalk(locale);

  if (process.env.NEXT_PUBLIC_HERO_VIDEO) return <HeroClip />;

  return (
    <figure className="relative aspect-[4/5] overflow-hidden">
      <style>{`@keyframes talk-ring { from { transform: scale(0.97); opacity: 0.8; } to { transform: scale(1.03); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .talk-ring { animation: none !important; } }`}</style>
      <Face speaking={talk.speaking} mouth={talk.mouth} queue={talk.queue} drive={talk.drive} />
      <span
        aria-hidden="true"
        className="talk-ring pointer-events-none absolute inset-2 rounded-xl border-2 border-accent opacity-0"
        style={talk.speaking ? { animation: "talk-ring 1.4s ease-out infinite" } : undefined}
      />
      <figcaption className="sr-only">AI version of Meriem Lmoubariki, a talking portrait that introduces her.</figcaption>
      {talk.speaking && (
        <p className="absolute inset-x-3 top-16 line-clamp-3 rounded-lg bg-black/55 p-2.5 text-xs leading-snug text-white backdrop-blur" role="status">
          {INTRO[locale]}
        </p>
      )}
      <div className="absolute end-3 top-3 z-10 flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-white">{locale === "ar" ? "مريم الذكية" : locale === "fr" ? "Meriem IA" : "AI Meriem"}</span>
        {talk.supported && (
          <button
            type="button"
            onClick={talk.toggle}
            aria-pressed={talk.speaking}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-3 text-xs font-medium text-canvas hover:opacity-90"
          >
            {talk.speaking ? <Square size={14} /> : <Mic size={14} />}
            {talk.speaking
              ? locale === "ar" ? "إيقاف" : locale === "fr" ? "Arrêter" : "Stop"
              : locale === "ar" ? "استمع إليّ" : locale === "fr" ? "Écoute-moi" : "Hear me"}
          </button>
        )}
      </div>
    </figure>
  );
}

/** The looping hero clip built by scripts/build-hero-assets.py. Muted until the visitor opts in; plays only while visible. */
function HeroClip() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([e]) => (e.isIntersecting ? void video.play().catch(() => {}) : video.pause()), { threshold: 0.4 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-white">
      <video
        ref={ref}
        poster="/photos/portrait-bust.webp"
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="Meriem introducing herself"
        className="h-full w-full object-cover"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute bottom-3 end-3 flex gap-1">
        <button
          type="button"
          onClick={() => (ref.current?.paused ? void ref.current.play() : ref.current?.pause())}
          aria-label={playing ? "Pause video" : "Play video"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-canvas/85 text-ink hover:border-accent"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-pressed={!muted}
          aria-label={muted ? "Turn sound on" : "Mute"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-canvas/85 text-ink hover:border-accent"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </figure>
  );
}
