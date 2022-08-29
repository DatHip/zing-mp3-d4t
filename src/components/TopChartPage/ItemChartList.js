import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"
import fancyTimeFormat from "../../utils/fancyTimeFormat"

const ItemChartList = memo(({ item, index, isChildren = false, isNoneRank, onFavourite }) => {
   const getRankStatus = (startus) => {
      if (startus === 0) {
         return <span className="material-icons-outlined line">minimize</span>
      } else if (startus > 0) {
         return <span className="material-icons-outlined up">arrow_drop_up</span>
      } else if (startus < 0) {
         return <span className="material-icons-outlined down"> arrow_drop_down </span>
      }
   }

   return (
      <div className="zing-chart_item main_page-hover">
         <div className="zing-chart_item-left">
            {!isNoneRank && (
               <div className="zing-chart_item-oder">
                  <span className="zing-chart-top">{index + 1}</span>
                  <div className="zing-chart-rank">
                     <div className="zing-chart-rank-status">{getRankStatus(item?.rakingStatus)}</div>
                     <div className="zing-chart-rank-num">{item?.rakingStatus === 0 ? "" : Math.abs(item?.rakingStatus)}</div>
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
                           <span>
                              <i className="icon action-play ic-play text-white !mr-0"></i>
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="zing-chart_item-text">
                  <div
                     className={`zing-chart_item-name ${
                        item?.streamingStatus === 1 ? "" : item?.streamingStatus === 2 ? "is-vip" : ""
                     }`}
                  >
                     {item?.title} <div className="is-vip_img"></div>
                  </div>
                  <div className="zing-chart_item-artist">
                     {item?.artists &&
                        item?.artists?.slice(0, 3)?.map((e, index) => {
                           let prara = ", "

                           if (index === 2) {
                              prara = "..."
                           }

                           if (item?.artists.length === 1) {
                              prara = ""
                           }
                           if (item?.artists.length === 2 && index === 1) {
                              prara = ""
                           }
                           if (item?.artists.length === 3 && index === 2) {
                              prara = ""
                           }

                           return (
                              <span key={index}>
                                 <Link to={"/"}>{e.name}</Link>
                                 {prara}
                              </span>
                           )
                        })}
                  </div>
               </div>
            </div>
         </div>
         {isChildren ? (
            ""
         ) : (
            <div className="zing-chart_item-center">
               <p className="thesong_name">{item?.album?.title || item?.title}</p>
            </div>
         )}
         <div className="zing-chart_item-right gap-3">
            {onFavourite && (
               <div className="player_queue-btn player_btn zm-btn">
                  <i className="icon ic-like-full" />
                  <span className="playing_title-hover">Thêm vào thư viện </span>
               </div>
            )}
            <p className="thesong_time">{fancyTimeFormat(item?.duration)}</p>
         </div>
      </div>
   )
})

export default ItemChartList
