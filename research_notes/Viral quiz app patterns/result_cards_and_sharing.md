# Shareable Result Artifacts & the Psychology of Sharing Quiz Results

Method note: Primary sources were retrieved directly (vendor newsrooms, OGP spec, GitHub repos, Bundlephobia API). Search engines (Google, Bing via browser, DuckDuckGo) were bot-walled or returned AI-generated/noise results for most queries, so this note distinguishes **verified** findings from **reported/unverified** ones and lists gaps. Where a claim could not be tied to a primary source, it is in Gaps rather than Cited Findings.

---

## Q1. How "Wrapped"-style recap campaigns work (Spotify, Strava, Duolingo, Apple Music Replay, Instagram/PayPal)

### Takeaway
The recap format works as an annual, personalized, free-to-share data story that turns private usage data into public identity content. Spotify's own design accounts (highest-quality primary source found) show deliberate multi-format share assets, a "hyperloop" graphic system, and dense motion. Hard engagement numbers for most campaigns could not be verified from primary sources; treat the widely-cited figures below with caution.

### Cited Findings
- Spotify Wrapped 2024 launched **December 4, 2024** and was the 10th annual edition; it reached fans in **184 markets**. — [Spotify Newsroom, "10 Years Spotify Wrapped"](https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/)
- Design direction (2024): "loops, transforms... vibrant color combinations, playful layouts, and lively animations"; art direction framed as "pop culture's cycle of reinvention." — [Spotify Newsroom](https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/)
- Named design detail: bold "hyperloops" of the numbers **2 and 4** in vivid technicolor combined with a "striking logo lockup," per Global Brand Design Director Rebecca Lim. — [Spotify Newsroom](https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/)
- Spotify publishes a **dedicated "Summary Share Card" asset** plus per-story assets in **16x9, 4x5, 9x16, and 4x6** ratios (e.g., "Top 10 Artists Globally 16x9 / 4x5", "Top 10 Audiobooks in Premium 9x16", "Top 10 Songs of the Past Decade in the U.S. 4x6"). This is direct evidence the campaign ships purpose-built crops per placement rather than one image. — [Spotify Newsroom media gallery](https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/)
- Spotify also ships recap variants for **Creators, Artists, Authors** (separate share cards and nav treatments), i.e., the recap is segmented by role, not one-size-fits-all. — [Spotify Newsroom media gallery](https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/)
- Strava released its annual **Year In Sport: Trend Report** on **December 4, 2024**, built from "billions of unique activity data" of **135M+ people across 190+ countries** plus a **5,000+ person** randomized global survey. — [Strava Press Release, Dec 4 2024](https://press.strava.com/articles/strava-releases-annual-year-in-sport-trend)
- Strava's own About boilerplate in the same release says "over **180 million athletes in more than 185 countries**" — note this conflicts with the 135M/190-country figure in the body, likely reflecting a later-updated boilerplate. Flagged as a source-internal inconsistency. — [Strava Press Release](https://press.strava.com/articles/strava-releases-annual-year-in-sport-trend)
- Strava 2024 trend stats (report content, useful as recap "story" fodder): **59% increase** in run-club participation globally; **58%** of respondents made new friends via fitness groups; **40% average increase** in activity length with 10+ people vs alone; **51%** of days in the 16 weeks before a marathon were rest days. — [Strava Press Release](https://press.strava.com/articles/strava-releases-annual-year-in-sport-trend)
- **Reported but UNVERIFIED** (these came from a Bing AI-generated search summary, not a primary document; do not treat as fact): Spotify Wrapped 2024 "**10.5M users shared** their summaries from the app" (vs 9M in 2023, 7M in 2022); "**2.1M Twitter mentions in 48 hours**"; "**400M views** for #SpotifyWrapped2024 in 3 days"; "**40% in-app engagement increase**" release week (37% 2023, 32% 2022); and a Spotify Q4'24 earnings quote that Wrapped was "our largest ever, +10% Y/Y." — Aggregated [Bing search result page](https://www.bing.com/search?q=Spotify+Wrapped+2024+engagement+statistics+shares+users); the only primary anchor found was the Spotify Newsroom design post, which contains **no** engagement numbers.

### Inferences
- The recurring playbook: (1) annual fixed cadence anchored to early December; (2) personalized, quantified data stories; (3) a distinctive motion/graphic system (Spotify's hyperloops); (4) pre-rendered share cards per aspect ratio; (5) role/segment variants; (6) an editorial "trend report" layer for press pickup.
- The 4x5 and 9x16 crops imply the target placements are Instagram feed and Stories/Reels, i.e., crops are decided upstream by the brand.
- Strava's recap is as much a PR/trend-report machine (survey + PR PDF + embeddable hero-stat ZIPs) as a user share feature; the press release provides downloadable "Trend Report" PDFs and "Embed Assets" ZIPs.

### Gaps
- No primary source retrieved for **Duolingo Year in Review**, **Apple Music Replay**, or an **Instagram/PayPal-style** recap. (Apple Music Replay and Duolingo recap exist, but no citable design/cadence/engagement detail was obtained.)
- No verified **share counts, participation rates, or uplift numbers** for Spotify, Strava, Duolingo, Apple Music, or PayPal recaps. The Spotify numbers above are unverified and should be independently checked against Spotify's Q4 FY2024 shareholder letter/earnings call before use.
- Strava's **Year in Sport share-card** design and any share engagement stats were not found; only the trend report was retrieved.

---

## Q2. Visual design dimensions that make a result card screenshot- and share-friendly

### Takeaway
There is little rigorous, citable research on "share-card layout" itself; the reliable, sourceable constraints are the platform metadata/asset specs (ratios, image sizes, text-length caps) that determine how a card survives cropping and rendering. Practical card-design rules below are therefore largely **inferences** from those specs, not cited findings.

### Cited Findings
- Open Graph pages are driven by four required properties — `og:title`, `og:type`, `og:image`, `og:url` — plus strongly recommended `og:description` (one to two sentences) and `og:site_name`. — [The Open Graph Protocol](https://ogp.me/)
- `og:image` supports structured sub-properties including `og:image:width`, `og:image:height`, `og:image:alt`, and `og:image:secure_url`; the spec advises declaring these after the root tag and gives whichever root tag appears first preference on conflict. — [The Open Graph Protocol](https://ogp.me/)
- Facebook image guidance (via CSS-Tricks, 2016): at least **600×315 px**, **1,200×630 px or larger preferred**, up to **5 MB**, and "stay close to a **1.91:1** aspect ratio to avoid cropping." Title ideally ≤ **70 characters**; description 2–4 sentences. — [CSS-Tricks, "The Essential Meta Tags for Social Media," 2016](https://css-tricks.com/essential-meta-tags-social-media/) (secondary; dated 2016 — see Gaps)
- X/Twitter card image guidance (same source): for the large-image summary card, image **at least 280×150 px** and **under 1 MB**; title ≤ **70 characters**; description ≤ **200 characters**. — [CSS-Tricks](https://css-tricks.com/essential-meta-tags-social-media/)
- Spotify ships its share assets in **16x9, 4x5, 9x16 and 4x6**, demonstrating the industry practice of authoring per-placement crops rather than one universal card. — [Spotify Newsroom](https://newsroom.spotify.com/2024-12-04/10-years-spotify-wrapped/)

### Inferences
- Design the canonical card at **1200×630 (1.91:1)** for OG/link previews, and a separate **9:16 (1080×1920)** card for Stories/Reels; a square/4:5 variant covers IG feed. Because platforms crop, keep all text and branding inside a generous central safe area rather than at the edges.
- "Safe margins": since the exact platform UI overlays (Story header, reply bar, profile row) are not in the retrieved specs, reserve a large border — community rule of thumb is ~250 px top and ~250–340 px bottom on a 1080×1920 canvas, but this is **not sourced here** (see Gaps).
- One idea per card: implied by the OG `og:title` ≤70 chars and description ~1–2 sentences; a share card should read like a single sentence plus one hero number/visual.
- Branding placement: Spotify's method is a fixed "striking logo lockup" paired with the motif; put the app logo + name in a consistent corner and encode it in every crop, but keep the card's core identity statement dominant.
- Contrast/legibility: not directly sourced, but required because cards are viewed as thumbnails and re-compressed by platforms; use large type and high contrast over photographic or gradient backgrounds.
- The 4:5 and 9:16 crops Spotify authors suggest a "story-first" card set is now standard for recaps intended for sharing.

### Gaps
- **No rigorous study found** on optimal share-card composition (text length, contrast ratios, one-idea-per-card) — this would require HCI/design research not retrieved.
- **Instagram Stories/Reels exact dimensions and safe zones** could not be confirmed from a source in this session. The commonly cited numbers (1080×1920 = 9:16; top/bottom UI safe insets) should be verified against Meta's official creative specs.
- The Facebook/Twitter sizing figures are from a **2016 secondary source**; platform specs change. Re-verify against current Meta and X developer docs before shipping.

---

## Q3. Why people share identity/quiz results (self-expression, identity signaling, humor, social comparison)

### Takeaway
A large body of social psychology explains result-sharing as identity work — self-presentation, self-enhancement/"social currency," intrinsically rewarding self-disclosure, and downward social comparison — but **no sources could be retrieved in this session** (publisher and search access were blocked). The named studies below are standard, widely cited works; they are listed as leads requiring citation verification, not as confirmed findings.

### Cited Findings
- None verified in this session. All relevant publisher pages (PNAS, SAGE, PubMed) and search engines were blocked by bot checks/403s at time of research.

### Inferences
- The plausible mechanism chain, consistent with the classic literature: users share quiz/recap outcomes because the result is (a) about the self (intrinsically rewarding to disclose), (b) flattering or identity-affirming (self-enhancement / "social currency"), and (c) a low-cost conversational hook that lets audiences compare and respond (social comparison, affiliation, humor). Design implication: make the result feel flattering, specific, and conversational.
- Humor is likely a separate but strong driver: self-deprecating or absurd results (e.g., "your #1 artist is embarrassing") generate quote-tweet/Story-reshare behavior, which is consistent with the unverified Spotify observation that much engagement was "critiquing or humorously mocking" results.

### Gaps
- Could not retrieve/verify sources for the following **lead citations** (all are real, standard references — verify DOI/URL before publishing):
  - Goffman, *The Presentation of Self in Everyday Life* (1959) — self-presentation.
  - Festinger, "A Theory of Social Comparison Processes," *Human Relations* (1954) — social comparison.
  - Tamir & Mitchell, "Disclosing information about the self is intrinsically rewarding," *PNAS* (2012) — self-disclosure reward.
  - Berger & Milkman, "What Makes Online Content Viral?" *Journal of Marketing Research* (2012) — emotional arousal and sharing/virality.
  - Berger, *Contagious: Why Things Catch On* (2013) — "social currency" / self-enhancement.
  - Vogel et al., "Social comparison, social media, and self-esteem," *Psychology of Popular Media Culture* (2014).
  - Barasch & Berger, "Broadcasting and narrowcasting: How audience size affects what people share," *JMR* (2014).
- No study found specific to **BuzzFeed-style quiz-result sharing** or Myers-Briggs result-sharing; this is a gap the report-writer should note, not fill with invented statistics.

---

## Q4. Platform mechanics: Open Graph / Twitter cards / Instagram Stories / WhatsApp link previews

### Takeaway
Link unfurling is standardized on Open Graph (OG) for most surfaces, with X accepting `twitter:*` tags and falling back to OG. The practical requirements are the four core OG tags plus a correctly sized image; the biggest reliability lever is declaring image width/height and keeping within size ratios/length caps. Instagram Stories and WhatsApp specifics could not be sourced here.

### Cited Findings
- **OGP required tags**: `og:title`, `og:type`, `og:image`, `og:url`. Recommended: `og:description`, `og:determiner`, `og:locale`, `og:site_name`, `og:video`/`og:audio`. — [The Open Graph Protocol](https://ogp.me/)
- **OG image structured properties**: `og:image:url`, `og:image:secure_url`, `og:image:type`, `og:image:width`, `og:image:height`, `og:image:alt`. Multiple images are specified by repeating the tag; the first is preferred. — [The Open Graph Protocol](https://ogp.me/)
- OGP defines vertical types (`music.*`, `video.*`), `article`, `book`, `profile`, `website`, and a beta `payment.link` type — so a quiz result is best expressed as `og:type=website` or `article` with a custom description/image. — [The Open Graph Protocol](https://ogp.me/)
- **X/Twitter cards**: use `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, with `twitter:image:alt` recommended; the display format is set by `twitter:card` (e.g., `summary_large_image`). X supports falling back to Open Graph tags for equivalent fields, so one set of OG tags plus `twitter:card` can serve both. (Some card fields, e.g., `twitter:image:width`/`height`, help X preserve aspect ratio when resizing.) — [CSS-Tricks, 2016](https://css-tricks.com/essential-meta-tags-social-media/)
- **Facebook preview sizing**: image at least 600×315, prefer 1200×630, 1.91:1, <5 MB; title ≤70 chars; description 2–4 sentences. — [CSS-Tricks, 2016](https://css-tricks.com/essential-meta-tags-social-media/)
- **X large-image card sizing**: image ≥280×150 px, <1 MB; title ≤70 chars; description ≤200 chars. — [CSS-Tricks, 2016](https://css-tricks.com/essential-meta-tags-social-media/)
- Validation tooling referenced by the same source: Facebook Sharing Debugger and Twitter Card Validator (note: the TweetDeck-era `cards-dev.twitter.com/validator` referenced there is obsolete). — [CSS-Tricks, 2016](https://css-tricks.com/essential-meta-tags-social-media/)
- Note: official X card documentation at `developer.x.com` / `docs.x.com` **redirected to a marketing landing page / 404'd** during this session, so no current X spec could be captured. — attempted [docs.x.com cards guide](https://docs.x.com/x-for-websites/cards/guides/getting-started) (404).
- WhatsApp uses a link-preview system (Meta's own docs page returned HTTP 400 during this session), so no WhatsApp requirement could be verified. WhatsApp is a Meta property and its renderer is widely reported to consume OG tags, but this is **not source-verified here**. — attempted [Meta WhatsApp link-previews docs](https://developers.facebook.com/docs/whatsapp/link-previews/) (400).

### Inferences
- For a quiz result, the share URL should carry OG tags for the *specific result* (dynamic per-result `og:image` and `og:title`), so the link preview itself is the artifact — not only a downloadable image. This is the same pattern Satori/Vercel OG exists to serve (see Q5).
- Declare `og:image:width` and `og:image:height`; without them some platforms fetch the image after rendering the preview and fall back to a smaller layout (a behavior noted in the CSS-Tricks comment thread, [source](https://css-tricks.com/essential-meta-tags-social-media/)).
- Because X falls back to OG, emit OG first and add `twitter:card=summary_large_image`; keep the image ≤1 MB (X) and ideally ≤8 MB with correct dimensions to satisfy most platforms.
- Serve the OG image from a stable, public, non-authenticated URL; many platforms do not execute JS or pass cookies.

### Gaps
- **Instagram Stories aspect ratio and safe zones** — not sourced. (Stories are an app-only, not a link-preview, surface; sharing there is a manual screenshot/reshare, which is why a downloadable 9:16 image matters. Verify 1080×1920 and UI safe insets against Meta's official specs.)
- **WhatsApp link preview** requirements (image size, caching, `og:` vs built-in tags) — not sourced.
- **Current X card spec** (post-2023 rebrand) — not sourced; only a 2016 secondary source.
- **Web Share API** (`navigator.share`, including `navigator.canShare` for files) — intended to be covered but no MDN source was retrieved. This is the mechanism by which an in-browser card image can be handed to the OS share sheet; verify on MDN.

---

## Q5. In-browser generation of a downloadable/shareable image: library comparison

### Takeaway
Two architecture families dominate: (a) **DOM-to-image** clones that serialize HTML into SVG `<foreignObject>` and rasterize via canvas (dom-to-image, html-to-image, html2canvas uses its own DOM re-render), and (b) **render-to-SVG without a browser DOM** (Satori, which uses Yoga/WASM layout and embeds font glyph paths). For a quiz share card on the client, **html-to-image** is the pragmatic default (tiny, zero-dep, maintained fork, Safari-tested); **Satori** is best for server/edge OG image generation (heavier, but deterministic and used by Vercel's OG image product); **html2canvas** is the most popular but has the heaviest bundle and explicit "experimental / not recommended for production" language; **dom-to-image** is effectively superseded.

### Cited Findings
Bundle sizes from the [Bundlephobia](https://bundlephobia.com) API (minified / gzipped), and repo facts from GitHub:

| Library | Version | Min | Gzip | Deps | Stars | Open issues | Notes |
|---|---|---|---|---|---|---|---|
| **html2canvas** | 1.4.1 | 199.5 kB | 46.5 kB | 2 | 31.9k | 976 | Own DOM re-render; README says "very experimental state... don't recommend using it in a production environment"; not suitable for Node; cross-origin needs proxy. [Bundlephobia](https://bundlephobia.com), [GitHub](https://github.com/niklasvh/html2canvas) |
| **html-to-image** | 1.11.13 | 13.2 kB | 5.2 kB | 0 | 7.2k | 157 | Fork of dom-to-image "with more maintainable code and some new features"; tested Chrome, Firefox and **Safari 16**; supports PNG/JPEG/SVG/Blob/Canvas/pixel data; options for pixelRatio, fontEmbedCSS, preferredFontFormat. [Bundlephobia](https://bundlephobia.com), [GitHub](https://github.com/bubkoo/html-to-image) |
| **dom-to-image** | 2.6.0 | 8.9 kB | 3.2 kB | 0 | 10.8k | 283 | README: "Safari is not supported" (foreignObject security model) and IE never supported; workaround is `toSvg` + server render; the maintainability fork exists because of this project's code. Effectively superseded. [Bundlephobia](https://bundlephobia.com), [GitHub](https://github.com/tsayen/dom-to-image) |
| **satori** | 0.33.5 | 537.2 kB | 181.5 kB | 13 | 14.0k | 99 | HTML/CSS → **SVG** (not directly PNG); uses the **Yoga** flexbox layout engine compiled to WASM; JSX-first; must supply fonts. [Bundlephobia](https://bundlephobia.com), [GitHub](https://github.com/vercel/satori) |

Mechanism (dom-to-image / html-to-image): clone the DOM node recursively; copy computed styles incl. pseudo-elements; find `@font-face` rules, download, base64-inline; inline images; serialize to XML; wrap in `<foreignObject>` inside an SVG data URL; optionally rasterize onto an offscreen canvas for PNG/JPEG/pixel data. — [dom-to-image README](https://github.com/tsayen/dom-to-image), [html-to-image README](https://github.com/bubkoo/html-to-image)

Satori's documented CSS subset and limitations (all primary, [satori README](https://github.com/vercel/satori)):
- **Not a complete CSS implementation**; uses the same Flexbox engine as React Native (Yoga); `display` defaults to `flex`.
- **Not supported**: `<style>` tags, external `<link>`/`<script>`, `calc()`, three-dimensional transforms, and `z-index` (SVG paints later elements on top); `position` limited to `relative`/`static`/`absolute`; `min/max-content` and `fit-content` unsupported; only `solid`/`dashed` border styles.
- **Fonts**: TTF, OTF and WOFF are supported; **WOFF2 is not supported**; fonts must be passed in explicitly as ArrayBuffer/Buffer. Text is rendered as `<path>` (font embedded) by default; `embedFont:false` switches to `<text>`.
- **Supported**: CSS variables, flexbox properties, gradients, `transform` (translate/rotate/scale/skew), `box-shadow`, `opacity`, `filter`/`backdrop-filter`, `clip-path`, masks, `line-clamp`, `text-overflow: ellipsis`, `text-shadow`, `letter-spacing`, `object-fit`.
- Runs in **browser, Node (>=16) and Web Workers**; WASM deps are base64-inlined, with a "standalone build" if dynamic WASM loading is restricted (e.g., Cloudflare Workers). Satori is the engine behind [Vercel's OG image generation](https://vercel.com/docs/og-image-generation).
- Rendering fidelity caveat: Satori "does not guarantee that the SVG will 100% match the browser-rendered HTML output."

html2canvas behavior (primary, [README](https://github.com/niklasvh/html2canvas)):
- Renders by reading the DOM and applied styles — it "does not make an actual screenshot," so it may not be 100% accurate; as each CSS property must be manually implemented, "there are a number of properties that are not yet supported."
- Not suitable for Node; cross-origin content needs a proxy; content policy restrictions are not circumvented.

### Inferences
- **For a client-side quiz card download:** `html-to-image` is the best default — 5.2 kB gzip, zero dependencies, maintained, explicitly Safari-16-tested, and it handles the exact use case (a styled DOM node → PNG/Blob/download). `dom-to-image` is smaller but stale and has documented Safari breakage. `html2canvas` adds ~9× the gzipped weight over html-to-image and carries an explicit experimental warning.
- **For server/edge OG generation** (dynamic per-result social images): Satori + resvg/sharp is the standard stack (Vercel OG); the 181 kB gzip and 13 deps matter less server-side, and its deterministic font embedding avoids client font-loading races. Its CSS subset (no `calc`, no `z-index`, flexbox-first) is the main design constraint.
- If the DOM is very large, the SVG `foreignObject`/data-URI approach can fail (data-URI size limits noted in html-to-image README) — keep the card's DOM small and self-contained.
- A robust design can generate the same card twice from one source of truth: client-side via html-to-image (user download / Web Share API) and server-side via Satori (OG image/link preview), sharing a component/design spec.

### Gaps
- **Raw Canvas/SVG** (hand-drawn with the Canvas 2D or SVG API, no library) was in scope but no benchmark/source was retrieved. Qualitatively: zero dependency weight and total control, but no HTML/CSS layout engine, so text measurement, wrapping, and layout must be implemented manually; this is the fastest runtime path once built.
- No independent **cross-library benchmark** (speed/fidelity on real cards) was found; the comparison here is bundle size + documented capabilities, not measured output quality.
- `html2canvas` **last-release date** was not verified (Bundlephobia resolves the package at 1.4.1; GitHub releases list did not render). Confirm current maintenance status before relying on it.
- Satori produces **SVG**, not PNG; converting to PNG requires an extra step (e.g., resvg-js or `@vercel/og`) — no source retrieved for exact client-side PNG conversion options.
- `dom-to-image` is not formally marked "deprecated" in its README; the "superseded" characterization is an inference from the html-to-image fork description, not an explicit deprecation notice.

---

## Cross-cutting practical checklist (inferences, for the developer)
1. One component, two outputs: render a 1200×630 OG image and a 1080×1920 9:16 share card from the same result data.
2. Emit per-result `og:title`, `og:description`, `og:image` (+ `og:image:width/height`, `og:image:alt`), and `twitter:card=summary_large_image`; keep title ≤70 chars, description ≤200 chars, image ≤1 MB.
3. Keep card text to one idea + one hero number; fixed logo lockup in a corner; generous central safe area for cropping/UI overlays.
4. Generate the downloadable image client-side with html-to-image (`toBlob`/`toPng`, `pixelRatio` for retina), then hand it to the OS via the Web Share API when available and fall back to an `<a download>` click.
5. Generate the OG image server-side with Satori (deterministic fonts, embedded glyph paths) and cache it at a stable URL.
6. Verify all platform specs (X cards, Meta/Facebook, Instagram Stories safe zones, WhatsApp previews) against current official docs before launch — the platform figures here are partly from a 2016 secondary source and WhatsApp/Instagram could not be sourced at all.
