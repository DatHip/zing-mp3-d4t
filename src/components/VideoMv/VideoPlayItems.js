import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { setInfoCurrentMv } from "../../features/QueueFeatures/QueueFeatures"

const VideoPlayItemsStyles = styled.div`
   .title {
      font-weight: 700;
      line-height: 1.3;
      white-space: normal;
   }

   .video-player-item:hover {
      background-color: hsla(0, 0%, 100%, 0.1);
   }
`

const VideoPlayItems = memo(({ classGird, data }) => {
   const dispatch = useDispatch()

   return (
      <VideoPlayItemsStyles className={`${classGird} video-playing-item  w-full `}>
         <div className="w-full flex items-center video-player-item py-[15px] px-[15px]">
            <div className="media-left">
               <Link
                  onClick={() => {
                     dispatch(setInfoCurrentMv(data))
                  }}
                  to={`/video-clip/${data.encodeId}`}
                  className={`want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
               >
                  <div className="want_list-item-link main-page_list-item_img w-[120px] ">
                     <LazyLoadImage src={data.thumbnailM} alt={""} />
                  </div>

                  <div className="recently_list-item_hover ">
                     <div className="recently_btn-hover recently_btn-hover-play">
                        <span>
                           <i className="icon action-play ic-play  !mr-0"></i>
                        </span>
                     </div>
                  </div>
               </Link>
            </div>
            <div className="media-right ml-[10px]">
               <div className="title">
                  <Link
                     onClick={() => {
                        dispatch(setInfoCurrentMv(data))
                     }}
                     to={`/video-clip/${data.encodeId}`}
                  >
                     {data.title}
                  </Link>
               </div>
               <div className="subtitle ">
                  {data.artists.map((e, index) => {
                     if (index > 2) return

                     let prara = ", "

                     if (index === 2) {
                        prara = "..."
                     }

                     if (data.artists.length === 1) {
                        prara = ""
                     }
                     if (data.artists.length === 2 && index === 1) {
                        prara = ""
                     }
                     if (data.artists.length === 3 && index === 2) {
                        prara = ""
                     }
                     return (
                        <span key={index}>
                           <Link className="is-ghost title-hover" to={`/nghe-si/${e.alias}/`}>
                              {e.name}
                           </Link>
                           {prara}
                        </span>
                     )
                  })}
               </div>
            </div>
         </div>
      </VideoPlayItemsStyles>
   )
})

export default VideoPlayItems
