import { useEffect, useState } from "react"

// Subscribes to a breakpoint boolean rather than to window.innerWidth, so a
// component only re-renders when it actually crosses the breakpoint instead of
// on every pixel of a resize drag.
export default function useMediaQuery(query) {
   const [matches, setMatches] = useState(() =>
      typeof window.matchMedia === "function" ? window.matchMedia(query).matches : false
   )

   useEffect(() => {
      if (typeof window.matchMedia !== "function") return
      const mql = window.matchMedia(query)
      const onChange = (e) => setMatches(e.matches)

      setMatches(mql.matches)

      // Safari below 14 exposes only the deprecated addListener/removeListener
      // pair on MediaQueryList, so the modern call would throw there.
      if (typeof mql.addEventListener === "function") {
         mql.addEventListener("change", onChange)
         return () => mql.removeEventListener("change", onChange)
      }
      mql.addListener(onChange)
      return () => mql.removeListener(onChange)
   }, [query])

   return matches
}
