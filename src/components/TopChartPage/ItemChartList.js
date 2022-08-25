import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"
import fancyTimeFormat from "../../utils/fancyTimeFormat"

const ItemChartList = memo(({ item, index, isChildren = false }) => {
   const { thumbnail, title, rakingStatus, duration, album, artists } = item

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
            <div className="zing-chart_item-oder">
               <span className="zing-chart-top">{index + 1}</span>
               <div className="zing-chart-rank">
                  <div className="zing-chart-rank-status">{getRankStatus(rakingStatus)}</div>
                  <div className="zing-chart-rank-num">{rakingStatus === 0 ? "" : Math.abs(rakingStatus)}</div>
               </div>
            </div>
            <div className="zing-chart_item-info">
               <div className="zing-chart_item-img">
                  <div className="main-page_list-item_img">
                     <div className="release_list-item-img">
                        <LazyLoadImage src={thumbnail} alt={title} />
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
                  <div className="zing-chart_item-name">{title}</div>
                  <div className="zing-chart_item-artist">
                     {artists &&
                        artists?.slice(0, 3)?.map((e, index) => {
                           let prara = ", "

                           if (index === 2) {
                              prara = "..."
                           }

                           if (artists.length === 1) {
                              prara = ""
                           }
                           if (artists.length === 2 && index === 1) {
                              prara = ""
                           }
                           if (artists.length === 3 && index === 2) {
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
               <p className="thesong_name">{album?.title || title}</p>
            </div>
         )}
         <div className="zing-chart_item-right">
            <p className="thesong_time">{fancyTimeFormat(duration)}</p>
         </div>
      </div>
   )
})

export default ItemChartList
