# Meriem Lmoubariki: Portfolio

Personal portfolio built with Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion and react-three-fiber. The site is trilingual (English, French, Arabic with RTL) and has dark and light themes.

## Getting started

```
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint .
npm run build && npm start
```

## Structure

| Path | Purpose |
|---|---|
| `app/` | Routes: home page, `/projects/[slug]` case studies, `robots.ts`, `sitemap.ts`, OG image and API routes |
| `app/api/chat` | Site assistant. Retrieval over the site's own data (`lib/rag.ts`); streams from Anthropic when `ANTHROPIC_API_KEY` is set, otherwise answers extractively |
| `app/api/tts` | Neural voice for the hero introduction (`msedge-tts`), cached per language |
| `app/api/contact`, `app/api/booking` | Validate the form, then email both inboxes via Resend when configured, else return a `mailto:` link. Nothing is stored |
| `components/` | Page sections; `fx/`, `three/`, `globe/` hold the visual effects |
| `data/` | Content (projects, experience, education, skills, ...) |
| `lib/` | i18n strings, RAG, hooks, theme and store helpers |

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | No | Enables generated chat answers; without it the assistant falls back to extractive answers |
| `RESEND_API_KEY` | No | Makes the contact and booking forms send email from the server to both inboxes; without it they open a pre-filled `mailto:` draft instead |
| `MAIL_FROM` | No | Sender for server-sent mail (default `Portfolio <onboarding@resend.dev>`; use a verified domain in production) |

Contact addresses live in `data/contact.ts`.

## Hero character

`components/CharacterVideo.tsx` shows a photo-textured AI version of Meriem (`public/photos/talk.webp`) that introduces herself out loud with lip-sync. If `public/video/hero.mp4` exists, that real clip is used instead.

Rebuild the clip from a new intro video (needs ffmpeg, ffprobe and numpy):

```
python scripts/build-hero-assets.py intro.mp4 [--crop W:H:X:Y] [--photo photo.jpg]
```

It crops to the person, whitens the backdrop, cross-fades the last 0.5 s into the first 0.5 s (picture with ffmpeg `xfade`, audio in numpy), and writes `public/video/hero.mp4`, `hero.webm`, `public/photos/portrait-bust.webp` and `public/og.jpg`.
