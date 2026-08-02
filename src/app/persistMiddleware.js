const PERSIST_KEYS = {
   queueNowPlay: "queue_nowplay",
   logged: "d4tmp3_logged",
   setting: "d4tmp3_setting",
   lyrics: "d4tmp3_lyrics",
}

const DEBOUNCE_MS = 800

// Fields to strip before persist (change too frequently, not needed on reload).
const STRIP = {}

// setCurrentTime fires twice a second while a song plays and genuinely replaces
// the queueNowPlay reference, so the ref-equality shortcut below cannot catch
// it: without this list every progress tick re-serialized the whole playlist on
// the main thread. currentTime still reaches storage through the flush on
// pagehide, which is the only moment the resumed position matters.
const SKIP_ACTIONS = new Set(["queueNowPlay/setCurrentTime"])

function stripped(slice, sliceKey) {
   const keys = STRIP[sliceKey]
   if (!keys) return slice
   const out = { ...slice }
   for (const k of keys) delete out[k]
   return out
}

export function createPersistMiddleware() {
   const timers = {}
   const lastSliceRef = {}
   const lastWritten = {}
   return (store) => (next) => (action) => {
      const result = next(action)
      if (SKIP_ACTIONS.has(action?.type)) return result
      const state = store.getState()
      for (const [sliceKey, storageKey] of Object.entries(PERSIST_KEYS)) {
         const slice = state[sliceKey]
         if (!slice) continue
         // Ref-equality shortcut: redux immutability guarantees same ref = same content.
         // Skips JSON.stringify entirely for high-frequency no-op dispatches.
         if (slice === lastSliceRef[sliceKey]) continue
         lastSliceRef[sliceKey] = slice
         const toPersist = stripped(slice, sliceKey)
         const serialized = JSON.stringify(toPersist)
         if (serialized === lastWritten[sliceKey]) continue
         clearTimeout(timers[sliceKey])
         timers[sliceKey] = setTimeout(() => {
            try {
               localStorage.setItem(storageKey, serialized)
               lastWritten[sliceKey] = serialized
            } catch {}
         }, DEBOUNCE_MS)
      }
      return result
   }
}

// "beforeunload" was the obvious hook here, but registering one opts the page
// out of the back/forward cache in Chrome and Safari, and mobile browsers can
// discard a backgrounded tab without ever firing it. pagehide covers real
// unloads and bfcache entry; visibilitychange covers the tab being backgrounded
// and then killed. Both are idempotent, so firing twice costs nothing.
export function flushPersistOnUnload(store) {
   const flush = () => {
      const state = store.getState()
      for (const [sliceKey, storageKey] of Object.entries(PERSIST_KEYS)) {
         const slice = state[sliceKey]
         if (!slice) continue
         try {
            localStorage.setItem(storageKey, JSON.stringify(stripped(slice, sliceKey)))
         } catch {}
      }
   }

   window.addEventListener("pagehide", flush)
   document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush()
   })
}
