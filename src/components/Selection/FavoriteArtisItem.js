import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"

const FavoriteArtisItem = memo(({ item, clasName }) => {
   const { encodeId, thumbnailM, song, artistsNames, title } = item
   // const img = thumbnailM.slice(thumbnailM.lastIndexOf("/"))

   return (
      <>
         <div className={`favorite_list-item ${clasName}`}>
            <a className="main-page_list-item main_page-hover" href="#">
               <div className="main-page_list-item_img">
                  <LazyLoadImage src={thumbnailM} alt={title} />
               </div>
               <div className="recently_list-item_hover">
                  <div className="recently_btn-hover recently_btn-hover-play">
                     <span>
                        <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                     </span>
                  </div>
               </div>
               <div className="favorite_content">
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
               </div>
               <div className="main_blur-bg" />
            </a>
         </div>
      </>
   )
})

export default FavoriteArtisItem
