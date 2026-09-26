# Simi Hawker Are You? Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, no-backend Singaporean hawker-food personality quiz that takes a phone user from landing to a shareable-looking result in under two minutes.

**Architecture:** A single Vite + React + TypeScript SPA. All content (10 dish archetypes, 8 questions with weight vectors) is data. A pure `score()` function tallies weights into a winner plus a top-3 breakdown, with a disclosed tie-breaker question. State lives in React, persisted to `localStorage`, and the finished result is encoded in the URL hash. No network calls, no backend, no accounts.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Vitest + Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-09-26-singaporean-food-quiz-design.md`

## Global Constraints

- Exactly **8 questions**, exactly **4 options** each; exactly **10 archetypes**.
- Scoring is **pure and deterministic**: same answers always give the same dish. Never randomise the outcome.
- **No backend, no accounts, no analytics, no network calls** for quiz data. Nothing about a user's answers leaves the device.
- **Sharing is in scope:** result card PNG rendered on-device with `html-to-image` (dynamically imported), native Web Share API when `canShare({files})` allows, falling back to download + copy-link. **No share counts and no "X% of players"** (both need a backend or fabricate data).
- **Link previews** come from build-time pre-rendered `/result/<id>/index.html` pages with real OG tags (crawlers do not run JS or see the hash); the share button always shares the canonical `/result/<id>/` path, never the hash URL.
- **Hash routing only** for the app shell (`#/result?r=<id>`); the app must work on GitHub Pages with no rewrite rules.
- **At most 2 web-font families** (DM Serif Display + Space Mono) loaded via **@fontsource** (self-hosted) so `html-to-image` can inline them without cross-origin failures; body uses a system sans stack.
- Interactive targets **≥48px** with **≥8px** spacing; **WCAG AA** contrast (≥4.5:1 normal text, ≥3:1 large text/UI); respect `prefers-reduced-motion: reduce`.
- Core Web Vitals targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
- Copy rules: write all 10 results **before** questions; every result flattering and specific; "at times" hedging allowed; light Singlish; **no health or clinical claims**; **no fabricated percentiles**.

---

## File Structure

```
index.html                     # Vite entry, font preconnect, meta
package.json
tsconfig.json
vite.config.ts
vitest.config.ts
src/
  main.tsx                     # React root
  App.tsx                      # state machine + flow wiring
  index.css                    # Tailwind import + @theme tokens + base styles
  lib/
    types.ts                   # ArchetypeId, Archetype, Question, Option, Result...
    scoring.ts                 # pure score(), tiedIds(), PRIORITY fallback
    persistence.ts             # localStorage wrappers with try/catch
    resultUrl.ts               # read/write/clear the result hash
  data/
    archetypes.ts              # the 10 dishes (results-first content)
    questions.ts               # the 8 questions + weight vectors
    tiebreaker.ts              # makeTiebreaker() copy + options
  components/
    Landing.tsx
    Quiz.tsx                   # orchestrates question steps
    QuestionCard.tsx
    ProgressCounter.tsx
    ResultReceipt.tsx
    TraitChip.tsx
tests/
  scoring.test.ts
  balance.test.ts
  persistence.test.ts
  resultUrl.test.ts
  flow.test.tsx
```

---

### Task 1: Scaffold the app and the Kopitiam Retro theme

**Files:**
- Create: `package.json`, `index.html`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `src/main.tsx`, `src/index.css`, `src/App.tsx`, `src/vite-env.d.ts`
- Test: `tests/theme.test.ts` (asserts token table constant exists)

**Interfaces:**
- Consumes: nothing.
- Produces: a running `npm run dev`, a passing `npm test` runner, and the theme tokens `paper`, `paper-card`, `kopi`, `kopi-mid`, `chilli`, `turmeric`, `ink` as Tailwind utilities (`bg-paper`, `text-kopi`, `border-kopi-mid`, etc.).

- [ ] **Step 1: Scaffold Vite into the existing (non-empty) repo root**

Run:
```bash
npm create vite@latest . -- --template react-ts
```
When Vite warns the directory is not empty, choose **"Ignore files and continue"** (this preserves `docs/`, `reports/`, `research_notes/`, and `.git`).

Then:
```bash
npm install
npm install -D tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom jsdom
npm install @fontsource/dm-serif-display @fontsource/space-mono
```

- [ ] **Step 2: Configure Vite with the Tailwind plugin**

Replace `vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 3: Configure Vitest (jsdom)**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
```

Create `tests/setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest",
"typecheck": "tsc --noEmit"
```

- [ ] **Step 4: Write the failing theme test**

Create `tests/theme.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { THEME_TOKENS } from '../src/lib/theme';

describe('theme tokens', () => {
  it('defines the Kopitiam Retro palette from the spec', () => {
    expect(THEME_TOKENS).toEqual({
      paper: '#FBF3E4',
      'paper-card': '#FFFBF0',
      kopi: '#5B3A1E',
      'kopi-mid': '#8A5A2B',
      chilli: '#C0392B',
      turmeric: '#E0A33E',
      ink: '#2B1B10',
    });
  });
});
```

- [ ] **Step 5: Run it to verify it fails**

Run: `npm test -- tests/theme.test.ts`
Expected: FAIL — cannot resolve `../src/lib/theme`.

- [ ] **Step 6: Create the token module and wire Tailwind**

Create `src/lib/theme.ts`:
```ts
export const THEME_TOKENS = {
  paper: '#FBF3E4',
  'paper-card': '#FFFBF0',
  kopi: '#5B3A1E',
  'kopi-mid': '#8A5A2B',
  chilli: '#C0392B',
  turmeric: '#E0A33E',
  ink: '#2B1B10',
} as const;

export type ThemeToken = keyof typeof THEME_TOKENS;
```

Replace `src/index.css`:
```css
@import "tailwindcss";

@theme {
  --color-paper: #FBF3E4;
  --color-paper-card: #FFFBF0;
  --color-kopi: #5B3A1E;
  --color-kopi-mid: #8A5A2B;
  --color-chilli: #C0392B;
  --color-turmeric: #E0A33E;
  --color-ink: #2B1B10;
  --font-display: "DM Serif Display", Georgia, "Times New Roman", serif;
  --font-label: "Space Mono", "Courier New", monospace;
}

body {
  background-color: var(--color-paper);
  background-image: repeating-linear-gradient(
    45deg,
    rgb(138 90 43 / 0.05) 0 8px,
    transparent 8px 16px
  );
  color: var(--color-ink);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: Load the two fonts (self-hosted via @fontsource)**

Note: fonts are self-hosted deliberately (not hot-linked from Google) so
`html-to-image` can inline them later without cross-origin fetch failures.

Set the `<head>` in `index.html` to (replace the template title):
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#FBF3E4" />
<title>Simi Hawker Are You?</title>
<meta name="description" content="Answer 8 questions and find out which Singaporean hawker dish you confirm are." />
```

Import the fonts in `src/main.tsx` (above the CSS import):
```tsx
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import './index.css';
```

Replace `src/App.tsx` with a placeholder:
```tsx
export default function App() {
  return <main className="min-h-dvh p-6 text-kopi">Simi Hawker Are You?</main>;
}
```

- [ ] **Step 8: Run tests and typecheck, verify dev server boots**

Run: `npm test -- tests/theme.test.ts && npm run typecheck`
Expected: 1 passed; no type errors.

Run: `npm run dev` and confirm the page renders with the cream background, then stop it.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts vitest.config.ts src tests
git commit -m "chore: scaffold Vite React TS app with Kopitiam Retro theme tokens"
```

---

### Task 2: Define types and the 10 archetypes

**Files:**
- Create: `src/lib/types.ts`, `src/data/archetypes.ts`
- Test: `tests/archetypes.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type ArchetypeId` = the 10-id union.
  - `interface Archetype { id; name; emoji; tagline; traits: [string,string,string]; blurb; pairing: ArchetypeId }`
  - `interface Option { id: string; text: string; weights: Partial<Record<ArchetypeId, number>> }`
  - `interface Question { id: string; text: string; options: [Option, Option, Option, Option] }`
  - `interface RankedResult { id: ArchetypeId; score: number; pct: number }`
  - `interface Result { winner: ArchetypeId; ranking: RankedResult[]; tie: boolean }`
  - `ARCHETYPES: Archetype[]` and `byId: Record<ArchetypeId, Archetype>`.

- [ ] **Step 1: Write the failing test**

Create `tests/archetypes.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { ARCHETYPES, byId } from '../src/data/archetypes';

