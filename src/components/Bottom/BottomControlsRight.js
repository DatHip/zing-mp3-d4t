import { indexOf } from "lodash"
import React, { useEffect, useMemo, useRef } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setOpenClass, setOpenMain } from "../../features/openMainFull/openMainFullFeatures"
import { setIsVolume, setVolume, toogleMuted } from "../../features/SettingPlay/settingPlay"
import { setToggle } from "../../features/toggleRight/toggleRight"

const BottomControlsRight = () => {
   const isToggle = useSelector((state) => state.toggleright)
   const infoSong = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const setting = useSelector((state) => state.setting)
   const volumeRef = useRef()
   const dispatch = useDispatch()

   let linkMv = infoSong?.mvlink
   let alo = linkMv?.slice(linkMv.lastIndexOf("/") + 1)
   let idMv = alo?.slice(0, -5)

   useEffect(() => {
      let x = setting.volume * 100
      let color = `linear-gradient(90deg, var(--progressbar-active-bg) ${x}%, var(--progressbar-player-bg) ${x}%)`
      volumeRef.current.style.background = color
   }, [setting.volume, setting.isVolume])

   useEffect(() => {
      const playbar = document.querySelector(".playing-bar")
      const header = document.querySelector(".header")
      header.style.zIndex = 112
      playbar.style.zIndex = 113

      return () => {
         header.style.zIndex = null
         playbar.style.zIndex = null
      }
   }, [isToggle])

   return (
      <div className="player_controls-right">
         <Link to={`/video-clip/${idMv}`} className={`player_btn playing_mv ${linkMv ? "" : "disabled"}`}>
            <i className="icon ic-mv"></i>
            <div className="playing_title-hover">Xem MV</div>
         </Link>
         <div
            onClick={() => {
               dispatch(setOpenMain())
               setTimeout(() => {
                  dispatch(setOpenClass())
                  document.getElementById("full-lyrics").click()
               }, 100)
            }}
            className="player_btn playing_karaoke"
         >
            <i className="icon ic-karaoke"></i>
            <div className="playing_title-hover">Xem Lời bài hát</div>
         </div>
         {/* <div className="player_btn playing_window">
            <i className="icon ic-restore"></i>
            <div className="playing_title-hover">Chế độ cửa sổ</div>
         </div> */}
         <div className="player_volume playing_volume">
            <div
               onClick={() => {
                  if (setting.muted) {
                     dispatch(toogleMuted())
                     dispatch(setVolume(setting.isVolume))
                  } else {
                     dispatch(toogleMuted())
                     dispatch(setVolume(0))
                  }
               }}
               className="player_btn"
            >
               <i className={`icon ${setting?.muted ? "ic-volume-mute" : "ic-volume"} `}></i>
            </div>
            <div className="playing_volume-input">
               <input
                  ref={volumeRef}
                  className="transition-all"
                  id="inputVolume"
                  type="range"
                  min={0}
                  max={100}
                  value={setting.volume * 100}
                  onChange={(e) => {
                     dispatch(setVolume(e.target.value / 100))
                     dispatch(setIsVolume(e.target.value / 100))
                  }}
               />
            </div>
         </div>
         <div className="player_device-column" />
         <div onClick={() => dispatch(setToggle())} className={`toggle-right ${isToggle ? "active" : null}`}>
            <div className="zm-btn">
               <i className="icon ic-list-music"></i>
               <div className="playing_title-hover">Danh sách phát</div>
            </div>
         </div>
      </div>
   )
}

export default BottomControlsRight
