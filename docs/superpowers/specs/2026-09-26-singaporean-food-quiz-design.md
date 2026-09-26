# Simi Hawker Are You? — Design Spec

- **Date:** 2026-09-26
- **Status:** Draft, awaiting review
- **Working title:** *Simi Hawker Are You?* (alt: *Hawker Index*)

## 1. Summary

A single-page, no-backend, mobile-first web quiz. The player answers 8 short
Singaporean scenario questions; the app tallies hidden points across 10 iconic
hawker dishes and reveals the dish that best matches them, with a top-3
breakdown. Everything runs client-side. The result is computed and encoded in
the URL, so no answers ever leave the device.

Visual direction, approved in the mockup companion: **Kopitiam Retro** — cream
paper, kopi brown, chilli red, old-signage type, double-rule borders and a
receipt motif.

## 2. Research basis

Findings driving the design (full report: `reports/Viral quiz app patterns.md`):

- **Results-first authoring.** BuzzFeed wrote the outcomes before the questions
  ("six buckets, whichever answer you have the most in the bucket, that's the
  result you get"). We adopt this: write all 10 dish archetypes first.
- **5–10 questions.** Best benchmark sets converge on 5–10; Outgrow names 7 as
  the sweet spot and calls **question 3 the drop-off danger zone**. We use 8 and
  front-load the most curious question.
- **Progress beats percentages.** Persistent "Question N of 8" counter; early
  steps weighted to feel fast. Progress bars carry the one quantified
  completion lift (+12–18% claimed; NN/g shows ~3× willingness to wait).
- **Top-3 breakdown, not a single hard label.** 39–76% of people get a
  different MBTI type on a 5-week retake; a single food label has the same
  flip risk. Showing runner-ups makes the result feel earned and hedges the
  instability.
- **Disclosed tie-breaker.** Pottermore's Sorting Hat asks an extra question
  instead of silently randomising. We do the same.
- **Result card is the product.** Even with sharing deferred, the result
  screen must be screenshot-perfect.
- **Flattering, "at times"-hedged copy.** Forer/Barnum effect: vague, positive,
  personalised wording is what makes results land. No health or clinical claims.
- **No fabricated percentiles.** "You beat X% of players" needs a real
  population. We score against a hardcoded par, labelled honestly, or omit it.

## 3. Goals / non-goals

### Goals
- Take a stranger from landing to a delightful, personal result in under 2
  minutes on a phone.
- Feel unmistakably Singaporean and funny to locals without being cringe.
- Be honest: no fake statistics, no dark patterns, no data collection.
- Ship as a static bundle deployable to any host.
- **Share:** let the player send a result card image and a link from their
  phone in one tap, with no backend.

### Non-goals (v1)
- Accounts, login, profiles, any backend or database.
- Leaderboards, multi-user, multiplayer, or live play.
- Analytics, tracking, or transmitting answers.
- Multi-language / i18n.
- Native app.
- Server-rendered dynamic OG images (we pre-render static ones at build time).

## 4. Audience & success criteria

- **Audience:** Singaporeans and anyone hawker-literate (expat, regional,
  diaspora), ages ~15–45, on a phone, arriving from a group chat or social post.
- **Success (v1):** completes end-to-end without a backend, result screen is
  screenshot-worthy, at least one friend asks "eh how you get that one?".
- **Not measured in v1:** we ship no analytics, so success is qualitative.

## 5. The 10 archetypes

Write these **fully before any question**. Each is flattering, specific, and
uses a couple of Singlish particles without becoming unreadable. Fields per
archetype:

```
id, name, emoji/motif, tagline (one line, Singlish),
traits (3 chips), blurb (2-3 sentences, hawker-uncle voice),
pairing (one other dish id, shown in the blurb)
```

| id | Dish | One-line personality |
|----|------|----------------------|
| `chicken-rice` | Chicken Rice | The dependable one everyone's happy with — no drama, always solid. |
| `laksa` | Laksa | Rich, warm and a bit extra; comfort for everyone around you. |
| `ckteow` | Char Kway Teow | Maximum wok hei, zero patience — high heat, high drama, worth the queue. |
| `chilli-crab` | Chilli Crab | Expensive taste, main-character energy, messy but impossible to resist. |
| `bak-kut-teh` | Bak Kut Teh | Old-school, peppery, no-nonsense — you don't follow trends, you set them. |
| `roti-prata` | Roti Prata | Easygoing, adaptable, good at any hour — everyone's 2am friend. |
| `hokkien-mee` | Hokkien Mee | Quietly deep and underrated; the connoisseur's pick. |
| `satay` | Satay | Social glue — you never arrive alone and you bring the whole kampong. |
| `kaya-toast` | Kaya Toast | Nostalgic, sweet, sentimental — a kopitiam morning in human form. |
| `ice-kachang` | Ice Kachang | Colourful chaos, all over the place, but somehow everyone's favourite. |

> **Authenticity guardrail:** dialect/ethnic associations with dishes
> (Hainanese, Teochew, Cantonese, Malay, Indian hawker traditions) must be
> referenced respectfully and accurately, or not at all. Verify every claim
> against NHB/Roots or reputable food journalism before shipping copy. Flag
> uncertain origin stories rather than asserting them.

## 6. Content model

### 6.1 Question

```
Question {
  id: string
  text: string                  // scenario, Singlish, <= 140 chars
  options: Option[]             // exactly 4
}
Option {
  id: string
  text: string                  // <= 60 chars, reads as a choice
  weights: Partial<Record<ArchetypeId, number>>  // points to 1-3 dishes
}
```

Design rules:
- **8 questions, 4 options each.** 32 points distributed per run.
- Weights are small integers (1–3). Most options are `{ primary: 3 }` or
  `{ primary: 2, secondary: 1 }`. Avoid handing points to more than 3 dishes.
- Question 1–2 must be vivid and curiosity-driving (image/clothing/sensory
  choices) to clear the Q3 cliff.
- No question may be answerable "correctly"; all four options must be
  flattering or funny, never an obviously bad choice.
- Every dish must be the top scorer for at least one plausible answer path.

### 6.2 Scoring

Deterministic, pure function:

```
score(answers): { ranking: {id, score, pct}[], winner: id, tie: boolean }
```

1. Sum `weights` across the 8 chosen options into a scoreboard over 10 dishes.
2. Sort descending. `winner` = top dish.
3. Compute `pct` = round(score / totalPoints * 100). Show top 3 as receipt
   line items.
4. **Tie-break:** if the top two are equal, present **one disclosed bonus
   question** ("Eh, last one, cannot decide ah: which one you cannot live
   without?") whose options are the tied dishes; the choice wins. If still
   tied, fall back to a fixed deterministic priority order (documented in
   code, never random).
5. Never randomise the outcome. Same answers ⇒ same dish, always.

### 6.3 Balance

Ship a **simulation test** that generates many random-but-plausible answer sets
(e.g. 10,000 runs, uniform option choice) and asserts:
- every archetype wins at least ~4% of runs,
- no archetype wins more than ~20%,
- the tie-breaker path is exercised.

Tune weights until the test passes. This is the mechanism that keeps the quiz
from collapsing into "everyone gets Chicken Rice."

## 7. Screens & flow

State machine: `landing → quiz (Q1..Q8, + optional tie-breaker) → result`.

### 7.1 Landing
- Big kopitiam "signboard" title: **SIMI HAWKER ARE YOU?**
- Subtitle: *"Singapore's most unscientific personality test. 8 questions, 2
  minutes, zero data collected."*
- One primary CTA: **"Chiong ah! Start →"** (48px+ target, bottom third).
- Small print row: `8 questions · ~2 min · no sign-up`.
- Optional quiet "resume" link if an in-progress quiz exists in localStorage.

### 7.2 Quiz
- Persistent header: `Question 3 of 8` + a slim progress rule styled like a
  kopitiam counter. Early steps weighted to move fast.
- Question text large and readable; a small dish-agnostic motif/emoji allowed.
- Four full-width answer cards, each ≥48px tall with ≥8px spacing, keyboard
  focusable, lettered A–D, hover/pressed states.
- **Back button** (secondary) to change the previous answer; re-selecting
  replaces that answer's weights (no double counting).
- Selecting an answer animates briefly (~180ms) then advances. All motion
  wrapped in `prefers-reduced-motion`.
- Layout: question top, answers centre, controls bottom third for thumb reach.

### 7.3 Result
Styled as a **kopitiam receipt** (dashed rules, monospace line items):
- Eyebrow: `YOU CONFIRM ARE...`
- Hero: dish name in the display serif, chilli-red rule above/below.
- Tagline (italic, Singlish).
- 3 trait chips (chilli red / kopi brown / turmeric).
- Hawker-uncle blurb (2–3 sentences), ending with a **pairing** line
  ("Best eaten with: Roti Prata").
- **Top-3 breakdown** as receipt line items: `LAKSA .......... 34%` etc.
  Honest, derived from real tallies.
- Footer: `— AH KOW KOPITIAM · since 1965 · no data collected —`
- Actions: **"Share"** (primary), **"Play again"** (secondary). See §7.4.

### 7.4 Sharing

Sharing is the growth lever the research calls the product, so it is in scope.

**What the player gets on tap:**
1. A **result card image**, rendered on-device (1080×1350, a 4:5 crop that
   suits IG/WhatsApp), in the Kopitiam Retro style — dish name, tagline, 3
   traits, shop footer, and the app URL.
2. A **prefilled share text**: *"I got `{dish}`! `{tagline}` — which hawker
   are you?"* plus a link.
3. A **link** to a static per-dish page (`/result/<id>/`) so the recipient
   opens straight to that result.

**Share mechanics (progressive, no backend):**
- Primary path: `navigator.canShare({ files })` + `navigator.share({ files,
  title, text, url })` — the OS share sheet (WhatsApp, IG, Telegram, AirDrop).
- Fallback when file sharing is unavailable: **download the PNG** via an
  `<a download>` click and show a **"Copy link"** button using
  `navigator.clipboard.writeText`. If the clipboard is blocked, show the URL
  in a selectable field.
- The card is rendered from a real, off-screen DOM node with **`html-to-image`**
  (research: 5.2 kB gzipped, zero deps, Safari-tested; `html2canvas` is heavier
  and self-labelled experimental; `dom-to-image` is Safari-broken).
- The two web fonts are **self-hosted** (not hot-linked from Google) so
  `html-to-image` can inline them without cross-origin fetch failures.

**Link previews on a static host:** crawlers do not run JS and never see the
URL hash, so a per-result preview needs a real page per dish. The build
**pre-renders `/result/<id>/index.html` for each of the 10 dishes**, each with
its own `og:title`, `og:description`, `og:image`, `og:url` and a matching
**pre-rendered 1200×630 PNG**. That page immediately hands off to the SPA
(`/index.html#/result?r=<id>`), so humans get the animated app and bots get
the right unfurl. This avoids a serverless OG function entirely.

**Deliberately not done:** no "X% of players" claim, no tracking of shares, no
share counts (all would need a backend or fabricate data).


## 8. Visual system — Kopitiam Retro

Approved direction. Tokens live in Tailwind config + CSS variables.

| Token | Value | Use |
|-------|-------|-----|
| `paper` | `#FBF3E4` | page background |
| `paper-card` | `#FFFBF0` | cards/receipt |
| `kopi` | `#5B3A1E` | primary text, headings |
| `kopi-mid` | `#8A5A2B` | borders, secondary text |
| `chilli` | `#C0392B` | accent, hero rule, primary CTA |
| `turmeric` | `#E0A33E` | tertiary chip / highlight |
| `ink` | `#2B1B10` | body text where max contrast needed |

- **Texture:** subtle 45° diagonal stripe overlay on the page background at
  ~5% opacity to evoke old tiles.
- **Borders:** double rules (`3px double`) on the result card, echoing
  kopitiam signage.
- **Type:** a warm display serif for the result hero, a bold condensed or
  mono face for eyebrow/labels/receipt line items, and a clean readable sans
  for body and answers. Load at most **2 web font families** with
  `preconnect` + `display=swap`, and define system fallbacks so the page is
  usable before fonts load. **Verify WCAG AA contrast** for every
  foreground/background pair before shipping (chilli on paper for large text
  is the risky one — measure it).
- **Motion:** 150–200ms ease transitions only; nothing looping or flashy.

## 9. Architecture

Static Vite + React + TypeScript + Tailwind SPA. No server, no database.

```
src/
  data/
    archetypes.ts        # the 10 dishes (results-first content)
    questions.ts         # the 8 questions + weight vectors
    tiebreaker.ts        # copy for the bonus question
  lib/
    scoring.ts           # pure score() + tie-break resolution
    resultUrl.ts         # encode/decode `?r=<id>` in the URL hash
    persistence.ts       # localStorage read/write with try/catch
    types.ts             # ArchetypeId, Question, Option, Result...
  components/
    Landing.tsx
    QuestionCard.tsx
    ProgressCounter.tsx
    ResultReceipt.tsx
    TraitChip.tsx
  App.tsx                # state machine + routing
  main.tsx
  index.css              # theme tokens, base styles
tests/
  scoring.test.ts
  balance.test.ts        # the 10k-run simulation
  flow.test.tsx          # landing → quiz → result
```

Design boundaries:
- `scoring.ts` is a **pure function** — no React, no DOM, no randomness. Fully
  unit-testable.
- `persistence.ts` wraps `localStorage` in `try/catch` (it can throw in
  private/blocked contexts); on failure the app degrades to in-memory state.
- Data files hold content only; components never hardcode dish copy.
- `App.tsx` owns the state machine; screens are presentational and receive
  props/callbacks.

## 10. State & URLs

- **State machine:** `'landing' | 'quiz' | 'result'` in `App`.
- **In progress:** answers persisted to `localStorage` key
  `simi-hawker.answers.v1` so a refresh or accidental back doesn't lose
  progress. Offer resume on landing; clear on finish/restart.
- **Result in URL:** on completion, write `#/result?r=<archetype-id>` via
  `history.replaceState`. On load, a result hash renders the result directly
  (this is what makes a *future* share link work for free, and it's why the
  encoding is a single opaque id, never the raw answer vector — raw answers
  would leak into history and referrers).
- **Routing:** **hash routing**, deliberately, so the bundle is host-agnostic
  (GitHub Pages has no rewrite rules). No router dependency needed for two
  shapes; a small parse of `location.hash` suffices.
- **Restore order on load:** URL result hash → in-progress localStorage →
  landing.

## 11. Accessibility

- Answers are real `<button>` elements (or radio group) with visible focus
  rings; full keyboard operation; Enter/Space selects.
- `aria-live="polite"` announces "Question N of 8" and, on the result screen,
  the revealed dish.
- Colour is never the only signal (chips carry text labels).
- Respect `prefers-reduced-motion` for all transitions.
- WCAG AA: ≥4.5:1 for normal text, ≥3:1 for large text and UI boundaries.
- Tap targets ≥48px with ≥8px spacing.

## 12. Performance & hosting

- Target Core Web Vitals: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
- Bundle should stay small (no router, no animation library, no icon pack —
  inline SVG/emoji only). At most 2 web-font families, **self-hosted** so the
  card renderer can inline them.
- **Code-split the share path:** `html-to-image` and the render code load via
  dynamic `import()` only when the player taps Share, so first paint and the
  quiz flow stay light.
- A **build step pre-renders** the 10 `/result/<id>/index.html` pages and their
  1200×630 OG PNGs (SVG template rasterised with `sharp`) into `dist/`.
- Static build output (`dist/`) deploys as-is to Vercel, Netlify, Cloudflare
  Pages, or GitHub Pages. **Hash routing keeps all four viable**, and the
  pre-rendered result folders work because `base: './'` uses relative paths.

## 13. Testing

- **Unit — scoring:** winner selection, percentages sum sensibly, top-3
  ordering, tie detection, documented deterministic fallback order, and
  back-navigation replacing rather than double-counting an answer.
- **Simulation — balance:** 10k runs asserting each archetype's win share is in
  the target band (Section 6.3).
- **Component — flow:** landing → answer all → result shows expected dish;
  resume from localStorage; result hash renders result directly; restart
  clears state.
- **A11y smoke:** keyboard-only completion; contrast values asserted against
  the token table.
- **Share:** card renderer produces a PNG blob (mock `html-to-image`);
  `shareResult()` prefers native share when `canShare` allows files and falls
  back to download + copy-link; share text and canonical URL are correct.
- **Build:** the OG pre-render script emits exactly 10 result pages and 10 OG
  PNGs, each with matching `og:title`/`og:image`/`og:url`.
- **Manual:** screenshot the result on a 390px-wide viewport and confirm it
  reads as a shareable artifact.

## 14. Phases

- **Phase 0 — Scaffold.** Vite + React + TS + Tailwind; theme tokens; fonts;
  base styles; folder skeleton.
- **Phase 1 — Content.** Write all 10 archetypes, then the 8 questions with
  weight vectors, then tie-breaker copy. Content review for authenticity and
  tone.
- **Phase 2 — Engine.** `scoring.ts` + `types.ts`; unit and balance tests to
  green. No UI yet.
- **Phase 3 — Screens.** Landing, Quiz, Result in the Kopitiam Retro system.
- **Phase 4 — Wiring & polish.** State machine, persistence, URL encoding,
  a11y pass, motion, contrast verification, responsive pass.
- **Phase 5 — Share.** Result card component + off-screen render via
  `html-to-image`; `shareResult()` with native-share / download + copy-link
  fallbacks; share text and canonical link. Build script that pre-renders the
  10 `/result/<id>/` pages and 1200×630 OG PNGs.

## 15. Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| Results flip on retake → feels fake | Top-3 breakdown + honest framing; no "scientific" claims. |
| Everyone gets the same dish | Balance simulation test is a hard gate (Section 6.3). |
| Copy reads cringe or inaccurate | Results-first authoring + authenticity review against NHB/Roots; flag uncertain origins. |
| Singlish excludes non-locals | Keep particles light in questions; the joke still lands from context. |
| Contrast fails on cream/chilli | Explicit token-table contrast check before ship. |
| Share card renders wrong on Safari | `html-to-image` (Safari-tested), self-hosted fonts, fixed 1080×1350 node; manual Safari check before ship. |
| Crawlers show a generic preview | Pre-rendered per-dish `/result/<id>/` pages carry the real OG tags; share button always shares the canonical path, never the hash URL. |
| Scope creep into accounts | Non-goals list; sharing is the only addition. |

## 16. Open questions (deferred, non-blocking)

- Exact Instagram Stories/Reels safe zones and WhatsApp/Telegram link-preview
  specs could not be confirmed from primary sources in the research round.
  Mitigation: keep the card's essential content inside a generous central safe
  area and verify on a real device before ship.
- Final app name: *Simi Hawker Are You?* vs *Hawker Index*.
- Whether to display a "par score" comparison (only if it can be labelled
  honestly; no fake population percentiles).
