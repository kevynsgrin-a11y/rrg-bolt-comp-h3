import { useEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ *
 * Hooks
 * ------------------------------------------------------------------ */

type Theme = 'light' | 'dark';

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('rrg-theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem('rrg-theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  return [theme, toggle];
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Returns the current December day as 1–24. If today is before December 1,
 * returns 0 (nothing open yet). If today is after December 24, returns 24
 * (the whole calendar is revealed). Scoped to the current year.
 */
function useAdventDay(): number {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed; December === 11
  const date = now.getDate();

  if (month !== 11) return 0;
  if (date > 24) return 24;
  return date;
}

/* ------------------------------------------------------------------ *
 * Icons (line art, stroke-based)
 * ------------------------------------------------------------------ */

function Sun({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} width="20" height="20"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3L17 7M7 17l-1.7 1.7" />
    </svg>
  );
}

function Moon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} width="20" height="20"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 14.2A8.4 8.4 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7Z" />
    </svg>
  );
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} width="16" height="16"
      fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
    </svg>
  );
}

function Book({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} width="18" height="18"
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4.5h6.5a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0-1.5-1.5H4Z" />
      <path d="M20 4.5h-6.5a2 2 0 0 0-2 2v13a1.5 1.5 0 0 1 1.5-1.5H20Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Glyph components (simple line art, 22×22, stroke-based)
 * ------------------------------------------------------------------ */

type GlyphName = 'candle' | 'star' | 'mitten' | 'tram' | 'mug';
type GlyphProps = { className?: string };

function CandleGlyph({ className = '' }: GlyphProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} width="22" height="22"
      fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 3.2c1 .9 1.4 1.6 1.4 2.4 0 .8-.6 1.4-1.4 1.4S9.6 6.4 9.6 5.6 10 4.1 11 3.2Z" />
      <path d="M11 7.6v3.2M8 10.8h6M8.4 10.8v6.8M13.6 10.8v6.8M8 17.6h6" />
    </svg>
  );
}

function StarGlyph({ className = '' }: GlyphProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} width="22" height="22"
      fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 3l2.2 4.6 5 .7-3.7 3.5.9 5L11 14.9 6.6 16.8l.9-5L3.8 8.3l5-.7Z" />
    </svg>
  );
}

function MittenGlyph({ className = '' }: GlyphProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} width="22" height="22"
      fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.5 11.8c0-2 1.3-3.3 2.9-3.3.9 0 1.6.5 2 .9.4-.4 1.1-.9 2-.9 1.6 0 2.9 1.3 2.9 3.3v3.2H7.5Z" />
      <path d="M7.5 15h7v1.9a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1Z" />
      <path d="M11 8.5V7" />
    </svg>
  );
}

function TramGlyph({ className = '' }: GlyphProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} width="22" height="22"
      fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="4" width="12" height="11" rx="2.2" />
      <path d="M5 11h12M8 4V2.6M14 4V2.6M7 18l-1.5 2M15 18l1.5 2" />
      <circle cx="8" cy="13.6" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="14" cy="13.6" r="0.6" fill="currentColor" stroke="none" />
      <path d="M9 15v1.5M13 15v1.5" />
    </svg>
  );
}

function MugGlyph({ className = '' }: GlyphProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} width="22" height="22"
      fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 8h10v6.5a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 5 14.5Z" />
      <path d="M15 9.5h2.2a2 2 0 0 1 0 4H15" />
      <path d="M7 5.2c.4.5.4 1.1 0 1.6M9.5 5.2c.4.5.4 1.1 0 1.6" />
    </svg>
  );
}

const GLYPH_LOOKUP: Record<GlyphName, (p: GlyphProps) => JSX.Element> = {
  candle: CandleGlyph,
  star: StarGlyph,
  mitten: MittenGlyph,
  tram: TramGlyph,
  mug: MugGlyph,
};

function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  const Cmp = GLYPH_LOOKUP[name];
  return <Cmp className={className} />;
}

/* ------------------------------------------------------------------ *
 * Advent content (fictional theme-park planning short reads)
 * ------------------------------------------------------------------ */

