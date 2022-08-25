import React, { memo } from "react"
import { Link } from "react-router-dom"
import fancyTimeFormat from "../../utils/fancyTimeFormat"

const MvItem = memo(({ data }) => {
   const { artists, duration, encodeId, title, thumbnailM, artist, thumbnail } = data

   return (
      <div className="col l-4 m-4 c-6 mv-items">
         <a className="todaychoice_list-item-link main-page_list-item main_page-hover" href="#">
            <div className="todaychoice_list-item-link main-page_list-item_img" href="#">
               <figure>
                  <img src={thumbnailM} alt={title} />
               </figure>
            </div>
            <div className="recently_list-item_hover">
               <div className="recently_btn-hover recently_btn-hover-play">
                  <span>
                     <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                  </span>
               </div>
            </div>
            <div className="main_mv-item-time">{fancyTimeFormat(duration)}</div>
         </a>
         <div className="todaychoice_list-item-title">
            <div className="main_mv-avatr">
               <img src={artist?.thumbnail || thumbnail || ""} alt={title} />
            </div>
            <div className="main_mv-info-title">
               <a className="main_title-text" href="#">
                  {title}
               </a>
               <div className="main_subtitle">
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
   )
})

export default MvItem
