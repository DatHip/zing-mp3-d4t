import React from "react"
import BottomControlLeft from "../../components/Bottom/BottomControlLeft"
import BottomControlsCenter from "../../components/Bottom/BottomControlsCenter"
import BottomControlsRight from "../../components/Bottom/BottomControlsRight"

const BottomPlayer = () => {
   return (
      <div className="playing-bar-main">
         <div className="player_controls-main">
            <BottomControlLeft></BottomControlLeft>
            <BottomControlsCenter></BottomControlsCenter>
            <BottomControlsRight></BottomControlsRight>
         </div>
      </div>
   )
}

export default BottomPlayer
