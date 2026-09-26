# Quiz Web-App UX, Completion Rates, and Lightweight Static-Web Implementation Patterns

Scope: single-page, no-backend, no-accounts, mobile-first quiz that maximizes completion and shareability.
Note on evidence quality: consumer quiz/survey vendors publish most of the usable benchmark data, and it is self-reported marketing content (Outgrow, Survicate). Treat those numbers as directional, not peer-reviewed. Where a search/primary page was unreachable (Typeform help center hit a CAPTCHA; several web searches timed out), that is flagged as a Gap rather than filled with a guess.

## Key Question 1 — Optimal number of questions before drop-off increases (benchmark data)

### Takeaway
Two credible benchmark sets disagree in shape. Survicate's large platform study (n=21,863) finds a **U-shaped** completion curve (extremely short and very long surveys complete best; the worst zone is 6–60 questions, lowest at 21–40). Outgrow's quiz-focused marketing benchmarks find a **monotonic decline** and name **7 questions** as the sweet spot. For a "fun" consumer quiz, the defensible planning target is **~5–10 questions** with completion in the **65–85%** band, but there is no rigorous public study specific to viral personality quizzes.

### Cited Findings
- Short quizzes (3–7 questions): **65–85%** completion; medium (8–15): **45–65%**; long (16+): **25–45%**. "The sweet spot? Seven questions." — [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates)
- By format: personality quizzes **60–80%** completion; assessments **45–65%**; product-recommendation **40–60%** (recommendation quizzes convert better despite lower completion). — [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates)
- Quiz funnel: healthy **start rate 40–60%**; **question 3 is the danger zone** where most quizzes lose steam; target **2–4 minutes** total engagement; asking for email mid-quiz "kills momentum." — [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates)
- Completion by traffic source: email **70–85%**, Google search **55–70%**, social **45–60%**, paid ads **35–50%**, partner/affiliate **40–65%**. — [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates)
- Survicate (21,863 surveys, 2025, 50+ industries; dropped surveys with <10 responses): average completion by question count — **1q 85.7%** (n=1,793), **2q 80.7%** (n=1,830), **3q 77.4%**, **4q 72.7%**, **5q 72.5%**, **6q 69.4%**, **10q 72.7%**, **20q 68.7%**. — [Survicate](https://survicate.com/blog/how-many-questions-should-surveys-have/)
- Survicate by length bucket: 1–5q **77.2%**, 6–10q **73.6%**, 11–20q **72.5%**, 21–40q **70.5% (lowest)**, 41–60q **70.9%**, 61–100q **75.5%**, 101–150q **83.0% (highest)**, 151–227q **79.0%**. They call 6–60 the "Valley of Death." — [Survicate](https://survicate.com/blog/how-many-questions-should-surveys-have/)
- Survicate time-per-bucket: 1–5q ~30–60s; 6–20q 2–5 min; 21–60q 10–20 min; 61–150q 20+ min. Response-vs-completion gap is widest (43 percentage points) in the 1–5q bucket ("casual clicker" problem). — [Survicate](https://survicate.com/blog/how-many-questions-should-surveys-have/)
- Survicate is explicit that the long-survey peak is explained by **self-selection** (motivated, targeted respondents) and by **small sample size** in the 101–150 bucket; they state they are "not saying longer surveys are generally preferable." — [Survicate](https://survicate.com/blog/how-many-questions-should-surveys-have/)
- [Survicate](https://survicate.com/blog/how-many-questions-should-surveys-have/) (U-shaped, monotonic-ish decline by raw count) vs [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates) (smooth decline, magic number 7): conflicting shapes.

### Inferences
- Plan a fun quiz at **5–10 questions**. Below 5 you lose result-resolution value; above 10 completion pressure rises and the time-to-complete exceeds the 2–4 minute window Outgrow associates with good engagement.
- Design explicitly for the **Q3 drop-off cliff** (Outgrow): put the most engaging/curiosity-driving question early and never front-load a form field.
- Because "question count" alone is a weak predictor, optimize **perceived length** (progress, time estimate, adaptive logic) rather than only cutting questions.
- Outgrow's incentive is to sell a quiz builder, and it publishes no methodology; treat its exact percentages as marketing, not measurement. Survicate publishes sample sizes and bucket definitions, so its shape is the more defensible planning input — but it measures B2B/CX email surveys, not viral quizzes (see Gaps).

### Gaps
- No peer-reviewed or methodologically transparent study specific to **viral/fun personality quizzes** was located; all quiz-specific numbers come from vendor content marketing.
- Typeform's official completion-rate benchmark page could not be retrieved (bot CAPTCHA at help.typeform.com). No Typeform, SurveyMonkey, Interact, or LearnWorlds primary benchmark figures were obtained in this pass.
- No data found isolating the effect of **answer format** (multiple-choice vs slider vs image-pick vs open text) on completion.

## Key Question 2 — UX patterns that improve completion (and measured effects)

### Takeaway
The only pattern with a quantified, repeated claim in the material found is the **progress indicator**: Outgrow claims **+12–18% completion**, and classic HCI research (cited by NN/g) found users shown a moving progress bar waited **~3× longer** and reported higher satisfaction. NN/g's threshold guidance (spinner for 2–9s waits; percent-done for 10s+) is the best-supported concrete rule. For one-question-per-screen, back navigation, auto-advance, and estimated time, no measured quiz-specific effect was located in this pass.

### Cited Findings
- "Visual progress bars increase completion rates by **12–18%**"; and "non-linear progress bars (that jump ahead unpredictably) perform even better because they create positive surprises." — [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates) (vendor claim, no methodology)
- University of Nebraska–Lincoln study: people shown a continuous moving progress bar were willing to wait on average **3× longer** than a control group with no indicator, and reported higher satisfaction. — [NN/g](https://www.nngroup.com/articles/progress-indicators/)
- NN/g guidance: give **immediate** feedback on every action; use a **looped indicator for 2–9 s** waits and a **percent-done indicator for waits ≥10 s**; percent-done "may be used" under 10 s when the user understands a set of records is being processed (e.g., "Updating address 3 of 50"). — [NN/g](https://www.nngroup.com/articles/progress-indicators/)
- NN/g notes research showing that **for surveys, progress indicators that start fast and end slow reduce drop-off rates** (the opposite of the slow-start/fast-finish rule for wait animations). — [NN/g](https://www.nngroup.com/articles/progress-indicators/)
- NN/g: static "Loading…" indicators are not recommended; indefinite spinners for >10 s make users abandon; give a rough time estimate rather than an exact one. — [NN/g](https://www.nngroup.com/articles/progress-indicators/)
- Outgrow on question construction: each question should open a **curiosity gap** toward the result; progress momentum + conditional logic to skip irrelevant questions; "personal relevance" and social-proof framing drive engagement. — [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates)
- NN/g interaction guidance: include a **text explanation** of what is being processed alongside the indicator. — [NN/g](https://www.nngroup.com/articles/progress-indicators/)

### Inferences
- Ship a **persistent progress indicator** (e.g., "Question 4 of 8" + bar) on every screen — it is the single most defensible completion lever found.
- Favor **step-count text over a bare percentage**; NN/g notes step counts let users form an estimate even without knowing per-step duration. Quiz "N of M" satisfies this and satisfies Survicate's finding that actual time is short.
- Because the survey-specific evidence favors **fast-start / slow-end** progress pacing, do not use a real-time, evenly-advancing progress bar; weight early progress to feel fast.
- Keep the question count small enough that a **percent-done bar is never appropriate** (quizzes are seconds per step, not the ≥10 s wait case); a step counter is the correct pattern.
- **Add a back button** (product judgment): it is a low-cost recovery affordance and reduces fear of commitment, though no measured effect was found here.

### Gaps
- No measured A/B effect found for **one-question-per-screen** vs a scrolling form. (Widely asserted but not evidenced in sources reached; Typeform's help page was CAPTCHA-blocked.)
- No measured effect found for **auto-advance on answer selection**, **estimated-time copy**, or **back navigation** specifically in quizzes.
- No independent verification of Outgrow's "+12–18%" progress-bar figure; it should be treated as unverified.

## Key Question 3 — Mobile-first stats and design constraints

### Takeaway
Roughly **60% of quiz traffic is mobile** (vendor figure). Design to the mobile case first using web.dev's **~48 device-independent-px tap targets spaced ~8px apart**, Steven Hoober's grasp data (**49% one-handed, 36% cradled, 15% two-handed**; portrait dominates), and Google's **Core Web Vitals** budgets (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile).

### Cited Findings
- "**60% of quiz traffic is from mobile.** If your quiz isn't functioning perfectly on phones, you're losing half your potential completions." — [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates) (vendor)
- "Every extra second of load time costs you **7% completion rate**"; quiz questions "should load within 2 seconds." — [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates) (vendor claim; the 7%/second figure resembles generic e-commerce rules of thumb and is unverified here)
- Minimum touch-target size ≈ **48 device-independent pixels (~9 mm, the size of a finger pad)**; targets should also be spaced **~8 px** apart horizontally and vertically; use `@media (any-pointer: coarse)` to enlarge targets for all touchscreen devices. — [web.dev, Accessible tap targets](https://web.dev/articles/accessible-tap-targets)
- How people physically hold phones (1,333 observations): **one-handed 49%**, **cradled 36%**, **two-handed 15%**; one-handed right thumb 67% / left thumb 33%; cradling left hand 79% / right 21%; two-handed use is **90% portrait**. Reach charts: green = easy, yellow = stretch, red = requires regripping. — [Hoober, UXmatters 2013](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)
- Hoober: users switch grips constantly (sometimes every few seconds), and a tapping finger obscures content — test on a real device in every grip. — [UXmatters](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)
- Core Web Vitals "good" thresholds: **LCP ≤2.5 s**, **INP ≤200 ms**, **CLS ≤0.1**, measured at the **75th percentile** and segmented across **mobile and desktop** separately. — [web.dev, Web Vitals](https://web.dev/articles/vitals)
- (Editor's note on the Hoober column points to a 2017 update, "Design for Fingers, Touch, and People, Part 1," for revised guidelines.) — [UXmatters](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)

### Inferences
- Concrete mobile rules for the quiz: answer rows/buttons **≥48px tall** with **≥8px gaps**; primary "Next"/"See result" CTA in the **bottom third** (thumb reach; Hoober's one-handed reach charts put top corners in "requires regrip"); never place essential controls in top corners.
- Test at **360×640** and **390×844** CSS-px viewports; assume portrait (Hoober: 90% of two-handed use is portrait).
- Budget: ship a single small HTML/CSS/JS bundle; avoid web fonts or subset them; lazy-load result images. Target **LCP <2.5s on 4G mobile** and keep **INP <200ms** so answer taps feel instant (this is the interaction the quiz lives on).
- **Font size**: no primary source was captured, but mobile body text should not drop below typical 16px and form controls should be ≥16px to avoid iOS auto-zoom (see Gaps — treat as unverified).
- Add `viewport` meta with `width=device-width, initial-scale=1` and use `dvh` units so the mobile browser chrome doesn't clip the CTA.

### Gaps
- No primary source captured for the **global mobile-vs-desktop share of web traffic** (StatCounter lookup timed out); the only mobile figure obtained is Outgrow's quiz-specific 60%.
- No primary source captured for **minimum mobile font sizes** or the iOS 16px auto-zoom threshold (web searches timed out). Apple HIG's 44pt touch-target figure was also not retrieved (web.dev's 48px is cited instead).
- Hoober's grasp study is from 2013 and predates modern large phones and foldables; the column itself links to a 2017 update that was not retrieved.

## Key Question 4 — Client-side quiz state management (URL/query params, localStorage/sessionStorage) without a backend

### Takeaway
Use **localStorage for in-progress/resume state** (survives tab close, no expiry) and **URL query/hash params for the shareable result** (permalinks, no server). Prefer URL params as the source of truth for a *finished* quiz — they are shareable, restorable, and leak nothing to a backend — and treat storage as an enhancement. Quantified storage semantics come from MDN; the URL/History-API and privacy specifics below are largely inferences flagged as such.

### Cited Findings
- `localStorage` stores string key/value pairs, is **origin-scoped** (different per protocol, e.g., http vs https), is **saved across browser sessions with no expiration**, and is **cleared in private/incognito when the last private tab closes**. — [MDN, Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- `sessionStorage` works like `localStorage` but is **cleared when the page session ends** (page closed). — [MDN, Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- Access can throw `SecurityError` for invalid origins (`file:`, `data:`) or when the user/browser blocks persistence; blocking cookies is typically treated as blocking persistence. — [MDN, Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- `localStorage` behavior for `file:` URLs is **undefined and may vary/change across browsers**, so a deployed origin (not local files) is required for reliable persistence. — [MDN, Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- GitHub Pages logs the visiting IP address for security regardless of sign-in — a reminder that even "static" hosts are not fully private to the user. — [GitHub Docs, What is GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

### Inferences
- **Result sharing via URL** is the correct zero-backend pattern: encode the result id (and optionally a compact answer vector) in a query string or `#hash`, so the same static page re-renders a personalized result for anyone who opens the link. This is the mechanism behind "share your result" virality.
- **Privacy trade-off**: answer vectors in a URL are visible in the address bar, browser history, referrer headers (unless `Referrer-Policy` is set), and to anyone the link is forwarded to. Prefer encoding only an opaque **result id** (e.g., `?r=infj`) rather than raw answers; if answers are shared, document it and avoid including emails or free-text responses.
- **Resume** in-progress quizzes with `localStorage` (survives accidental tab close) and **clear it on completion**; use `sessionStorage` if you explicitly want the attempt to be ephemeral. Do not rely on storage for the shared result — recipients won't have it.
- Watch the URL-length ceiling and keyboard type; keep payloads tiny. A short result code is better than compressed JSON of all answers. (Specific max-URL-length limits were not captured — see Gaps.)
- Because `localStorage` can throw, wrap reads/writes in try/catch and degrade gracefully to URL-only state (also covers privacy-mode users).
- Avoid `file://` for local testing of storage; serve over `http://localhost` so origin semantics hold.

### Gaps
- No primary source captured for **browser URL-length limits**, the **History API `pushState`/`replaceState`** mechanics, or `Referrer-Policy` (MDN pages not fetched in this pass). Specific recommendations there are inferences.
- No source found studying **users' actual privacy expectations** for quiz-result URLs or local storage; the privacy discussion above is reasoned, not measured.
- No canonical blog/GitHub-repo reference on client-side quiz state management was retrieved (searches timed out).

## Key Question 5 — Accessibility for quizzes

### Takeaway
Meeting **WCAG 2.2** is achievable for a static quiz: **4.5:1 contrast** (normal text) / **3:1** (large text) for SC 1.4.3 AA, plus 3:1 non-text contrast for UI components; **keyboard operability with visible focus**; and honoring **`prefers-reduced-motion`** by toning down or replacing non-essential motion. A single-question-per-screen quiz must also manage focus and announce transitions for screen readers (see Gaps — not primary-sourced).

### Cited Findings
- WCAG SC **1.4.3 Contrast (Minimum), Level AA**: text needs **≥4.5:1**; **large text ≥3:1**. "Large" = **≥18pt (~24px)**, or **≥14pt (~18.5px) if bold**; `1pt ≈ 1.333px`. Ratios are exact thresholds (4.499:1 fails). — [W3C WAI, Understanding SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- WCAG SC **1.4.6 Contrast (Enhanced), Level AAA**: **7:1** (large text 4.5:1). — [W3C WAI](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- The same Understanding doc cross-references SC **1.4.11 Non-Text Contrast** (for charts/graphs/UI) and SC **2.4.7 Focus Visible** for keyboard focus. — [W3C WAI](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- Disabled/inactive UI components are exempt from 1.4.3; logos/logotypes and pure decoration are exempt; placeholder and focus/hover text ARE covered. — [W3C WAI](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- `prefers-reduced-motion` media feature: detects a device setting to minimize non-essential motion; use it to remove/reduce/replace motion-based animations. "Animations such as **scaling or panning large objects** can be vestibular motion triggers." Widely available across browsers since Jan 2020. — [MDN, prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- The reduced-motion pattern: duplicate the rule inside `@media (prefers-reduced-motion: reduce)` later in source order (equal specificity, later wins) and substitute a muted animation. — [MDN, prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- Tap targets: 48px minimum, 8px spacing (also an accessibility requirement for motor impairments). — [web.dev](https://web.dev/articles/accessible-tap-targets)

### Inferences
- Implement answers as real **`<button>` / radio inputs** (keyboard + SR focusable out of the box), not clickable `<div>`s; ensure a **visible focus ring** and logical tab order; support `Enter`/`Space` to choose and arrow keys for radio groups.
- Give every question a programmatic label and keep one `<h1>`/heading per screen; the question is the accessible name of the question group.
- Contrast: pick question text at **≥4.5:1** against background and **≥3:1** for thick text/buttons; verify every state (default/hover/focus/selected/disabled). Selected answer state must not rely on color alone.
- Reduced motion: wrap answer-transition animations in `@media (prefers-reduced-motion: reduce)` and replace slide/scale with instant or fade; never rely on motion to convey the answer was accepted.
- When advancing a screenless single question, **move focus to the new question** and announce progress via an `aria-live` region (inference; see Gaps for lacking primary source).
- Avoid auto-advance that fires before screen readers finish announcing, and never use a timeout that traps keyboard users.

### Gaps
- No primary source captured for **ARIA live-region / focus-management specifics** in single-question flows (MDN/WebAIM pages not fetched).
- No source captured for **screen-reader testing results on quiz components**, nor for WCAG SC 2.2.1/2.2.2 (timing) as it applies to auto-advancing quizzes.
- No measurement of how many quiz users rely on assistive tech.

## Key Question 6 — Static hosting and deploy trade-offs, and Open Graph / social previews

### Takeaway
Any of the four hosts serves a Vite static build; choose on **SPA-routing support, free limits, and whether you want dynamic OG images**. Cloudflare Pages has the best-documented generous free limits (**20,000 files, 500 builds/mo, 100 custom domains**), but its dynamic-OG story is serverless. Vercel's `@vercel/og` produces **1200×630** social cards but requires a function — which breaks the "no backend" constraint unless you pre-generate. For a strictly static, no-backend quiz, ship **pre-rendered static OG images** and accept that per-result images need build-time generation.

### Cited Findings
- Cloudflare Pages (Free): **1 concurrent build, 500 builds/month**, 20-minute build timeout; **100 custom domains** per project; **20,000 files** (100,000 on paid); max single asset **25 MiB**; `_headers` max **100 rules** (2,000 chars each); `_redirects` max **2,000 static + 100 dynamic** redirects (2,100 total); **100 projects/account**; new accounts throttled for first 48 hours. — [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)
- Cloudflare Pages: unlimited preview deployments; unlimited users. — [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)
- GitHub Pages: static host taking HTML/CSS/JS from a repo, optionally through a build step; **one user/org site per account** (`<owner>.github.io`) and **one project site per repo** (`<owner>.github.io/<repo>`); supports custom domains; **logs visitor IP** for security. — [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- Vercel `@vercel/og`: generates social cards from HTML/CSS via **Satori + Resvg**; **recommended OG image size 1200×630**; supported on the **Node.js runtime**; flexbox-only CSS subset (no grid); **max bundle size 500KB**; add the OG route to `robots.txt` `Allow` so crawlers can fetch it; images are CDN-cached. — [Vercel OG Image Generation](https://vercel.com/docs/og-image-generation)
- Vercel OG usage: create a `<meta property="og:image" content="https://…/api/og">` tag; dynamic content is passed as **URL parameters** to the endpoint; Vercel has an "Open Graph" preview tab before production. — [Vercel Docs](https://vercel.com/docs/og-image-generation)
- Cloudflare `_redirects` supports SPA fallback rules (static/dynamic redirects documented, up to 2,100). — [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)

### Inferences
- **Recommended stack for this project**: Vite build → Cloudflare Pages (or Netlify) with a **catch-all rewrite to `/index.html`** so URL-encoded result links resolve client-side. Cloudflare's `_redirects` (2,000 static rules) easily covers this; GitHub Pages has **no documented native rewrite**, so client-side routes need a copy of `index.html` at the target path or a hash-based router (`#/result?r=…`) — a concrete reason to prefer hash routing on GitHub Pages.
- **Dynamic OG requires a backend** (Vercel Function, Netlify Function, Cloudflare Pages Function/Worker). For a true no-backend static app, either: (a) ship one **static 1200×630 og-image** and accept generic previews, or (b) **pre-generate** per-result PNGs at build time (e.g., a script rendering each result archetype) and reference them from `/results/<code>.png`. Option (b) keeps the runtime fully static and gives shareable, on-brand previews.
- Include the full social meta set: `og:title`, `og:description`, `og:image` (1200×630, absolute URL), `og:url`, `og:type`, and `twitter:card = summary_large_image`. Note the OG image must be an absolute URL and crawler-reachable (Vercel explicitly recommends `robots.txt Allow`).
- Set long cache headers for hashed assets (Vite emits content-hashed filenames) via the host's headers mechanism, and short/no-cache for `index.html`, to keep share links fresh while loading fast.
- Git-connected auto-deploy + preview URLs on Cloudflare/Netlify/Vercel give per-PR previews at no cost; GitHub Pages deploys via Actions or branch, with fewer preview affordances.

### Gaps
- **Netlify free-tier limits and Vercel free-tier limits** were not retrieved (web searches timed out); only Cloudflare and GitHub Pages limits are primary-sourced here. A Netlify-vs-Vercel-vs-Cloudflare comparison could not be completed.
- No source captured for **Open Graph protocol / Twitter Card** spec details beyond Vercel's `og:image` example (ogp.me and X/Twitter docs not fetched).
- No source captured on **GitHub Pages build/bandwidth soft limits**, or on **Vercel/Netlify SPA rewrite configuration** specifics.

## Cross-cutting Recommendations (synthesis; inferences from the cited findings above)

- **Length**: 5–10 questions; target 2–4 minutes; watch the Q3 cliff. (Outgrow; Survicate)
- **Screen pattern**: one question per screen with a persistent **"Question N of M" step counter** (not a percentage); animate transitions but gate them behind `prefers-reduced-motion`. (NN/g; MDN)
- **Mobile**: 48px targets, 8px gaps, bottom-anchored CTA, 360–390px design width, portrait-first; meet LCP ≤2.5s / INP ≤200ms / CLS ≤0.1. (web.dev; Hoober)
- **State**: URL result code as the shareable source of truth; `localStorage` for resume; wrap storage in try/catch. (MDN; inference)
- **Accessibility**: real buttons/radios, visible focus, WCAG AA contrast, no motion-only or color-only feedback. (W3C; MDN; web.dev)
- **Deploy**: Vite static build on Cloudflare Pages/Netlify with SPA rewrite; pre-render static OG images to keep it backend-free; absolute `og:image` at 1200×630. (Cloudflare; Vercel)
