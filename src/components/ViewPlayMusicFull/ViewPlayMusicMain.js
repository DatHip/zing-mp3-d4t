/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { useCallback } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setOffClass, setOffMain } from "../../features/openMainFull/openMainFullFeatures"
import BgFullKaroke from "./BgFullKaroke"
import BgFullListMusic from "./BgFullListMusic"
import BgFullLyrics from "./BgFullLyrics"
import BgSwiperFull from "./BgSwiperFull"
import BtnSetting from "./BtnSetting"
import Blur from "react-blur"
import { useEffect } from "react"
import { fetchDataLyrics } from "../../features/Lyrics/Lyrics"

const ViewPlayMusicMain = () => {
   const dispatch = useDispatch()
   let btn = document.querySelector(".nowplaying-header_setting-btn.full")
   const [open, setOpen] = useState(1)
   const isBgFull = useSelector((state) => state.setting.isBgFull)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)

   const img = infoSongCurrent.thumbnailM
   let fetch = true
   useEffect(() => {
      if (!fetch) return

      dispatch(fetchDataLyrics(currentEncodeId))
      return () => (fetch = false)
   }, [currentEncodeId])

   const toggleFullScreen = useCallback(() => {
      if (
         (document.fullScreenElement && document.fullScreenElement !== null) ||
         (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
         btn.classList.add("active")

         if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen()
         } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
         } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
         }
      } else {
         btn.classList.remove("active")
         if (document.cancelFullScreen) {
            document.cancelFullScreen()
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
         } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
         }
      }
   }, [])

   return (
      <div className="nowplaying text white">
         <div className="nowplaying-bg">
            <div className={`nowplaying-overlay ${isBgFull ? "opacity-20" : ""}`} />
            {isBgFull ? <BgSwiperFull></BgSwiperFull> : <Blur img={img} blurRadius={90} enableStyles></Blur>}
         </div>
         <div className="nowplaying-content">
            <div className="nowplaying-header">
               <div className="nowplaying-header_left">
                  <div className="info">
                     <div className="logo">
                        <img src="/pabicon.webp" alt="" />
                     </div>
                     <div className="info-text !text-white">
                        <p>Từ PlayLits</p>
                        <p id="titleList">Top 100 Bài Hát Nhạc Trẻ Hay Nhất</p>
                     </div>
                  </div>
               </div>
               <ul className="nowplaying-header_tab">
                  <li onClick={() => setOpen(1)} className={`nowplaying-header_tab-item ${open === 1 ? "active" : ""}`}>
                     Danh sách phát
                  </li>
                  <li onClick={() => setOpen(2)} className={`nowplaying-header_tab-item ${open === 2 ? "active" : ""}`}>
                     Karaoke
                  </li>
                  <li onClick={() => setOpen(3)} className={`nowplaying-header_tab-item ${open === 3 ? "active" : ""}`}>
                     Lời bài hát
                  </li>
               </ul>
               <div className="nowplaying-header_setting" style={{ display: "flex" }}>
                  <div className="nowplaying-header_setting-item">
                     <button onClick={toggleFullScreen} className="nowplaying-header_setting-btn full ">
                        <span className="material-icons-outlined btn-top">open_in_full</span>
                        <span className="material-icons-outlined btn-bottom">close_fullscreen</span>
                     </button>
                  </div>
                  <BtnSetting></BtnSetting>
                  <div className="nowplaying-header_setting-item">
                     <button
                        onClick={() => {
                           dispatch(setOffClass())
                           setTimeout(() => {
                              dispatch(setOffMain())
                           }, 600)
                        }}
                        className="nowplaying-header_setting-btn down"
                     >
                        <span className="material-icons-outlined">keyboard_arrow_down</span>
                     </button>
                  </div>
               </div>
            </div>
            <div className="nowplaying-body">
               {open === 1 && <BgFullListMusic></BgFullListMusic>}
               {open === 2 && <BgFullKaroke></BgFullKaroke>}
               {open === 3 && <BgFullLyrics></BgFullLyrics>}
            </div>
         </div>
      </div>
   )
}

export default ViewPlayMusicMain
