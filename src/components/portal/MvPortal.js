/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react"
import formatFeedTime from "utils/formatFeedTime"
import ReactPlayer from "react-player"
import { MvPortalStyles } from "./MvPortal.styles"


const MvPortal = ({ Portal, hide, data }) => {
   const [llike, setLike] = useState(false)
   const [care, setCare] = useState(false)
   const handleClickBackdrop = (e) => {
      const id = e.target.id
      if (id === "theme-overlay" || id === "btn-close-feed") hide()
   }

   const { like, publisher, createdTime, title, content, commend } = data

   let imgL
   let urlVideo
   if (content.type === "album") {
      imgL = content?.photos[0].url
   } else if (content.type === "feedVideo") {
      imgL = content?.thumbnail
      urlVideo = Object.values(content.source)[0]
   }

   return (
      <Portal>
         <MvPortalStyles>
            <div className="zm-portal-modal theme-modal-overlay" id="theme-overlay" onClick={handleClickBackdrop}>
               <div className="modal theme-modal is-active overflow-hidden ">
                  <div className="modal-content  h-[80vh]">
                     <button onClick={() => hide()} id="btn-close-feed" className="zm-btn close-feed-modal button" tabIndex="0">
                        <i className="icon ic-svg-close-white"></i>
                     </button>
                     <div className="flex row no-gutters  h-full overflow-y-auto overflow-x-hidden">
                        <div className="col l-7 m-12 c-12  relative h-full feed-detail">
                           {content.type === "album" && (
                              <div>
                                 <img src={imgL || ""} alt="" />
                              </div>
                           )}
                           {content.type === "feedVideo" && (
                              <div className="player-wrapper">
                                 <ReactPlayer
                                    url={urlVideo || ""}
                                    className="react-player outline-none"
                                    playing
                                    width="100%"
                                    height="100%"
                                    controls
                                 />
                              </div>
                           )}
                        </div>
                        <div className="l-5 m-12 c-12 w-full  !flex  flex-col items-center justify-between">
                           <div className="feed-top w-full flex flex-col flex-1 mb-auto">
                              <div className="feed-header my-[10px]">
                                 <div className="media flex items-center justify-start  px-[15px]">
                                    <div className="media-left mr-[10px] ">
                                       <figure className="image w-[48px] h-[48px] !rounded-full overflow-hidden">
                                          <img src={publisher.thumbnail} alt="" />
                                       </figure>
                                    </div>
                                    <div className="flex flex-col">
                                       <h3 className="mar-b-0 title">
                                          <span className="name">{publisher.name}</span>
                                          <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                                          <button
                                             onClick={() => setCare((value) => !value)}
                                             className={`btn-care ${care ? "is-care" : ""}`}
                                          >
                                             {care ? "Đã quan tâm" : "Quan Tâm"}
                                          </button>
                                       </h3>
                                       <p className="subtitle">{formatFeedTime(createdTime)}</p>
                                    </div>
                                 </div>
                                 <div className="title mt-[10px] px-[15px] py-[10px] title-desp">{title}</div>
                              </div>
                              <div className="feed-footer pb-[10px] mb-[10px] px-[15px]">
                                 <div className="actions flex gap-[20px]">
                                    <button
                                       onClick={() => setLike((value) => !value)}
                                       className="zm-btn mar-r-30 button !flex items-center justify-center gap-[2px]"
                                    >
                                       <i className={`icon ic-${llike ? "like-full" : "like"}`} />
                                       <span>Thích</span>
                                    </button>
                                    <button className="zm-btn button !flex items-center justify-center gap-[2px]" tabIndex={0}>
                                       <i className="icon ic-share" />
                                       <span>Chia sẻ</span>
                                    </button>
                                 </div>
                              </div>
                              <div className="feed-comment  px-[15px]">
                                 <div className="list-comment">
                                    <span>{like + (llike ? 1 : 0)} lượt thích </span>&nbsp;&nbsp;•&nbsp;&nbsp;{" "}
                                    <span>{commend} Bình luận</span>
                                 </div>
                                 {/* <>
                                    <MyComment></MyComment>
                                 </> */}
                              </div>
                           </div>
                           <div className="message-wrapper">
                              <input className="w-full outline-none border-none noti-message flex items-center justify-center"></input>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </MvPortalStyles>
      </Portal>
   )
}

export default MvPortal
