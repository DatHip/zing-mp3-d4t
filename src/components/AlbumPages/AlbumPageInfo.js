import React from "react"
import { v4 as uuidv4 } from "uuid"

import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { memo } from "react"
import getFormartTimeDDYY from "../../utils/getFormartTimeDDYY"
import { setPlay } from "../../features/SettingPlay/settingPlay"
import { fetchPlayList } from "../../features/QueueFeatures/QueueFeatures"
import ActionIcon from "../Icon/ActionIcon"
import { useEffect } from "react"
import { useRef } from "react"

const AlbumPageInfo = memo(({ datas }) => {
   const dispatch = useDispatch()
   const { playing, isReady } = useSelector((state) => state.setting)
   const { infoCurrenAlbum, playlistEncodeId } = useSelector((state) => state.queueNowPlay)
   const refDiv = useRef()
   const refNum = useRef(0)
   let activeAlbum = datas?.encodeId === playlistEncodeId

   useEffect(() => {
      if (activeAlbum && !playing) {
         refNum.current += 1
         if (refNum.current <= 1) return
         refDiv.current.classList.add("rotatePause")
         setTimeout(() => {
            refDiv.current.classList.remove("rotatePause")
         }, 500)
      }
   }, [playing])

   return (
      <div className="media playlist-header sticky">
         <div className="media-left">
            <div
               ref={refDiv}
               className={`want_list-item-link cursor-pointer main-page_list-item main_page-hover ${
                  activeAlbum && playing ? "album-active" : ""
               }`}
            >
               <div className="want_list-item-link main-page_list-item_img">
                  <img src={datas?.thumbnailM} alt="" />
               </div>

               <div className="recently_list-item_hover text-white">
                  <div className="recently_btn-hover recently_btn-hover-play btn-album_page">
                     <span>
                        {activeAlbum && (
                           <>
                              {!playing && <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>}
                              {playing && <ActionIcon></ActionIcon>}
                           </>
                        )}
                        {!activeAlbum && <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>}
                     </span>
                  </div>
               </div>
            </div>
         </div>
         <div className="media-content">
            <div className="content-top">
               <h3 className="title">{datas?.title}</h3>
               <div className="release">Cập nhật: {getFormartTimeDDYY(datas?.contentLastUpdate)}</div>
               <div className="artists">
                  {datas?.artists &&
                     datas.artists?.map((e, index) => {
                        let prara = ", "

                        if (index === datas.artists.length - 1) {
                           prara = ""
                        }

                        return (
                           <span key={uuidv4()}>
                              <Link className="is-ghost" to={`/nghe-si/${e.alias}/`}>
                                 {e.name}
                              </Link>
                              {prara}
                           </span>
                        )
                     })}
               </div>
               <div className="like">
                  {datas?.like > 10000 ? datas?.like.toString().slice(0, -3) + "K" : datas?.like} người yêu thích
               </div>
            </div>
            <div className="actions">
               {activeAlbum && (
                  <>
                     {!playing && (
                        <button
                           onClick={() => {
                              dispatch(setPlay(true))
                           }}
                           className="zm-btn btn-play-all is-outlined active is-medium is-upper button"
                           tabIndex={0}
                        >
                           <i className="icon ic-play" />
                           <span>Tiếp tục phát</span>
                        </button>
                     )}
                     {playing && (
                        <button
                           onClick={() => {
                              dispatch(setPlay(false))
                           }}
                           className="zm-btn btn-play-all is-outlined active is-medium is-upper button"
                           tabIndex={0}
                        >
                           <i className="icon ic-pause" />
                           <span>Tạm Dừng</span>
                        </button>
                     )}
                  </>
               )}

               {!activeAlbum && (
                  <>
                     <button
                        onClick={() => {
                           dispatch(fetchPlayList(datas?.encodeId))
                        }}
                        className="zm-btn btn-play-all is-outlined active is-medium is-upper button"
                        tabIndex={0}
                     >
                        <i className="icon ic-pause" />
                        <span>Phát Album</span>
                     </button>
                  </>
               )}

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
      </div>
   )
})

export default AlbumPageInfo
