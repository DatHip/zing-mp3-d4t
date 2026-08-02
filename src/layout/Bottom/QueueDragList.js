import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import ItemRighPlayer from "components/Item/ItemRighPlayeQueue"

// Isolates react-beautiful-dnd (~235KB of source) so it is fetched only for
// visitors who actually have a queue to reorder.
const QueueDragList = ({ items, onDragEnd }) => {
   return (
      <DragDropContext onDragEnd={onDragEnd}>
         <Droppable droppableId="droppable">
            {(provoied, snapshot) => {
               return (
                  <ul className="player_queue-listmusic" {...provoied.droppableProps} ref={provoied.innerRef}>
                     {items &&
                        items?.length > 0 &&
                        items?.map((e, index) => {
                           let lastIndex = false

                           if (index + 1 === items.length) {
                              lastIndex = true
                           }

                           return (
                              <ItemRighPlayer
                                 lastIndex={lastIndex}
                                 key={e.encodeId || e.id}
                                 index={index}
                                 data={e}
                                 DragWrapper={Draggable}
                              ></ItemRighPlayer>
                           )
                        })}
                  </ul>
               )
            }}
         </Droppable>
      </DragDropContext>
   )
}

export default QueueDragList
