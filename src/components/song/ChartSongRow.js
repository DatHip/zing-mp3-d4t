import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import fancyTimeFormat from "utils/fancyTimeFormat"
import ActionPlay from "components/ui/ActionPlay"
import ActionIcon from "components/ui/ActionIcon"
import LoadingIcon from "components/ui/LoadingIcon"
import ArtistLinks from "./ArtistLinks"
import { useChartSongRow } from "./useChartSongRow"

/** Arrow and count showing how far the track moved since the last chart. */
const RankDelta = ({ rakingStatus }) => {
   if (rakingStatus === 0) return <span className="material-icons-outlined line">minimize</span>
   if (rakingStatus > 0) return <span className="material-icons-outlined up">arrow_drop_up</span>
   if (rakingStatus < 0) return <span className="material-icons-outlined down"> arrow_drop_down </span>
   return null
}

const ChartSongRow = memo(
   ({ isNotList, indexNotVip, idAlbum, item, index, isChildren = false, isNoneRank, notAlbum }) => {
      const { isLike, handleLike, handlePlay, resume, pause, isActiveSong, playing, isReady } =
         useChartSongRow({
            item,
            idAlbum,
            indexNotVip,
            // A row rendered outside a track list always plays on its own.
            notAlbum: notAlbum || isNotList,
         })

      return (
         <div className={`zing-chart_item main_page-hover ${isActiveSong ? "active" : ""}`}>
            <div className="zing-chart_item-left">
               {!isNoneRank && (
                  <div className="zing-chart_item-oder">
                     <span className="zing-chart-top">{index + 1}</span>
                     <div className="zing-chart-rank">
                        <div className="zing-chart-rank-status">
                           <RankDelta rakingStatus={item?.rakingStatus} />
                        </div>
                        <div className="zing-chart-rank-num">
                           {item?.rakingStatus === 0 ? "" : Math.abs(item?.rakingStatus)}
                        </div>
                     </div>
                  </div>
               )}

               <div className="zing-chart_item-info">
                  <div className="zing-chart_item-img">
                     <div className="main-page_list-item_img">
                        <div className="release_list-item-img">
                           <LazyLoadImage src={item?.thumbnail} alt={item?.title} />
                        </div>
                        <div className="recently_list-item_hover">
                           <div className="recently_btn-hover recently_btn-hover-play">
                              {isActiveSong && !isReady && <LoadingIcon notLoading />}
                              {isActiveSong && isReady && (
                                 <span onClick={playing ? pause : resume}>
                                    {playing ? <ActionIcon /> : <ActionPlay />}
                                 </span>
                              )}
                              {!isActiveSong && (
                                 <span onClick={handlePlay}>
                                    <ActionPlay />
                                 </span>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="zing-chart_item-text">
                     <div
                        className={`zing-chart_item-name ${item?.streamingStatus === 2 ? "is-vip" : ""}`}
                     >
                        {item?.title} <div className="is-vip_img"></div>
                     </div>
                     <div className="zing-chart_item-artist">
                        <ArtistLinks artists={item?.artists} />
                     </div>
                  </div>
               </div>
            </div>

            {!isChildren && (
               <div className="zing-chart_item-center">
                  <p className="thesong_name">{item?.album?.title || item?.title}</p>
               </div>
            )}

            <div className="zing-chart_item-right gap-3">
               <div onClick={handleLike} className="player_queue-btn player_btn zm-btn">
                  <i className={`icon  ${isLike ? "ic-like-full" : "ic-like"} `}></i>
                  <span className="playing_title-hover">
                     {" "}
                     {isLike ? " Xóa khỏi " : "Thêm vào"} thư viện{" "}
                  </span>
               </div>

               <p className="thesong_time">{fancyTimeFormat(item?.duration)}</p>
            </div>
         </div>
      )
   }
)

export default ChartSongRow