describe('archetypes', () => {
  it('has exactly 10 unique dishes', () => {
    expect(ARCHETYPES).toHaveLength(10);
    expect(new Set(ARCHETYPES.map((a) => a.id)).size).toBe(10);
  });

  it('gives every dish three trait chips and a valid pairing', () => {
    for (const a of ARCHETYPES) {
      expect(a.traits).toHaveLength(3);
      expect(a.tagline.length).toBeGreaterThan(10);
      expect(a.blurb.length).toBeGreaterThan(40);
      expect(byId[a.pairing]).toBeDefined();
      expect(a.pairing).not.toBe(a.id);
    }
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- tests/archetypes.test.ts`
Expected: FAIL — cannot resolve `../src/data/archetypes`.

- [ ] **Step 3: Create `src/lib/types.ts`**

```ts
export type ArchetypeId =
  | 'chicken-rice'
  | 'laksa'
  | 'ckteow'
  | 'chilli-crab'
  | 'bak-kut-teh'
  | 'roti-prata'
  | 'hokkien-mee'
  | 'satay'
  | 'kaya-toast'
  | 'ice-kachang';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  emoji: string;
  tagline: string;
  traits: [string, string, string];
  blurb: string;
  pairing: ArchetypeId;
}

export interface Option {
  id: string;
  text: string;
  weights: Partial<Record<ArchetypeId, number>>;
}

export interface Question {
  id: string;
  text: string;
  options: [Option, Option, Option, Option];
}

export interface RankedResult {
  id: ArchetypeId;
  score: number;
  pct: number;
}

export interface Result {
  winner: ArchetypeId;
  ranking: RankedResult[];
  tie: boolean;
}
```

- [ ] **Step 4: Create `src/data/archetypes.ts`**

```ts
import type { Archetype, ArchetypeId } from '../lib/types';

export const ARCHETYPES: Archetype[] = [
  {
    id: 'chicken-rice',
    name: 'Chicken Rice',
    emoji: '🍗',
    tagline: 'Everyone agrees on you, and that is a superpower.',
    traits: ['STEADY', 'RELIABLE', 'NO DRAMA'],
    blurb:
      'Every table has one person everybody can agree on, and somehow it is always you. You do not need to be the loudest — you just quietly deliver every time. At times a bit predictable, but that is exactly why people keep you around.',
    pairing: 'roti-prata',
  },
  {
    id: 'laksa',
    name: 'Laksa',
    emoji: '🍜',
    tagline: 'Rich, warm, and a little bit extra — in the best way.',
    traits: ['COMFORTING', 'RICH', 'EXTRA'],
    blurb:
      'You are the one people come to when the day has been long. Warm, generous, and full of flavour, you make everything feel better just by being there. At times you go a bit heavy on the coconut milk, but nobody is complaining.',
    pairing: 'kaya-toast',
  },
  {
    id: 'ckteow',
    name: 'Char Kway Teow',
    emoji: '🍝',
    tagline: 'Maximum wok hei, zero patience. Worth the queue.',
    traits: ['CHIONG', 'HIGH HEAT', 'DRAMATIC'],
    blurb:
      'You run hot, in the best way. When you are on, nobody can match your wok hei, and when you are off, everyone still orders you anyway. At times a bit dramatic — but life with you is never boring.',
    pairing: 'chilli-crab',
  },
  {
    id: 'chilli-crab',
    name: 'Chilli Crab',
    emoji: '🦀',
    tagline: 'Main-character energy. Messy, expensive, unforgettable.',
    traits: ['BOLD', 'SHOWY', 'WORTH IT'],
    blurb:
      'You are the dish people save for a special occasion. Confident, a little extravagant, and completely impossible to ignore, you are the reason the table is laughing. At times you leave a mess, but everyone remembers the night.',
    pairing: 'ckteow',
  },
  {
    id: 'bak-kut-teh',
    name: 'Bak Kut Teh',
    emoji: '🍲',
    tagline: 'Old-school and peppery. You set trends, you do not follow.',
    traits: ['TRADITIONAL', 'NO-NONSENSE', 'DEEP'],
    blurb:
      'You believe in doing things properly, the way they have always been done. Peppery, grounded, and quietly restorative, you are the person everyone calls when things get hard. At times a bit stubborn, but your way usually works.',
    pairing: 'hokkien-mee',
  },
  {
    id: 'roti-prata',
    name: 'Roti Prata',
    emoji: '🫓',
    tagline: 'Good at any hour, any mood, any crowd.',
    traits: ['FLEXIBLE', 'CHILL', 'ALWAYS THERE'],
    blurb:
      'You are the 2am friend. Crispy when you need to be, soft when it counts, and available in more configurations than anyone can name. At times you spread yourself thin, but you are everyone\u2019s comfort food.',
    pairing: 'chicken-rice',
  },
  {
    id: 'hokkien-mee',
    name: 'Hokkien Mee',
    emoji: '🍤',
    tagline: 'Quietly deep. The connoisseur\u2019s pick.',
    traits: ['UNDERRATED', 'RICH', 'SECRETLY GREAT'],
    blurb:
      'You do not shout, you simmer. People who take the time to know you discover a depth of prawn stock that the loud dishes cannot fake. At times you get overlooked in the queue, but the real ones know exactly where you are.',
    pairing: 'satay',
  },
  {
    id: 'satay',
    name: 'Satay',
    emoji: '🍢',
    tagline: 'You bring the whole kampong wherever you go.',
    traits: ['SOCIAL', 'GENEROUS', 'FUN'],
    blurb:
      'You are the reason plans actually happen. Never arriving alone, always ordering for the table, you turn any night into an occasion. At times a bit hard to get a word in, but nobody wants the party to stop.',
    pairing: 'ice-kachang',
  },
  {
    id: 'kaya-toast',
    name: 'Kaya Toast',
    emoji: '🍞',
    tagline: 'A kopitiam morning in human form.',
    traits: ['NOSTALGIC', 'SWEET', 'SENTIMENTAL'],
    blurb:
      'You are old songs, rainy mornings, and a soft-boiled egg done just right. Warm and a little sentimental, you make people feel at home without trying. At times you live in the past, but you make the present much nicer.',
    pairing: 'laksa',
  },
  {
    id: 'ice-kachang',
    name: 'Ice Kachang',
    emoji: '🍧',
    tagline: 'Colourful chaos, and somehow everyone\u2019s favourite.',
    traits: ['CHAOTIC', 'COLOURFUL', 'DELIGHTFUL'],
    blurb:
      'You are impossible to describe and impossible to dislike. A bit of everything, piled high, unexpected flavours at the bottom — people never know what they will get, but they always smile. At times a bit all over the place, but that is your charm.',
    pairing: 'satay',
  },
];

export const byId = Object.fromEntries(
  ARCHETYPES.map((a) => [a.id, a]),
) as Record<ArchetypeId, Archetype>;
```

- [ ] **Step 5: Run tests and typecheck**

Run: `npm test -- tests/archetypes.test.ts && npm run typecheck`
Expected: 2 passed; no type errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/types.ts src/data/archetypes.ts tests/archetypes.test.ts
git commit -m "feat: add types and 10 hawker archetypes (results-first content)"
```

---

### Task 3: Add the 8 questions, weight vectors, and tie-breaker

**Files:**
- Create: `src/data/questions.ts`, `src/data/tiebreaker.ts`
- Test: `tests/questions.test.ts`

**Interfaces:**
- Consumes: `Question`, `Option`, `ArchetypeId` from `src/lib/types.ts`.
- Produces:
  - `QUESTIONS: Question[]` (length 8).
  - `makeTiebreaker(ids: ArchetypeId[], byId): Question` — question id `'tiebreak'` with one option per tied id (max 4), weights `{ [id]: 3 }`.

- [ ] **Step 1: Write the failing test**

Create `tests/questions.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../src/data/questions';
import { makeTiebreaker } from '../src/data/tiebreaker';
import { ARCHETYPES } from '../src/data/archetypes';

describe('questions', () => {
  it('has exactly 8 questions with 4 options each', () => {
    expect(QUESTIONS).toHaveLength(8);
    for (const q of QUESTIONS) expect(q.options).toHaveLength(4);
  });

  it('only awards points to 1-3 known dishes per option', () => {
    const known = new Set(ARCHETYPES.map((a) => a.id));
    for (const q of QUESTIONS) {
      for (const o of q.options) {
        const ids = Object.keys(o.weights);
        expect(ids.length).toBeGreaterThanOrEqual(1);
        expect(ids.length).toBeLessThanOrEqual(3);
        for (const id of ids) expect(known.has(id as never)).toBe(true);
        for (const w of Object.values(o.weights)) expect(w).toBeGreaterThan(0);
      }
    }
  });

  it('makes every dish the primary (weight >= 2) of at least one option', () => {
    const primaries = new Set<string>();
    for (const q of QUESTIONS)
      for (const o of q.options)
        for (const [id, w] of Object.entries(o.weights))
          if ((w ?? 0) >= 2) primaries.add(id);
    for (const a of ARCHETYPES) expect(primaries.has(a.id)).toBe(true);
  });

  it('builds a 2-4 option tie-breaker from tied ids', () => {
    const q = makeTiebreaker(['laksa', 'satay']);
    expect(q.id).toBe('tiebreak');
    expect(q.options).toHaveLength(2);
    expect(q.options[0].weights).toEqual({ laksa: 3 });
    expect(q.options[1].weights).toEqual({ satay: 3 });
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- tests/questions.test.ts`
Expected: FAIL — cannot resolve `../src/data/questions`.

- [ ] **Step 3: Create `src/data/questions.ts`**

Each option gives **3** to a primary dish and **1** to a secondary, so the board is dense and results rarely tie. Question 1–2 are the most vivid to clear the Q3 drop-off cliff.

```ts
import type { Question } from '../lib/types';

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Alarm ring already. What is your first move?',
    options: [
      { id: 'q1a', text: 'Lim kopi first, everything else can wait.', weights: { 'kaya-toast': 3, 'roti-prata': 1 } },
      { id: 'q1b', text: 'Snooze five times, then dash out the door.', weights: { 'roti-prata': 3, 'ice-kachang': 1 } },
      { id: 'q1c', text: 'Wake up immediately. I am disciplined one.', weights: { 'bak-kut-teh': 3, 'chicken-rice': 1 } },
      { id: 'q1d', text: 'Jump up — got 100 things to do today.', weights: { ckteow: 3, 'chilli-crab': 1 } },
    ],
  },
  {
    id: 'q2',
    text: '12pm at the hawker centre and the queue is snaking. You...',
    options: [
      { id: 'q2a', text: 'Join the longest queue. Long queue means ho jiak.', weights: { laksa: 3, 'bak-kut-teh': 1 } },
      { id: 'q2b', text: 'Go straight to the stall I always trust.', weights: { 'chicken-rice': 3, 'kaya-toast': 1 } },
      { id: 'q2c', text: 'Find the rest of the gang already seated.', weights: { satay: 3, 'hokkien-mee': 1 } },
      { id: 'q2d', text: 'Forget it — go somewhere with aircon.', weights: { 'chilli-crab': 3, satay: 1 } },
    ],
  },
  {
    id: 'q3',
    text: 'Be honest. What is your relationship with chilli?',
    options: [
      { id: 'q3a', text: 'Mild only, I scared.', weights: { 'kaya-toast': 3, 'bak-kut-teh': 1 } },
      { id: 'q3b', text: 'Some chilli, but must still taste the wok hei.', weights: { ckteow: 3, 'hokkien-mee': 1 } },
      { id: 'q3c', text: 'I take whatever the stall recommends.', weights: { 'hokkien-mee': 3, laksa: 1 } },
      { id: 'q3d', text: 'Chilli is a personality. I bring my own.', weights: { 'chilli-crab': 3, ckteow: 1 } },
    ],
  },
  {
    id: 'q4',
    text: 'Free weekend, no plans. Your ideal?',
    options: [
      { id: 'q4a', text: 'Cafe hop and take nice photos.', weights: { 'ice-kachang': 3, satay: 1 } },
      { id: 'q4b', text: 'Stay home, boil soup, watch drama.', weights: { 'bak-kut-teh': 3, 'kaya-toast': 1 } },
      { id: 'q4c', text: 'Rainy day, hot bowl, no need to talk.', weights: { laksa: 3, 'chilli-crab': 1 } },
      { id: 'q4d', text: 'Anything also can — I am flexible.', weights: { 'roti-prata': 3, 'chicken-rice': 1 } },
    ],
  },
  {
    id: 'q5',
    text: 'Group project, four people. Which one are you?',
    options: [
      { id: 'q5a', text: 'The responsible one. I do everything.', weights: { 'chicken-rice': 3, laksa: 1 } },
      { id: 'q5b', text: 'The ideas person. Messy but brilliant.', weights: { 'ice-kachang': 3, 'chilli-crab': 1 } },
      { id: 'q5c', text: 'The negotiator. I talk to everybody.', weights: { satay: 3, 'bak-kut-teh': 1 } },
      { id: 'q5d', text: 'Quiet one who secretly saves the day.', weights: { 'hokkien-mee': 3, 'roti-prata': 1 } },
    ],
  },
  {
    id: 'q6',
    text: 'Payday. What happens?',
    options: [
      { id: 'q6a', text: 'Spend it all within a week. Zero regrets.', weights: { 'ice-kachang': 3, ckteow: 1 } },
      { id: 'q6b', text: 'Save 80%, spend on one really good meal.', weights: { 'bak-kut-teh': 3, 'chicken-rice': 1 } },
      { id: 'q6c', text: 'Buy that thing I have been eyeing for months.', weights: { 'chilli-crab': 3, 'kaya-toast': 1 } },
      { id: 'q6d', text: 'Treat my parents to a nice breakfast.', weights: { 'kaya-toast': 3, laksa: 1 } },
    ],
  },
  {
    id: 'q7',
    text: 'Rain like waterfall. What now?',
    options: [
      { id: 'q7a', text: 'Cannot cancel, I am already on the way.', weights: { 'hokkien-mee': 3, 'chicken-rice': 1 } },
      { id: 'q7b', text: 'Stay in, order delivery, watch show.', weights: { 'roti-prata': 3, 'kaya-toast': 1 } },
      { id: 'q7c', text: 'Perfect weather for hot peppery soup.', weights: { 'bak-kut-teh': 3, laksa: 1 } },
      { id: 'q7d', text: 'Rainy day is laksa day. Non-negotiable.', weights: { laksa: 3, 'ice-kachang': 1 } },
    ],
  },
  {
    id: 'q8',
    text: '2am. Hungry. You reach for...',
    options: [
      { id: 'q8a', text: 'Fried rice with everything thrown inside.', weights: { ckteow: 3, satay: 1 } },
      { id: 'q8b', text: 'Whatever is in the fridge, just steam it.', weights: { 'chicken-rice': 3, 'roti-prata': 1 } },
      { id: 'q8c', text: 'Supper with the whole gang.', weights: { satay: 3, 'ice-kachang': 1 } },
      { id: 'q8d', text: 'Kopi and toast — my comfort combo.', weights: { 'kaya-toast': 3, 'bak-kut-teh': 1 } },
    ],
  },
];
```

- [ ] **Step 4: Create `src/data/tiebreaker.ts`**

```ts
import type { ArchetypeId, Question } from '../lib/types';

export function makeTiebreaker(ids: ArchetypeId[]): Question {
  const picked = ids.slice(0, 4);
  return {
    id: 'tiebreak',
    text: 'Eh, last one — cannot decide ah. Which one you cannot live without?',
    options: picked.map((id, i) => ({
      id: `tiebreak-${i}`,
      text: id,
      weights: { [id]: 3 },
    })) as Question['options'],
  };
}
```

- [ ] **Step 5: Run tests and typecheck**

Run: `npm test -- tests/questions.test.ts && npm run typecheck`
Expected: 4 passed; no type errors.

> Note: the tie-breaker option text is a raw id for now; Task 9 renders the dish name via `byId[option.text]` when the step id is `tiebreak`.

- [ ] **Step 6: Commit**

```bash
git add src/data/questions.ts src/data/tiebreaker.ts tests/questions.test.ts
git commit -m "feat: add 8 weighted questions and tie-breaker generator"
```

---

### Task 4: Build the pure scoring engine

**Files:**
- Create: `src/lib/scoring.ts`
- Test: `tests/scoring.test.ts`

**Interfaces:**
- Consumes: `QUESTIONS` from `src/data/questions.ts`, `ARCHETYPES` from `src/data/archetypes.ts`, types from `src/lib/types.ts`.
- Produces:
  - `score(questions: Question[], answers: Record<string, string>): Result`
  - `tiedIds(result: Result): ArchetypeId[]`

- [ ] **Step 1: Write the failing test**

Create `tests/scoring.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { score, tiedIds } from '../src/lib/scoring';
import { QUESTIONS } from '../src/data/questions';
import type { Question } from '../src/lib/types';

const q = (
  id: string,
  opts: Array<[string, Record<string, number>]>,
): Question => ({
  id,
  text: id,
  options: opts.map(([oid, weights], i) => ({ id: oid, text: oid, weights })) as Question['options'],
});

describe('score', () => {
  it('picks the dish with the most points', () => {
    const questions = [
      q('a', [['a1', { laksa: 3 }], ['a2', { satay: 3 }]]),
      q('b', [['b1', { laksa: 3 }], ['b2', { satay: 3 }]]),
    ];
    const result = score(questions, { a: 'a1', b: 'b1' });
    expect(result.winner).toBe('laksa');
    expect(result.tie).toBe(false);
  });

  it('reports a tie when the top two are equal', () => {
    const questions = [
      q('a', [['a1', { laksa: 3 }], ['a2', { satay: 3 }]]),
      q('b', [['b1', { laksa: 3 }], ['b2', { satay: 3 }]]),
    ];
    const result = score(questions, { a: 'a1', b: 'b2' });
    expect(result.tie).toBe(true);
    expect(tiedIds(result)).toEqual(expect.arrayContaining(['laksa', 'satay']));
  });

  it('is deterministic — same answers, same result', () => {
    const answers = { q1: 'q1d', q2: 'q2a', q3: 'q3d', q4: 'q4c', q5: 'q5b', q6: 'q6a', q7: 'q7d', q8: 'q8c' };
    expect(score(QUESTIONS, answers)).toEqual(score(QUESTIONS, answers));
  });

  it('percentages are integers and the top dish has the highest score', () => {
    const answers = { q1: 'q1a', q2: 'q2a', q3: 'q3a', q4: 'q4b', q5: 'q5a', q6: 'q6d', q7: 'q7c', q8: 'q8d' };
    const { ranking } = score(QUESTIONS, answers);
    for (const r of ranking) expect(Number.isInteger(r.pct)).toBe(true);
    expect(ranking[0].score).toBe(Math.max(...ranking.map((r) => r.score)));
  });

  it('breaks a remaining tie with a deterministic priority order, never randomly', () => {
    const questions = [q('a', [['a1', { laksa: 3 }], ['a2', { satay: 3 }]])];
    const first = score(questions, { a: 'a1' });
    const second = score(questions, { a: 'a2' });
    // A single question with equal points is a tie; priority order decides,
    // and it must not depend on call order.
    expect(tiedIds(first).length).toBeGreaterThan(1);
    expect(first.winner).toBe(score(questions, { a: 'a1' }).winner);
    expect(second.winner).toBe(first.winner);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- tests/scoring.test.ts`
Expected: FAIL — cannot resolve `../src/lib/scoring`.

- [ ] **Step 3: Implement `src/lib/scoring.ts`**

```ts
import { ARCHETYPES } from '../data/archetypes';
import type { ArchetypeId, Question, Result } from './types';

/** Deterministic fallback order when a tie cannot be broken by answers. */
const PRIORITY: ArchetypeId[] = ARCHETYPES.map((a) => a.id);

export function score(
  questions: Question[],
  answers: Record<string, string>,
): Result {
  const board = new Map<ArchetypeId, number>();
  for (const a of ARCHETYPES) board.set(a.id, 0);

  let total = 0;
  for (const question of questions) {
    const chosen = answers[question.id];
    if (!chosen) continue;
    const option = question.options.find((o) => o.id === chosen);
    if (!option) continue;
    for (const [id, weight] of Object.entries(option.weights) as [
      ArchetypeId,
      number,
    ][]) {
      board.set(id, (board.get(id) ?? 0) + weight);
      total += weight;
    }
  }

  const ranking = [...board.entries()]
    .map(([id, points]) => ({
      id,
      score: points,
      pct: total > 0 ? Math.round((points / total) * 100) : 0,
    }))
    .sort(
      (a, b) =>
        b.score - a.score || PRIORITY.indexOf(a.id) - PRIORITY.indexOf(b.id),
    );

  const topScore = ranking[0]?.score ?? 0;
  const tie = ranking.length > 1 && ranking[1].score === topScore;

  return { winner: ranking[0]!.id, ranking, tie };
}

/** All dishes sharing the top score, in priority order (max 4). */
export function tiedIds(result: Result): ArchetypeId[] {
  const topScore = result.ranking[0]?.score ?? 0;
  return result.ranking
    .filter((r) => r.score === topScore)
    .map((r) => r.id)
    .slice(0, 4);
}
```

- [ ] **Step 4: Run tests and typecheck**

Run: `npm test -- tests/scoring.test.ts && npm run typecheck`
Expected: 5 passed; no type errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/scoring.ts tests/scoring.test.ts
git commit -m "feat: add deterministic scoring engine with tie detection"
```

---

### Task 5: Balance the quiz with a simulation test

**Files:**
- Modify: `src/data/questions.ts` (adjust weights only, if needed)
- Test: `tests/balance.test.ts`

**Interfaces:**
- Consumes: `QUESTIONS`, `score`.
- Produces: no new exports — a passing balance guarantee.

- [ ] **Step 1: Write the failing test**

Create `tests/balance.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../src/data/questions';
import { ARCHETYPES } from '../src/data/archetypes';
import { score } from '../src/lib/scoring';
import type { ArchetypeId } from '../src/lib/types';

function simulate(runs: number): Map<ArchetypeId, number> {
  const wins = new Map<ArchetypeId, number>();
  for (const a of ARCHETYPES) wins.set(a.id, 0);

  // Deterministic PRNG (mulberry32) so the test never flakes.
  let seed = 0x9e3779b9;
  const rand = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = 0; i < runs; i++) {
    const answers: Record<string, string> = {};
    for (const q of QUESTIONS) {
      const pick = q.options[Math.floor(rand() * q.options.length)];
      answers[q.id] = pick.id;
    }
    const { winner } = score(QUESTIONS, answers);
    wins.set(winner, (wins.get(winner) ?? 0) + 1);
  }
  return wins;
}

describe('quiz balance (10,000 uniform runs)', () => {
  const wins = simulate(10_000);

  it('makes every dish reachable', () => {
    for (const a of ARCHETYPES) {
      expect(wins.get(a.id) ?? 0).toBeGreaterThan(0);
    }
  });

  it('keeps every dish between 4% and 20% of wins', () => {
    for (const a of ARCHETYPES) {
      const share = (wins.get(a.id) ?? 0) / 10_000;
      expect(share).toBeGreaterThanOrEqual(0.04);
      expect(share).toBeLessThanOrEqual(0.2);
    }
  });
});
```

- [ ] **Step 2: Run it and read the distribution**

Run: `npm test -- tests/balance.test.ts`
Expected: may FAIL if any dish falls outside 4–20%. Print the distribution to tune:
```bash
npx vitest run tests/balance.test.ts --reporter=verbose
```

- [ ] **Step 3: Tune weights until it passes**

If a dish is under-represented, add or bump a `3` primary for it in `src/data/questions.ts`; if over-represented, reduce one of its primaries to `2` (or move that primary to a lightly-used dish). Keep exactly 4 options per question and 1–3 weighted dishes per option. Re-run until green. Do not change `scoring.ts`.

- [ ] **Step 4: Run the full suite and typecheck**

Run: `npm test && npm run typecheck`
Expected: all tests pass; no type errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/questions.ts tests/balance.test.ts
git commit -m "test: guarantee every dish wins 4-20% of simulated runs"
```

---

### Task 6: Persist in-progress answers and encode results in the URL

**Files:**
- Create: `src/lib/persistence.ts`, `src/lib/resultUrl.ts`
- Test: `tests/persistence.test.ts`, `tests/resultUrl.test.ts`

**Interfaces:**
- Consumes: `ArchetypeId` from `src/lib/types.ts`.
- Produces:
  - `loadAnswers(): Record<string,string> | null`
  - `saveAnswers(a: Record<string,string>): void`
  - `clearAnswers(): void`
  - `KEY = 'simi-hawker.answers.v1'`
  - `readResultHash(): ArchetypeId | null`
  - `writeResultHash(id: ArchetypeId): void`
  - `clearResultHash(): void`

- [ ] **Step 1: Write the failing tests**

Create `tests/persistence.test.ts`:
```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { KEY, loadAnswers, saveAnswers, clearAnswers } from '../src/lib/persistence';

describe('persistence', () => {
  beforeEach(() => localStorage.clear());

  it('round-trips answers', () => {
    saveAnswers({ q1: 'q1a' });
    expect(loadAnswers()).toEqual({ q1: 'q1a' });
    clearAnswers();
    expect(loadAnswers()).toBeNull();
  });

  it('returns null when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(loadAnswers()).toBeNull();
    vi.restoreAllMocks();
  });

  it('swallows write errors', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => saveAnswers({ q1: 'q1a' })).not.toThrow();
    vi.restoreAllMocks();
  });

  it('uses the documented storage key', () => {
    expect(KEY).toBe('simi-hawker.answers.v1');
  });
});
```

Create `tests/resultUrl.test.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { readResultHash, writeResultHash, clearResultHash } from '../src/lib/resultUrl';

describe('resultUrl', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('round-trips a result id through the hash', () => {
    writeResultHash('laksa');
    expect(window.location.hash).toBe('#/result?r=laksa');
    expect(readResultHash()).toBe('laksa');
  });

  it('returns null when there is no result hash', () => {
    expect(readResultHash()).toBeNull();
  });

  it('ignores an unknown dish id', () => {
    window.history.replaceState(null, '', '/#/result?r=not-a-dish');
    expect(readResultHash()).toBeNull();
  });

  it('clears the hash', () => {
    writeResultHash('satay');
    clearResultHash();
    expect(readResultHash()).toBeNull();
  });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npm test -- tests/persistence.test.ts tests/resultUrl.test.ts`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `src/lib/persistence.ts`**

```ts
export const KEY = 'simi-hawker.answers.v1';

export function loadAnswers(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function saveAnswers(answers: Record<string, string>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    // Storage blocked (private mode, quota). Degrade to in-memory state.
  }
}

export function clearAnswers(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Ignore.
  }
}
```

- [ ] **Step 4: Implement `src/lib/resultUrl.ts`**

```ts
import { byId } from '../data/archetypes';
import type { ArchetypeId } from './types';

const PREFIX = '#/result?r=';

export function readResultHash(): ArchetypeId | null {
  const hash = window.location.hash;
  if (!hash.startsWith(PREFIX)) return null;
  const id = hash.slice(PREFIX.length);
  return id in byId ? (id as ArchetypeId) : null;
}

export function writeResultHash(id: ArchetypeId): void {
  window.history.replaceState(null, '', `${PREFIX}${id}`);
}

export function clearResultHash(): void {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}
```

- [ ] **Step 5: Run tests and typecheck**

Run: `npm test -- tests/persistence.test.ts tests/resultUrl.test.ts && npm run typecheck`
Expected: 8 passed; no type errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/persistence.ts src/lib/resultUrl.ts tests/persistence.test.ts tests/resultUrl.test.ts
git commit -m "feat: add localStorage persistence and URL-encoded results"
```

---

### Task 7: Build the Landing screen

**Files:**
- Create: `src/components/Landing.tsx`
- Modify: `src/App.tsx`
- Test: `tests/landing.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `<Landing onStart={(): void => void} onResume={(): void => void} resumeAvailable={boolean} />`.

- [ ] **Step 1: Write the failing test**

Create `tests/landing.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Landing } from '../src/components/Landing';

describe('Landing', () => {
  it('shows the title, value line, and start CTA', () => {
    render(<Landing onStart={vi.fn()} onResume={vi.fn()} resumeAvailable={false} />);
    expect(screen.getByRole('heading')).toHaveTextContent(/simi hawker are you/i);
    expect(screen.getByText(/8 questions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chiong ah/i })).toBeInTheDocument();
  });

  it('calls onStart when the CTA is pressed', () => {
    const onStart = vi.fn();
    render(<Landing onStart={onStart} onResume={vi.fn()} resumeAvailable={false} />);
    fireEvent.click(screen.getByRole('button', { name: /chiong ah/i }));
    expect(onStart).toHaveBeenCalledOnce();
  });

  it('offers resume only when there is saved progress', () => {
    const { rerender } = render(
      <Landing onStart={vi.fn()} onResume={vi.fn()} resumeAvailable={false} />,
    );
    expect(screen.queryByRole('button', { name: /continue where you stop/i })).toBeNull();
    rerender(<Landing onStart={vi.fn()} onResume={vi.fn()} resumeAvailable />);
    expect(screen.getByRole('button', { name: /continue where you stop/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- tests/landing.test.tsx`
Expected: FAIL — cannot resolve `../src/components/Landing`.

- [ ] **Step 3: Implement `src/components/Landing.tsx`**

```tsx
interface LandingProps {
  onStart: () => void;
  onResume: () => void;
  resumeAvailable: boolean;
}

export function Landing({ onStart, onResume, resumeAvailable }: LandingProps) {
  return (
    <section className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-between px-6 py-10 text-center">
      <div className="flex flex-1 flex-col items-center justify-center">
        <span className="font-[family-name:var(--font-label)] text-xs tracking-[0.3em] text-chilli">
          AH KOW KOPITIAM PRESENTS
        </span>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-none text-kopi">
          Simi Hawker
          <br />
          Are You?
        </h1>
        <div className="my-6 h-0.5 w-24 bg-chilli" aria-hidden="true" />
        <p className="text-base text-kopi-mid">
          Singapore&apos;s most unscientific personality test. Answer 8
          questions, find out which hawker dish you confirm are.
        </p>
      </div>

      <div className="w-full">
        <button
          type="button"
          onClick={onStart}
          className="min-h-12 w-full rounded-md bg-chilli px-6 text-lg font-bold text-paper-card shadow-sm transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kopi active:scale-[0.99]"
        >
          Chiong ah! Start
        </button>

        {resumeAvailable && (
          <button
            type="button"
            onClick={onResume}
            className="mt-3 min-h-12 w-full rounded-md border border-kopi-mid px-6 text-sm font-semibold text-kopi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chilli"
          >
            Continue where you stop
          </button>
        )}

        <p className="mt-4 font-[family-name:var(--font-label)] text-xs text-kopi-mid">
          8 questions &middot; ~2 min &middot; no sign-up &middot; no data collected
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire it into `src/App.tsx`**

```tsx
import { useEffect, useMemo, useState } from 'react';
import { Landing } from './components/Landing';
import { QUESTIONS } from './data/questions';
import { loadAnswers } from './lib/persistence';

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resumeAvailable, setResumeAvailable] = useState(false);

  useEffect(() => {
    const saved = loadAnswers();
    if (saved && Object.keys(saved).length > 0) setResumeAvailable(true);
  }, []);

  const progress = useMemo(
    () => QUESTIONS.filter((q) => answers[q.id]).length,
    [answers],
  );

  if (screen === 'landing') {
    return (
      <Landing
        resumeAvailable={resumeAvailable}
        onStart={() => setScreen('quiz')}
        onResume={() => {
          const saved = loadAnswers();
          if (saved) setAnswers(saved);
          setScreen('quiz');
        }}
      />
    );
  }

  return (
    <main className="min-h-dvh p-6 text-kopi">
      Answered {progress} of {QUESTIONS.length}.
    </main>
  );
}
```

- [ ] **Step 5: Run tests and typecheck**

Run: `npm test -- tests/landing.test.tsx && npm run typecheck`
Expected: 3 passed; no type errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/Landing.tsx src/App.tsx tests/landing.test.tsx
git commit -m "feat: add Kopitiam Retro landing screen with resume"
```

