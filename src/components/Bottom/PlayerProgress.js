import React, { memo, useCallback, useLayoutEffect, useRef } from "react"
import { useSelector } from "react-redux"
import fancyTimeFormat from "utils/fancyTimeFormat"

/**
 * Owns the only subscription to currentTime in the player.
 *
 * It used to live in BottomControlllPLayIng, which renders ReactPlayer — so
 * every progress tick (2/s at progressInterval 500) re-rendered the whole
 * player subtree and rebuilt all of its inline handlers. ReactPlayer is passed
 * down as `children` here: the parent no longer re-renders, so that element
 * keeps its identity and React skips the subtree entirely.
 */
const PlayerProgress = memo(({ duration, onSeek, children }) => {
   const progressBar = useRef()
   const progressArea = useRef()
   const currentTime = useSelector((state) => state.queueNowPlay.currentTime)

   useLayoutEffect(() => {
      if (!progressBar.current) return
      // Guard the divide: with no song loaded duration is undefined, which
      // previously wrote a literal "NaN%" onto the bar.
      const percent = duration > 0 ? (currentTime / duration) * 100 : 0
      progressBar.current.style.width = percent + "%"
   }, [currentTime, duration])

   const handleSeekClick = useCallback(
      (e) => {
         if (!progressArea.current || !duration) return
         const areaWidth = progressArea.current.clientWidth
         onSeek((e.nativeEvent.offsetX / areaWidth) * duration)
      },
      [duration, onSeek]
   )

   return (
      <>
         <p className="playing_time-left">{fancyTimeFormat(currentTime)}</p>
         <div onClick={handleSeekClick} ref={progressArea} className="playing_time-up2 progress-area">
            <div ref={progressBar} className="progress-bar" />
            {children}
         </div>
      </>
   )
})

export default PlayerProgress
