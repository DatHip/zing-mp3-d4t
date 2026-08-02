import React, { memo } from "react"
import ReactPlayer from "react-player/lazy"

import fancyTimeFormat from "../../utils/fancyTimeFormat"

import PlayerProgress from "./PlayerProgress"
import { usePlayerController } from "./usePlayerController"

const BottomControlllPLayIng = memo(() => {
   const {
      audioRef,
      streamUrl,
      duration,
      playing,
      isLoop,
      volume,
      muted,
      progressInterval,
      handleSeek,
      handleReady,
      handleProgress,
      handleEnded,
      handleError,
   } = usePlayerController()

   return (
      <div className="player_bottom">
         <PlayerProgress duration={duration} onSeek={handleSeek}>
            <ReactPlayer
               ref={audioRef}
               width={0}
               height={0}
               url={streamUrl || ""}
               playing={playing}
               loop={isLoop}
               volume={volume}
               muted={muted}
               progressInterval={progressInterval}
               config={{ file: { forceAudio: true } }}
               onReady={handleReady}
               onProgress={handleProgress}
               onEnded={handleEnded}
               onError={handleError}
            />
         </PlayerProgress>
         <p className="playing_time-right">{fancyTimeFormat(duration)}</p>
      </div>
   )
})

export default BottomControlllPLayIng
