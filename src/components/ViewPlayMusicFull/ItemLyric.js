import React, { memo, useEffect, useRef } from "react"
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed"

/**
 * Presentational only. `active` / `over` are computed once by BgFullLyrics —
 * subscribing to currentTime here meant every line in the song re-rendered on
 * each progress tick (2/s), and the scroll below ran on every one of those
 * renders instead of once per line.
 */
const ItemLyric = memo(({ text, active, over }) => {
   const liRef = useRef(null)

   useEffect(() => {
      if (!active || !liRef.current) return
      const id = setTimeout(() => {
         if (!liRef.current) return
         smoothScrollIntoView(liRef.current, {
            block: "center",
            behavior: "smooth",
         })
      }, 50)
      return () => clearTimeout(id)
   }, [active])

   return (
      <li ref={liRef} className={`item ${active ? "is-active" : ""} ${over ? "is-over" : ""}`}>
         {" "}
         {text}{" "}
      </li>
   )
})

export default ItemLyric
