import React, { memo } from "react"
import ActionIcon from "../Icon/ActionIcon"
import ActionPlay from "../Icon/ActionPlay"
import LoadingIcon from "../Icon/LoadingIcon"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { Draggable } from "react-beautiful-dnd"

const ItemRighPlayer = ({ data, index }) => {
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong)
   const { playing } = useSelector((state) => state.setting)

   let active = index === currentIndexSong

   return (
      <Draggable key={data.encodeId} draggableId={data.encodeId} index={index}>
         {(provoied, snapshot) => (
            <li
               draggable
               ref={provoied.innerRef}
               {...provoied.dragHandleProps}
               {...provoied.draggableProps}
               className={`player_queue-item ${snapshot.isDragging ? "active-dragg" : ""} ${
                  active ? "player_queue-active" : ""
               } `}
            >
               {/* player_queue-pre */}
               <div className="player_queue-item-left">
                  <div className="player_queue-left">
                     <LazyLoadImage className="player_queue-img" src={data?.thumbnail} alt="" />
                     <div className="player_queue-img-hover">
                        {active && (
                           <>
                              {!playing && <ActionPlay></ActionPlay>}
                              {playing && <ActionIcon></ActionIcon>}
                              {/* {playing && <LoadingIcon notLoading></LoadingIcon>} */}
                           </>
                        )}
                        {!active && <>{<ActionPlay></ActionPlay>}</>}
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
         )}
      </Draggable>
   )
}

export default memo(ItemRighPlayer)
