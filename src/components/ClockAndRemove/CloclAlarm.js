import React, { memo } from "react"

const CloclAlarm = memo(() => {
   return (
      <div className="player_btn queue_time">
         <span className="material-icons-outlined"> alarm </span>
         <div className="playing_title-hover">Hẹn giờ</div>
      </div>
   )
})

export default CloclAlarm
