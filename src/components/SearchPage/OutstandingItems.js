import React, { memo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const OutstandingItemsStyles = styled.div`
   &.media-hover {
      &:hover .media {
         background-color: var(--box-hot-item-bg-hover) !important;
      }
   }
   .media {
      transition: all 0.2s linear;
      background-color: var(--box-hot-item-bg);
      align-items: center;
      display: flex;
      text-align: left;
      padding: 10px;
      border-radius: 5px;
   }

   .media-left,
   .media-right {
      margin-right: 10px;
   }
   .type {
      font-size: 12px;
      font-weight: 400;
      color: var(--text-secondary);
      margin-bottom: 3px;
      white-space: nowrap;
   }

   .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: var(--text-primary);
      margin-bottom: 0;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      height: auto;
      overflow: hidden;
   }
   .subtitle {
      margin-top: 2px;
      font-weight: 400;
      font-size: 12px;
      color: var(--text-secondary);
   }

   i {
      margin-right: 0;
   }
   .title-hover:hover {
      text-decoration: underline;
   }
`

const OutstandingItems = memo(({ data, classGrid, type }) => {
   return (
      <OutstandingItemsStyles className={`${classGrid} media-hover`}>
         <div className="media artist-item ">
            <div className="media-left mr-[10px]">
               {type === "Nghệ sĩ" && (
                  <Link
                     to={`/album/${data?.playlistId}`}
                     className={`w-[80px] h-[80px] want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
                  >
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail} alt="" />
                     </div>

                     <div className="recently_list-item_hover text-white">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <i className="icon action-play ic-24-Shuffle"></i>
                           </span>
                        </div>
                     </div>
                  </Link>
               )}
               {type !== "Nghệ sĩ" && (
                  <Link
                     to={`/album/${data?.encodeId}`}
                     className={`w-[80px] h-[80px] want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
                  >
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail} alt="" />
                     </div>

                     <div className="recently_list-item_hover text-white">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <i className="icon ic-play"></i>
                           </span>
                        </div>
                     </div>
                  </Link>
               )}
            </div>
            <div className="media-right overflow-hidden">
               <p className="type">{type}</p>
               {type === "Nghệ sĩ" && (
                  <>
                     <div className="title title-hover">
                        <Link className="is-ghost" to={`/nghe-si${data?.link}`}>
                           <span>{data?.name}</span>
                        </Link>
                     </div>
                     <div className="subtitle">
                        <span className="followers">
                           {data?.totalFollow > 1000000
                              ? data?.totalFollow.toString().slice(0, -6) + "M"
                              : data?.totalFollow > 10000
                              ? data?.totalFollow.toString().slice(0, -3) + "K"
                              : data.totalFollow}{" "}
                           quan tâm
                        </span>
                     </div>
                  </>
               )}

               {type !== "Nghệ sĩ" && (
                  <>
                     <div className="title title-hover">
                        <Link className="is-ghost" to={`/alubm/${data?.encodeId}`}>
                           <span>{data?.title}</span>
                        </Link>
                     </div>

                     <h3 className="is-one-line is-truncate subtitle title-hover">
                        <Link className="is-ghost" to={``}>
                           Sơn Tùng M-TP
                        </Link>
                     </h3>
                  </>
               )}
            </div>
         </div>
      </OutstandingItemsStyles>
   )
})

export default OutstandingItems
