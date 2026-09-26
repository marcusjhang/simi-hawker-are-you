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

The build pre-renders a shareable page per dish, so it needs the deployed
origin:

    SITE_URL=https://your-deployed-origin npm run build

`npm run build:app` builds the app alone (no OG pages) for local previews.

Deploys as-is to Vercel, Netlify, Cloudflare Pages, or GitHub Pages. The app
uses hash routing, so no server rewrite rules are needed and the build works
from a subpath (`base: './'`).

No answers are transmitted anywhere; the result is computed on-device and
encoded in the URL hash.
