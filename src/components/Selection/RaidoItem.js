import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { toast } from "react-toastify"

const RaidoItem = memo(({ item, className1 }) => {
   return (
      <div className={className1}>
         <div className="xones_list-item-link main-page_list-item main_page-hover">
            <div className="xones_list-item-link-img main-page_list-item_img">
               <img src={item?.program?.thumbnail} alt="" />
            </div>
            <div className="xones_list-item-link-logo">
               <LazyLoadImage src={item?.thumbnail} alt="" />
            </div>
            <div className="xones_list-item-link-logo-live">
               <LazyLoadImage src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/icons/live-tag.svg" alt="" />
            </div>
            <div className="recently_list-item_hover">
               <div className="recently_btn-hover recently_btn-hover-play">
                  <span
                     onClick={() => {
                        return toast("Radio đang phát triển, vui lòng thông cảm !", {
                           type: "info",
                        })
                     }}
                  >
                     <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                  </span>
               </div>
            </div>
         </div>
         <div className="xones_list-item-title">
            <div className="main_title-text" href="#">
               {item?.host?.name}
            </div>
            <div className="main_subtitle">
               <p>{item?.activeUsers} đang nghe </p>
            </div>
         </div>
      </div>
   )
})

export default RaidoItem
