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
import { useRef } from "react"

const ViewPlayMusicMain = () => {
   const dispatch = useDispatch()
   const [open, setOpen] = useState(1)
   const [isScroll, setIsScroll] = useState(false)
   const bottomRef = useRef()

   const isBgFull = useSelector((state) => state.setting.isBgFull)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)
   const infoCurrenAlbum = useSelector((state) => state.queueNowPlay.infoCurrenAlbum)
   const img = infoSongCurrent.thumbnailM

   let fetch = true
   useEffect(() => {
      if (!fetch) return
      dispatch(fetchDataLyrics(currentEncodeId))
      return () => (fetch = false)
   }, [currentEncodeId])

   useEffect(() => {
      const playingBar = document.querySelector(".playing-bar")
      var timeout
      const hidden = () => {
         clearTimeout(timeout)
         timeout = setTimeout(function () {
            setTimeout(() => {
               setIsScroll(true)
               playingBar.classList.add("play_hidden")
            }, 500)
         }, 7000)
         playingBar.classList.remove("play_hidden")
         setIsScroll(false)
      }

      document.addEventListener("mousemove", hidden)

      return () => document.removeEventListener("mousemove", hidden)
   }, [])

   const toggleFullScreen = useCallback(() => {
      const btn = document.querySelector(".nowplaying-header_setting-btn.full")

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
                        <p id="titleList">{infoCurrenAlbum.title}</p>
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
                  <li
                     onClick={() => setOpen(3)}
                     id="full-lyrics"
                     className={`nowplaying-header_tab-item  ${open === 3 ? "active" : ""}`}
                  >
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
               {open === 1 && <BgFullListMusic isScroll={isScroll}></BgFullListMusic>}
               {open === 2 && <BgFullKaroke></BgFullKaroke>}
               {open === 3 && <BgFullLyrics></BgFullLyrics>}
            </div>
            <div className="nowplaying-bottom">
               {/* <div className="zm-text-transition-content flex items-center justify-center max-w-[400px] text-white mx-auto mb-[10px] ">
                  <span className="zm-text-transition-item ">
                     {infoSongCurrent.title + " - "}
                     <span className="artist">  n</span>
                  </span>
               </div> */}

               <div
                  className={`zm-text-transition  ${
                     bottomRef?.current?.innerText?.length > 70 ? " is-transition" : ""
                  } flex items-center justify-center`}
               >
                  <div
                     ref={bottomRef}
                     className={`zm-text-transition-item  ${
                        bottomRef?.current?.innerText?.length > 70 ? "transition-content" : ""
                     }`}
                  >
                     {infoSongCurrent.title} -{" "}
                     <span className="artist">
                        {infoSongCurrent.artists &&
                           infoSongCurrent.artists?.map((e, index) => {
                              let prara = ", "

                              if (index === infoSongCurrent.artists.length - 1) {
                                 prara = ""
                              }

                              return (
                                 <span key={index}>
                                    <span className="is-ghost">{e.name}</span>
                                    {prara}
                                 </span>
                              )
                           })}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ViewPlayMusicMain
