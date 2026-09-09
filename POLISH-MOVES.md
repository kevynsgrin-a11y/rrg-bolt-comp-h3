# Polish moves — The December Guide (H3)

Five techniques that carry the advent-calendar hub from "functional" to
"calm and finished," plus a note on how the content is managed so the
component never has to be hand-edited.

## 1. 200ms door unfold

Each tile opens with a single `rotateX` flap that swings from `0deg` to
`-85deg` over **200ms** (`ease-in`), then is removed from the DOM. The flap
is an absolutely-positioned overlay with `transform-origin: top center` and
`backface-visibility: hidden`, so the open content underneath is revealed
cleanly and the tile settles flush with no lingering transform or overlay
cost. The animation runs exactly once per tile — the first time a closed
tile becomes the current day — and never repeats.

When reduced motion is requested, the flap is never rendered; the open
content simply appears. No fade, no slide, no compromise of the reading
order.

## 2. Soft amber today ring

The current day is marked with a `box-shadow` amber ring plus a low glow —
**never a border**, so nothing reflows and neighbouring tiles never shift by
a single pixel. The ring is layered on top of the tile's existing shadow,
keeping the elevated paper look intact while drawing the eye to the one door
that opened this morning.

## 3. Letterpress paper tiles

Open tiles read as printed card stock: a hairline rule, a faint glyph
watermark at 15% opacity in the corner, a small uppercase day label in teal,
a serif title (Newsreader), and a two-line summary clamped with
`-webkit-line-clamp`. The paper colour shifts with the theme — warm cream in
light, deep slate in dark — but the calm, considered feel does not. The
glyph watermark is what sells the letterpress metaphor: a candle, star,
mitten, tram, or mug sitting quietly behind the type.

## 4. Reading-order-safe mobile reflow

The grid drops from four columns to two on mobile using
`grid-auto-flow: row dense`, so the day numbers still read 1, 2, 3, 4…
top to bottom instead of snaking left-to-right across columns. The feature
tile (Day 24) spans two columns in both layouts, and `row dense` pulls
smaller tiles forward to fill any gap the feature span leaves behind —
without breaking the visual reading order.

## 5. Restraint as the design thesis

No countdown timer. No streaks. No "you're falling behind" nudges. The
calendar reveals one short read a day and then waits. The design reward is
calm, not urgency — which is the entire point of a planning guide. The
today marker is a quiet amber pill with a gently pulsing dot; everything
else is still. The only motion in the whole component is the one-time door
unfold and that single pulse, both of which respect reduced motion.

---

## Content management

The twenty-four entries live as a **flat JSON array**. Each object carries
five keys:

```json
{
  "day": 3,
  "glyph": "mitten",
  "title": "The two-parade trick",
  "summary": "When the afternoon parade clears the east side…",
  "readUrl": "/guide/day-3"
}
```

- **`day`** — integer 1–24. Defines the reveal order and the grid position.
- **`glyph`** — one of `candle`, `star`, `mitten`, `tram`, `mug`. Maps
  through a small component lookup (`GLYPH_LOOKUP`) so the SVG stays inline
  and crisp at any size. Adding a new glyph means adding one component and
  one lookup entry — nothing else changes.
- **`title`** — the short-read headline, rendered in the serif face.
- **`summary`** — a two-line teaser, clamped to two lines in CSS.
- **`readUrl`** — the destination path for the full read.

A **static generator imports that array at build time**, so the entries are
baked into the rendered HTML — no client fetch, no loading state.
`isOpen` (whether a tile is revealed) is **derived from the real date per
deploy**: the build reads the current December day and marks each tile open
or closed accordingly. Re-deploying on a new day is what unlocks the next
door, which means the calendar is always correct for whoever loads it
without any client-side date logic beyond the initial render.

This keeps the writer's workflow trivial: edit the JSON array, rebuild, and
the calendar updates. The component never needs to be touched.
