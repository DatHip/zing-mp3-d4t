import React, { useState } from "react"
import ItemRighPlayer from "../../components/Item/ItemRighPlayeQueue"
import { useSelector, useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useEffect } from "react"
import { setCurrentIndexSong } from "../../features/QueueFeatures/QueueFeatures"

const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list)
   const [removed] = result.splice(startIndex, 1)
   result.splice(endIndex, 0, removed)
   return result
}

const BottomRight = () => {
   const isToggle = useSelector((state) => state.toggleright)
   const listSong = useSelector((state) => state.queueNowPlay.listSong)
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong)
   const [toggleSilde, setToggleSilde] = useState(false)
   const [items, setItems] = useState([])

   const dispatch = useDispatch()

   let alo = true
   useEffect(() => {
      if (alo) {
         setItems(listSong)
      }
      return () => (alo = false)
   }, [listSong])

   const onDragEnd = (result) => {
      const { destination, source, draggableId } = result

      if (!destination) {
         return
      }

      const reorderedItems = reorder(items, source.index, destination.index)

      if (source.index === currentIndexSong) {
         dispatch(setCurrentIndexSong(destination.index))
         dispatch(setCurrentIndexSong(destination.index))
      }
      setItems(reorderedItems)
   }

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
                  <div className="player_btn queue_time">
                     <span className="material-icons-outlined"> alarm </span>
                     <div className="playing_title-hover">Hẹn giờ</div>
                  </div>
                  <div className="player_btn queue_more">
                     <span className="material-icons-outlined"> more_horiz </span>
                     <div className="playing_title-hover">Khác</div>
                  </div>
               </div>
            </div>
            <div className="player_queue-container">
               <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                     {(provoied, snapshot) => {
                        return (
                           <ul className="player_queue-listmusic" {...provoied.droppableProps} ref={provoied.innerRef}>
                              {items &&
                                 items?.length > 0 &&
                                 items?.map((e, index) => {
                                    return <ItemRighPlayer key={e.encodeId} index={index} data={e}></ItemRighPlayer>
                                 })}
                           </ul>
                        )
                     }}
                  </Droppable>
               </DragDropContext>
            </div>
         </div>
      </div>
   )
}

export default BottomRight
