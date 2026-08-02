import React, { memo, useCallback } from "react"
import SongRow from "components/song/SongRow"
import usePortal from "react-cool-portal"
import { useSelector } from "react-redux"
import useLike from "hook/useLike"
import { usePlayback } from "hook/usePlayback"
import { selectPlaylistEncodeId, selectQueueLoading } from "features/queue/queueSelectors"
import { selectPlaying } from "features/setting/settingSelectors"
import { InfoTopStyles, ArtistBioPortalStyles } from "./ArtistInfoTop.styles"



const ArtistInfoTop = memo(({ data }) => {
   const { playAlbum, resume, pause } = usePlayback()
   const playlistEncodeId = useSelector(selectPlaylistEncodeId)
   const loading = useSelector(selectQueueLoading)
   const playing = useSelector(selectPlaying)

   let active = playlistEncodeId === data?.playlistId

   const { isLike, handleLike } = useLike(data, 3)

   /** One button: resume/pause when this artist's list is loaded, load it otherwise. */
   const handlePlayToggle = useCallback(() => {
      if (active) return playing ? pause() : resume()
      return playAlbum(data?.playlistId, {
         logAs: data?.textType === "Playlist" ? data : undefined,
      })
   }, [active, playing, pause, resume, playAlbum, data])

   const { Portal, show, hide } = usePortal({ defaultShow: false })

   const handleClickBackdrop = (e) => {
      const id = e.target.id
      if (id === "theme-overlay" || id === "portal-bio-arits") hide()
   }

   return (
      <InfoTopStyles className="artist_page-title row !flex-wrap mb-[40px]">
         <div className="col l-7 m-7 c-12 artist_page-title-deital">
            <div className="artist_page-title-left artist_page-title-deital">
               <h3 className="artist-name title">{data?.name}</h3>
               <div>
                  {data?.sortBiography.length > 0 && data && (
                     <>
                        <span className="content-detail" dangerouslySetInnerHTML={{ __html: data?.sortBiography }}></span>

                        <span onClick={() => show()} className="read-more ml-2">
                           ...Xem Thêm
                        </span>
                     </>
                  )}

                  <Portal>
                     <ArtistBioPortalStyles>
                        <div className="zm-portal-modal theme-modal-overlay" id="theme-overlay" onClick={handleClickBackdrop}>
                           <div className="modal p-1 theme-modal  text-white">
                              <div className=" max-w-[480px] relative">
                                 <div className="w-full">
                                    <button
                                       onClick={() => hide()}
                                       id="portal-bio-arits"
                                       className="zm-btn zm-tooltip-btn close-btn is-hover-circle button"
                                       tabIndex="0"
                                    >
                                       <i className="icon ic-close"></i>
                                    </button>
                                    <div className="top">
                                       <div
                                          className="cover-bg"
                                          style={{
                                             backgroundImage: `url("${data?.thumbnailM}")`,
                                          }}
                                       />
                                       <div className="blur-bg" />
                                       <div className="top-content">
                                          <figure className="image is-48x48">
                                             <img src={data?.thumbnailM} alt="" />
                                          </figure>
                                          <h3 className="title">{data?.name}</h3>
                                       </div>
                                    </div>
                                    <div className="bio-content">
                                       <div
                                          dangerouslySetInnerHTML={{ __html: data?.biography }}
                                          className="overflow-y-auto"
                                       ></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </ArtistBioPortalStyles>
                  </Portal>
               </div>
               <div className="actions mt-[20px] mb-[15px] inline-flex gap-[10px] items-center justify-start">
                  <button
                     onClick={handlePlayToggle}
                     className=" zm-btn mar-r-10 is-outlined active is-medium is-upper button"
                     tabIndex="0"
                  >
                     {loading && <span>Loading...</span>}
                     {!active && !loading && <span>Phát nhạc</span>}
                     {active && playing && <span>Tạm Dừng</span>}
                     {active && !playing && <span>Phát Nhạc</span>}
                  </button>
                  <button
                     onClick={handleLike}
                     className={`zm-btn is-outlined ${isLike ? "" : "active"}  mar-r-15 is-medium is-upper button`}
                     tabIndex="0"
                  >
                     <span>
                        {isLike ? "ĐÃ QUAN TÂM" : "QUAN TÂM"} •{" "}
                        {data?.follow > 10000 ? data?.follow.toString().slice(0, -3) + "K" : data?.follow}
                     </span>
                  </button>
               </div>
               {/* Zing no longer returns topAlbum on /artist. Without the guard
                   this renders an empty card: a "Mới Nhất" label over a blank
                   thumbnail and two empty headings. */}
               {data?.topAlbum && <SongRow item={data.topAlbum} isArtist />}
            </div>
         </div>
         <div className="col l-5 m-5 c-12 ">
            <div className="artist_page-title-right float-right">
               <figure className="image avatar is-48x48">
                  <img src={data?.thumbnailM} alt="" />
               </figure>
            </div>
         </div>
      </InfoTopStyles>
   )
})

export default ArtistInfoTop
