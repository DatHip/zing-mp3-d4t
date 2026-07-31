/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react"
import styled from "styled-components"
import formartTimeNewFeed from "../../utils/formartTimeNewFeed"
import ReactPlayer from "react-player"

const PortalStyle = styled.div`
   .message-wrapper {
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 15px;
      background: var(--primary-bg);
      .noti-message {
         background-color: var(--alpha-bg);
         color: var(--text-second);
         font-weight: 500;
         padding: 10px 15px;
         border-radius: 4px;
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }

   .feed-detail {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #000;
      img {
         position: relative;
         object-fit: cover;
         width: auto;
      }
   }
   .theme-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1080;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--dark-alpha-50);
   }

   .alert-enter {
      opacity: 0;
      transform: scale(0.9);
   }
   .alert-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 300ms, transform 300ms;
   }
   .alert-exit {
      opacity: 1;
   }
   .alert-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 300ms, transform 300ms;
   }

   .zm-portal-modal .modal {
      background-color: var(--primary-bg);
      border-radius: 8px;
      max-width: 900px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      z-index: 40;
   }
   .theme-modal .modal-content {
      width: 80vw;
      max-width: 900px;
   }

   .theme-modal .modal-content .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      margin: 0;
      color: var(--text-primary);
      cursor: pointer;
      i {
         font-size: 24px;
      }
   }

   .subtitle {
      font-size: 12px;
      font-weight: 300;
      margin-top: 3px;
      white-space: nowrap;
      color: var(--text-secondary);
      &:hover {
         color: var(--link-text-hover);
      }
   }

   .recently_list-item_hover {
      background-color: rgba(0, 0, 0, 0.2);
   }
   .name {
      &:hover {
         color: var(--link-text-hover);
      }
   }

   .btn-care {
      color: var(--link-text-hover);
      &:hover {
         filter: brightness(0.9);
      }

      &.is-care {
         color: var(--text-placeholder);
      }
   }
   .title {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 20;
      height: auto;
      overflow: hidden;
   }

   .title-desp {
      border-top: 1px solid var(--border-secondary);
      border-bottom: 1px solid var(--border-secondary);
   }
   .feed-footer {
      border-bottom: 1px solid var(--border-secondary);
   }
   .recently_list-item_hover {
      display: flex !important;
   }
   .main_page-hover:hover img {
      transform: scale(1) !important;
   }
   .list-comment {
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 10px;
      flex-shrink: 0;
   }

   .zm-btn.close-feed-modal {
      position: fixed;
      color: var(--white);
      margin: 0;
      top: 14px;
      right: 14px;
      width: 40px;
      height: 40px;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: hsla(0, 0%, 100%, 0.3);
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 30%);
      .icon.ic-svg-close-white {
         background-image: url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.7.23/static/media/close-white.42640965.svg);
      }
   }

   @media (max-width: 1113px) {
      .feed-detail {
         overflow: hidden;
         height: 85% !important;
      }
      .row {
         flex-wrap: wrap !important ;
      }
   }
`

const PortalMVpage = ({ Portal, hide, data }) => {
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
         <PortalStyle>
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
                                       <p className="subtitle">{formartTimeNewFeed(createdTime)}</p>
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
         </PortalStyle>
      </Portal>
   )
}

export default PortalMVpage
