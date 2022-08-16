import React, { memo } from "react"
import BottomPlayer from "./BottomPlayer"
import BottomRight from "./BottomRight"

const BottomPlay = () => {
   return (
      <div className="playing-bar">
         <BottomPlayer></BottomPlayer>
         <BottomRight></BottomRight>
      </div>
   )
}

export default memo(BottomPlay)
