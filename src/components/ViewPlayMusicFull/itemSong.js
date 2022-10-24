import React, { memo } from "react"
import { useDispatch } from "react-redux"

import { useSelector } from "react-redux"
import { setCurrentIndexSong, setCurrentIndexSongShuffle } from "../../features/QueueFeatures/QueueFeatures"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import ActionIcon from "../Icon/ActionIcon"
import LoadingIcon from "../Icon/LoadingIcon"

const ItemSong = memo(({ data, index }) => {
   const dispatch = useDispatch()

   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)
   const { playing, isRandom, isReady } = useSelector((state) => state.setting)
   let active = currentEncodeId === data?.encodeId

   return (
      <div className={`want_list-item slick-slide ${currentEncodeId === data?.encodeId ? "swiper-slide-active-playing" : ""}`}>
         <div className="want_list-item-link main-page_list-item main_page-hover" href="#">
            <div className="want_list-item-link main-page_list-item_img">
               <img src={data?.thumbnailM || data?.thumbnail} alt={data?.title} />
            </div>
            <div className="recently_list-item_hover ">
               <div className="recently_btn-hover player_btn like">
                  <i className="icon ic-like "></i>
                  <span className="playing_title-hover">Thêm vào thư viện </span>
               </div>
               <div className="recently_btn-hover recently_btn-hover-play">
                  {active && (
                     <>
                        {isReady && (
                           <>
                              {!playing && (
                                 <span onClick={() => dispatch(setPlay(true))}>
                                    <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                                 </span>
                              )}
                              {playing && (
                                 <span onClick={() => dispatch(setPlay(false))}>
                                    <ActionIcon></ActionIcon>
                                 </span>
                              )}
                           </>
                        )}
                        {!isReady && <LoadingIcon notLoading></LoadingIcon>}
                     </>
                  )}
                  {!active && (
                     <span
                        onClick={() => {
                           dispatch(setReady(false))
                           if (!isRandom) {
                              dispatch(setCurrentIndexSong(index))
                           }
                           if (isRandom) {
                              dispatch(setCurrentIndexSongShuffle(index))
                           }

                           dispatch(setPlay(true))
                        }}
                     >
                        <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                     </span>
                  )}
               </div>
               <div className="recently_btn-hover player_btn">
                  <span className="material-icons-outlined "> more_horiz </span>
                  <span className="playing_title-hover">Xem thêm</span>
               </div>
            </div>
         </div>
         <div className="want_list-item-title">
            <div className="main_title-text">{data?.title}</div>
            <div className="main_subtitle">
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
            </div>
         </div>
      </div>
   )
})

export default ItemSong
