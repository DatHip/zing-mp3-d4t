import React, { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { usePlayback } from "hook/usePlayback"
import { SearchResultItemStyles } from "./SearchResultItem.styles"

/**
 * One row of the search-box dropdown.
 *
 * Zing tags a suggestion by `type`: 4 is an artist, 1 is a song. This used to
 * share a component with the search page's "Nổi bật" result, behind an
 * `if (isSearch)` that returned entirely different markup — two components
 * under one name, each carrying the other's props.
 */
const SearchSuggestionItem = memo(({ data, classGrid, setOpen }) => {
   const navigate = useNavigate()
   const { playSongById } = usePlayback()

   const handleClick = useCallback(() => {
      if (data?.type === 4) navigate(`/nghe-si/${data?.aliasName}`)
      else if (data?.type === 1) playSongById(data)
      else return
      setOpen(false)
   }, [data, navigate, playSongById, setOpen])

   return (
      <SearchResultItemStyles className={`${classGrid || null} is-item-search media-hover`}>
         <div onClick={handleClick} className="media artist-item ">
            <div className="media-left mr-[10px]">
               <div className="w-[50px] h-[50px] want_list-item-link main-page_list-item main_page-hover">
                     <div className="want_list-item-link  cursor-pointer main-page_list-item_img">
                        <img src={data?.thumbnail || data?.avatar || data?.thumb} alt="" />
                     </div>

                     {data?.type !== 4 && (
                        <div className="recently_list-item_hover ">
                           <div className="recently_btn-hover recently_btn-hover-play">
                              <span>
                                 <i className="icon ic-play"></i>
                              </span>
                           </div>
                        </div>
                     )}
               </div>
            </div>
            <div className="media-right overflow-hidden">
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
      </SearchResultItemStyles>
   )
})

export default SearchSuggestionItem