interface AdventEntry {
  day: number;
  glyph: GlyphName;
  title: string;
  summary: string;
  readUrl: string;
}

const ADVENT_ENTRIES: AdventEntry[] = [
  { day: 1, glyph: 'candle', title: 'First light at the front gate', summary: 'Why a 7:45 arrival beats an 8:30 one by three rides, and how to time the turnstiles before the music starts.', readUrl: '/guide/day-1' },
  { day: 2, glyph: 'star', title: 'The rope-drop map, redrawn', summary: 'A walking order for the first ninety minutes that skips the two attractions everyone else sprints to first.', readUrl: '/guide/day-2' },
  { day: 3, glyph: 'mitten', title: 'The two-parade trick', summary: 'When the afternoon parade clears the east side and leaves the big coaster walk-on for exactly twenty-two minutes.', readUrl: '/guide/day-3' },
  { day: 4, glyph: 'mug', title: 'A table nobody thinks to book', summary: 'The 3:10 reservation window at the mountain lodge, and why it is the best meal slot in the park.', readUrl: '/guide/day-4' },
  { day: 5, glyph: 'tram', title: 'The resort bus that saves forty minutes', summary: 'One route skips the hub entirely. Here is the stop, the schedule, and the one transfer to avoid.', readUrl: '/guide/day-5' },
  { day: 6, glyph: 'star', title: 'Height checks before you leave home', summary: 'Measure with shoes on, then measure again. A six-millimetre mistake is the difference between tears and a fast pass.', readUrl: '/guide/day-6' },
  { day: 7, glyph: 'candle', title: 'The single-rider line that almost never is', summary: 'Three attractions have a true single-rider queue. Two pretend to. A field guide to knowing which is which.', readUrl: '/guide/day-7' },
  { day: 8, glyph: 'mitten', title: 'Cold mornings, warm queues', summary: 'The five indoor wait spaces that heat up fastest, ranked by how early you can duck inside from the wind.', readUrl: '/guide/day-8' },
  { day: 9, glyph: 'star', title: 'What a 38-inch rider misses by one inch', summary: 'The height tier just out of reach, and the four attractions that still make a 38-inch day feel complete.', readUrl: '/guide/day-9' },
  { day: 10, glyph: 'mug', title: 'The snack that is lunch', summary: 'A budget breakdown for the filled pretzel, the soup bread bowl, and the one churro stand with no line after 11.', readUrl: '/guide/day-10' },
  { day: 11, glyph: 'tram', title: 'Leaving the park at midday, on purpose', summary: 'The pool-and-nap reset that buys you a second wind. What to ride first when you walk back in at 5.', readUrl: '/guide/day-11' },
  { day: 12, glyph: 'candle', title: 'The fireworks spot nobody guards', summary: 'A second-floor railing with a full view, zero crowding, and a bench. Directions, and the one rule about strollers.', readUrl: '/guide/day-12' },
  { day: 13, glyph: 'mitten', title: 'A rain plan that is not a surrender', summary: 'Three attractions that run in a downpour, two that close, and the indoor theatre that never fills.', readUrl: '/guide/day-13' },
  { day: 14, glyph: 'star', title: 'The character line that is worth it', summary: 'One meet-and-greet has a six-minute average and a photographer who lets you pose. The rest do not.', readUrl: '/guide/day-14' },
  { day: 15, glyph: 'mug', title: 'Dessert before dinner, explained', summary: 'The churro window closes at 9. The sit-down dinner does not start until 9:15. A small scheduling miracle.', readUrl: '/guide/day-15' },
  { day: 16, glyph: 'tram', title: 'The last bus, and how to catch it', summary: 'A reverse-timing trick: ride the slow attraction at 9:50, walk out at 10:05, and still make the 10:15 shuttle.', readUrl: '/guide/day-16' },
  { day: 17, glyph: 'candle', title: 'The quietest dinner hour at the Hub', summary: 'Between 4:40 and 5:20 the table-service restaurants empty out. How to turn that gap into a calm first meal.', readUrl: '/guide/day-17' },
  { day: 18, glyph: 'mitten', title: 'Layering for a twelve-hour park day', summary: 'The morning is 48 degrees and the afternoon is 71. A packing list built around one removable fleece.', readUrl: '/guide/day-18' },
  { day: 19, glyph: 'star', title: 'The app button you keep missing', summary: 'Mobile order is not the same as a tap-to-pay. One screen buries it. Here is the exact path, in four taps.', readUrl: '/guide/day-19' },
  { day: 20, glyph: 'mug', title: 'A coffee map for the early resort walk', summary: 'Which lobby kiosk opens at 6:30, which espresso bar opens at 7, and the one that is closed on Tuesdays.', readUrl: '/guide/day-20' },
  { day: 21, glyph: 'tram', title: 'Two parks, one locker', summary: 'The mid-park locker station that lets you cross between gates without carrying the bag twice. Cost and code reset.', readUrl: '/guide/day-21' },
  { day: 22, glyph: 'candle', title: 'The finale ride, sequenced', summary: 'Save the mountain coaster for last, but only if you are in the left-hand car. Why the seat matters after dark.', readUrl: '/guide/day-22' },
  { day: 23, glyph: 'star', title: 'One souvenir, picked well', summary: 'A guide to the five keepsakes that survive a decade, and the three that break before the drive home.', readUrl: '/guide/day-23' },
  { day: 24, glyph: 'mug', title: 'The party, and how to arrive ready', summary: 'Everything you planned for twenty-three days, assembled into one calm evening. The schedule, the shortcuts, the toast.', readUrl: '/guide/day-24' },
];

