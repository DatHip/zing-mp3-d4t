import React, { memo, Suspense, useEffect } from "react"
import PlayerBarInner from "layout/PlayerBarInner"
import QueuePanel from "layout/QueuePanel"
import { useSelector } from "react-redux"

// The full-screen player owns every Swiper carousel in the app (~215KB of source
// with dom7). It only mounts once the user expands the bar, so it is split out
// and warmed during idle time — by the time anyone clicks, the chunk is cached.
const importViewPlayMusicMain = () => import("components/player/full/FullPlayer")
const FullPlayer = React.lazy(importViewPlayMusicMain)

const PlayerBar = () => {
   const isOpen = useSelector((state) => state.toggleOpenMain.isOpen)
   const isOpenClass = useSelector((state) => state.toggleOpenMain.isOpenClass)

   useEffect(() => {
      const warm = () => importViewPlayMusicMain()
      if (typeof window.requestIdleCallback === "function") {
         const handle = window.requestIdleCallback(warm, { timeout: 3000 })
         return () => window.cancelIdleCallback(handle)
      }
      const handle = setTimeout(warm, 2000)
      return () => clearTimeout(handle)
   }, [])

   return (
      <div className={`playing-bar ${isOpenClass ? "active" : ""}`}>
         <PlayerBarInner></PlayerBarInner>
         <QueuePanel></QueuePanel>
         {isOpen && (
            <Suspense fallback={null}>
               <FullPlayer></FullPlayer>
            </Suspense>
         )}
      </div>
   )
}

export default memo(PlayerBar)
