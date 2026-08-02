import React, { memo } from "react"
import ActionIcon from "components/ui/ActionIcon"
import ActionPlay from "components/ui/ActionPlay"
import LoadingIcon from "components/ui/LoadingIcon"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {
   pushSongHistoryPlayList,
   setCurrentIndexSongShuffle,
   setCurrentIndexSong,
   pushSongHistoryPlayListShuffle,
} from "features/queue/queueSlice"
import { setPlay, setReady } from "features/setting/settingSlice"
import useLike from "hook/useLike"
import { selectCurrentAlbum, selectCurrentEncodeId, selectCurrentIndex, selectPlaylistEncodeId } from "features/queue/queueSelectors"
import { selectIsRandom, selectIsReady, selectPlaying } from "features/setting/settingSelectors"

// DragWrapper is react-beautiful-dnd's Draggable, injected by QueueDragList. It is
// a prop rather than an import so this row — which the history tab renders without
// any drag behaviour — does not pull the DnD library into main.js.
const QueueItem = ({ data, index, items, isHistory, setToggleSilde, lastIndex, DragWrapper }) => {
   const dispatch = useDispatch()
   const playing = useSelector(selectPlaying)
   const isReady = useSelector(selectIsReady)
   const isRandom = useSelector(selectIsRandom)
   const { isLike, handleLike } = useLike(data, 2)

   const currentIndexSong = useSelector(selectCurrentIndex)
   const playlistEncodeId = useSelector(selectPlaylistEncodeId)
   const infoCurrenAlbum = useSelector(selectCurrentAlbum)
   const currentEncodeId = useSelector(selectCurrentEncodeId)

   let active = data?.encodeId === currentEncodeId || data?.id === currentEncodeId
   let isPre = index < currentIndexSong

   if (isHistory) {
      return (
         <li className={`player_queue-item   ${active ? "player_queue-active" : ""} `}>
            <div className="player_queue-item-left">
               <div className="player_queue-left">
                  <LazyLoadImage className="player_queue-img" src={data?.thumbnail || data?.thumb} alt="" />
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
               <div onClick={handleLike} className="player_queue-btn player_btn zm-btn">
                  <i className={`icon  ${isLike ? "ic-like-full" : "ic-like"} `}></i>
                  <span className="playing_title-hover"> {isLike ? " Xóa khỏi " : "Thêm vào"} thư viện </span>
               </div>
               <div className="player_queue-btn player_btn zm-btn">
                  <i className="icon ic-more"></i>
                  <span className="playing_title-hover">Xem thêm</span>
               </div>
            </div>
         </li>
      )
   }

   if (!DragWrapper) return null

   return (
      <DragWrapper key={data.encodeId || data.id} draggableId={data.encodeId || data.id} index={index}>
         {(provoied, snapshot) => (
            <div draggable ref={provoied.innerRef} {...provoied.dragHandleProps} {...provoied.draggableProps}>
               <li
                  className={`player_queue-item ${isPre ? "is-pre" : ""} ${snapshot.isDragging ? "active-dragg" : ""} ${
                     active ? "player_queue-active" : ""
                  } `}
               >
                  <div className="player_queue-item-left">
                     <div className="player_queue-left">
                        <LazyLoadImage className="player_queue-img" src={data?.thumbnail || data?.thumb} alt="" />
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
                     {/* <div className="player_queue-btn player_btn zm-btn">
                        <i className="icon ic-like"></i>
                        <span className="playing_title-hover">Thêm vào thư viện </span>
                     </div> */}
                     <div onClick={handleLike} className="player_queue-btn player_btn zm-btn">
                        <i className={`icon  ${isLike ? "ic-like-full" : "ic-like"} `}></i>
                        <span className="playing_title-hover"> {isLike ? " Xóa khỏi " : "Thêm vào"} thư viện </span>
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
      </DragWrapper>
   )
}

export default memo(QueueItem)
