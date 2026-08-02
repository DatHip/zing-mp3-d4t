import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import { toast } from "react-toastify"

import { setCurrentTime } from "../../features/QueueFeatures/QueueFeatures"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import { pushSongsLogged } from "../../features/Logged/loggedFeatures"
import { getStreamUrl } from "../../api/getStreamSong"
import { useQueueControls } from "../../hook/useQueueControls"

/**
 * Container hook for the bottom audio player.
 *
 * Encapsulates ALL side effects + queue integration so the UI component
 * stays a pure render.
 *
 * Returned bag:
 *  - `audioRef`             ref forwarded to <ReactPlayer>
 *  - `streamUrl`            resolved signed CDN URL (empty while loading)
 *  - `duration`             seconds, derived from redux `infoSongCurrent`
 *  - `playing/isLoop/volume/muted/progressInterval`  passthrough props for <ReactPlayer>
 *  - `handleSeek(sec)`      user clicks progress bar
 *  - `handleReady()`        player ready → mark ready, restore saved time
 *  - `handleProgress(evt)`  fires ~100ms while playing
 *  - `handleEnded()`        auto-advance unless loop
 *  - `handleError()`        toast on player error
 */
export function usePlayerController() {
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

   // --- Handlers ---------------------------------------------------------------

   const handleSeek = useCallback(
      (seconds) => {
         dispatch(setCurrentTime(seconds))
         audioRef.current?.seekTo(seconds)
      },
      [dispatch]
   )

   const handleReady = useCallback(() => {
      dispatch(setReady(true))
      // Read via store to avoid a subscription that fires every ~100ms progress tick.
      const savedTime = store.getState().queueNowPlay.currentTime
      if (!hasRestoredTime.current && savedTime !== 0) {
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

   // --- Effects ----------------------------------------------------------------

   // Pause on tab close so the ghost audio doesn't survive an F5.
   useEffect(() => {
      const setOff = () => dispatch(setPlay(false))
      window.addEventListener("beforeunload", setOff)
      return () => window.removeEventListener("beforeunload", setOff)
   }, [dispatch])

   // Fetch signed stream URL on song change; VIP + fetch-fail both auto-skip.
   useEffect(() => {
      if (!currentEncodeId) {
         setStreamUrl("")
         return
      }
      // VIP short-circuits before we even hit /song
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
