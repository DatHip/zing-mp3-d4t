import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { SwiperSlide } from "swiper/react"

const NewMusicSlide = memo(({ item }) => {
   const { title, encodeId, artists, thumbnailM, releaseDate, rakingStatus, album } = item
   const img = thumbnailM.slice(thumbnailM.lastIndexOf("/"))

   return (
      <SwiperSlide>
         <a href="#" className="release_list-item">
            <div className="release_list-item-left main-page_list-item_img main_page-hover">
               <div className="release_list-item-img">
                  <LazyLoadImage visibleByDefault={thumbnailM === img} src={thumbnailM} alt={title} />
               </div>
               <div className="recently_list-item_hover">
                  <div className="recently_btn-hover recently_btn-hover-play">
                     <span>
                        <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                     </span>
                  </div>
               </div>
            </div>
            <div className="release_list-item-right">
               <div className="release_list-item-right-top">
                  <div className="main_title-text">{title}</div>
                  <div className="main_subtitle">
                     <span></span>
                  </div>
               </div>
               <div className="release_list-item-right-bottom">
                  <div className="release_list-item-chart">{rakingStatus}</div>
                  <div className="release_list-item-date">{album.releaseDate}</div>
               </div>
            </div>
         </a>
      </SwiperSlide>
   )
})

export default NewMusicSlide
