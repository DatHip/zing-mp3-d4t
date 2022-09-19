import React, { memo, useRef } from "react"
import fancyTimeFormat from "../../utils/fancyTimeFormat"
import { useDispatch, useSelector } from "react-redux"
import ReactPlayer from "react-player/lazy"
import { setCurrentIndexSong, setCurrentIndexSongShuffle, setCurrentTime } from "../../features/QueueFeatures/QueueFeatures"
import { useEffect } from "react"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import { useState } from "react"
import scrollToActive from "../../utils/scrollToView"
import { pushSongsLogged } from "../../features/Logged/loggedFeatures"

const BottomControlllPLayIng = memo(() => {
   const progressBar = useRef()
   const audioRef = useRef()
   const progresArea = useRef()
   const dispatch = useDispatch()
   const [oke, setOke] = useState(false)

   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const currentTime = useSelector((state) => state.queueNowPlay.currentTime)
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong)

   const { isLoop, volume, playing, muted, isRandom } = useSelector((state) => state.setting)

   const setTimeSong1 = (e) => {
      let progressWidhtVal = progresArea.current.clientWidth // Lấy chiều x
      let clickedOffSetX = e.nativeEvent.offsetX // lấy value chiều x khi click
      let res = (clickedOffSetX / progressWidhtVal) * infoSongCurrent?.duration
      progressBar.current.style.width = (res / infoSongCurrent?.duration) * 100 + "%"
      dispatch(setCurrentTime(res))
      audioRef.current.seekTo(res)
   }

   useEffect(() => {
      const setOff = () => {
         dispatch(setPlay(false))
      }
      window.addEventListener("beforeunload", setOff())
      return () => {
         window.removeEventListener("beforeunload", setOff())
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
               progressInterval={500}
               config={{ file: { forceAudio: true } }}
               onReady={(e) => {
                  dispatch(setReady(true))
                  // save local
                  if (!oke && currentTime !== 0) {
                     audioRef.current.seekTo(currentTime)
                     setOke(true)
                  }

                  dispatch(pushSongsLogged(infoSongCurrent))
               }}
               onProgress={(e) => {
                  dispatch(setCurrentTime(e.playedSeconds))
               }}
               onEnded={() => {
                  if (!isLoop) {
                     // let node = document.querySelector(`div[data-rbd-draggable-id='${currentEncodeId}']`)
                     if (isRandom) {
                        dispatch(setCurrentIndexSongShuffle(currentIndexSong + 1))
                     }
                     if (!isRandom) {
                        dispatch(setCurrentIndexSong(currentIndexSong + 1))
                     }
                     dispatch(setReady(false))
                     if (!playing) {
                        dispatch(setPlay(true))
                     }
                     // scrollToActive(node)
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
