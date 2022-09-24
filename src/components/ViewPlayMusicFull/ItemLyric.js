import React, { memo, useRef } from "react"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed"
import formatTime from "../../utils/formatTimeLyric"

const ItemLyric = memo(({ data, index }) => {
   const current = useSelector((state) => state.queueNowPlay.currentTime)
   const currentTime = formatTime(current)
   const liRef = useRef(null)

   const scrollActive = useCallback(() => {
      setTimeout(() => {
         if (!liRef.current) return
         smoothScrollIntoView(liRef.current, {
            block: "center",
            behavior: "smooth",
         })
      }, 50)
   }, [])

   let text = ""
   let e = data.words
   let startTime = formatTime(e[0].startTime / 1000)
   let endTime = formatTime(e[e.length - 1].endTime / 1000)

   let active = currentTime >= startTime && currentTime < endTime
   let over = currentTime > endTime

   data.words.forEach((e) => {
      text += e.data + " "
   })

   if (active) {
      scrollActive()
   }

   return (
      <li ref={liRef} className={`item ${active ? "is-active" : ""} ${over ? "is-over" : ""}`}>
         {" "}
         {text}{" "}
      </li>
   )
})

export default ItemLyric
