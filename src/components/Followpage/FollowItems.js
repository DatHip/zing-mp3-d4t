import React, { memo, useState } from "react"
import usePortal from "react-cool-portal"
import styled from "styled-components"
import formartTimeNewFeed from "../../utils/formartTimeNewFeed"
import PortalMVpage from "../Portal/PortalMVpage"

const ItemStyles = styled.div`
   border-radius: 8px;
   padding: 20px;
   box-shadow: 0 2px 10px 0 var(--main-box-shadow);
   background-color: var(--box-item-bg);
   position: relative;
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
      -webkit-line-clamp: 5;
      height: auto;
      overflow: hidden;
   }
   .recently_list-item_hover {
      display: flex !important;
   }
   .main_page-hover:hover img {
      transform: scale(1) !important;
   }
`

const FollowItems = memo(({ data }) => {
   const { Portal, show, hide } = usePortal({ defaultShow: false })

   const [llike, setLike] = useState(false)
   const [care, setCare] = useState(false)
   const { like, publisher, shortDescription, createdTime, title, content, commend } = data

   let imgL
   if (content.type === "album") {
      imgL = content?.photos[0].url
   } else if (content.type === "feedVideo") {
      imgL = content?.thumbnail
   }

   const handleClick = (e) => {
      show()
   }

   return (
      <div className="col  !mb-[15px]">
         <ItemStyles className="zm-card feed-card  col text-white">
            <div className="feed-header mb-[10px]">
               <div className="media flex items-center justify-start">
                  <div className="media-left mr-[10px] ">
                     <figure className="image w-[48px] h-[48px] !rounded-full overflow-hidden">
                        <img src={publisher.thumbnail} alt="" />
                     </figure>
                  </div>
                  <div className="flex flex-col">
                     <h3 className="mar-b-0 title">
                        <span className="name">{publisher.name}</span>
                        <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                        <button onClick={() => setCare((value) => !value)} className={`btn-care ${care ? "is-care" : ""}`}>
                           {care ? "Đã quan tâm" : "Quan Tâm"}
                        </button>
                     </h3>
                     <p className="subtitle">{formartTimeNewFeed(createdTime)}</p>
                  </div>
               </div>
               <div className="title mt-[10px]">{title || ""}</div>
            </div>
            <div className=" mb-[15px] feed-content">
               <div onClick={handleClick} className={`want_list-item-link cursor-pointer main-page_list-item main_page-hover `}>
                  <div className="want_list-item-link main-page_list-item_img ">
                     <figure>
                        <img src={imgL || ""} alt="" />
                     </figure>
                  </div>
                  {content.type === "feedVideo" && (
                     <div className="recently_list-item_hover text-white">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                           </span>
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div className="feed-footer">
               <div className="actions flex gap-[20px]">
                  <button
                     onClick={() => setLike((value) => !value)}
                     className="zm-btn mar-r-30 button !flex items-center justify-center gap-[2px]"
                  >
                     <i className={`icon ic-${llike ? "like-full" : "like"}`} />
                     <span>{like + (llike ? 1 : 0)}</span>
                  </button>
                  <button className="zm-btn button !flex items-center justify-center gap-[2px]" tabIndex={0}>
                     <i className="icon ic-comment" />
                     <span>{commend}</span>
                  </button>
               </div>
            </div>
            <PortalMVpage Portal={Portal} hide={hide} data={data}></PortalMVpage>
         </ItemStyles>
      </div>
   )
})

export default FollowItems
