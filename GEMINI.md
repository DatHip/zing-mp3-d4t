# GEMINI.md — Persistent context for this repo

**Project**: `zing-mp3-d4t` — Zing MP3 clone (CRA React 18 SPA, showcase 10⭐ + 300-like public post). Companion BE at `C:\Chapter25\api-zingmp3`. Both on branch `perf/revive-optimize`.

**API endpoint contract**: `REACT_APP_API_URL` env (default `http://localhost:5000/api`) → BE proxy over Zing.

---

## Architecture conventions (follow these, don't invent new ones)

### Folder-per-page structure
```
src/pages/[PageName]/
  index.js           ← UI-only, consumes container hook, no fetch/dispatch
  use[Page]Page.js   ← LOGIC hook: dispatch, callbacks, derived state, useMemo, effects
  components/        ← page-scoped sub-components (only imported by this page)
  styles.js          ← styled-components block if any
```

**Rule**: `pages/[X]/index.js` should ONLY consume `use[X]Page()` hook and render JSX. Zero `axios`, `dispatch`, `useSelector`, `useState` in `index.js`.

### Data layer separation
```
src/api/use[X]Data.js  ← react-query hooks (single source of fetches)
```
Container hook `use[X]Page` composes `use[X]Data` internally. UI never touches `useQuery` directly.

**Pattern**:
```js
// api/useAlbumData.js
export function useAlbumData(id) {
   return useQuery(['album', id], fetcher, { enabled: !!id, staleTime: 5*60*1000, keepPreviousData: true })
}

// pages/AlbumPage/useAlbumPage.js  (container hook)
export function useAlbumPage() {
   const { id } = useParams()
   const { data, isLoading } = useAlbumData(id)
   const handlePlay = useCallback(...)
   return { album: data, isLoading, handlePlay }
}

// pages/AlbumPage/index.js  (UI only)
const AlbumPage = () => {
   const { album, isLoading, handlePlay } = useAlbumPage()
   if (isLoading || !album) return <LoadingSvg />
   return <AlbumPageStyles>...</AlbumPageStyles>
}
```

### Shared vs page-scoped components
- Used by 2+ pages → `src/components/[Domain]/`
- Used only by one page → `src/pages/[Page]/components/`

Currently shared:
- `components/MyMusicPage/ItemArits`, `SliderShow` — 4+ consumers
- `components/MVpage/MvItem` — 6+ consumers
- `components/Selection/*` — universal
- `components/TopChartPage/ItemChartList` — 5+ consumers
- `components/NewReleaseitem/NewReleaseitem` — multiple

### Path aliases — `jsconfig.json baseUrl="src"`
Use bare imports:
```js
import X from "components/X"    // ✓
import Y from "utils/scrollTop" // ✓
import Z from "features/User/userFeatures" // ✓
```
NOT `../../../components/X`. React Router / Firebase are npm packages — those still bare npm import.

**Exception**: `firebase/firebase-config` (our local file) — collides with npm `firebase` bare import. Use relative `../../firebase/firebase-config` OR `pages/../firebase/firebase-config`.

### Section rendering (HomePage)
Sections are **data-driven** via `useHomeSection(matcher)` hook. Match by `sectionType` or `sectionId` (stable). Regex on `title` only as tight fallback (Zing rewords titles).

```js
import { useHomeSection, byType, byId } from "hook/useHomeSection"
const { section, isLoading } = useHomeSection(byId("hEditorTheme"))
if (!section && !isLoading) return null  // gracefully hide when upstream drops section
```

**Never** use `data.items[N]` (index-based) or `title === "Radio Nổi bật"` (title breaks on rename).

### Redux persist — via middleware, NOT inline `localStorage.setItem` in reducers
`app/persistMiddleware.js` owns persistence. Debounced 800ms, ref-equality shortcut, strips `currentTime` from queueNowPlay.

**Never** add `localStorage.setItem("...", JSON.stringify(state))` inside a reducer. Middleware handles it. Persisted slices: `queueNowPlay`, `logged`, `setting`, `lyrics`.

### VIP song handling
Zing returns `streamingStatus: 2` for VIP-only songs.
- List consumers filter: `.filter(e => e.streamingStatus === 1)` (see `QueueFeatures.js:fulfilled`)
- Player proactive skip: `BottomControlllPLayIng.js` checks on `currentEncodeId` change
- `/api/song/:id` returns `{data: {128: "signed URL", 320: "VIP"}}`. Free tier gets 128kbps only.

### Audio stream URL — NEVER hardcode legacy endpoint
Legacy `http://api.mp3.zing.vn/api/streaming/audio/{id}/320` is DEAD (404).

Use `api/getStreamSong.js:getStreamUrl(encodeId)` → fetches `/api/song/:id`, returns signed 128kbps CDN URL. In-memory cache per session.

