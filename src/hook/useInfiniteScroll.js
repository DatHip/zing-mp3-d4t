import { useCallback, useEffect, useRef } from "react"

/**
 * Call `onReachEnd` when the returned sentinel ref scrolls into view.
 *
 * Both infinite lists in the app had their own copy of this observer wiring,
 * each with a slightly different cleanup path.
 *
 * @param {() => void} onReachEnd
 * @param {boolean} enabled - false while a page is already in flight or the list is exhausted
 * @returns {import("react").RefObject<HTMLElement>} ref for the sentinel element
 */
export function useInfiniteScroll(onReachEnd, enabled) {
   const sentinelRef = useRef(null)
   const handlerRef = useRef(onReachEnd)

   // Keep the latest callback without re-creating the observer on every render.
   useEffect(() => {
      handlerRef.current = onReachEnd
   }, [onReachEnd])

   const fire = useCallback(() => handlerRef.current?.(), [])

   useEffect(() => {
      const node = sentinelRef.current
      if (!enabled || !node) return

      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting) fire()
         },
         { threshold: 1 }
      )
      observer.observe(node)
      return () => observer.disconnect()
   }, [enabled, fire])

   return sentinelRef
}
