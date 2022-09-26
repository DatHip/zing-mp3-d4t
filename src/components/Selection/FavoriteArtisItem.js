import React, { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { fetchPlayList } from "../../features/QueueFeatures/QueueFeatures"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import ActionIcon from "../Icon/ActionIcon"

const FavoriteArtisItem = memo(({ item, clasName, isHub, isCenter }) => {
   const { encodeId, thumbnailM, song, artistsNames, title } = item
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const playlistEncodeId = useSelector((state) => state.queueNowPlay.playlistEncodeId)
   const { playing } = useSelector((state) => state.setting)

   let active = playlistEncodeId === encodeId

   return (
      <>
         <div className={`favorite_list-item ${active ? "active" : ""} ${isHub ? "is-hub" : ""} ${clasName}`}>
            <div
               onClick={(e) => {
                  if (isHub) {
                     navigate(`/hub/detail/${encodeId}`)
                  }

                  if (e.target.className.includes("recently_list-item_hover")) {
                     navigate(`/album/${encodeId}`)
                  }
               }}
               className="main-page_list-item main_page-hover cursor-pointer"
            >
               <div className="main-page_list-item_img">
                  <img src={thumbnailM || item.thumbnail} alt={title} />
               </div>
               {!isHub && (
                  <div className="recently_list-item_hover">
                     <div className="recently_btn-hover recently_btn-hover-play">
                        <span>
                           {active && (
                              <>
                                 {!playing && (
                                    <span
                                       className="playlist"
                                       onClick={(e) => {
                                          dispatch(setPlay(true))
                                       }}
                                    >
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
                           {!active && (
                              <span
                                 onClick={async () => {
                                    navigate(`/album/${encodeId}`)
                                    dispatch(setReady(false))
                                    dispatch(setPlay(false))
                                    await dispatch(fetchPlayList(encodeId))
                                    dispatch(setPlay(true))
                                 }}
                              >
                                 <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                              </span>
                           )}
                        </span>
                     </div>
                  </div>
               )}
               <div className="favorite_content">
                  {!isHub && (
                     <>
                        <p className="favorite_content-name">{artistsNames}</p>
                        <div className="favorite_content-list flex justify-center items-center gap-[10px]">
                           {song &&
                              song.items.map((e, index) => {
                                 if (index > 2) return

                                 return (
                                    <div key={index} className="favorite_content-img">
                                       <img src={e.thumbnail} alt={e.title} />
                                    </div>
                                 )
                              })}
                        </div>
                     </>
                  )}
                  {isHub && (
                     <>
                        <p className={`favorite_content-name ${isCenter ? "text-center" : ""}`}>{title}</p>
                        <div className="favorite_content-list flex justify-center items-center gap-[10px] ">
                           {item.playlists &&
                              item.playlists.map((e, index) => {
                                 if (index > 2) return

                                 return (
                                    <div key={index} className="favorite_content-img">
                                       <img src={e.thumbnail} alt={e.title} />
                                    </div>
                                 )
                              })}
                        </div>
                     </>
                  )}
               </div>
               <div className="main_blur-bg" />
            </div>
         </div>
      </>
   )
})

export default memo(FavoriteArtisItem)
