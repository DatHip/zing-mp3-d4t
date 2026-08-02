import { useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectCurrentEncodeId, selectPlaylistEncodeId } from "features/queue/queueSelectors"
import { selectIsReady, selectPlaying } from "features/setting/settingSelectors"
import { usePlayback } from "hook/usePlayback"
import useLike from "hook/useLike"
import getReleaseCountdown from "utils/getReleaseCountdown"

/**
 * Everything SongRow needs to decide and do, so the component itself is markup.
 *
 * SongRow renders four different things depending on its flags — a released
 * single, a radio entry, an artist's latest track, and an album disk — and the
 * click handler that told them apart used to be a sixty-line arrow function
 * nested three levels deep in the JSX.
 *
 * @param {{ item: import("types").Song, isRadio?: boolean, isDisk?: boolean, isArtist?: boolean }} params
 */
export function useSongRow({ item, isRadio, isDisk, isArtist }) {
   const navigate = useNavigate()
   const { playSong, playAlbum, resume, pause, rejectIfVip, rejectIfRadio } = usePlayback()
   const { isLike, handleLike } = useLike(item, isDisk ? 1 : 2)

   const currentEncodeId = useSelector(selectCurrentEncodeId)
   const playlistEncodeId = useSelector(selectPlaylistEncodeId)
   const playing = useSelector(selectPlaying)
   const isReady = useSelector(selectIsReady)

   const isActiveSong = item?.encodeId === currentEncodeId
   const isActiveAlbum = playlistEncodeId === item?.encodeId

   const handlePlay = useCallback(() => {
      if (rejectIfVip(item) || rejectIfRadio(isRadio)) return

      // An artist card and a disk both open an album; only the disk navigates.
      if (isDisk) {
         navigate(`/album/${item?.encodeId}`)
         return playAlbum(item?.encodeId, {
            logAs: item.textType === "Playlist" ? item : undefined,
         })
      }
      if (isArtist) return playAlbum(item?.encodeId)
      return playSong(item)
   }, [item, isRadio, isDisk, isArtist, navigate, playAlbum, playSong, rejectIfVip, rejectIfRadio])

   /** Clicking the cover overlay of a disk opens its album page. */
   const handleCoverClick = useCallback(
      (event) => {
         if (!isDisk) return
         if (event.target.className.includes("player_queue-img-hover")) {
            navigate(`/album/${item?.encodeId}`)
         }
      },
      [isDisk, navigate, item]
   )

   return {
      isLike,
      handleLike,
      handlePlay,
      handleCoverClick,
      resume,
      pause,
      isActiveSong,
      isActiveAlbum,
      playing,
      isReady,
      thumbnail: item?.thumbnailM,
      timeRelease: getReleaseCountdown(item?.releaseDate),
   }
}
