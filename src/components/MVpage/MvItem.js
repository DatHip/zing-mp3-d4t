import React, { memo } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import fancyTimeFormat from "../../utils/fancyTimeFormat"
import { useDispatch, useSelector } from "react-redux"
import { setLocationOpen, setOpenOn } from "../../features/ToggleMainMv/toggleMainMv"

const MvItem = memo(({ data, isMvFull }) => {
   const { artists, duration, encodeId, title, thumbnailM, artist, thumbnail } = data
   const stateOpen = useSelector((state) => state.setOpenMainMv.isOpen)

   const dispatch = useDispatch()

   const location = useLocation()
   const navigete = useNavigate()

   const handleClick = () => {
      navigete(`/video-clip/${encodeId}`)

      if (!stateOpen) {
         dispatch(setOpenOn())
         dispatch(setLocationOpen(location.pathname))
      }
   }

   return (
      <div className={`col mv-items ${!isMvFull ? "l-4 m-4 c-6 " : "l-3 m-4 c-6 !mb-[20px]"}`}>
         <div
            onClick={() => handleClick()}
            className="cursor-pointer todaychoice_list-item-link main-page_list-item main_page-hover relative"
         >
            <div className="todaychoice_list-item-link main-page_list-item_img" href="#">
               <figure>
                  <img src={thumbnailM} alt={title} />
                  {data.streamingStatus === 2 && (
                     <div className="zm-brand-vip">
                        <i className="icon ic- z-ic-svg ic-svg-vip-label"></i>
                     </div>
                  )}
               </figure>
            </div>
            <div className="recently_list-item_hover">
               <div className="recently_btn-hover recently_btn-hover-play">
                  <span>
                     <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                  </span>
               </div>
            </div>
            <div className="main_mv-item-time">{fancyTimeFormat(duration)}</div>
         </div>
         <div className="todaychoice_list-item-title">
            <div className="main_mv-avatr">
               <img src={artist?.thumbnail || thumbnail || ""} alt={title} />
            </div>
            <div className="main_mv-info-title">
               <a className="main_title-text" href="#">
                  {title}
               </a>
               <div className="main_subtitle">
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
               </div>
            </div>
         </div>
      </div>
   )
})

export default MvItem
