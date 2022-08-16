import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setToggle } from "../../features/toggleRight/toggleRight"

const BottomControlsRight = () => {
   const isToggle = useSelector((state) => state.toggleright)
   const dispatch = useDispatch()

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
         <div className="player_btn playing_mv">
            <i className="icon ic-mv"></i>
            <div className="playing_title-hover">Xem MV</div>
         </div>
         <div className="player_btn playing_karaoke">
            <i className="icon ic-karaoke"></i>
            <div className="playing_title-hover">Xem Lời bài hát</div>
         </div>
         <div className="player_btn playing_window">
            <i className="icon ic-restore"></i>
            <div className="playing_title-hover">Chế độ cửa sổ</div>
         </div>
         <div className="player_volume playing_volume">
            <div className="player_btn">
               <i className="icon ic-volume"></i>
               {/* icon ic-volume-mute */}
            </div>
            <div className="playing_volume-input">
               <input id="inputVolume" type="range" min={0} max={100} defaultValue={80} />
            </div>
         </div>
         <div className="player_device-column" />
         <div onClick={() => dispatch(setToggle())} className={`toggle-right ${isToggle ? "active" : null}`}>
            <div className="zm-btn">
               {/* playing_playlist-btn */}
               <i className="icon ic-list-music"></i>
               <div className="playing_title-hover">Danh sách phát</div>
            </div>
         </div>
      </div>
   )
}

export default BottomControlsRight
