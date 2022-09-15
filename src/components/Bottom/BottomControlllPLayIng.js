import React, { memo, useRef } from "react"
import fancyTimeFormat from "../../utils/fancyTimeFormat"
import { useDispatch, useSelector } from "react-redux"

import ReactPlayer from "react-player/lazy"
import { setCurrentIndexSong, setCurrentTime } from "../../features/QueueFeatures/QueueFeatures"
import { useEffect } from "react"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import { useState } from "react"
import { useCallback } from "react"

const BottomControlllPLayIng = memo(() => {
   const progressBar = useRef()
   const audioRef = useRef()
   const progresArea = useRef()
   const dispatch = useDispatch()
   const [oke, setOke] = useState(false)
   const { currentEncodeId, infoSongCurrent, currentTime, currentIndexSong } = useSelector((state) => state.queueNowPlay)

   const { isLoop, volume, playing, muted } = useSelector((state) => state.setting)

   const setTimeSong1 = (e) => {
      let progressWidhtVal = progresArea.current.clientWidth // Lấy chiều x
      let clickedOffSetX = e.nativeEvent.offsetX // lấy value chiều x khi click
      let res = (clickedOffSetX / progressWidhtVal) * infoSongCurrent?.duration
      progressBar.current.style.width = (res / infoSongCurrent?.duration) * 100 + "%"
      dispatch(setCurrentTime(res))
      audioRef.current.seekTo(res)
   }

   let alo = true
   useEffect(() => {
      if (!alo) return
      const setOff = () => {
         dispatch(setPlay(false))
      }
      window.addEventListener("beforeunload", setOff())
      if (currentTime > 0) {
         setOke(true)
      }
      return () => {
         window.removeEventListener("beforeunload", setOff())
         alo = false
      }
   }, [])

   useEffect(() => {
      progressBar.current.style.width = (currentTime / infoSongCurrent?.duration) * 100 + "%"
   }, [currentTime])

   return (
      <div className="player_bottom">
         <p className="playing_time-left">{fancyTimeFormat(currentTime)}</p>
         <div onClick={setTimeSong1} ref={progresArea} className="playing_time-up2 progress-area">
            <div ref={progressBar} className="progress-bar" />
            <ReactPlayer
               width={0}
               height={0}
               ref={audioRef}
               progressInterval={200}
               config={{ file: { forceAudio: true } }}
               onReady={(e) => {
                  dispatch(setReady(true))
               }}
               onProgress={(e) => {
                  if (!oke) {
                     dispatch(setCurrentTime(e.playedSeconds))
                  }

                  if (e.loaded !== 1) {
                     dispatch(setCurrentTime(currentTime))
                     if (currentTime !== 0) {
                        audioRef.current.seekTo(currentTime)
                     }
                  }

                  if (oke && e.loaded === 1) {
                     dispatch(setCurrentTime(e.playedSeconds))
                  }
               }}
               onEnded={(e) => {
                  if (!isLoop) {
                     dispatch(setCurrentIndexSong(currentIndexSong + 1))
                     dispatch(setReady(false))
                  }
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
