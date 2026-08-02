import React, { memo, useState, Suspense } from "react"
import QueueItem from "components/player/QueueItem"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
   setDraggItemActive,
   setDraggUpdateList,
   setListSongShuffle,
   setNextSong,
   setDraggItemActiveShuffle,
   setDraggUpdateListShuffle,
   setNextSongShuffle,
   fetchPlayList,
} from "features/queue/queueSlice"
import shuffle from "lodash/shuffle"

import scrollIntoView from "smooth-scroll-into-view-if-needed"
import { useLayoutEffect } from "react"
import { useCallback } from "react"
import { setPlay, setReady } from "features/setting/settingSlice"
import ClearQueueButton from "components/player/ClearQueueButton"
import AlarmButton from "components/player/AlarmButton"
import { selectRecentSongs } from "features/logged/loggedSelectors"
import { selectCurrentEncodeId, selectCurrentIndex, selectCurrentSong, selectListSong, selectPlaylistEncodeId } from "features/queue/queueSelectors"
import { selectQueuePanel } from "features/queuePanel/queuePanelSelectors"
import { selectIsRandom } from "features/setting/settingSelectors"

const importQueueDragList = () => import("./QueueDragList")
const QueueDragList = React.lazy(importQueueDragList)

const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list)
   const [removed] = result.splice(startIndex, 1)
   result.splice(endIndex, 0, removed)
   return result
}

const QueuePanel = () => {
   const isToggle = useSelector(selectQueuePanel)

   const listSong = useSelector(selectListSong)
   const currentIndexSong = useSelector(selectCurrentIndex)
   const infoSongCurrent = useSelector(selectCurrentSong)
   const currentEncodeId = useSelector(selectCurrentEncodeId)
   const playlistEncodeId = useSelector(selectPlaylistEncodeId)

   const recentSongs = useSelector(selectRecentSongs)

   // Narrow read: subscribing to the whole setting slice re-rendered the entire
   // queue list on every volume drag, play/pause and isReady flip.
   const isRandom = useSelector(selectIsRandom)
   const [toggleSilde, setToggleSilde] = useState(false)
   const [items, setItems] = useState([])
   const dispatch = useDispatch()

   useLayoutEffect(() => {
      setItems(listSong)
   }, [listSong])

   useLayoutEffect(() => {
      if (isRandom && listSong.length > 0) {
         let arrNext = listSong.filter((e) => e.encodeId !== infoSongCurrent.encodeId)
         let arrShuffle = [infoSongCurrent, ...shuffle(arrNext)]
         dispatch(setListSongShuffle(arrShuffle))
         setItems(arrShuffle)
      }

      if (!isRandom) {
         const indexCurrentSongActive = listSong.indexOf(infoSongCurrent)
         setItems(listSong)
         dispatch(setNextSong(indexCurrentSongActive))
      }
   }, [isRandom, playlistEncodeId])

   // Warm the drag list during idle time once there is a queue, so opening the
   // panel never waits on the chunk.
   useEffect(() => {
      if (!currentEncodeId) return
      if (typeof window.requestIdleCallback === "function") {
         const handle = window.requestIdleCallback(importQueueDragList, { timeout: 3000 })
         return () => window.cancelIdleCallback(handle)
      }
      const handle = setTimeout(importQueueDragList, 2000)
      return () => clearTimeout(handle)
   }, [currentEncodeId])

   useEffect(() => {
      let node = document.querySelector(`div[data-rbd-draggable-id='${currentEncodeId}']`)
      if (!node) return

      setTimeout(() => {
         scrollIntoView(node, {
            block: "center",
            behavior: "smooth",
            scrollMode: "if-needed",
         })
      }, 200)
   }, [currentEncodeId, isRandom, playlistEncodeId, toggleSilde])

   const onDragEnd = useCallback(
      (result) => {
         const { destination, source } = result

         if (!destination) {
            return
         }

         const reorderedItems = reorder(items, source.index, destination.index)

         let indexActive = reorderedItems.find((e) => e.encodeId === currentEncodeId)
         if (!isRandom) {
            if (source.index === currentIndexSong) {
               dispatch(setDraggItemActive(destination.index))
            }
            setItems(reorderedItems)
            dispatch(setNextSong(reorderedItems.indexOf(indexActive)))
            dispatch(setDraggUpdateList(reorderedItems))
         }
         if (isRandom) {
            if (source.index === currentIndexSong) {
               dispatch(setDraggItemActiveShuffle(destination.index))
            }
            setItems(reorderedItems)
            dispatch(setNextSongShuffle(reorderedItems.indexOf(indexActive)))
            dispatch(setDraggUpdateListShuffle(reorderedItems))
         }
      },
      [items, currentEncodeId, isRandom]
   )

   return (
      <div className={`player_queue ${isToggle ? "player_queue-is_active" : ""}`}>
         <div className="player_queue-main">
            <div className="player_queue-header gap-1">
               <div className="queue_list-history">
                  <div onClick={() => setToggleSilde(false)} className={`queue_list ${!toggleSilde && "queue_active-top"}`}>
                     Danh sách phát
                  </div>
                  <div onClick={() => setToggleSilde(true)} className={`queue_histrory ${toggleSilde && "queue_active-top"}`}>
                     Nghe gần đây
                  </div>
               </div>
               <div className="queue_list-btn">
                  <AlarmButton></AlarmButton>
                  <ClearQueueButton></ClearQueueButton>
               </div>
            </div>
            <div className="player_queue-container  ">
               {!toggleSilde && currentEncodeId && (
                  <Suspense fallback={<ul className="player_queue-listmusic" />}>
                     <QueueDragList items={items} onDragEnd={onDragEnd}></QueueDragList>
                  </Suspense>
               )}

               {toggleSilde && currentEncodeId && (
                  <ul className="player_queue-listmusic">
                     {recentSongs &&
                        recentSongs?.length > 0 &&
                        recentSongs?.map((e, index) => {
                           return (
                              <QueueItem
                                 setToggleSilde={setToggleSilde}
                                 items={items}
                                 key={e.encodeId || e.id}
                                 index={index}
                                 isHistory={true}
                                 data={e}
                              ></QueueItem>
                           )
                        })}
                  </ul>
               )}

               {!currentEncodeId && (
                  <ul className="player_queue-listmusic">
                     <div className="empty">
                        <div className="empty-img" />
                     </div>
                     <div className="empty-queue">
                        <div className="content">Khám phá thêm các bài hát mới của D4T MP3</div>
                        <button
                           onClick={async () => {
                              dispatch(setReady(false))
                              dispatch(setPlay(false))
                              await dispatch(fetchPlayList("ZO68OC68"))
                              dispatch(setPlay(true))
                           }}
                           className="empty-queue-btn"
                        >
                           <span className="material-symbols-outlined">play_arrow</span>
                           <span>Phát nhạc mới phát hành</span>
                        </button>
                     </div>
                  </ul>
               )}
            </div>
         </div>
      </div>
   )
}

export default memo(QueuePanel)
