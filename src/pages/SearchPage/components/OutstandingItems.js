import React, { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { usePlayback } from "hook/usePlayback"
import { SearchResultItemStyles } from "components/search/SearchResultItem.styles"

/** Where the row links to, per result kind. */
const linkFor = (type, data) => {
   if (type === "Nghệ sĩ") return `/nghe-si${data?.link}/`
   if (type === "Playlist" || type === "Bài Hát") return `/album/${data?.playlistId}`
   return "/"
}

/** The highlighted "Nổi bật" result at the top of the search page. */
const OutstandingItems = memo(({ data, classGrid, type }) => {
   const navigate = useNavigate()
   const { playSong, playAlbum } = usePlayback()

   const handleClick = useCallback(() => {
      if (type === "Nghệ sĩ") return playAlbum(data?.playlistId)
      if (type === "Playlist") {
         navigate(`/album/${data?.encodeId}`)
         return playAlbum(data?.encodeId, {
            logAs: data.textType === "Playlist" ? data : undefined,
         })
      }
      if (type === "Bài Hát") return playSong(data)
   }, [type, data, navigate, playAlbum, playSong])

   const typeLink = linkFor(type, data)

   return (
      <SearchResultItemStyles className={`${classGrid || null} media-hover`}>
         <div to={typeLink || "/"} className="media artist-item  cursor-pointer">
            <div onClick={handleClick} className="media-left mr-[20px]">
               {type === "Nghệ sĩ" && (
                  <div
                     className="w-[80px] h-[80px] want_list-item-link cursor-pointer main-page_list-item main_page-hover"
                  >
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                     </div>

                     <div className="recently_list-item_hover ">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           <span>
                              <i className="icon action-play ic-24-Shuffle"></i>
                           </span>
                        </div>
                     </div>
                  </div>
               )}
               {type !== "Nghệ sĩ" && (
                  <div className="w-[80px] h-[80px] want_list-item-link cursor-pointer main-page_list-item main_page-hover">
                     <div className="want_list-item-link main-page_list-item_img">
                        <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                     </div>

                     <div className="recently_list-item_hover ">
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
         </div>
      </SearchResultItemStyles>
   )
})

export default OutstandingItems
