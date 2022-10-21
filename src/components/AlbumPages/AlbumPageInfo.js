import React, { memo, useEffect, useRef, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import getFormartTimeDDYY from "../../utils/getFormartTimeDDYY"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import { fetchPlayList } from "../../features/QueueFeatures/QueueFeatures"
import ActionIcon from "../Icon/ActionIcon"
import { pushPlayListsLogged } from "../../features/Logged/loggedFeatures"
import useLikeHook from "../../hook/useLikeHook"

const AlbumPageInfo = memo(({ datas }) => {
   const dispatch = useDispatch()
   const playing = useSelector((state) => state.setting.playing)
   const playlistEncodeId = useSelector((state) => state.queueNowPlay.playlistEncodeId)
   const loading = useSelector((state) => state.queueNowPlay.loading)
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

   const onClickBtn = useCallback(async () => {
      dispatch(setPlay(false))
      dispatch(setReady(false))
      await dispatch(fetchPlayList(datas?.encodeId))
      if (datas.textType === "Playlist") {
         dispatch(pushPlayListsLogged(datas))
      }
      dispatch(setPlay(true))
   }, [])

   const { isLike, handleLike } = useLikeHook(datas, 1)

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
                              {!playing && (
                                 <span onClick={() => dispatch(setPlay(true))}>
                                    <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                                 </span>
                              )}
                              {playing && (
                                 <span onClick={() => dispatch(setPlay(false))}>
                                    <ActionIcon></ActionIcon>
                                 </span>
                              )}
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
                           className="zm-btn btn-play-all is-outlined active is-medium is-upper button transition-all"
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
                           className="zm-btn btn-play-all is-outlined active is-medium is-upper button transition-all"
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
                     {loading && (
                        <>
                           <button
                              className="zm-btn btn-play-all is-outlined active is-medium is-upper button transition-all"
                              tabIndex={0}
                           >
                              <span>Loading...</span>
                           </button>
                        </>
                     )}
                     {!loading && (
                        <>
                           <button
                              onClick={onClickBtn}
                              className="zm-btn btn-play-all is-outlined active is-medium is-upper button transition-all"
                              tabIndex={0}
                           >
                              <i className="icon ic-play" />
                              <span>Phát Album</span>
                           </button>
                        </>
                     )}
                  </>
               )}

               <div className="media_right">
                  <div onClick={handleLike} className="media_right-btn player_btn">
                     <i className={`icon  ${isLike ? "ic-like-full" : "ic-like"} `}></i>
                     <span className="playing_title-hover"> {isLike ? " Xóa khỏi " : "Thêm vào"} thư viện </span>
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
