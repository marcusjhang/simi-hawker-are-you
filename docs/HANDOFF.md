# Handoff — Simi Hawker Are You (PSF build)

**Status: the app is built and green. The factory run was stopped mid-verification
by the owner. Nothing is merged. Pick up from the handoff branch.**

Last touched: 2026-09-26.

## What was built

The complete *Simi Hawker Are You?* quiz, following
`docs/superpowers/specs/2026-09-26-singaporean-food-quiz-design.md` and
`docs/superpowers/plans/2026-09-26-simi-hawker-are-you.md` (all 13 tasks).

- **Vite + React 18 + TypeScript SPA**, Tailwind CSS v4, Vitest + Testing Library (jsdom).
- 10 hawker archetypes, 8 weighted questions + disclosed tie-breaker, pure
  deterministic scoring, balance simulation (10k runs, 4–20% band).
- Landing / Quiz / Result-receipt screens, localStorage resume, URL-hash result.
- 1080×1350 on-device result card (`html-to-image`), share with native-share /
  download / copy-link fallbacks.
- Build-time pre-render of 10 `/result/<id>/` pages + 1200×630 OG PNGs (`sharp`).

## Where it lives

| | |
|---|---|
| Branch | `psf/W-fce498cb` (pushed to `origin`) |
| Commit | `ad3b72b` — *feat: build Simi Hawker Are You quiz (PSF W-fce498cb, 48 tests green)* |
| Base | `c340f35` (this repo's `personal-software-factory` branch) |
| PR link | https://github.com/marcusjhang/simi-hawker-are-you/pull/new/psf/W-fce498cb |
| Local worktree | `.psf/worktrees/W-fce498cb` (gitignored; recreatable from the branch) |
| Factory ledger | `.psf/factory.db` (gitignored local runtime) |

## Verified before stopping

- `npm run typecheck` → clean.
- `npm test` → **14 files, 48 tests passed**.
- `SITE_URL=https://simi-hawker.example npm run build` → app bundle + **10 result
  pages and OG images** generated.

## Factory run

- Work item `W-fce498cb`, goal = build the full app.
- Pipeline reached **VERIFY** (attempt 1/2, verify quorum 2), then was
  **CANCELLED** by the owner to stop the session. No handoff PR was auto-created.
- Harness: `opencode` + `deepseek/deepseek-flash`, permissions `workspace`,
  mode `yolo`, `--git`.

## How to resume

Option A — review and merge the app (recommended):

```bash
git fetch origin
git checkout psf/W-fce498cb
npm install && npm test && npm run typecheck
# open the PR link above, or merge into main
```

Option B — let the factory finish/redo (fresh or same goal):

```bash
psf validate
psf run --git --harness opencode --model deepseek/deepseek-flash --permissions workspace \
  --mode yolo --no-ask "build the Simi Hawker Are You quiz per docs/superpowers"
psf audit
```

Option C — recreate the local worktree if `.psf/` was wiped:

```bash
git worktree add .psf/worktrees/W-fce498cb psf/W-fce498cb
```

## Open items

- Independent **verify** and **review** never completed — do those before merge.
- `SITE_URL` must be set to the real deployed origin for correct OG tags.
- No deploy yet; `dist/` is host-agnostic (hash routing, `base: './'`).
