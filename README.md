# SafeLens AI

![Status](https://img.shields.io/badge/status-demo-ready-brightgreen)
![Type](https://img.shields.io/badge/type-computer-vision-blue)
![Use%20Case](https://img.shields.io/badge/use-case-site-safety-orange)

## Demo

<video src="./demo/safelens-ai-demo.mp4" width="100%" controls playsinline muted>
  Your browser does not support the video tag.
</video>

This demo shows the end-to-end SafeLens AI workflow for construction-site safety monitoring, including live video analysis, PPE compliance checks, and hazard detection. It highlights the system’s core decision support flow: detect unsafe conditions in real time, surface the relevant safety issue, and support faster intervention for on-site teams.

## Overview

SafeLens AI is a computer-vision system designed to improve construction-site safety by identifying missing personal protective equipment and hazardous conditions from live or recorded footage. The project combines object detection, operational monitoring, and visual alerting to support safer work environments and faster response to risk.

## Key Features

- PPE detection for workers and equipment
- Hazard identification for unsafe site conditions
- Real-time monitoring workflow for visual review and intervention
- Lightweight, deployment-oriented inference pipeline for operational use

## Project Context

SafeLens AI was developed to demonstrate how AI can support industrial safety at scale, with a particular focus on construction environments where rapid risk detection can prevent injuries and improve compliance.

## Hero video character

`components/CharacterVideo.tsx` (hero) shows a 3D, photo-textured AI version of Meriem (`public/photos/talk.webp`, background removed) that introduces herself out loud with lip-sync, using the browser voice. If `public/video/hero.mp4` exists, that real clip is used instead.

Rebuild the clip from a new intro video (needs ffmpeg, ffprobe and numpy):

```
python scripts/build-hero-assets.py intro.mp4 [--crop W:H:X:Y] [--photo photo.jpg]
```

It crops to the person, whitens the backdrop, cross-fades the last 0.5 s into the first 0.5 s (picture with ffmpeg `xfade`, audio in numpy), and writes `public/video/hero.mp4`, `hero.webm`, `public/photos/portrait-bust.webp` and `public/og.jpg`.
