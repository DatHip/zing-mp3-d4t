import React, { useState } from "react"
import ItemRighPlayer from "../../components/Item/ItemRighPlayeQueue"
import { useSelector } from "react-redux"

const BottomRight = () => {
   const isToggle = useSelector((state) => state.toggleright)

   const [toggleSilde, setToggleSilde] = useState(false)
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
               <ul className="player_queue-listmusic">
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer active={true}></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer active={true}></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
                  <ItemRighPlayer></ItemRighPlayer>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default BottomRight
