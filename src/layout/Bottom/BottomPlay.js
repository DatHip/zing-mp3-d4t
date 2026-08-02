import React, { memo, Suspense, useEffect } from "react"
import BottomPlayer from "./BottomPlayer"
import BottomRight from "./BottomRight"
import { useSelector } from "react-redux"

// The full-screen player owns every Swiper carousel in the app (~215KB of source
// with dom7). It only mounts once the user expands the bar, so it is split out
// and warmed during idle time — by the time anyone clicks, the chunk is cached.
const importViewPlayMusicMain = () => import("components/ViewPlayMusicFull/ViewPlayMusicMain")
const ViewPlayMusicMain = React.lazy(importViewPlayMusicMain)

const BottomPlay = () => {
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
         <BottomPlayer></BottomPlayer>
         <BottomRight></BottomRight>
         {isOpen && (
            <Suspense fallback={null}>
               <ViewPlayMusicMain></ViewPlayMusicMain>
            </Suspense>
         )}
      </div>
   )
}

export default memo(BottomPlay)
