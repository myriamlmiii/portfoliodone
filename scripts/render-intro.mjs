// Renders the spoken intro once per language into public/audio so production never depends on a live speech service.
// Run: node scripts/render-intro.mjs [en fr ar]   (no arguments renders all three; each language retries on rate limits)
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, writeFileSync } from "node:fs";
import { INTRO } from "../lib/introText.ts";

const VOICES = { en: "en-US-AvaMultilingualNeural", fr: "fr-FR-VivienneMultilingualNeural", ar: "ar-SA-ZariyahNeural" };
const langs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(VOICES);
mkdirSync("public/audio", { recursive: true });

async function render(lang) {
  const tts = new MsEdgeTTS();
  try {
    await tts.setMetadata(VOICES[lang], OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    // A touch faster and higher than default reads as upbeat and enthusiastic.
    const { audioStream } = tts.toStream(INTRO[lang], { rate: "+6%", pitch: "+14Hz", volume: "+0%" });
    const chunks = [];
    for await (const c of audioStream) chunks.push(c);
    return Buffer.concat(chunks);
  } finally {
    tts.close();
  }
}

for (const lang of langs) {
  for (let attempt = 1; ; attempt++) {
    try {
      const audio = await render(lang);
      if (!audio.length) throw new Error("empty audio");
      writeFileSync(`public/audio/intro-${lang}.mp3`, audio);
      console.log(lang, audio.length, "bytes");
      break;
    } catch (e) {
      if (attempt >= 8) throw e;
      console.log(lang, `attempt ${attempt} failed (${e.message.slice(0, 60)}), retrying`);
      await new Promise((r) => setTimeout(r, 15000 * attempt));
    }
  }
}
