import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setOpenClass, setOpenMain } from "features/fullPlayer/fullPlayerSlice"
import { setIsVolume, setVolume, toogleMuted } from "features/setting/settingSlice"
import { setToggle } from "features/queuePanel/queuePanelSlice"
import { selectCurrentSong } from "features/queue/queueSelectors"
import { selectQueuePanel } from "features/queuePanel/queuePanelSelectors"
import { selectIsVolume, selectMuted, selectVolume } from "features/setting/settingSelectors"

const PlayerActions = () => {
   const isToggle = useSelector(selectQueuePanel)
   const infoSong = useSelector(selectCurrentSong)
   const volume = useSelector(selectVolume)
   const isVolume = useSelector(selectIsVolume)
   const muted = useSelector(selectMuted)
   const volumeRef = useRef()
   const dispatch = useDispatch()

   let linkMv = infoSong?.mvlink
   let alo = linkMv?.slice(linkMv.lastIndexOf("/") + 1)
   let idMv = alo?.slice(0, -5)

   useEffect(() => {
      let x = volume * 100
      let color = `linear-gradient(90deg, var(--progressbar-active-bg) ${x}%, var(--progressbar-player-bg) ${x}%)`
      volumeRef.current.style.background = color
   }, [volume, isVolume])

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
         {/* Without an MV there is no id to link to, and the old markup still
             rendered an anchor pointing at "/video-clip/undefined" — a real
             navigation to a dead route if anyone tabbed to it. The disabled
             state is a plain span so it is neither focusable nor a link. */}
         {linkMv ? (
            <Link to={`/video-clip/${idMv}`} className="player_btn playing_mv" aria-label="Xem MV">
               <i className="icon ic-mv"></i>
               <div className="playing_title-hover">Xem MV</div>
            </Link>
         ) : (
            <span className="player_btn playing_mv disabled" aria-hidden="true">
               <i className="icon ic-mv"></i>
               <div className="playing_title-hover">Xem MV</div>
            </span>
         )}
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
                  if (muted) {
                     dispatch(toogleMuted())
                     dispatch(setVolume(isVolume))
                  } else {
                     dispatch(toogleMuted())
                     dispatch(setVolume(0))
                  }
               }}
               className="player_btn"
            >
               <i className={`icon ${muted ? "ic-volume-mute" : "ic-volume"} `}></i>
            </div>
            <div className="playing_volume-input">
               <input
                  ref={volumeRef}
                  className="transition-all"
                  id="inputVolume"
                  type="range"
                  aria-label="Âm lượng"
                  min={0}
                  max={100}
                  value={volume * 100}
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

export default PlayerActions
