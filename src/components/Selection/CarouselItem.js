import React, { memo } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import LoadingSkeleton from "../loading/LoadingSkeleton"

const StyleDiv = styled.div`
   .player_btn.like {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 999px;
      line-height: normal;
      border: 0;
      display: inline-block;
      font-weight: 400;
      text-align: center;
      cursor: pointer;
      margin: 0 2px;
      border: none;
      color: var(--player-text);
      padding: 6px;

      i {
         font-size: 16px;
         padding: 5px;
         border-radius: 50%;
         margin-right: 0;
         display: flex;
         justify-content: center;
         align-items: center;
      }
   }
`

const CarouselItem = memo(
   ({
      hiddenTitle,
      isHiddenButton = false,
      isSwiper = false,
      class1 = "",
      class2 = "",
      artis = false,
      desc = false,
      item = {},
   }) => {
      const { title, encodeId, artists, sortDescription, thumbnailM } = item

      return (
         <StyleDiv className={` ${class1}`} title={sortDescription}>
            <Link
               to={`/album/${encodeId}`}
               className={`${class2}want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
            >
               <div className="want_list-item-link main-page_list-item_img">
                  <img src={thumbnailM || item.thumbnail} alt={title} />
               </div>
               {!isHiddenButton && (
                  <div className="recently_list-item_hover text-white">
                     <div className="recently_btn-hover player_btn like">
                        <i className="icon ic-like "></i>
                        <span className="playing_title-hover">Thêm vào thư viện </span>
                     </div>
                     <div className="recently_btn-hover recently_btn-hover-play">
                        <span>
                           <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                        </span>
                     </div>
                     <div className="recently_btn-hover player_btn">
                        <span className="material-icons-outlined text-white"> more_horiz </span>
                        <span className="playing_title-hover">Xem thêm</span>
                     </div>
                  </div>
               )}
            </Link>
            {!hiddenTitle && (
               <div className="want_list-item-title">
                  <Link to={`/album/${encodeId}`} className="main_title-text">
                     {title}
                  </Link>
                  <div className="main_subtitle">
                     {artis && (
                        <>
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
                                       <Link to={`/nghe-si/${e.alias}/`}>{e.name}</Link>
                                       {prara}
                                    </span>
                                 )
                              })}
                        </>
                     )}
                     {desc && <p>{sortDescription}</p>}
                  </div>
               </div>
            )}
         </StyleDiv>
      )
   }
)

const Loading = ({ class1 = "", class2 = "", artis = false, desc = false }) => {
   return (
      <div className={` ${class1}`}>
         <div className={`${class2}want_list-item-link cursor-pointer main-page_list-item main_page-hover`}>
            <div className="want_list-item-link main-page_list-item_img w-full">
               <LoadingSkeleton className="w-full h-[225px]"></LoadingSkeleton>
            </div>
         </div>
         <div className="want_list-item-title">
            <div className="main_title-text">
               <LoadingSkeleton className="h-[14px] w-3/4 rounded-sm"></LoadingSkeleton>
            </div>
            <div className="main_subtitle">
               <LoadingSkeleton className="h-[12px] w-2/3 "></LoadingSkeleton>
            </div>
         </div>
      </div>
   )
}
CarouselItem.Loading = Loading

export default CarouselItem
