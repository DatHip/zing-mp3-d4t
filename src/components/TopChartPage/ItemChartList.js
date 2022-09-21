import React, { memo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { LazyLoadImage } from "react-lazy-load-image-component"
import fancyTimeFormat from "../../utils/fancyTimeFormat"
import ActionPlay from "../Icon/ActionPlay"
import LoadingIcon from "../Icon/LoadingIcon"
import ActionIcon from "../Icon/ActionIcon"
import { setPlay, setRandomSongs, setReady } from "../../features/SettingPlay/settingPlay"
import { fetchPlayList, setCurrentIndexSong, setCurrentIndexSongShuffle } from "../../features/QueueFeatures/QueueFeatures"
import { pushPlayListsLogged } from "../../features/Logged/loggedFeatures"
import { useCallback } from "react"

const ItemChartList = memo(({ indexNotVip, idAlbum, item, index, isChildren = false, isNoneRank, onFavourite }) => {
   const dispatch = useDispatch()
   const [toggleBtn, setToggleBtn] = useState(false)

   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)
   const playlistEncodeId = useSelector((state) => state.queueNowPlay.playlistEncodeId)
   const listSongShuffle = useSelector((state) => state.queueNowPlay.listSongShuffle)
   const infoCurrenAlbum = useSelector((state) => state.queueNowPlay.infoCurrenAlbum)

   const { playing, isReady, isRandom } = useSelector((state) => state.setting)

   const getRankStatus = useCallback((startus) => {
      if (startus === 0) {
         return <span className="material-icons-outlined line">minimize</span>
      } else if (startus > 0) {
         return <span className="material-icons-outlined up">arrow_drop_up</span>
      } else if (startus < 0) {
         return <span className="material-icons-outlined down"> arrow_drop_down </span>
      }
   }, [])

   let active = currentEncodeId === item?.encodeId
   let activeAlbum = idAlbum === playlistEncodeId

   const fetchSongs = async (e) => {
      // check active album && not vip
      if (item?.streamingStatus === 2) {
         return toast("Dành Cho Tài Khoản VIP", {
            type: "info",
         })
      }

      if (activeAlbum) {
         if (!isRandom) {
            dispatch(setReady(false))
            dispatch(setCurrentIndexSong(indexNotVip))
            dispatch(setPlay(true))
         }

         if (isRandom) {
            dispatch(setPlay(false))
            dispatch(setReady(false))
            const indexSheffle = listSongShuffle.find((e) => e.encodeId === item?.encodeId)
            const indexOff = listSongShuffle.indexOf(indexSheffle)
            if (indexOff !== -1) {
               dispatch(setCurrentIndexSongShuffle(indexOff))
            }
            dispatch(setPlay(true))
         }
      }
      if (!activeAlbum) {
         if (!isRandom) {
            const hi = async () => {
               setToggleBtn(true)
               dispatch(setReady(false))
               dispatch(setPlay(false))
               await dispatch(fetchPlayList(idAlbum))
               await dispatch(setCurrentIndexSong(indexNotVip))
               await dispatch(setPlay(true))
               await dispatch(pushPlayListsLogged(infoCurrenAlbum))
            }
            hi()
         }

         if (isRandom) {
            const hi = async () => {
               setToggleBtn(true)
               dispatch(setReady(false))
               dispatch(setPlay(false))
               await dispatch(fetchPlayList(idAlbum))
               await dispatch(setCurrentIndexSong(indexNotVip))
               await dispatch(setPlay(true))
               await dispatch(pushPlayListsLogged(infoCurrenAlbum))
               await dispatch(setRandomSongs())
               await dispatch(setRandomSongs())
            }
            hi()
         }
      }
   }

   return (
      <div
         className={`zing-chart_item main_page-hover
       ${active ? "active" : ""}`}
      >
         <div className="zing-chart_item-left">
            {!isNoneRank && (
               <div className="zing-chart_item-oder">
                  <span className="zing-chart-top">{index + 1}</span>
                  <div className="zing-chart-rank">
                     <div className="zing-chart-rank-status">{getRankStatus(item?.rakingStatus)}</div>
                     <div className="zing-chart-rank-num">{item?.rakingStatus === 0 ? "" : Math.abs(item?.rakingStatus)}</div>
                  </div>
               </div>
            )}

            <div className="zing-chart_item-info">
               <div className="zing-chart_item-img">
                  <div className="main-page_list-item_img">
                     <div className="release_list-item-img">
                        <LazyLoadImage src={item?.thumbnail} alt={item?.title} />
                     </div>
                     <div className="recently_list-item_hover">
                        <div className="recently_btn-hover recently_btn-hover-play">
                           {active && (
                              <>
                                 {isReady && (
                                    <>
                                       {!playing && (
                                          <span onClick={() => dispatch(setPlay(true))}>
                                             <ActionPlay></ActionPlay>
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
                              <span onClick={fetchSongs}>
                                 {!toggleBtn ? <ActionPlay></ActionPlay> : !isReady && <LoadingIcon notLoading></LoadingIcon>}
                              </span>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="zing-chart_item-text">
                  <div
                     className={`zing-chart_item-name ${
                        item?.streamingStatus === 1 ? "" : item?.streamingStatus === 2 ? "is-vip" : ""
                     }`}
                  >
                     {item?.title} <div className="is-vip_img"></div>
                  </div>
                  <div className="zing-chart_item-artist">
                     {item?.artists &&
                        item?.artists?.slice(0, 3)?.map((e, index) => {
                           let prara = ", "

                           if (index === 2) {
                              prara = "..."
                           }

                           if (item?.artists.length === 1) {
                              prara = ""
                           }
                           if (item?.artists.length === 2 && index === 1) {
                              prara = ""
                           }
                           if (item?.artists.length === 3 && index === 2) {
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
         {isChildren ? (
            ""
         ) : (
            <div className="zing-chart_item-center">
               <p className="thesong_name">{item?.album?.title || item?.title}</p>
            </div>
         )}
         <div className="zing-chart_item-right gap-3">
            {onFavourite && (
               <div className="player_queue-btn player_btn zm-btn">
                  <i className="icon ic-like-full" />
                  <span className="playing_title-hover">Thêm vào thư viện </span>
               </div>
            )}
            <p className="thesong_time">{fancyTimeFormat(item?.duration)}</p>
         </div>
      </div>
   )
})

export default ItemChartList