/* ------------------------------------------------------------------ *
 * AdventTile
 * ------------------------------------------------------------------ */

interface AdventTileProps {
  entry: AdventEntry;
  currentDay: number;
  reducedMotion: boolean;
}

function AdventTile({ entry, currentDay, reducedMotion }: AdventTileProps) {
  const isOpen = entry.day <= currentDay;
  const isToday = entry.day === currentDay;
  const isFeature = entry.day === 24;

  const [unfolding, setUnfolding] = useState(false);
  const [flapRemoved, setFlapRemoved] = useState(false);
  const openedRef = useRef(false);

  // Door unfold: run once when a closed tile becomes open (i.e. becomes "today").
  // The flap rotates from 0 to -85deg over 200ms, then is removed.
  useEffect(() => {
    if (!isOpen || openedRef.current) return;
    openedRef.current = true;

    if (reducedMotion) {
      setFlapRemoved(true);
      return;
    }

    setUnfolding(true);
    const t = window.setTimeout(() => {
      setUnfolding(false);
      setFlapRemoved(true);
    }, 200);
    return () => window.clearTimeout(t);
  }, [isOpen, reducedMotion]);

  const tileClass = [
    'advent-tile',
    isOpen ? 'advent-tile--open' : 'advent-tile--closed',
    isToday ? 'advent-tile--today' : '',
    isFeature ? 'advent-tile--feature' : '',
  ].filter(Boolean).join(' ');

  const dayLabel = `Day ${entry.day}`;
  const ariaLabel = isOpen
    ? `${dayLabel}: ${entry.title}. ${entry.summary}`
    : `${dayLabel}, opens December ${entry.day}.`;

  return (
    <article className={tileClass} aria-label={ariaLabel} tabIndex={0}>
      {!flapRemoved && (
        <div
          className={['advent-flap', unfolding ? 'advent-flap--unfolding' : ''].filter(Boolean).join(' ')}
          aria-hidden="true"
        />
      )}

      {isOpen ? (
        <div className="advent-tile__open">
          <Glyph name={entry.glyph} className="advent-tile__watermark" />
          <span className="advent-tile__day">{dayLabel}</span>
          <h3 className="advent-tile__title">{entry.title}</h3>
          <p className="advent-tile__summary">{entry.summary}</p>
          <a className="advent-tile__read" href={entry.readUrl}>
            Read <ArrowRight className="advent-tile__read-arrow" />
          </a>
        </div>
      ) : (
        <div className="advent-tile__closed">
          <Glyph name={entry.glyph} className="advent-tile__closed-glyph" />
          <span className="advent-tile__closed-number">{entry.day}</span>
          <span className="advent-tile__closed-opens">opens Dec {entry.day}</span>
        </div>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * IntroSection
 * ------------------------------------------------------------------ */

function IntroSection({ currentDay }: { currentDay: number }) {
  const todayCopy = currentDay === 0
    ? 'The calendar opens December 1.'
    : currentDay >= 24
      ? 'Every door is open. The party is here.'
      : `Today is December ${currentDay}.`;

  return (
    <header className="intro">
      <p className="intro__eyebrow">Ride Ready Guide · December</p>
      <h1 className="intro__headline">One short read a day, all the way to the party.</h1>
      <p className="intro__lede">
        Twenty-four small planning notes — one revealed each December morning —
        each one a five-minute read on timing, queues, food, and the little
        decisions that make a theme-park day feel calm instead of chased.
      </p>
      <p className="intro__today">
        <span className="intro__today-dot" aria-hidden="true" />
        {todayCopy}
      </p>
    </header>
  );
}

/* ------------------------------------------------------------------ *
 * PolishMoves
 * ------------------------------------------------------------------ */

interface PolishMove {
  title: string;
  body: string;
}

const POLISH_MOVES: PolishMove[] = [
  {
    title: '200ms door unfold',
    body: 'Each tile opens with a single rotateX flap (0 → −85°) that completes in 200ms and is then removed from the DOM, so the open content sits flush with no lingering overlay or transform cost.',
  },
  {
    title: 'Soft amber today ring',
    body: 'The current day is marked with a box-shadow amber ring plus a low glow — never a border, so nothing reflows and neighbouring tiles never shift by a pixel.',
  },
  {
    title: 'Letterpress paper tiles',
    body: 'Open tiles read as printed card stock: a hairline rule, a faint glyph watermark at 15% opacity, a serif title, and a two-line summary. The paper colour shifts with the theme but the calm does not.',
  },
  {
    title: 'Reading-order-safe mobile reflow',
    body: 'The grid drops from four columns to two on mobile using grid-auto-flow: row dense, so the day numbers still read 1, 2, 3, 4… top to bottom instead of snaking across columns.',
  },
  {
    title: 'Restraint as the design thesis',
    body: 'No countdown timer, no streaks, no pressure. The calendar reveals one read a day and waits. The design reward is calm, not urgency — the whole point of a planning guide.',
  },
];

function PolishMoves() {
  return (
    <section className="polish">
      <h2 className="polish__heading">Polish moves</h2>
      <ol className="polish__list">
        {POLISH_MOVES.map((m) => (
          <li key={m.title} className="polish__item">
            <h3 className="polish__item-title">{m.title}</h3>
            <p className="polish__item-body">{m.body}</p>
          </li>
        ))}
      </ol>

      <div className="polish__note">
        <h3 className="polish__note-title">Content management</h3>
        <p className="polish__note-body">
          The twenty-four entries live as a flat JSON array. Each object carries
          five keys — <code>day</code>, <code>glyph</code>, <code>title</code>,
          <code>summary</code>, and <code>readUrl</code> — so a writer can add or
          revise a read without touching the component. A static generator
          imports that array at build time; <code>isOpen</code> is derived from
          the real date per deploy, and <code>glyph</code> maps through a small
          component lookup so the SVG stays inline and crisp at any size.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * App
 * ------------------------------------------------------------------ */

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const reducedMotion = useReducedMotion();
  const currentDay = useAdventDay();

  const entries = useMemo(() => ADVENT_ENTRIES, []);

  return (
    <div className="app">
      <div className="masthead">
        <span className="masthead__brand">Ride Ready Guide</span>
        <button
          className="masthead__theme"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
        >
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>
      </div>

      <main className="content">
        <IntroSection currentDay={currentDay} />

        <section className="advent-grid" aria-label="December advent calendar">
          {entries.map((entry) => (
            <AdventTile
              key={entry.day}
              entry={entry}
              currentDay={currentDay}
              reducedMotion={reducedMotion}
            />
          ))}
        </section>

        <PolishMoves />
      </main>

      <footer className="footer">
        <span className="footer__mark"><Book className="footer__book" /> Ride Ready Guide</span>
        <span className="footer__meta">The December Guide · one read a day</span>
      </footer>
    </div>
  );
}
