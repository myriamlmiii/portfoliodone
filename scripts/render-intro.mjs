// Renders the spoken intro once per language into public/audio so production never depends on a live speech service.
// Run: node scripts/render-intro.mjs
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, writeFileSync } from "node:fs";
import { INTRO } from "../lib/introText.ts";

const VOICES = { en: "en-US-AvaMultilingualNeural", fr: "fr-FR-VivienneMultilingualNeural", ar: "ar-SA-ZariyahNeural" };
mkdirSync("public/audio", { recursive: true });

for (const [lang, voice] of Object.entries(VOICES)) {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(INTRO[lang], { rate: "-16%", pitch: "+6Hz", volume: "-14%" });
  const chunks = [];
  for await (const c of audioStream) chunks.push(c);
  tts.close();
  const audio = Buffer.concat(chunks);
  if (!audio.length) throw new Error(`empty audio for ${lang}`);
  writeFileSync(`public/audio/intro-${lang}.mp3`, audio);
  console.log(lang, audio.length, "bytes");
}
