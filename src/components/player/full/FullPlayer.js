/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useRef, memo, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOffClass, setOffMain } from "features/fullPlayer/fullPlayerSlice"
import KaraokeView from "components/player/full/KaraokeView"
import QueueView from "components/player/full/QueueView"
import LyricsView from "components/player/full/LyricsView"
import DiscSwiper from "components/player/full/DiscSwiper"
import SettingButton from "components/player/full/SettingButton"
import Blur from "react-blur"
import { fetchDataLyrics } from "features/lyrics/lyricsSlice"

const FullPlayer = () => {
   const dispatch = useDispatch()
   const [open, setOpen] = useState(1)
   const [isScroll, setIsScroll] = useState(false)
   const bottomRef = useRef()
   const isBgFull = useSelector((state) => state.setting.isBgFull)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)
   const infoCurrenAlbum = useSelector((state) => state.queueNowPlay.infoCurrenAlbum)
   const img = infoSongCurrent.thumbnailM

   // fetch lyric
   useLayoutEffect(() => {
      dispatch(fetchDataLyrics(currentEncodeId))
   }, [currentEncodeId])

   // hidden
   useLayoutEffect(() => {
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

   // Toggle full screen
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
            {isBgFull ? <DiscSwiper></DiscSwiper> : <Blur img={img} blurRadius={90} enableStyles></Blur>}
         </div>
         <div className="nowplaying-content">
            <div className="nowplaying-header">
               <div className="nowplaying-header_left">
                  <div className="info">
                     <div className="logo">
                        <img src="/pabicon.webp" alt="" />
                     </div>
                     <div className="info-text !">
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
                  <SettingButton></SettingButton>
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
               {open === 1 && <QueueView isScroll={isScroll}></QueueView>}
               {open === 2 && <KaraokeView></KaraokeView>}
               {open === 3 && <LyricsView></LyricsView>}
            </div>
            <div className="nowplaying-bottom">
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

export default memo(FullPlayer)
