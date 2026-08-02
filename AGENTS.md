
Persistent context for this repo

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
- Used by 2+ pages → `src/components/[domain]/`
- Used only by one page → `src/pages/[Page]/components/`

`components/` is grouped by **what a component is**, never by the page it was
first written for:
```
components/
  player/       bottom bar, queue rows, sleep timer   (player/full/ = full-screen view)
  song/         SongRow, ChartSongRow, ChartSongList, ArtistLinks
  card/         AlbumCard, ArtistCard, MvCard, RadioCard, EventCard, …
  home/         one file per home-page section
  navbar/       header, search box, user and theme menus
  search/       search rows shared between the navbar and the search page
  form/  portal/  ui/
```

Dependency direction is one-way. `components/` must never import from `pages/`.

### One concern per file
- Component > 150 lines, hook > 100, slice > 200 → split it.
- `styled.div` blocks live in a sibling `X.styles.js`, **never inside a component
  body** — styled-components returns a new type on every render, so React
  unmounts and remounts the whole subtree.
- Handlers belong in a hook (`useXxx.js` beside the component), not inline in
  JSX. A component that reads `dispatch` directly is usually missing a hook.
- If a component starts with `if (someFlag) return (<entirely different markup>)`,
  it is two components — split it.

### Path aliases — `jsconfig.json baseUrl="src"`
Use bare imports:
```js
import X from "components/X"    // ✓
import Y from "utils/scrollTop" // ✓
import Z from "features/user/userSlice" // ✓
```
NOT `../../../components/X`. React Router / Firebase are npm packages — those still bare npm import.

Local Firebase setup lives in `lib/firebase/{app,auth,firestore}.js`, so there
is no longer a collision with the npm `firebase` package.

### State: Redux vs React Query
- **React Query** owns server state — anything re-fetchable from the BE.
- **Redux** owns client state — the queue, theme, settings, UI toggles, auth.

Test: *"after a reload, can this be re-fetched?"* Yes → React Query. No → Redux.

Slices must not fetch. `api/zingClient.js` is the only module importing `axios`;
`api/queryKeys.js` holds every cache key; `lib/queryClient.js` exports the single
QueryClient so thunks can read the same cache the pages fill.

### Selectors — never read the store shape from a component
Every slice owns `features/[domain]/[domain]Selectors.js`, and that file is the
only code that knows its field names. Components import selectors:
```js
const song = useSelector(selectCurrentSong)     // ✓
const song = useSelector(s => s.queueNowPlay.infoSongCurrent)  // ✗
```
Store keys are persisted in localStorage — renaming one drops a user's saved
queue. Rename through the selector instead.

### Playback — always through `hook/usePlayback`
`playSong`, `playSongById`, `playAlbum`, `playQueueIndex`, `resume`, `pause`,
plus the `rejectIfVip` / `rejectIfRadio` guards. `setPlay` and `setReady` should
appear only in `usePlayback`, `useQueueControls` and `PlayerEngine`.

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
- List consumers filter: `.filter(e => e.streamingStatus === 1)` (see `features/queue/queueSlice.js:fulfilled`)
- Entry-point guard: `usePlayback().rejectIfVip`
- Player proactive skip: `components/player/PlayerEngine.js` checks on `currentEncodeId` change
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
- Import from `pages/` inside `components/`. Dependency direction is one-way.
- Declare a `styled.x` inside a component body.
- Read `state.x.y` inside `useSelector`. Use the slice's selector file.
- Write a play sequence by hand. Use `usePlayback`.
- Call `axios` outside `api/zingClient.js`.


# Workspace Rules & Instructions

## Naming & Spelling Standards
The existing typos have been corrected repo-wide; keep it that way.

- Component file → `PascalCase.js`, filename matches its default export.
- Hook → `useXxx.js`. Slice → `features/<domain>/<domain>Slice.js`.
- Selectors → `<domain>Selectors.js`, each export named `selectXxx`.
- Styles → `<Component>.styles.js`.
- Booleans read `isX` / `hasX` / `canX`; handlers are `handleX`, and the prop
  that receives one is `onX`.
- Shared payload shapes are typedef'd in `src/types.js` — annotate new shared
  hooks and transport functions against them.


