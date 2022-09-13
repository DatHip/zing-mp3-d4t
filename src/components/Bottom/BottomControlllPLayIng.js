import React, { memo, useRef } from "react"
import fancyTimeFormat from "../../utils/fancyTimeFormat"
import { useDispatch, useSelector } from "react-redux"

import ReactPlayer from "react-player/lazy"
import { setCurrentTime } from "../../features/QueueFeatures/QueueFeatures"

const BottomControlllPLayIng = memo(() => {
   const progressBar = useRef()
   const audioRef = useRef()
   const progresArea = useRef()
   const dispatch = useDispatch()

   const { currentEncodeId, infoSongCurrent, currentTime } = useSelector((state) => state.queueNowPlay)

   const { isLoop, isLoading, autoPlay, volume, playing, muted } = useSelector((state) => state.setting)

   const setTimeSong1 = (e) => {
      let progressWidhtVal = progresArea.current.clientWidth // Lấy chiều x
      let clickedOffSetX = e.nativeEvent.offsetX // lấy value chiều x khi click
      let res = (clickedOffSetX / progressWidhtVal) * infoSongCurrent?.duration
      progressBar.current.style.width = (res / infoSongCurrent?.duration) * 100 + "%"
      dispatch(setCurrentTime(res))
      audioRef.current.seekTo(res)
   }

   return (
      <div className="player_bottom">
         <p className="playing_time-left">{fancyTimeFormat(currentTime)}</p>
         <div onClick={setTimeSong1} ref={progresArea} className="playing_time-up2 progress-area">
            <div ref={progressBar} className="progress-bar" />
            <ReactPlayer
               ref={audioRef}
               progressInterval={300}
               config={{ file: { forceAudio: true } }}
               onProgress={(e) => {
                  dispatch(setCurrentTime(e.playedSeconds))
                  progressBar.current.style.width = (currentTime / infoSongCurrent?.duration) * 100 + "%"
               }}
               onEnded={(e) => {
                  console.log(e)
               }}
               onError={(e) => {
                  console.log(e)
               }}
               playing={playing}
               loop={isLoop}
               volume={volume}
               muted={muted}
               url={`http://api.mp3.zing.vn/api/streaming/audio/${currentEncodeId}/320`}
            ></ReactPlayer>
         </div>
         <p className="playing_time-right">{fancyTimeFormat(infoSongCurrent?.duration)}</p>
      </div>
   )
})

export default BottomControlllPLayIng
