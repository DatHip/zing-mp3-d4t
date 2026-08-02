import React, { memo } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import ActionPlay from "components/ui/ActionPlay"
import ActionIcon from "components/ui/ActionIcon"
import LoadingIcon from "components/ui/LoadingIcon"
import ArtistLinks from "components/song/ArtistLinks"
import { selectCurrentAlbum, selectPlaylistEncodeId } from "features/queue/queueSelectors"
import { useQueueItem } from "./useQueueItem"

/**
 * The parts a history row and a queue row render identically: artwork with the
 * play/pause overlay, title, artists, and the like/more buttons. Only the
 * wrapper element and the play handler differ between the two, but both had a
 * full copy of this markup.
 */
const QueueRowBody = ({ data, onPlay, isActive, isReady, playing, resume, pause, isLike, handleLike }) => (
   <>
      <div className="player_queue-item-left">
         <div className="player_queue-left">
            <LazyLoadImage className="player_queue-img" src={data?.thumbnail || data?.thumb} alt="" />
            <div className="player_queue-img-hover">
               {!isActive && <div onClick={onPlay}>{<ActionPlay />}</div>}
               {isActive && !isReady && <LoadingIcon notLoading />}
               {isActive && isReady && (
                  <span onClick={playing ? pause : resume}>{playing ? <ActionIcon /> : <ActionPlay />}</span>
               )}
            </div>
         </div>
         <div className="player_queue-music-info">
            <div className="player_queue-music">{data?.title}</div>
            <div className="player_queue-name">
               <ArtistLinks artists={data?.artists} />
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
   </>
)

// DragWrapper is react-beautiful-dnd's Draggable, injected by QueueDragList. It is
// a prop rather than an import so this row — which the history tab renders without
// any drag behaviour — does not pull the DnD library into main.js.
const QueueItem = ({ data, index, items, isHistory, setToggleSilde, lastIndex, DragWrapper }) => {
   const row = useQueueItem({ data, index, items, setToggleSilde })
   const playlistEncodeId = useSelector(selectPlaylistEncodeId)
   const currentAlbum = useSelector(selectCurrentAlbum)

   if (isHistory) {
      return (
         <li className={`player_queue-item   ${row.isActive ? "player_queue-active" : ""} `}>
            <QueueRowBody {...row} data={data} onPlay={row.handlePlayFromHistory} />
         </li>
      )
   }

   if (!DragWrapper) return null

   // A song played on its own has no playlist behind it, so there is no
   // "from playlist" line to show. This used to be spelled
   // `infoCurrenAlbum.length !== 0`, which only worked because the slice
   // stores [] for a single song and an object — with no length — for an album.
   const showsPlaylistFooter = row.isActive && !!playlistEncodeId

   return (
      <DragWrapper key={data.encodeId || data.id} draggableId={data.encodeId || data.id} index={index}>
         {(provided, snapshot) => (
            <div draggable ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
               <li
                  className={`player_queue-item ${row.isPlayed ? "is-pre" : ""} ${
                     snapshot.isDragging ? "active-dragg" : ""
                  } ${row.isActive ? "player_queue-active" : ""} `}
               >
                  <QueueRowBody {...row} data={data} onPlay={row.handlePlayFromQueue} />
               </li>

               {showsPlaylistFooter && !snapshot.isDragging && (
                  <div className="next-songs">
                     {!lastIndex && <h3 className="title is-6">Tiếp theo</h3>}
                     <h3 className="subtitle is-6">
                        <span>Từ playlist</span>
                        <Link to={`/album/${playlistEncodeId}`}>
                           <span>
                              <span>{currentAlbum?.title}</span>
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
