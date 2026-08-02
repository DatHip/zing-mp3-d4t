import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import ReactPlayer from "react-player/lazy"
import { toast } from "react-toastify"

import fancyTimeFormat from "../../utils/fancyTimeFormat"
import { setCurrentTime } from "../../features/QueueFeatures/QueueFeatures"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import { pushSongsLogged } from "../../features/Logged/loggedFeatures"
import { getStreamUrl } from "../../api/getStreamSong"
import { useQueueControls } from "../../hook/useQueueControls"

import PlayerProgress from "./PlayerProgress"

/**
 * Container hook: encapsulates all side effects + queue integration so the
 * UI stays a pure render. Kept in-file (not a separate module) because it's
 * only consumed by this one component.
 */
function usePlayerController() {
   const audioRef = useRef()
   const dispatch = useDispatch()
   const store = useStore()
   // Restoring persisted position is a one-shot side effect — ref, not state.
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

   const handleReady = useCallback(() => {
      dispatch(setReady(true))
      // Read via store to avoid subscribing to a value that changes every ~100ms.
      // `> 0` rather than `!== 0`: a localStorage blob written before currentTime
      // was persisted hydrates as undefined, which would seekTo(undefined).
      const savedTime = store.getState().queueNowPlay.currentTime
      if (!hasRestoredTime.current && savedTime > 0) {
         audioRef.current?.seekTo(savedTime)
         hasRestoredTime.current = true
      }
      dispatch(pushSongsLogged(infoSongCurrent))
   }, [dispatch, store, infoSongCurrent])

   const handleProgress = useCallback(
      (e) => {
         dispatch(setCurrentTime(e.playedSeconds))
      },
      [dispatch]
   )

   const handleEnded = useCallback(() => {
      if (!isLoop) playNext()
   }, [isLoop, playNext])

   const handleError = useCallback(() => {
      toast("Có lỗi xảy ra, vui lòng thử lại", { type: "error" })
   }, [])

   // Pause on tab close so a ghost audio element doesn't survive F5. pagehide
   // instead of beforeunload: beforeunload blocks the back/forward cache. The
   // persisted-flag check skips the bfcache case, where the page is frozen
   // rather than torn down and playback should resume on restore.
   useEffect(() => {
      const setOff = (e) => {
         if (e.persisted) return
         dispatch(setPlay(false))
      }
      window.addEventListener("pagehide", setOff)
      return () => window.removeEventListener("pagehide", setOff)
   }, [dispatch])

   // Fetch signed stream URL on song change; VIP + fetch-fail both auto-skip.
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
      hasRestoredTime.current = false
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

   return {
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
   }
}

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
