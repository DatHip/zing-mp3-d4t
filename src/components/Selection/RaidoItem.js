import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"

const RaidoItem = memo(({ item, className1 }) => {
   const { activeUsers, host, encodeId, program, thumbnail } = item

   const img = program.thumbnail.slice(program.thumbnail.lastIndexOf("/"))
   const img1 = thumbnail.slice(thumbnail.lastIndexOf("/"))

   return (
      <div className={className1}>
         <a className="xones_list-item-link main-page_list-item main_page-hover" href="#">
            <div className="xones_list-item-link-img main-page_list-item_img">
               <LazyLoadImage visibleByDefault={program.thumbnail === img} src={program.thumbnail} alt="" />
            </div>
            <div className="xones_list-item-link-logo">
               <LazyLoadImage visibleByDefault={thumbnail === img1} src={thumbnail} alt="" />
            </div>
            <div className="xones_list-item-link-logo-live">
               <LazyLoadImage src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/icons/live-tag.svg" alt="" />
            </div>
            <div className="recently_list-item_hover">
               <div className="recently_btn-hover recently_btn-hover-play">
                  <span>
                     <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                  </span>
               </div>
            </div>
         </a>
         <div className="xones_list-item-title">
            <a className="main_title-text" title="${e.host.name}" href="#">
               {host.name}
            </a>
            <div className="main_subtitle">
               <p>{activeUsers} đang nghe </p>
            </div>
         </div>
      </div>
   )
})

export default RaidoItem
