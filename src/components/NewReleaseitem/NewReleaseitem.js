import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"
import styled from "styled-components"
import getConterTimeRelese from "../../utils/getConterTimeRelese"

const NewReleaseItemStyle = styled.div`
   &.is-disk {
      &:hover {
         .disk {
            transform: rotate(90deg);
         }
         .player_queue-left {
            transform: translateX(-10px);
         }
      }
      .player_queue-left {
         min-width: 87px;
         height: 87px;
         margin-left: 1rem;
         margin-right: 2.6rem;
         .player_queue-img-hover {
            min-width: 87px;
            height: 87px;
         }
      }

      .disk {
         width: 87px;
         height: 87px;
         transition: transform 0.3s linear;
         background-color: transparent;
         transform: rotate(0);
         z-index: -1;
         position: absolute;
         top: 0;
         left: 20px;
         right: 0;
         bottom: 0;
      }
   }

   .player_queue-left {
      min-width: 6rem;
      height: 6rem;
      transition: transform 0.3s linear;
      box-shadow: unset;
      .player_queue-img-hover {
         min-width: 6rem;
         height: 6rem;
      }
   }
   .player_queue-name,
   .player_queue-music,
   .player_queue-time {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      height: auto;
      overflow: hidden;
   }

   .player_queue-name {
      margin-top: 3px;

      a:hover {
         text-decoration: underline !important;
         color: var(--link-text-hover);
      }

      &:hover {
         text-decoration: unset !important;
      }
   }
   .player_queue-time {
      font-size: 12px;
      line-height: 18px;
      font-weight: 400;
      color: var(--text-secondary);
      margin-top: 3px;
   }
`

const NewReleaseitem = ({ isDisk, classDisk, item }) => {
   const { streamingStatus, thumbnailM, title, artists, releaseDate, isAlbum } = item

   const img = thumbnailM?.slice(thumbnailM.lastIndexOf("/"))
   let timeRelease = getConterTimeRelese(releaseDate, isAlbum)

   return (
      <NewReleaseItemStyle className={`player_queue-item  ${isDisk ? "is-disk" : ""}`}>
         <div className="player_queue-item-left">
            <div className="relative">
               <div className="player_queue-left">
                  <LazyLoadImage visibleByDefault={thumbnailM === img} className="player_queue-img" src={thumbnailM} alt="" />
                  <div className="player_queue-img-hover">
                     <i className="icon action-play ic-play" />
                  </div>
               </div>
               {isDisk && (
                  <figure className={`image disk ${classDisk}`}>
                     <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/album-disk.png" alt="" />
                  </figure>
               )}
            </div>
            <div className={`player_queue-music-info ${streamingStatus === 1 ? "" : streamingStatus === 2 ? "is-vip" : ""}`}>
               <div className="player_queue-music">
                  {title} <div className="is-vip_img"></div>
               </div>
               <div className="player_queue-name">
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
               <div className="player_queue-time">{timeRelease} trước</div>
            </div>
         </div>
         <div className="player_queue-item-right">
            <div className="player_queue-btn player_btn zm-btn">
               <i className="icon ic-like" />
               <span className="playing_title-hover">Thêm vào thư viện </span>
            </div>
            <div className="player_queue-btn player_btn zm-btn">
               <i className="icon ic-more" />
               <span className="playing_title-hover">Xem thêm</span>
            </div>
         </div>
      </NewReleaseItemStyle>
   )
}

export default memo(NewReleaseitem)
