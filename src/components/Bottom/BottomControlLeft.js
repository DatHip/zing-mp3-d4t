import React from "react"

const BottomControlLeft = () => {
   return (
      <div className="player_controls-left">
         <div className="player_controls-media">
            <div className="media_left">
               <img
                  className="media-avatar"
                  src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/9/f/4/e/9f4e2b8f713753e9aced9fcbed3e9c7e.jpg"
                  alt=""
               />
               <div className="media_avatar-hover openNowPlaying">
                  <span className="material-icons-outlined"> open_in_full </span>
               </div>
            </div>
            <div className="media_center">
               <div className="media_music">Play</div>
               <div className="media_name">K-391, Alan Walker, Martin Tungev</div>
            </div>
            <div className="media_right">
               <div className="media_right-btn player_btn">
                  <i className="icon ic-like"></i>

                  <span className="playing_title-hover">Thêm vào thư viện </span>
               </div>
               <div className="media_right-btn player_btn">
                  <i className="icon ic-more"></i>
                  <span className="playing_title-hover">Xem thêm</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BottomControlLeft