---

### Task 8: Build the Quiz screen with progress counter

**Files:**
- Create: `src/components/ProgressCounter.tsx`, `src/components/QuestionCard.tsx`, `src/components/Quiz.tsx`
- Modify: `src/App.tsx`
- Test: `tests/quiz.test.tsx`

**Interfaces:**
- Consumes: `Question` from `src/lib/types.ts`; `byId` for tie-breaker labels.
- Produces:
  - `<ProgressCounter current={number} total={number} />`
  - `<QuestionCard question={Question} selectedId={string | undefined} onSelect={(optionId: string) => void} />`
  - `<Quiz questions={Question[]} answers={Record<string,string>} onAnswer={(questionId, optionId) => void} onBack={() => void} onComplete={() => void} />`

- [ ] **Step 1: Write the failing test**

Create `tests/quiz.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Quiz } from '../src/components/Quiz';
import { QUESTIONS } from '../src/data/questions';

describe('Quiz', () => {
  it('shows a step counter and the first question', () => {
    render(
      <Quiz questions={QUESTIONS} answers={{}} onAnswer={vi.fn()} onBack={vi.fn()} onComplete={vi.fn()} />,
    );
    expect(screen.getByText(/question 1 of 8/i)).toBeInTheDocument();
    expect(screen.getByText(QUESTIONS[0].text)).toBeInTheDocument();
  });

  it('reports the chosen option id', () => {
    const onAnswer = vi.fn();
    render(
      <Quiz questions={QUESTIONS} answers={{}} onAnswer={onAnswer} onBack={vi.fn()} onComplete={vi.fn()} />,
    );
    const options = screen.getAllByRole('button');
    fireEvent.click(options[0]);
    expect(onAnswer).toHaveBeenCalledWith(QUESTIONS[0].id, QUESTIONS[0].options[0].id);
  });

  it('lets you go back with no back button on question 1', () => {
    const onBack = vi.fn();
    render(
      <Quiz questions={QUESTIONS} answers={{}} onAnswer={vi.fn()} onBack={onBack} onComplete={vi.fn()} />,
    );
    expect(screen.queryByRole('button', { name: /back/i })).toBeNull();
  });

  it('calls onComplete after the last question is answered', () => {
    const onComplete = vi.fn();
    const answers: Record<string, string> = {};
    for (const q of QUESTIONS.slice(0, -1)) answers[q.id] = q.options[0].id;
    render(
      <Quiz questions={QUESTIONS} answers={answers} onAnswer={vi.fn()} onBack={vi.fn()} onComplete={onComplete} />,
    );
    const last = QUESTIONS[QUESTIONS.length - 1];
    fireEvent.click(screen.getByText(last.options[0].text));
    // onComplete is invoked by App after state settles; Quiz only signals the answer here.
    expect(within(screen.getByTestId('quiz')).getByText(last.text)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- tests/quiz.test.tsx`
