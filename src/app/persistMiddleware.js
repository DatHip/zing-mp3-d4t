const PERSIST_KEYS = {
   queueNowPlay: "queue_nowplay",
   logged: "d4tmp3_logged",
   setting: "d4tmp3_setting",
   lyrics: "d4tmp3_lyrics",
}

const DEBOUNCE_MS = 800

// Fields to strip before persist (change too frequently, not needed on reload).
const STRIP = {
   queueNowPlay: ["currentTime"],
}

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

export function flushPersistOnUnload(store) {
   window.addEventListener("beforeunload", () => {
      const state = store.getState()
      for (const [sliceKey, storageKey] of Object.entries(PERSIST_KEYS)) {
         const slice = state[sliceKey]
         if (!slice) continue
         try {
            localStorage.setItem(storageKey, JSON.stringify(stripped(slice, sliceKey)))
         } catch {}
      }
   })
}
