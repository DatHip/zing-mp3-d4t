import { useCallback, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { useVideoMvData } from "api/useVideoMvData"
import { setOpenOff } from "features/mvToggle/mvToggleSlice"
import { setPlayingAction } from "features/setting/settingSlice"
import { pushMvsLogged } from "features/logged/loggedSlice"
import scrollTop from "utils/scrollToTop"
import { selectMvHistoryOpen } from "features/mvToggle/mvToggleSelectors"
import { selectCurrentMv } from "features/queue/queueSelectors"

/**
 * Pick the highest resolution from a Zing quality map like
 * `{ "360p": url, "720p": url }`. Keys are sorted numerically rather than by
 * insertion order, which is not guaranteed to be ascending.
 *
 * @param {Record<string, string>} [qualityMap]
 * @returns {string} the chosen URL, or "" when nothing is playable
 */
const pickHighestQuality = (qualityMap) => {
   const entries = Object.entries(qualityMap || {}).filter(([, url]) => typeof url === "string" && url.startsWith("http"))
   if (!entries.length) return ""
   entries.sort((a, b) => parseInt(b[0], 10) - parseInt(a[0], 10))
   return entries[0][1]
}

export function useVideoPopUp() {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const idOpen = useSelector(selectMvHistoryOpen)
   const infoCurrentMv = useSelector(selectCurrentMv)

   const { data, isLoading } = useVideoMvData(id)

   // Body scroll & z-index override
   useEffect(() => {
      const el = document.getElementById("scrollableDiv")
      if (el) el.style.zIndex = "120"
      return () => {
         if (el) el.style.zIndex = "1"
      }
   }, [])

   // Pause main audio player when MV opens
   useEffect(() => {
      dispatch(setPlayingAction(false))
   }, [dispatch])

   useEffect(() => {
      scrollTop()
   }, [id])

   /**
    * Best available stream, highest quality first.
    *
    * Zing serves MVs as HLS now and no longer returns a `streaming.mp4` map at
    * all. This used to read mp4 only, so streamUrl was always "" and the player
    * had nothing to load — MV playback did not work. mp4 is kept as a fallback
    * in case the field comes back for some videos.
    */
   const streamUrl = useMemo(() => {
      const { hls, mp4 } = data?.streaming || {}
      return pickHighestQuality(hls) || pickHighestQuality(mp4) || ""
   }, [data])

   const handleClose = useCallback(() => {
      const video = document.querySelector("#video-react video")
      if (video) video.pause()
      if (idOpen) navigate(`${idOpen}`)
      dispatch(setOpenOff())
   }, [dispatch, idOpen, navigate])

   const handleReady = useCallback(() => {
      dispatch(pushMvsLogged(infoCurrentMv))
   }, [dispatch, infoCurrentMv])

   return { data, isLoading, streamUrl, handleClose, handleReady }
}
