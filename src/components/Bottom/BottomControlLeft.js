import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setOpenClass, setOpenMain } from "../../features/openMainFull/openMainFullFeatures"

const BottomControlLeft = () => {
   const dispatch = useDispatch()
   const infoSong = useSelector((state) => state.queueNowPlay.infoSongCurrent)

   return (
      <div className="player_controls-left">
         <div className="player_controls-media">
            <div className="media_left">
               <img className="media-avatar" src={infoSong.thumbnail || infoSong.thumb} alt="" />
               <div
                  onClick={() => {
                     dispatch(setOpenMain())
                     setTimeout(() => {
                        dispatch(setOpenClass())
                     }, 100)
                  }}
                  className="media_avatar-hover openNowPlaying"
               >
                  <span className="material-icons-outlined"> open_in_full </span>
               </div>
            </div>
            <div className="media_center">
               <div className="media_music">{infoSong.title}</div>
               <div className="media_name">
                  {infoSong?.artists &&
                     infoSong?.artists?.slice(0, 3)?.map((e, index) => {
                        let prara = ", "

                        if (index === 2) {
                           prara = "..."
                        }

                        if (infoSong?.artists.length === 1) {
                           prara = ""
                        }
                        if (infoSong?.artists.length === 2 && index === 1) {
                           prara = ""
                        }
                        if (infoSong?.artists.length === 3 && index === 2) {
                           prara = ""
                        }

                        return (
                           <span key={index}>
                              <Link to={`/nghe-si/${e.alias}/`}>{e.name}</Link>
                              {prara}
                           </span>
                        )
                     })}
               </div>
            </div>
            <div className="media_right">
               <div className="media_right-btn player_btn">
                  <i className="icon ic-like"></i>

                  <span className="playing_title-hover">Thêm vào thư viện </span>
               </div>
               <div className="media_right-btn player_btn">
                  <i className="icon ic-more"></i>
                  <span className="playing_title-hover">Xem thêm</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BottomControlLeft
