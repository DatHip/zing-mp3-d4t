import React, { memo } from "react"
import ActionIcon from "../Icon/ActionIcon"
import ActionPlay from "../Icon/ActionPlay"
import LoadingIcon from "../Icon/LoadingIcon"
import LoadingSkeleton from "../loading/LoadingSkeleton"
import { LazyLoadImage } from "react-lazy-load-image-component"
const ItemRighPlayer = ({ active }) => {
   return (
      <li className={`player_queue-item ${active ? "player_queue-active" : ""} `}>
         {/* player_queue-pre */}
         <div className="player_queue-item-left">
            <div className="player_queue-left">
               <LazyLoadImage
                  className="player_queue-img"
                  src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/9/f/4/e/9f4e2b8f713753e9aced9fcbed3e9c7e.jpg"
                  alt=""
               />
               <div className="player_queue-img-hover">
                  {/* <ActionIcon></ActionIcon> */}
                  <ActionPlay></ActionPlay>
                  {/* <LoadingIcon></LoadingIcon> */}
               </div>
            </div>
            <div className="player_queue-music-info">
               <div className="player_queue-music">Play</div>
               <div className="player_queue-name">K-391, Alan Walker, Martin Tungev</div>
            </div>
         </div>
         <div className="player_queue-item-right">
            <div className="player_queue-btn player_btn zm-btn">
               <i className="icon ic-like"></i>
               <span className="playing_title-hover">Thêm vào thư viện </span>
            </div>
            <div className="player_queue-btn player_btn zm-btn">
               <i className="icon ic-more"></i>
               <span className="playing_title-hover">Xem thêm</span>
            </div>
         </div>
      </li>
   )
}

export default memo(ItemRighPlayer)
