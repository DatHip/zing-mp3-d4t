import React, { memo, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { usePlayback } from "hook/usePlayback"
import ActionIcon from "components/ui/ActionIcon"
import { selectPlaylistEncodeId } from "features/queue/queueSelectors"
import { selectPlaying } from "features/setting/settingSelectors"

const FavoriteArtistCard = memo(({ item, clasName, isHub, isCenter }) => {
   const { encodeId, thumbnailM, song, artistsNames, title } = item
   const navigate = useNavigate()
   const { playAlbum, resume, pause } = usePlayback()
   const playlistEncodeId = useSelector(selectPlaylistEncodeId)
   const playing = useSelector(selectPlaying)

   let active = playlistEncodeId === encodeId

   const handleOpen = useCallback(
      (event) => {
         if (isHub) return navigate(`/hub/detail/${encodeId}`)
         if (event.target.className.includes("recently_list-item_hover")) {
            navigate(`/album/${encodeId}`)
         }
      },
      [isHub, navigate, encodeId]
   )

   const handlePlay = useCallback(() => {
      navigate(`/album/${encodeId}`)
      return playAlbum(encodeId)
   }, [navigate, encodeId, playAlbum])

   return (
      <>
         <div className={`favorite_list-item ${active ? "active" : ""} ${isHub ? "is-hub" : ""} ${clasName}`}>
            <div
               onClick={handleOpen}
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
                                    <span className="playlist" onClick={resume}>
                                       <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                                    </span>
                                 )}
                                 {playing && (
                                    <span onClick={pause}>
                                       <ActionIcon></ActionIcon>
                                    </span>
                                 )}
                              </>
                           )}
                           {!active && (
                              <span onClick={handlePlay}>
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

export default memo(FavoriteArtistCard)
