import React, { memo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const OutstandingItemsStyles = styled.div`
   &.is-item-search {
      .media {
         &:hover {
            .recently_list-item_hover {
               transition: 0.2s !important;
               display: flex !important;
            }
         }
         border-radius: none !important;
         background-color: transparent !important;
         padding: 8px !important;
         border-radius: 2px !important;
         transition: unset !important;
         cursor: pointer;
         .icon {
            font-size: 22px;
            width: 22px;
            height: 22px;
         }
      }
   }

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

const OutstandingItems = memo(({ data, classGrid, type, isSearch }) => {
   if (isSearch) {
      return (
         <OutstandingItemsStyles className={`${classGrid || null} ${isSearch ? "is-item-search" : null} media-hover`}>
            <div className="media artist-item ">
               <div className="media-left mr-[10px]">
                  {isSearch && (
                     <Link
                        to={`/album/${data?.encodeId}`}
                        className={`${
                           isSearch ? "w-[50px] h-[50px]" : "w-[80px] h-[80px]"
                        } want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
                     >
                        <div className="want_list-item-link main-page_list-item_img">
                           <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                        </div>

                        {data?.type !== 4 && (
                           <div className="recently_list-item_hover text-white">
                              <div className="recently_btn-hover recently_btn-hover-play">
                                 <span>
                                    <i className="icon ic-play"></i>
                                 </span>
                              </div>
                           </div>
                        )}
                     </Link>
                  )}
               </div>
               <div className="media-right overflow-hidden">
                  <p className="type">{type}</p>
                  {data?.type === 4 && (
                     <>
                        <div className="title ">
                           <div className="is-ghost" to={`/nghe-si${data?.link}`}>
                              <span>{data?.name}</span>
                           </div>
                        </div>
                        <div className="subtitle">
                           <span className="followers">
                              Nghệ sĩ •{" "}
                              {data?.followers > 1000000
                                 ? data?.followers.toString().slice(0, -6) + "M"
                                 : data?.followers > 10000
                                 ? data?.followers.toString().slice(0, -3) + "K"
                                 : data.followers}{" "}
                              quan tâm
                           </span>
                        </div>
                     </>
                  )}

                  {data?.type === 1 && (
                     <>
                        <div className="title ">
                           <div to={`/alubm/${data?.encodeId}`}>
                              <span>{data?.title}</span>
                           </div>
                        </div>

                        <h3 className=" is-truncate subtitle ">
                           {data?.artists &&
                              data?.artists?.slice(0, 3)?.map((e, index) => {
                                 let prara = ", "

                                 if (index === 2) {
                                    prara = "..."
                                 }

                                 if (data?.artists.length === 1) {
                                    prara = ""
                                 }
                                 if (data?.artists.length === 2 && index === 1) {
                                    prara = ""
                                 }
                                 if (data?.artists.length === 3 && index === 2) {
                                    prara = ""
                                 }

                                 return (
                                    <span key={index}>
                                       <span to={`/nghe-si/${e.alias}/`}>{e.name}</span>
                                       {prara}
                                    </span>
                                 )
                              })}
                        </h3>
                     </>
                  )}
               </div>
            </div>
         </OutstandingItemsStyles>
      )
   }

   let typeLink

   if (type === "Nghệ sĩ") {
      typeLink = `/nghe-si${data?.link}/`
   }
   if (type === "Playlist") {
      typeLink = `/album/${data?.playlistId}`
   }
   if (type === "Bài Hát") {
      typeLink = `/album/${data?.playlistId}`
   }
   return (
      <OutstandingItemsStyles className={`${classGrid || null} ${isSearch ? "is-item-search" : null} media-hover`}>
         <Link to={typeLink || "/"} className="media artist-item  cursor-pointer">
            <div className="media-left mr-[20px]">
               {type === "Nghệ sĩ" && (
                  <div
                     // to={`/album/${data?.playlistId}`}
                     className={`${
                        isSearch ? "w-[50px] h-[50px]" : "w-[80px] h-[80px]"
                     } want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
                  >
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                     </div>

                     <div className="recently_list-item_hover text-white">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <i className="icon action-play ic-24-Shuffle"></i>
                           </span>
                        </div>
                     </div>
                  </div>
               )}
               {type !== "Nghệ sĩ" && !isSearch && (
                  <div
                     // to={`/album/${data?.encodeId}`}
                     className={`${
                        isSearch ? "w-[40px] h-[40px]" : "w-[80px] h-[80px]"
                     } want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
                  >
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                     </div>

                     <div className="recently_list-item_hover text-white">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <i className="icon ic-play"></i>
                           </span>
                        </div>
                     </div>
                  </div>
               )}
               {isSearch && (
                  <div
                     // to={`/album/${data?.encodeId}`}
                     className={`${
                        isSearch ? "w-[40px] h-[40px]" : "w-[80px] h-[80px]"
                     } want_list-item-link cursor-pointer main-page_list-item main_page-hover`}
                  >
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                     </div>

                     <div className="recently_list-item_hover text-white">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <i className="icon ic-play"></i>
                           </span>
                        </div>
                     </div>
                  </div>
               )}
            </div>
            <div className="media-right overflow-hidden ml-[6px]">
               <p className="type">{type}</p>
               {type === "Nghệ sĩ" && (
                  <>
                     <div className="title title-hover">
                        <div
                           className="is-ghost"
                           //  to={`/nghe-si${data?.link}`}
                        >
                           <span>{data?.name}</span>
                        </div>
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
                        <div className="is-ghost" to={`/alubm/${data?.encodeId}`}>
                           <span>{data?.title}</span>
                        </div>
                     </div>

                     <h3 className="is-one-line is-truncate subtitle ">
                        {data?.artists &&
                           data?.artists?.slice(0, 3)?.map((e, index) => {
                              let prara = ", "

                              if (index === 2) {
                                 prara = "..."
                              }

                              if (data?.artists.length === 1) {
                                 prara = ""
                              }
                              if (data?.artists.length === 2 && index === 1) {
                                 prara = ""
                              }
                              if (data?.artists.length === 3 && index === 2) {
                                 prara = ""
                              }

                              return (
                                 <span key={index}>
                                    <span className="is-ghost" to={`/nghe-si/${e.alias}/`}>
                                       {e.name}
                                    </span>
                                    {prara}
                                 </span>
                              )
                           })}
                     </h3>
                  </>
               )}
            </div>
         </Link>
      </OutstandingItemsStyles>
   )
})

export default OutstandingItems
