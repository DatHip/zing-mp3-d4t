# GEMINI.md — Persistent context for this repo

**Architecture conventions live in [AGENTS.md](./AGENTS.md).** This file used to
carry its own copy of them; two hand-maintained copies drift, so the rules have
one home now and this file holds only the state notes below.

---

## Latest state (2026-08-02)

Branch `perf/revive-optimize`. A full refactor pass landed on 2026-08-02 — see
`git log --oneline` from `8dbec92` for the sequence.

**Bundle**, measured after that pass:
- main.js **160 KB gzipped**, main.css **49 KB gzipped**
- Largest lazy chunks: 112 KB, 67 KB, 41 KB
- `@mui/material`, `@mui/lab`, `@emotion/*` and `uuid` are gone entirely — the
  whole MUI stack existed to serve one `<Masonry>`, now `react-masonry-css`.
- Chart.js and framer-motion remain in lazy chunks.

**Firebase-auth is still eager** because `components/navbar/UserMenu.js` (in Header,
always mounted) imports `signOut` + `auth`. If bundle needs further trimming,
lazy-load UserMenu behind Suspense.

**Play flow persist** owned by `app/persistMiddleware.js` (debounced 800ms, ref-equality shortcut). Do NOT reintroduce `localStorage.setItem` in reducers or effects.

### SEO layer (added 2026-08-01)

Static shell meta lives in `public/index.html` (title/description/canonical/OG/Twitter/JSON-LD).
Absolute URLs default to `https://zing-mp3-d4t.vercel.app` — **change that domain in
`public/robots.txt` and `public/sitemap.xml` if the real domain differs**; the HTML's
absolute URLs are rewritten at runtime by the middleware, so only those two files are
hardcoded.

`middleware.js` (root, Vercel Edge, needs `@vercel/edge`) does crawler-only dynamic head
rendering for `/album/:id`, `/nghe-si/:name`, `/video-clip/:id`, `/hub/detail/:id`,
`/tim-kiem/*`, `/newfeed/*`. Humans hit `next()` immediately — zero added latency. It reads
`REACT_APP_API_URL` at the edge (same var as the FE build).

Deep pages get `noindex,follow` — they mirror zingmp3.vn, so indexing them is duplicate
content. They are deliberately NOT disallowed in `robots.txt`: a blocked URL can't be read
for its noindex, and social crawlers could not build link previews.

Font loading: 9 render-blocking Google Fonts stylesheets → 1 blocking (Inter + Patrick
Hand SC) + 1 async (`media="print"` swap) for Material Icons/Symbols with `display=block`.
Dropped as unused: Alfa Slab One, Material Icons Sharp, Material Icons Two Tone, and the
`fonts.sandbox.google.com` Symbols copy (internal Google host, not a production endpoint).

**Remaining pending work** (deploy pipeline):
1. Deploy BE to Vercel (repo has `vercel.json`). Set env vars in dashboard: `ZING_API_KEY`, `ZING_SECRET_KEY`, `ZING_VERSION`, `CORS_ORIGINS` (prod FE domain).
2. Deploy FE. Set `REACT_APP_API_URL` + `REACT_APP_FIREBASE_*` env vars. CRA build → static hosting.
   `REACT_APP_API_URL` must also be readable by Edge Middleware — a normal Vercel project
   env var covers both.
3. (Optional) Style: four systems still coexist (Tailwind on ~114 files, styled-components
   on ~30, legacy SCSS globals, a few inline styles). Consolidating on Tailwind was
   deliberately left out of the 2026-08-02 refactor. `main.css` at 49 KB gzipped is fine
   as is.
4. (Optional) `firebase-auth` eager — see note above. Lazy-load UserMenu if trimming
   main.js further.
5. (Optional) Turn on `checkJs` in `jsconfig.json` once the JSDoc annotations in
   `src/types.js` have spread past the shared entry points.

**Prior sessions removed HANDOFF.md** — consult `git log main..HEAD --oneline` for full history.