---

## BE (`C:\Chapter25\api-zingmp3`) — self-hosted Zing client

Location: sibling repo `../api-zingmp3` on branch `perf/revive-optimize`.

**Zero npm dep on `zingmp3-api-next`**. All 24 endpoints implemented in `zingClient.js` with in-repo HMAC-SHA512 signature logic. When Zing rotates keys, edit env vars — no code change.

**Env vars** (all default to working values, override in `.env`):
```
ZING_BASE, ZING_SUGGEST_BASE
ZING_API_KEY, ZING_SECRET_KEY, ZING_VERSION
ZING_UA, ZING_TIMEOUT_MS, ZING_COOKIE_TTL_MS
CORS_ORIGINS (comma-separated; localhost:* auto-allowed via regex)
CACHE_STALE_MULT, BREAKER_WINDOW_MS, BREAKER_THRESHOLD, BREAKER_OPEN_MS
```

**Cache layer** (`cache.js`): SWR (stale-while-revalidate) + per-key circuit breaker. Fresh → HIT, stale → serve + background refresh, upstream fail 3x/30s → open circuit 5min → serve stale or 503. Endpoint TTL map defined at top of file.

**Start BE**:
```
cd C:\Chapter25\api-zingmp3
node server.js    # or npm start (nodemon)
```
Port 5000. Health: `curl http://localhost:5000/health`.

**Start FE**:
```
cd C:\Chapter25\zing-mp3-d4t
set NODE_OPTIONS=--openssl-legacy-provider
npm start
```
Port 3000 (or 3001 if taken). CORS whitelisted for localhost:*.

---

## Secrets

- Firebase keys → env vars `REACT_APP_FIREBASE_*` (see `.env.example`)
- Zing keys → env vars in BE (defaults in code for local dev; override in prod `.env`)
- Never commit `.env` (both repos gitignore it). `.env.example` is committed as template.

---

## Test / verify commands

```bash
# API health + cache stats
curl http://localhost:5000/health

# Section list from upstream home
curl -s http://localhost:5000/api/home | node -e "let d='';process.stdin.on('data',x=>d+=x);process.stdin.on('end',()=>{JSON.parse(d).data.items.forEach(i=>console.log(i.sectionType,i.sectionId||'',i.title||''))})"

# Get real song ID for testing (Top 100 first free song)
curl -s http://localhost:5000/api/playlist/ZWZB969E | node -e "let d='';process.stdin.on('data',x=>d+=x);process.stdin.on('end',()=>{const j=JSON.parse(d);console.log(j.data?.song?.items?.find(s=>s.streamingStatus===1)?.encodeId)})"
```

---

## Do NOT

- Add new files to `src/pages/*.js` (flat). Always use folder.
- Import via `../../../`. Use bare (jsconfig baseUrl).
- Add `localStorage.setItem` inside a Redux reducer. Use middleware.
- Hardcode Zing keys / Firebase keys in source. Env vars.
- Add `eslint-disable react-hooks/rules-of-hooks` to name a hook as `getXxx()`. Rename to `useXxx()`.
- Use `key={uuidv4()}` inside `.map()` — kills memoization. Use `item.encodeId` / `item.id` / index.
- Use `if (datas?.length === 0)` when `datas` is an object (not array). Use `isLoading || !datas`.
- Reintroduce npm `zingmp3-api-next` — BE is self-signed now.
- Name files and variables with correct spelling (e.g. avoid spelling errors like "Chidlen", "RadReplayRadio", "SidleRadio" in future refactors/files. A dedicated naming correction task will standardise the existing typos later).

---

## Latest state (2026-08-01)

Branch `perf/revive-optimize` head: `770534b`. Both FE + BE pushed. FE 16+ Gemini/Claude commits ahead of squashed `main`.

**Bundle** after all optimization passes:
- main.js **364 KB gzipped** (down from initial ~470 KB via lazy ThemePortal + Gemini's lazy CharHomeItem + dead App.js effect removal)
- main.css **52 KB gzipped** (Tailwind + legacy SCSS 246 KB raw → ~5x compression)
- Chart.js, framer-motion, `@mui/lab/Masonry` all in lazy chunks now

**Firebase-auth is still eager** because `components/Navbar/ItemLogin.js` (in Header, always mounted) imports `signOut` + `auth`. If bundle needs further trimming, lazy-load ItemLogin behind Suspense.

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
3. (Optional) Style: `main.css` 52KB gzipped is fine; big SCSS split by page would need cascade audit. Skip unless perf-critical.
4. (Optional) `firebase-auth` eager — see note above. Lazy-load ItemLogin if trimming main.js further.

**Prior sessions removed HANDOFF.md** — consult `git log main..HEAD --oneline` for full history.
