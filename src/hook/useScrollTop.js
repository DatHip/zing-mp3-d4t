import { useEffect } from "react"
import scrollTop from "utils/scrollToTop"

/**
 * Scroll the main pane back to the top whenever `dep` changes.
 *
 * Nearly every route-level component opened with the same three-line effect;
 * a few of them listed the wrong dependency and stayed scrolled halfway down
 * after navigating.
 *
 * @param {unknown} [dep] - value that identifies the current view, e.g. a route param
 */
export function useScrollTop(dep) {
   useEffect(() => {
      scrollTop()
   }, [dep])
}