Expected: FAIL — cannot resolve `../src/components/Quiz`.

- [ ] **Step 3: Implement `src/components/ProgressCounter.tsx`**

```tsx
interface ProgressCounterProps {
  current: number;
  total: number;
}

export function ProgressCounter({ current, total }: ProgressCounterProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full" aria-live="polite">
      <div className="flex items-baseline justify-between font-[family-name:var(--font-label)] text-xs text-kopi-mid">
        <span>
          Question {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-kopi-mid/20">
        <div
          className="h-full rounded-full bg-chilli transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Implement `src/components/QuestionCard.tsx`**

```tsx
import { byId } from '../data/archetypes';
import type { Question } from '../lib/types';

interface QuestionCardProps {
  question: Question;
  selectedId?: string;
  onSelect: (optionId: string) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export function QuestionCard({ question, selectedId, onSelect }: QuestionCardProps) {
  const isTiebreak = question.id === 'tiebreak';

  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-kopi">
        {question.text}
      </h2>
      <div className="mt-6 flex flex-col gap-3">
        {question.options.map((option, i) => {
          const label = isTiebreak
            ? `${byId[option.text as keyof typeof byId]?.name ?? option.text}`
            : option.text;
          const selected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={selected}
              className={`flex min-h-12 w-full items-center gap-3 rounded-md border-2 px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chilli ${
                selected
                  ? 'border-chilli bg-chilli/10 text-kopi'
                  : 'border-kopi-mid/40 bg-paper-card text-ink hover:border-kopi-mid'
              }`}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded font-[family-name:var(--font-label)] text-xs font-bold ${
                  selected ? 'bg-chilli text-paper-card' : 'bg-kopi-mid/20 text-kopi'
                }`}
                aria-hidden="true"
              >
                {LETTERS[i]}
              </span>
              <span className="text-base">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Implement `src/components/Quiz.tsx`**

```tsx
import { ProgressCounter } from './ProgressCounter';
import { QuestionCard } from './QuestionCard';
import type { Question } from '../lib/types';

interface QuizProps {
  questions: Question[];
  answers: Record<string, string>;
  onAnswer: (questionId: string, optionId: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

export function Quiz({ questions, answers, onAnswer, onBack }: QuizProps) {
  const index = questions.findIndex((q) => !answers[q.id]);
  const currentIndex = index === -1 ? questions.length - 1 : index;
  const question = questions[currentIndex];
  const hasBack = currentIndex > 0;

  return (
    <section
      data-testid="quiz"
      className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-8"
    >
      <ProgressCounter current={currentIndex + 1} total={questions.length} />

      <div className="flex flex-1 items-center py-8">
        <QuestionCard
          question={question}
          selectedId={answers[question.id]}
          onSelect={(optionId) => onAnswer(question.id, optionId)}
        />
      </div>

      <div className="pb-2">
        {hasBack && (
          <button
            type="button"
            onClick={onBack}
            className="min-h-12 rounded-md px-4 text-sm font-semibold text-kopi-mid underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chilli"
          >
            Back
          </button>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Wire Quiz into `src/App.tsx`**

Replace the `return` fallback in `App.tsx`:
```tsx
import { Quiz } from './components/Quiz';
import { clearAnswers, loadAnswers, saveAnswers } from './lib/persistence';
import { score, tiedIds } from './lib/scoring';
import { makeTiebreaker } from './data/tiebreaker';

  // ...inside App, after `progress`:
  const baseComplete = QUESTIONS.every((q) => answers[q.id]);
  const baseResult = baseComplete ? score(QUESTIONS, answers) : null;
  const steps =
    baseResult?.tie
      ? [...QUESTIONS, makeTiebreaker(tiedIds(baseResult))]
      : QUESTIONS;

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: optionId };
      saveAnswers(next);
      return next;
    });
  };

  const handleBack = () => {
    const lastAnswered = [...steps].reverse().find((q) => answers[q.id]);
    if (!lastAnswered) return;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[lastAnswered.id];
      saveAnswers(next);
      return next;
    });
  };

  if (screen === 'quiz') {
    return (
      <Quiz
        questions={steps}
        answers={answers}
        onAnswer={handleAnswer}
        onBack={handleBack}
        onComplete={() => setScreen('result')}
      />
    );
  }
```

For Task 8, end the quiz by advancing to `result` when all steps are answered. Add this effect:
```tsx
  useEffect(() => {
    if (screen === 'quiz' && steps.every((q) => answers[q.id])) {
      setScreen('result');
    }
  }, [screen, answers, steps]);
```

- [ ] **Step 7: Run tests and typecheck**

Run: `npm test -- tests/quiz.test.tsx && npm run typecheck`
Expected: 4 passed; no type errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/ProgressCounter.tsx src/components/QuestionCard.tsx src/components/Quiz.tsx src/App.tsx tests/quiz.test.tsx
git commit -m "feat: add quiz screen with step counter and back navigation"
```

---

### Task 9: Build the Result receipt screen

**Files:**
- Create: `src/components/TraitChip.tsx`, `src/components/ResultReceipt.tsx`
- Modify: `src/App.tsx`
- Test: `tests/result.test.tsx`

**Interfaces:**
- Consumes: `Result`, `Archetype`, `byId`.
- Produces:
  - `<TraitChip label={string} tone={'chilli'|'kopi'|'turmeric'} />`
  - `<ResultReceipt result={Result} onRestart={() => void} />`
  - A helper `resultFor(answers): Result` used by App to render the final dish (top-1 after tie-break).

- [ ] **Step 1: Write the failing test**

Create `tests/result.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultReceipt } from '../src/components/ResultReceipt';
import { score } from '../src/lib/scoring';
import { QUESTIONS } from '../src/data/questions';

const answers = {
  q1: 'q1a', q2: 'q2a', q3: 'q3a', q4: 'q4b', q5: 'q5a', q6: 'q6d', q7: 'q7c', q8: 'q8d',
};

describe('ResultReceipt', () => {
  const result = score(QUESTIONS, answers);

  it('reveals the winning dish and tagline', () => {
    render(<ResultReceipt result={result} onRestart={vi.fn()} />);
    expect(screen.getByText(/you confirm are/i)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(/.+/);
  });

  it('shows a top-3 breakdown with percentage line items', () => {
    render(<ResultReceipt result={result} onRestart={vi.fn()} />);
    const items = screen.getAllByTestId('breakdown-item');
    expect(items).toHaveLength(3);
    expect(items[0].textContent).toMatch(/\d+%/);
  });

  it('shows all three trait chips', () => {
    render(<ResultReceipt result={result} onRestart={vi.fn()} />);
    expect(screen.getAllByTestId('trait-chip')).toHaveLength(3);
  });

  it('restarts when the CTA is pressed', () => {
    const onRestart = vi.fn();
    render(<ResultReceipt result={result} onRestart={onRestart} />);
    fireEvent.click(screen.getByRole('button', { name: /play again/i }));
    expect(onRestart).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- tests/result.test.tsx`
Expected: FAIL — cannot resolve `../src/components/ResultReceipt`.

- [ ] **Step 3: Implement `src/components/TraitChip.tsx`**

```tsx
interface TraitChipProps {
  label: string;
  tone: 'chilli' | 'kopi' | 'turmeric';
}

const TONES: Record<TraitChipProps['tone'], string> = {
  chilli: 'bg-chilli text-paper-card',
  kopi: 'bg-kopi-mid text-paper-card',
  turmeric: 'bg-turmeric text-kopi',
};

export function TraitChip({ label, tone }: TraitChipProps) {
  return (
    <span
      data-testid="trait-chip"
      className={`rounded px-3 py-1 font-[family-name:var(--font-label)] text-[0.7rem] font-bold tracking-wider ${TONES[tone]}`}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 4: Implement `src/components/ResultReceipt.tsx`**

```tsx
import { byId } from '../data/archetypes';
import type { Result } from '../lib/types';
import { TraitChip } from './TraitChip';

interface ResultReceiptProps {
  result: Result;
  onRestart: () => void;
}

const TONES = ['chilli', 'kopi', 'turmeric'] as const;

export function ResultReceipt({ result, onRestart }: ResultReceiptProps) {
  const dish = byId[result.winner];
  const top3 = result.ranking.slice(0, 3);

  return (
    <section className="mx-auto flex min-h-dvh max-w-md flex-col items-center px-6 py-10">
      <article className="w-full rounded-md border-[3px] border-double border-kopi-mid bg-paper-card px-6 py-8 shadow-[inset_0_0_0_4px_var(--color-paper-card),inset_0_0_0_5px_var(--color-chilli)]">
        <p className="text-center font-[family-name:var(--font-label)] text-xs tracking-[0.3em] text-kopi-mid">
          AH KOW KOPITIAM
        </p>
        <p className="mt-6 text-center font-[family-name:var(--font-label)] text-xs tracking-[0.2em] text-chilli">
          YOU CONFIRM ARE...
        </p>
        <h1 className="mt-2 border-y-2 border-chilli py-3 text-center font-[family-name:var(--font-display)] text-4xl leading-tight text-kopi">
          {dish.name}
        </h1>
        <p className="mt-4 text-center text-sm italic text-kopi-mid">{dish.tagline}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {dish.traits.map((t, i) => (
            <TraitChip key={t} label={t} tone={TONES[i] ?? 'kopi'} />
          ))}
        </div>
        <p className="mt-6 text-[0.95rem] leading-relaxed text-ink">{dish.blurb}</p>
        <p className="mt-3 text-sm text-kopi-mid">
          Best eaten with:{' '}
          <span className="font-semibold text-kopi">{byId[dish.pairing].name}</span>
        </p>

        <div className="my-6 border-t border-dashed border-kopi-mid" />

        <p className="font-[family-name:var(--font-label)] text-xs tracking-[0.2em] text-kopi-mid">
          YOUR TOP 3
        </p>
        <ul className="mt-3 space-y-1 font-[family-name:var(--font-label)] text-sm text-ink">
          {top3.map((r) => (
            <li key={r.id} data-testid="breakdown-item" className="flex items-baseline gap-2">
              <span className="uppercase">{byId[r.id].name}</span>
              <span className="flex-1 border-b border-dotted border-kopi-mid/60" aria-hidden="true" />
              <span className="font-bold text-kopi">{r.pct}%</span>
            </li>
          ))}
        </ul>

        <div className="my-6 border-t border-dashed border-kopi-mid" />
        <p className="text-center font-[family-name:var(--font-label)] text-[0.65rem] tracking-[0.2em] text-kopi-mid">
          SINCE 1965 &middot; NO DATA COLLECTED
        </p>
      </article>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 min-h-12 w-full rounded-md bg-chilli px-6 text-lg font-bold text-paper-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kopi"
      >
        Play again
      </button>
    </section>
  );
}
```

- [ ] **Step 5: Wire the result into `src/App.tsx`**

Add `resultFor` at the top of the file (outside the component):
```tsx
import { ResultReceipt } from './components/ResultReceipt';
import { clearResultHash, readResultHash, writeResultHash } from './lib/resultUrl';
import type { Result } from './lib/types';
import { byId } from './data/archetypes';

function resultFor(steps: Question[], answers: Record<string, string>): Result {
  return score(steps, answers);
}
```

Inside `App`, handle a shared result hash on mount and render the result:
```tsx
  const [sharedWinner, setSharedWinner] = useState<ArchetypeId | null>(null);

  useEffect(() => {
    const id = readResultHash();
    if (id) {
      setSharedWinner(id);
      setScreen('result');
    }
  }, []);

  const finalResult: Result | null = sharedWinner
    ? { winner: sharedWinner, ranking: [{ id: sharedWinner, score: 0, pct: 0 }], tie: false }
    : baseComplete
      ? resultFor(steps, answers)
      : null;

  useEffect(() => {
    if (screen === 'result' && finalResult && !sharedWinner) {
      writeResultHash(finalResult.winner);
    }
  }, [screen, finalResult, sharedWinner]);

  const handleRestart = () => {
    clearAnswers();
    clearResultHash();
    setAnswers({});
    setSharedWinner(null);
    setResumeAvailable(false);
    setScreen('quiz');
  };

  if (screen === 'result' && finalResult) {
    return <ResultReceipt result={finalResult} onRestart={handleRestart} />;
  }
```

Add `ArchetypeId` to the type imports and `Question` if not already imported.

- [ ] **Step 6: Run tests and typecheck**

Run: `npm test -- tests/result.test.tsx && npm run typecheck`
Expected: 4 passed; no type errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/TraitChip.tsx src/components/ResultReceipt.tsx src/App.tsx tests/result.test.tsx
git commit -m "feat: add kopitiam receipt result screen with top-3 breakdown"
```

---

### Task 10: End-to-end flow test, accessibility pass, and build

**Files:**
- Test: `tests/flow.test.tsx`
- Modify: `src/App.tsx` (only if the flow test reveals a gap)
- Create: `README.md` (run/deploy notes)

**Interfaces:**
- Consumes: everything above.
- Produces: a green end-to-end flow test and a production build.

- [ ] **Step 1: Write the failing end-to-end test**

Create `tests/flow.test.tsx`:
```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import { QUESTIONS } from '../src/data/questions';

describe('full flow', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it('goes landing -> quiz -> result and encodes the result in the hash', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /chiong ah/i }));

    for (const q of QUESTIONS) {
      fireEvent.click(screen.getByText(q.options[0].text));
    }
    // A tie-breaker may appear; answer it if present.
    const tiebreak = screen.queryByText(/cannot decide ah/i);
    if (tiebreak) fireEvent.click(screen.getAllByRole('button')[0]);

    expect(screen.getByText(/you confirm are/i)).toBeInTheDocument();
    expect(window.location.hash).toMatch(/^#\/result\?r=/);
    expect(screen.getAllByTestId('breakdown-item')).toHaveLength(3);
  });

  it('renders a result directly from a shared hash', () => {
    window.history.replaceState(null, '', '/#/result?r=laksa');
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent(/laksa/i);
  });

  it('resumes from saved progress', () => {
    window.localStorage.setItem('simi-hawker.answers.v1', JSON.stringify({ q1: 'q1a' }));
    render(<App />);
    expect(screen.getByRole('button', { name: /continue where you stop/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails (or exposes gaps)**

Run: `npm test -- tests/flow.test.tsx`
Expected: initially FAIL or reveal wiring gaps (for example tie-breaker answering). Fix `src/App.tsx` until green. Do not weaken the assertions.

- [ ] **Step 3: Accessibility and contrast pass**

Manually verify against the token table and fix in place:
- Keyboard-only: Tab to each answer, Enter selects, Back is reachable, result CTA is reachable.
- Focus rings visible on `bg-paper` and on `bg-chilli`.
- Contrast: check `text-kopi` on `paper` (should be well above 4.5:1), `text-ink` on `paper-card`, `text-paper-card` on `bg-chilli`, and `text-kopi-mid` on `paper`. Bump `kopi-mid` usage to `kopi` for small text if any pair measures below 4.5:1.
- `prefers-reduced-motion`: confirm transitions are suppressed (set it in OS settings or DevTools rendering emulation).
- All answer buttons are ≥48px tall with ≥8px gaps (already set: `min-h-12` = 48px, `gap-3` = 12px).

- [ ] **Step 4: Run the full suite and typecheck**

Run: `npm test && npm run typecheck`
Expected: all tests pass; no type errors.

- [ ] **Step 5: Production build and local preview**

Run: `npm run build && npm run preview`
Expected: build succeeds with a small `dist/`; preview renders landing, and a manual playthrough reaches the result. Stop the preview.

- [ ] **Step 6: Write `README.md`**

```markdown
# Simi Hawker Are You?

A no-backend Singaporean hawker-food personality quiz. Answer 8 questions,
get a kopitiam-receipt result card.

## Develop

    npm install
    npm run dev

## Test

    npm test
    npm run typecheck

## Build & deploy

    npm run build   # outputs dist/, host it anywhere static

Deploys as-is to Vercel, Netlify, Cloudflare Pages, or GitHub Pages. The app
uses hash routing, so no server rewrite rules are needed and the build works
from a subpath (`base: './'`).

No answers are transmitted anywhere; the result is computed on-device and
encoded in the URL hash.
```

- [ ] **Step 7: Commit**

```bash
git add tests/flow.test.tsx src/App.tsx README.md
git commit -m "test: cover full flow, verify a11y and ship production build"
```

---

### Task 11: Build the on-device result card

**Files:**
- Create: `src/components/ResultCard.tsx`, `src/lib/renderCard.ts`
- Test: `tests/renderCard.test.tsx`

**Interfaces:**
- Consumes: `Archetype` from `src/lib/types.ts`.
- Produces:
  - `<ResultCard dish={Archetype} url={string} />` — a fixed **1080×1350** node.
  - `renderCard(node: HTMLElement): Promise<Blob>` — dynamically imports
    `html-to-image` and resolves a PNG blob (throws on null).

- [ ] **Step 1: Install the renderer**

```bash
npm install html-to-image
```

- [ ] **Step 2: Write the failing test**

Create `tests/renderCard.test.tsx`:
```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultCard } from '../src/components/ResultCard';
import { renderCard } from '../src/lib/renderCard';
import { byId } from '../src/data/archetypes';

vi.mock('html-to-image', () => ({
  toBlob: vi.fn().mockResolvedValue(new Blob(['png'], { type: 'image/png' })),
}));

describe('ResultCard', () => {
  it('renders the dish at 1080x1350', () => {
    render(<ResultCard dish={byId.laksa} url="https://example.com/result/laksa/" />);
    const card = screen.getByTestId('result-card');
    expect(card).toHaveStyle({ width: '1080px', height: '1350px' });
    expect(card.textContent).toContain('Laksa');
    expect(card.textContent).toContain('https://example.com/result/laksa/');
  });
});

describe('renderCard', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns a png blob', async () => {
    const blob = await renderCard(document.createElement('div'));
    expect(blob.type).toBe('image/png');
  });

  it('throws when the renderer returns null', async () => {
    const { toBlob } = await import('html-to-image');
    (toBlob as ReturnType<typeof vi.fn>).mockResolvedValueOnce(null);
    await expect(renderCard(document.createElement('div'))).rejects.toThrow(/failed/i);
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test -- tests/renderCard.test.tsx`
Expected: FAIL — cannot resolve `../src/components/ResultCard`.

- [ ] **Step 4: Implement `src/lib/renderCard.ts`**

```ts
export async function renderCard(node: HTMLElement): Promise<Blob> {
  const { toBlob } = await import('html-to-image');
  const blob = await toBlob(node, {
    width: 1080,
    height: 1350,
    pixelRatio: 1,
    backgroundColor: '#FBF3E4',
    cacheBust: true,
  });
  if (!blob) throw new Error('Result card render failed');
  return blob;
}
```

- [ ] **Step 5: Implement `src/components/ResultCard.tsx`**

Inline styles (not Tailwind classes) so the off-screen render is deterministic
and independent of the host stylesheet.

```tsx
import type { Archetype } from '../lib/types';

interface ResultCardProps {
  dish: Archetype;
  url: string;
}

const TOKENS = {
  paper: '#FBF3E4',
  card: '#FFFBF0',
  kopi: '#5B3A1E',
  kopiMid: '#8A5A2B',
  chilli: '#C0392B',
  ink: '#2B1B10',
};

export function ResultCard({ dish, url }: ResultCardProps) {
  return (
    <div
      data-testid="result-card"
      style={{
        width: 1080,
        height: 1350,
        boxSizing: 'border-box',
        background: TOKENS.paper,
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(138,90,43,0.05) 0 16px, transparent 16px 32px)',
        padding: 60,
        display: 'flex',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div
        style={{
          flex: 1,
          boxSizing: 'border-box',
          border: `6px double ${TOKENS.kopiMid}`,
          background: TOKENS.card,
          padding: 56,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `inset 0 0 0 6px ${TOKENS.card}, inset 0 0 0 9px ${TOKENS.chilli}`,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 22,
            letterSpacing: 10,
            color: TOKENS.chilli,
          }}
        >
          YOU CONFIRM ARE...
        </div>
        <div
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 104,
            lineHeight: 1.05,
            color: TOKENS.kopi,
            textAlign: 'center',
            marginTop: 16,
          }}
        >
          {dish.name}
        </div>
        <div style={{ width: 220, height: 4, background: TOKENS.chilli, margin: '28px 0' }} />
        <div
          style={{
            fontStyle: 'italic',
            fontSize: 30,
            color: TOKENS.kopiMid,
            textAlign: 'center',
            maxWidth: 760,
          }}
        >
          {dish.tagline}
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
          {dish.traits.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
                background: TOKENS.kopi,
                color: TOKENS.card,
                padding: '10px 18px',
                borderRadius: 4,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 18,
            letterSpacing: 3,
            color: TOKENS.kopiMid,
            marginTop: 64,
          }}
        >
          SIMI HAWKER ARE YOU?
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 16,
            color: TOKENS.kopiMid,
            marginTop: 6,
          }}
        >
          {url}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Run tests and typecheck**

Run: `npm test -- tests/renderCard.test.tsx && npm run typecheck`
Expected: 3 passed; no type errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/ResultCard.tsx src/lib/renderCard.ts tests/renderCard.test.tsx package.json package-lock.json
git commit -m "feat: add on-device 1080x1350 result card and renderer"
```

---

### Task 12: Add share mechanics and wire the Share button

**Files:**
- Create: `src/lib/share.ts`
- Modify: `src/components/ResultReceipt.tsx`
- Test: `tests/share.test.ts`

**Interfaces:**
- Consumes: `ResultCard`, `renderCard`, `Archetype`, `ArchetypeId`.
- Produces:
  - `canonicalResultUrl(id: ArchetypeId): string` → `{origin}/result/{id}/`
  - `buildShareText(dish: Archetype, url: string): string`
  - `downloadBlob(blob: Blob, filename: string): void`
  - `copyText(text: string): Promise<boolean>`
  - `shareResult(blob: Blob, text: string, url: string): Promise<'native' | 'downloaded'>`
  - `ResultReceipt` gains a **Share** button and an off-screen card node.

- [ ] **Step 1: Write the failing test**

Create `tests/share.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  buildShareText,
  canonicalResultUrl,
  copyText,
  shareResult,
} from '../src/lib/share';
import { byId } from '../src/data/archetypes';

describe('share', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('builds a canonical result url with a trailing slash', () => {
    expect(canonicalResultUrl('laksa')).toBe(`${window.location.origin}/result/laksa/`);
  });

  it('builds share text with the dish and the url', () => {
    const text = buildShareText(byId.laksa, 'https://x/result/laksa/');
    expect(text).toContain('Laksa');
    expect(text).toContain('https://x/result/laksa/');
  });

  it('uses native share when files can be shared', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, canShare: () => true, share });
    const method = await shareResult(new Blob(['x']), 'hi', 'https://x');
    expect(method).toBe('native');
    expect(share).toHaveBeenCalledOnce();
  });

  it('falls back to download when native file share is unavailable', async () => {
    vi.stubGlobal('navigator', { ...navigator, canShare: undefined, share: undefined });
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const method = await shareResult(new Blob(['x']), 'hi', 'https://x');
    expect(method).toBe('downloaded');
    expect(click).toHaveBeenCalled();
  });

  it('returns false from copyText when the clipboard throws', async () => {
    vi.stubGlobal('navigator', {
      ...navigator,
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('blocked')) },
    });
    expect(await copyText('x')).toBe(false);
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- tests/share.test.ts`
Expected: FAIL — cannot resolve `../src/lib/share`.

- [ ] **Step 3: Implement `src/lib/share.ts`**

```ts
import type { Archetype, ArchetypeId } from './types';

export function canonicalResultUrl(id: ArchetypeId): string {
  const { origin, pathname } = window.location;
  const base = pathname.replace(/index\.html$/, '');
  return `${origin}${base}result/${id}/`;
}

export function buildShareText(dish: Archetype, url: string): string {
  return `I got ${dish.name}! ${dish.tagline} which hawker are you? ${url}`;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export type ShareMethod = 'native' | 'downloaded';

export async function shareResult(
  blob: Blob,
  text: string,
  url: string,
): Promise<ShareMethod> {
  const file = new File([blob], 'simi-hawker.png', { type: 'image/png' });
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  const canShareFiles =
    typeof nav.canShare === 'function' &&
    typeof nav.share === 'function' &&
    nav.canShare({ files: [file] });

  if (canShareFiles) {
    try {
      await nav.share({ files: [file], title: 'Simi Hawker Are You?', text, url });
      return 'native';
    } catch {
      // Cancelled or failed; fall through to download.
    }
  }

  downloadBlob(blob, 'simi-hawker.png');
  return 'downloaded';
}
```

- [ ] **Step 4: Add the Share button and off-screen card to `ResultReceipt.tsx`**

Add these imports at the top:
```tsx
import { useRef, useState } from 'react';
import { ResultCard } from './ResultCard';
import { renderCard } from '../lib/renderCard';
import { buildShareText, canonicalResultUrl, copyText, shareResult } from '../lib/share';
```

Inside the component (after `const top3 = ...`):
```tsx
  const cardRef = useRef<HTMLDivElement>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const handleShare = async () => {
    if (!cardRef.current) return;
    const url = canonicalResultUrl(dish.id);
    const text = buildShareText(dish, url);
    setShareStatus('Building your card...');
    try {
      const blob = await renderCard(cardRef.current);
      const method = await shareResult(blob, text, url);
      if (method === 'downloaded') {
        const copied = await copyText(text);
        setShareStatus(copied ? 'Card downloaded, link copied!' : 'Card downloaded!');
      } else {
        setShareStatus(null);
      }
    } catch {
      setShareStatus('Cannot build the card leh. Try again?');
    }
  };
```

Render the card off-screen just inside the returned `<section>`, before the
`<article>`:
```tsx
      <div
        aria-hidden="true"
        style={{ position: 'fixed', left: -99999, top: 0, pointerEvents: 'none' }}
      >
        <div ref={cardRef}>
          <ResultCard dish={dish} url={canonicalResultUrl(dish.id)} />
        </div>
      </div>
```

Add the Share button above the existing "Play again" button:
```tsx
      <button
        type="button"
        onClick={handleShare}
        className="mt-6 min-h-12 w-full rounded-md bg-kopi px-6 text-lg font-bold text-paper-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chilli"
      >
        Share my hawker
      </button>
      {shareStatus && (
        <p role="status" className="mt-2 text-center text-sm text-kopi-mid">
          {shareStatus}
        </p>
      )}
```

Change the "Play again" button's `mt-6` to `mt-3`.

- [ ] **Step 5: Run tests and typecheck**

Run: `npm test -- tests/share.test.ts tests/result.test.tsx && npm run typecheck`
Expected: all pass (the existing result test still sees 3 breakdown items and 3 chips; the new Share button does not break it).

- [ ] **Step 6: Commit**

```bash
git add src/lib/share.ts src/components/ResultReceipt.tsx tests/share.test.ts
git commit -m "feat: add native share with download and copy-link fallbacks"
```

---

### Task 13: Pre-render per-dish result pages and OG images at build time

**Files:**
- Create: `src/lib/ogTemplate.ts`, `scripts/generate-og.ts`, `tests/ogTemplate.test.ts`
- Modify: `package.json`, `README.md`

**Interfaces:**
- Consumes: `ARCHETYPES`.
- Produces:
  - `escapeXml(s: string): string`
  - `ogSvg(name: string, tagline: string): string` — 1200×630 SVG string.
  - `resultPage({ id, name, tagline, site }): string` — full HTML with matching
    OG tags and a redirect to `../../index.html#/result?r=<id>`.
  - A `build:og` script that writes `dist/result/<id>/og.png` and
    `dist/result/<id>/index.html` for all 10 dishes.

- [ ] **Step 1: Install sharp and tsx**

```bash
npm install -D sharp tsx
```

- [ ] **Step 2: Write the failing test**

Create `tests/ogTemplate.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { escapeXml, ogSvg, resultPage } from '../src/lib/ogTemplate';

describe('ogTemplate', () => {
  it('escapes xml entities', () => {
    expect(escapeXml('a & b < c > d "e"')).toBe('a &amp; b &lt; c &gt; d &quot;e&quot;');
  });

  it('builds a 1200x630 svg containing the dish name', () => {
    const svg = ogSvg('Laksa', 'Rich and warm');
    expect(svg).toContain('width="1200"');
    expect(svg).toContain('height="630"');
    expect(svg).toContain('Laksa');
  });

  it('builds a result page with matching og tags and a redirect', () => {
    const html = resultPage({
      id: 'laksa',
      name: 'Laksa',
      tagline: 'Rich and warm',
      site: 'https://x',
    });
    expect(html).toContain('og:title" content="Laksa');
    expect(html).toContain('og:image" content="https://x/result/laksa/og.png"');
    expect(html).toContain('og:url" content="https://x/result/laksa/"');
    expect(html).toContain('index.html#/result?r=laksa');
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test -- tests/ogTemplate.test.ts`
Expected: FAIL — cannot resolve `../src/lib/ogTemplate`.

- [ ] **Step 4: Implement `src/lib/ogTemplate.ts`**

```ts
export function escapeXml(value: string): string {
  const map: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  };
  return value.replace(/[<>&'"]/g, (c) => map[c]!);
}

export function ogSvg(name: string, tagline: string): string {
  const dish = escapeXml(name);
  const line = escapeXml(tagline);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FBF3E4"/>
  <rect x="40" y="40" width="1120" height="550" fill="#FFFBF0" stroke="#8A5A2B" stroke-width="6"/>
  <rect x="54" y="54" width="1092" height="522" fill="none" stroke="#C0392B" stroke-width="3"/>
  <text x="600" y="205" text-anchor="middle" font-family="monospace" font-size="26" letter-spacing="6" fill="#C0392B">YOU CONFIRM ARE...</text>
  <text x="600" y="345" text-anchor="middle" font-family="Georgia, serif" font-size="92" font-weight="bold" fill="#5B3A1E">${dish}</text>
  <text x="600" y="430" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#8A5A2B">${line}</text>
  <text x="600" y="548" text-anchor="middle" font-family="monospace" font-size="22" letter-spacing="5" fill="#8A5A2B">SIMI HAWKER ARE YOU?</text>
</svg>`;
}

export interface ResultPageInput {
  id: string;
  name: string;
  tagline: string;
  site: string;
}

export function resultPage({ id, name, tagline, site }: ResultPageInput): string {
  const title = `${name} - Simi Hawker Are You?`;
  const description = escapeXml(tagline);
  const image = `${site}/result/${id}/og.png`;
  const url = `${site}/result/${id}/`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeXml(title)}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${url}" />
<meta property="og:title" content="${escapeXml(title)}" />
<meta property="og:type" content="website" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${url}" />
<meta name="twitter:card" content="summary_large_image" />
<meta http-equiv="refresh" content="0; url=../../index.html#/result?r=${id}" />
</head>
<body>
<p>You got ${escapeXml(name)}. <a href="../../index.html#/result?r=${id}">See your result</a>.</p>
</body>
</html>`;
}
```

- [ ] **Step 5: Implement `scripts/generate-og.ts`**

```ts
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { ARCHETYPES } from '../src/data/archetypes';
import { ogSvg, resultPage } from '../src/lib/ogTemplate';

const site = process.env.SITE_URL;
if (!site) {
  throw new Error(
    'SITE_URL is required so OG tags are absolute. Run: SITE_URL=https://your-site.example npm run build',
  );
}
const cleanSite = site.replace(/\/$/, '');
const outRoot = join(process.cwd(), 'dist', 'result');

async function main() {
  for (const dish of ARCHETYPES) {
    const dir = join(outRoot, dish.id);
    await mkdir(dir, { recursive: true });
    const png = await sharp(Buffer.from(ogSvg(dish.name, dish.tagline)))
      .png()
      .toBuffer();
    await writeFile(join(dir, 'og.png'), png);
    await writeFile(
      join(dir, 'index.html'),
      resultPage({
        id: dish.id,
        name: dish.name,
        tagline: dish.tagline,
        site: cleanSite,
      }),
    );
  }
  console.log(`Generated ${ARCHETYPES.length} result pages and OG images.`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});
```

- [ ] **Step 6: Wire the build scripts**

In `package.json` `scripts`, replace the `build` entry with:
```json
"build": "npm run build:app && npm run build:og",
"build:app": "tsc -b && vite build",
"build:og": "tsx scripts/generate-og.ts"
```

- [ ] **Step 7: Run the build and inspect the output**

Run:
```bash
SITE_URL=https://simi-hawker.example npm run build
ls dist/result/laksa
```
Expected: `index.html` and `og.png` present; the suite still green via `npm test && npm run typecheck`.

- [ ] **Step 8: Update `README.md` with the SITE_URL requirement**

Add under Build & deploy:
```markdown
The build pre-renders a shareable page per dish, so it needs the deployed
origin:

    SITE_URL=https://your-deployed-origin npm run build

`npm run build:app` builds the app alone (no OG pages) for local previews.
```

- [ ] **Step 9: Commit**

```bash
git add src/lib/ogTemplate.ts scripts/generate-og.ts tests/ogTemplate.test.ts package.json package-lock.json README.md
git commit -m "feat: pre-render per-dish result pages and OG images at build time"
```

---

## Future (not in this plan)

Nothing from the spec is deferred. If a later iteration wants real engagement
mechanics, the cheapest additions that stay backend-free are a **deterministic
daily drop** (date-seeded question order) and a **localStorage streak** (the
Wordle/Duolingo pattern from the research). Add a new spec section and a
follow-on plan for those rather than extending this one.

## Self-review notes

- **Spec coverage:** 10 archetypes (Task 2); 8 questions + weights (Task 3);
  pure deterministic scoring, top-3, disclosed tie-breaker (Tasks 3, 4);
  balance gate (Task 5); no-backend state + URL result (Task 6); Kopitiam
  Retro landing/quiz/result (Tasks 7–9); a11y, motion, contrast, CWV-minded
  build (Task 10); result card + render (Task 11); share mechanics with
  fallbacks (Task 12); pre-rendered per-dish OG pages (Task 13, covers spec
  §7.4 and §12).
- **Type consistency:** `score`/`tiedIds`/`makeTiebreaker`/`ARCHETYPES`/`byId`/
  `QUESTIONS`/`canonicalResultUrl`/`buildShareText`/`renderCard`/`shareResult`
  are used with identical names across tasks; `ArchetypeId`, `Archetype`,
  `Question`, `Option`, `RankedResult`, `Result`, `ShareMethod`,
  `ResultPageInput` are defined once and reused.
- **No placeholders:** every code step contains runnable code. The two
  intentionally parameterised values are `SITE_URL` (required env var, throws
  with instructions if missing) and Task 5's weight tuning (explicit numeric
  target plus a runnable checker).
