import React, { memo, useRef, useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import ReactPlayer from "react-player/lazy"
import fancyTimeFormat from "../../utils/fancyTimeFormat"
import { setCurrentTime } from "../../features/QueueFeatures/QueueFeatures"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import { pushSongsLogged } from "../../features/Logged/loggedFeatures"
import { toast } from "react-toastify"
import { getStreamUrl } from "../../api/getStreamSong"
import { useQueueControls } from "../../hook/useQueueControls"
import PlayerProgress from "./PlayerProgress"

const BottomControlllPLayIng = memo(() => {
   const audioRef = useRef()
   const dispatch = useDispatch()
   const store = useStore()
   // A ref, not state: restoring the persisted position is a one-shot side
   // effect and has no business triggering a render of the player.
   const hasRestoredTime = useRef(false)
   const [streamUrl, setStreamUrl] = useState("")

   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)

   const isLoop = useSelector((state) => state.setting.isLoop)
   const volume = useSelector((state) => state.setting.volume)
   const muted = useSelector((state) => state.setting.muted)
   const progressInterval = useSelector((state) => state.setting.progressInterval)

   const { playNext, skipToNext, playing } = useQueueControls()

   const duration = infoSongCurrent?.duration

   const handleSeek = useCallback(
      (seconds) => {
         dispatch(setCurrentTime(seconds))
         audioRef.current?.seekTo(seconds)
      },
      [dispatch]
   )

   useEffect(() => {
      const setOff = () => {
         dispatch(setPlay(false))
      }
      window.addEventListener("beforeunload", setOff)
      return () => {
         window.removeEventListener("beforeunload", setOff)
      }
   }, [dispatch])

   useEffect(() => {
      if (!currentEncodeId) {
         setStreamUrl("")
         return
      }
      if (infoSongCurrent?.streamingStatus === 2) {
         toast("Bài này chỉ dành cho tài khoản VIP — chuyển bài tiếp theo", { type: "info" })
         setStreamUrl("")
         dispatch(setReady(false))
         skipToNext()
         return
      }
      let cancelled = false
      dispatch(setReady(false))
      setStreamUrl("")
      getStreamUrl(currentEncodeId).then((url) => {
         if (cancelled) return
         if (!url) {
            toast("Không lấy được stream bài này — chuyển bài tiếp theo", { type: "error" })
            skipToNext()
            return
         }
         setStreamUrl(url)
      })
      return () => {
         cancelled = true
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentEncodeId])

   return (
      <div className="player_bottom">
         <PlayerProgress duration={duration} onSeek={handleSeek}>
            <ReactPlayer
               width={0}
               height={0}
               ref={audioRef}
               progressInterval={progressInterval}
               config={{ file: { forceAudio: true } }}
               onReady={() => {
                  dispatch(setReady(true))
                  // Read through the store rather than subscribing: this
                  // component must not re-render on every progress tick.
                  const savedTime = store.getState().queueNowPlay.currentTime
                  if (!hasRestoredTime.current && savedTime !== 0) {
                     audioRef.current.seekTo(savedTime)
                     hasRestoredTime.current = true
                  }
                  dispatch(pushSongsLogged(infoSongCurrent))
               }}
               onProgress={(e) => {
                  dispatch(setCurrentTime(e.playedSeconds))
               }}
               onEnded={() => {
                  if (!isLoop) playNext()
               }}
               onError={() => {
                  return toast("Có lỗi xảy ra, vui lòng thử lại", {
                     type: "error",
                  })
               }}
               playing={playing}
               loop={isLoop}
               volume={volume}
               muted={muted}
               url={streamUrl || ""}
            ></ReactPlayer>
         </PlayerProgress>
         <p className="playing_time-right">{fancyTimeFormat(duration)}</p>
      </div>
   )
})

export default BottomControlllPLayIng
