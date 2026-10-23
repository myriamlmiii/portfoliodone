import { NextRequest } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { INTRO } from "@/lib/introText";
import { rateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

/** Soft neural voices, identical in every browser. Audio is rendered once per language and cached. */
const VOICES = { en: "en-US-AvaMultilingualNeural", fr: "fr-FR-VivienneMultilingualNeural", ar: "ar-SA-ZariyahNeural" } as const;
type Lang = keyof typeof VOICES;

const cache = new Map<Lang, Promise<Buffer>>();

function render(lang: Lang) {
  return new Promise<Buffer>(async (resolve, reject) => {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(VOICES[lang], OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      // Slightly slower and lower than default reads as calm and warm rather than bright and rushed.
      const { audioStream } = tts.toStream(INTRO[lang], { rate: "-16%", pitch: "+6Hz", volume: "-14%" });
      const chunks: Buffer[] = [];
      audioStream.on("data", (c: Buffer) => chunks.push(c));
      audioStream.on("end", () => {
        tts.close();
        const audio = Buffer.concat(chunks);
        if (audio.length) resolve(audio);
        else reject(new Error("empty audio"));
      });
      audioStream.on("error", reject);
    } catch (e) {
      reject(e);
    }
  });
}

// Render all three languages as soon as the server loads, so the first visitor never waits for synthesis.
for (const lang of Object.keys(VOICES) as Lang[]) {
  const job = render(lang);
  cache.set(lang, job);
  job.catch(() => cache.delete(lang));
}

export async function GET(req: NextRequest) {
  if (rateLimited(req, "tts", 30)) return new Response("Too many requests", { status: 429 });
  const lang = req.nextUrl.searchParams.get("lang") as Lang | null;
  if (!lang || !(lang in VOICES)) return new Response("Unknown language", { status: 400 });

  let job = cache.get(lang);
  if (!job) {
    job = render(lang);
    cache.set(lang, job);
    job.catch(() => cache.delete(lang)); // retry next time if the speech service was unreachable
  }
  try {
    const audio = await job;
    return new Response(new Uint8Array(audio), {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=604800, immutable" },
    });
  } catch {
    return new Response("Voice unavailable", { status: 503 });
  }
}
