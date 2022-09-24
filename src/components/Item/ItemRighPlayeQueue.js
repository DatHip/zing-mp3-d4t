import React, { memo } from "react"
import ActionIcon from "../Icon/ActionIcon"
import ActionPlay from "../Icon/ActionPlay"
import LoadingIcon from "../Icon/LoadingIcon"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Draggable } from "react-beautiful-dnd"
import {
   pushSongHistoryPlayList,
   setCurrentIndexSongShuffle,
   setCurrentIndexSong,
   pushSongHistoryPlayListShuffle,
} from "../../features/QueueFeatures/QueueFeatures"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"

const ItemRighPlayer = ({ data, index, items, isHistory, setToggleSilde, lastIndex }) => {
   const dispatch = useDispatch()
   const { playing, isReady, isRandom } = useSelector((state) => state.setting)

   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong)
   const playlistEncodeId = useSelector((state) => state.queueNowPlay.playlistEncodeId)
   const infoCurrenAlbum = useSelector((state) => state.queueNowPlay.infoCurrenAlbum)
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)

   let active = data?.encodeId === currentEncodeId
   let isPre = index < currentIndexSong

   if (isHistory) {
      return (
         <li className={`player_queue-item   ${active ? "player_queue-active" : ""} `}>
            <div className="player_queue-item-left">
               <div className="player_queue-left">
                  <LazyLoadImage className="player_queue-img" src={data?.thumbnail} alt="" />
                  <div className="player_queue-img-hover">
                     {!active && (
                        <div
                           onClick={() => {
                              dispatch(setReady(false))
                              const item = [...items]
                              let isFind = item.find((e) => e.encodeId === data.encodeId)
                              if (isFind) {
                                 let index = item.indexOf(isFind)
                                 item.splice(index, 1)
                              }

                              const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)]
                              const res = insert(item, currentIndexSong + 1, data)

                              dispatch(pushSongHistoryPlayList({ item: data, list: res, index: currentIndexSong + 1 }))
                              if (isRandom) {
                                 dispatch(pushSongHistoryPlayListShuffle({ item: data, list: res, index: currentIndexSong + 1 }))
                              }

                              setToggleSilde((value) => !value)
                              dispatch(setPlay(true))
                           }}
                        >
                           {<ActionPlay></ActionPlay>}
                        </div>
                     )}

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
                  </div>
               </div>
               <div className="player_queue-music-info">
                  <div className="player_queue-music">{data?.title}</div>
                  <div className="player_queue-name">
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
                                 <Link to={`/nghe-si/${e.alias}/`}>{e.name}</Link>
                                 {prara}
                              </span>
                           )
                        })}
                  </div>
               </div>
            </div>
            <div className="player_queue-item-right">
               <div className="player_queue-btn player_btn zm-btn">
                  <i className="icon ic-like"></i>
                  <span className="playing_title-hover">Thêm vào thư viện </span>
               </div>
               <div className="player_queue-btn player_btn zm-btn">
                  <i className="icon ic-more"></i>
                  <span className="playing_title-hover">Xem thêm</span>
               </div>
            </div>
         </li>
      )
   }

   return (
      <Draggable key={data.encodeId} draggableId={data.encodeId} index={index}>
         {(provoied, snapshot) => (
            <div draggable ref={provoied.innerRef} {...provoied.dragHandleProps} {...provoied.draggableProps}>
               <li
                  className={`player_queue-item ${isPre ? "is-pre" : ""} ${snapshot.isDragging ? "active-dragg" : ""} ${
                     active ? "player_queue-active" : ""
                  } `}
               >
                  <div className="player_queue-item-left">
                     <div className="player_queue-left">
                        <LazyLoadImage className="player_queue-img" src={data?.thumbnail} alt="" />
                        <div className="player_queue-img-hover">
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
                              <div
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
                                 {<ActionPlay></ActionPlay>}
                              </div>
                           )}
                        </div>
                     </div>
                     <div className="player_queue-music-info">
                        <div className="player_queue-music">{data?.title}</div>
                        <div className="player_queue-name">
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
                                       <Link to={`/nghe-si/${e.alias}/`}>{e.name}</Link>
                                       {prara}
                                    </span>
                                 )
                              })}
                        </div>
                     </div>
                  </div>
                  <div className="player_queue-item-right">
                     <div className="player_queue-btn player_btn zm-btn">
                        <i className="icon ic-like"></i>
                        <span className="playing_title-hover">Thêm vào thư viện </span>
                     </div>
                     <div className="player_queue-btn player_btn zm-btn">
                        <i className="icon ic-more"></i>
                        <span className="playing_title-hover">Xem thêm</span>
                     </div>
                  </div>
               </li>
               {active && infoCurrenAlbum.length !== 0 && !isHistory && !snapshot.isDragging && (
                  <div className="next-songs">
                     {!lastIndex && <h3 className="title is-6">Tiếp theo</h3>}
                     <h3 className="subtitle is-6">
                        <span>Từ playlist</span>
                        <Link to={`/album/${playlistEncodeId}`}>
                           <span>
                              <span>{infoCurrenAlbum?.title}</span>

                              <span style={{ position: "fixed", visibility: "hidden", top: 0, left: 0 }}>…</span>
                           </span>
                        </Link>
                     </h3>
                  </div>
               )}
            </div>
         )}
      </Draggable>
   )
}

export default memo(ItemRighPlayer)
