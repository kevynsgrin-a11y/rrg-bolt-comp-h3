# Ride Ready Guide — The December Guide

An advent-style planning hub for a fictional theme-park guide. Each December
day reveals one short, five-minute read on timing, queues, food, and the
small decisions that turn a park day from *chased* into *calm*. Twenty-four
doors, opened one morning at a time, all the way to the party.

This is **comp H3** in the Ride Ready Guide component library.

## What it is

- A 24-door advent grid — one planning short-read per December day.
- **Open tiles** (day ≤ today): glyph watermark, serif title, two-line
  summary, and a Read link.
- **Closed tiles** (future days): dashed border, muted colours, a large
  serif day number, and an "opens Dec N" label.
- **Today tile**: a soft amber ring (box-shadow, no layout shift).
- **Feature tile** (Day 24): spans two grid columns.
- **Door unfold**: a 200ms `rotateX` flap that swings open once, then is
  removed from the DOM. Disabled under reduced motion.
- **Light and dark themes** with a manual toggle and system preference
  detection, persisted to `localStorage`.
- A **Polish moves** section documenting the five techniques behind the
  component, plus a content-management note.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Scripts

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR.       |
| `npm run build`   | Type-check (`tsc -b`) then build for prod.|
| `npm run preview` | Preview the production build locally.     |
| `npm run lint`    | Run ESLint over the project.              |

## Tech

- **React 18** + **TypeScript**
- **Vite 5** for dev server and build
- **Tailwind CSS** + **PostCSS** (available; the comp ships its own
  hand-written `index.css` design system)
- **Google Fonts**: Inter (UI), Space Grotesk (display), Newsreader
  (editorial serif headlines)

## Project structure

```
.
├── index.html
├── package.json
├── POLISH-MOVES.md
├── README.md
├── src/
│   ├── App.tsx          # Advent calendar component + hooks
│   ├── index.css        # Letterpress design system (light/dark)
│   ├── main.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig*.json
├── vite.config.ts
└── eslint.config.js
```

## Notes

- The current December day is derived from the real date: days 1–24 open in
  sequence, before December nothing is open, and after December 24 the full
  calendar is revealed.
- Reduced-motion users get the open content instantly — no door flap, no
  pulsing today dot — with every reading-order and layout guarantee intact.
- See [`POLISH-MOVES.md`](./POLISH-MOVES.md) for the five design techniques
  and the content-management (flat-JSON) workflow.
