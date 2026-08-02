import { useCallback, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { useVideoMvData } from "api/useVideoMvData"
import { setOpenOff } from "features/mvToggle/mvToggleSlice"
import { setPlayingAction } from "features/setting/settingSlice"
import { pushMvsLogged } from "features/logged/loggedSlice"
import scrollTop from "utils/scrollToTop"

export function useVideoPopUp() {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const idOpen = useSelector((s) => s.setOpenMainMv.historyOpen)
   const infoCurrentMv = useSelector((s) => s.queueNowPlay.infoCurrentMv)

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

   // Pick best available MP4 stream (highest → lowest)
   const streamUrl = useMemo(() => {
      const mp4 = data?.streaming?.mp4
      if (!mp4) return ""
      const values = Object.values(mp4)
      return values[2] || values[1] || values[0] || ""
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
