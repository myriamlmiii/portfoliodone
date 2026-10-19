#!/usr/bin/env python3
"""Turn an intro video into a seamless looping hero clip for the portfolio.

Usage:  python scripts/build-hero-assets.py intro.mp4 [--crop W:H:X:Y] [--photo photo.jpg]
Needs:  ffmpeg + ffprobe on PATH, numpy.
Output: public/video/hero.mp4, hero.webm, public/photos/portrait-bust.webp, public/og.jpg
"""
import argparse, subprocess, sys, tempfile, wave
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT_VIDEO = ROOT / "public" / "video"
OUT_PHOTOS = ROOT / "public" / "photos"
LOOP_SECONDS = 10.0
FADE = 0.5
RATE = 48000


def run(*args):
    subprocess.run([str(a) for a in args], check=True)


def probe_size(src):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", str(src)],
        check=True, capture_output=True, text=True,
    ).stdout.strip()
    w, h = (int(v) for v in out.split(","))
    return w, h


def default_crop(w, h):
    """Centred, head-to-toe crop (4:5). Pass --crop to override."""
    ch = int(h * 0.93)
    cw = int(ch * 0.8)
    return f"{cw}:{ch}:{(w - cw) // 2}:{int(h * 0.04)}"


def build_audio(src, tmp):
    """Cross-fade the last FADE seconds into the first FADE seconds, sample-accurately."""
    wav = tmp / "a.wav"
    run("ffmpeg", "-y", "-v", "error", "-i", src, "-t", LOOP_SECONDS, "-vn", "-ac", "2", "-ar", RATE, wav)
    with wave.open(str(wav)) as f:
        data = np.frombuffer(f.readframes(f.getnframes()), dtype=np.int16).reshape(-1, 2).astype(np.float64)
    n = int(FADE * RATE)
    t = np.linspace(0, 1, n)[:, None]
    head, tail = data[:n], data[-n:]
    mixed = tail * (1 - t) + head * t
    # Loop body = everything after the head, ending with the blended tail->head overlap.
    looped = np.concatenate([data[n:-n], mixed])
    out = tmp / "loop.wav"
    with wave.open(str(out), "wb") as f:
        f.setnchannels(2); f.setsampwidth(2); f.setframerate(RATE)
        f.writeframes(np.clip(looped, -32768, 32767).astype(np.int16).tobytes())
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("--crop", help="W:H:X:Y crop box around the person")
    ap.add_argument("--photo", help="optional photo for the portrait still / og image")
    a = ap.parse_args()
    src = Path(a.src)
    if not src.exists():
        sys.exit(f"missing {src}")
    OUT_VIDEO.mkdir(parents=True, exist_ok=True)
    OUT_PHOTOS.mkdir(parents=True, exist_ok=True)

    crop = a.crop or default_crop(*probe_size(src))
    vf = f"crop={crop},scale=768:-2,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,format=yuv420p"
    seg = LOOP_SECONDS - FADE  # video length after the cross-fade

    with tempfile.TemporaryDirectory() as d:
        tmp = Path(d)
        audio = build_audio(src, tmp)
        silent = tmp / "v.mp4"
        # xfade: the clip's last FADE seconds dissolve into its first FADE seconds.
        run(
            "ffmpeg", "-y", "-v", "error", "-i", src, "-i", src,
            "-filter_complex",
            f"[0:v]trim=0:{LOOP_SECONDS},setpts=PTS-STARTPTS,{vf}[a];"
            f"[1:v]trim=0:{FADE},setpts=PTS-STARTPTS,{vf}[b];"
            f"[a][b]xfade=transition=fade:duration={FADE}:offset={seg},trim=0:{seg},setpts=PTS-STARTPTS[v]",
            "-map", "[v]", "-an", "-c:v", "libx264", "-crf", 10, "-preset", "fast", silent,
        )
        run("ffmpeg", "-y", "-v", "error", "-i", silent, "-i", audio, "-t", seg,
            "-c:v", "libx264", "-crf", 24, "-preset", "slow", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", OUT_VIDEO / "hero.mp4")
        run("ffmpeg", "-y", "-v", "error", "-i", silent, "-i", audio, "-t", seg,
            "-c:v", "libvpx-vp9", "-crf", 36, "-b:v", 0, "-c:a", "libopus", "-b:a", "80k", OUT_VIDEO / "hero.webm")

        still = Path(a.photo) if a.photo else tmp / "still.png"
        if not a.photo:
            run("ffmpeg", "-y", "-v", "error", "-ss", 3, "-i", OUT_VIDEO / "hero.mp4", "-frames:v", 1, still)
        run("ffmpeg", "-y", "-v", "error", "-i", still, "-vf", "scale=480:600:force_original_aspect_ratio=increase,crop=480:600:(iw-480)/2:0", OUT_PHOTOS / "portrait-bust.webp")
        run("ffmpeg", "-y", "-v", "error", "-i", still, "-vf", "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630", ROOT / "public" / "og.jpg")
    print("done: public/video/hero.mp4, hero.webm, photos/portrait-bust.webp, og.jpg")


if __name__ == "__main__":
    main()
