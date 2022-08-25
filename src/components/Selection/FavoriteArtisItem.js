import React, { memo } from "react"

const FavoriteArtisItem = memo(({ item, clasName, isHub, isCenter }) => {
   const { encodeId, thumbnailM, song, artistsNames, title } = item

   return (
      <>
         <div className={`favorite_list-item ${isHub ? "is-hub" : ""} ${clasName}`}>
            <a className="main-page_list-item main_page-hover" href="#">
               <div className="main-page_list-item_img">
                  <img src={thumbnailM || item.thumbnail} alt={title} />
               </div>
               {!isHub && (
                  <div className="recently_list-item_hover">
                     <div className="recently_btn-hover recently_btn-hover-play">
                        <span>
                           <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
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
            </a>
         </div>
      </>
   )
})

export default memo(FavoriteArtisItem)
