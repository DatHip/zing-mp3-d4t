import React, { memo } from "react"
import PlayerTrackInfo from "components/player/PlayerTrackInfo"
import PlayerControls from "components/player/PlayerControls"
import PlayerActions from "components/player/PlayerActions"

const PlayerBarInner = () => {
   return (
      <div className="playing-bar-main">
         <div className="player_controls-main">
            <PlayerTrackInfo></PlayerTrackInfo>
            <PlayerControls></PlayerControls>
            <PlayerActions></PlayerActions>
         </div>
      </div>
   )
}

export default memo(PlayerBarInner)
