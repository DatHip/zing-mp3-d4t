import { useCallback } from "react"
import { useSelector } from "react-redux"
import {
   selectCurrentEncodeId,
   selectListSongShuffle,
   selectPlaylistEncodeId,
} from "features/queue/queueSelectors"
import { selectIsRandom, selectIsReady, selectPlaying } from "features/setting/settingSelectors"
import { usePlayback } from "hook/usePlayback"
import useLike from "hook/useLike"

/**
 * Click behaviour for a row in a chart or album track list.
 *
 * A row can be reached in three states and the original handler spelled all of
 * them out inline, twice over for shuffle vs sequential:
 *   - the row belongs to no album (search results, favourites)
 *   - its album is already loaded, so only the queue pointer moves
 *   - its album is not loaded, so the album is fetched first
 *
 * @param {{ item: object, idAlbum?: string, indexNotVip?: number, notAlbum?: boolean }} params
 */
export function useChartSongRow({ item, idAlbum, indexNotVip, notAlbum }) {
   const { isLike, handleLike } = useLike(item, 2)
   const { playSong, playAlbum, playQueueIndex, resume, pause, rejectIfVip } = usePlayback()

   const currentEncodeId = useSelector(selectCurrentEncodeId)
   const playlistEncodeId = useSelector(selectPlaylistEncodeId)
   const listSongShuffle = useSelector(selectListSongShuffle)
   const playing = useSelector(selectPlaying)
   const isReady = useSelector(selectIsReady)
   const isRandom = useSelector(selectIsRandom)

   const isActiveSong = currentEncodeId === item?.encodeId
   const isAlbumLoaded = idAlbum === playlistEncodeId

   const handlePlay = useCallback(async () => {
      if (rejectIfVip(item)) return

      if (notAlbum) return playSong(item)

      if (isAlbumLoaded) {
         // Shuffle reorders the queue, so the sequential index no longer points
         // at this row — look the song up in the shuffled list instead.
         const shuffledIndex = isRandom
            ? listSongShuffle.findIndex((song) => song.encodeId === item?.encodeId)
            : -1
         if (isRandom && shuffledIndex === -1) return
         return playQueueIndex(isRandom ? shuffledIndex : indexNotVip, { shuffled: isRandom })
      }

      return playAlbum(idAlbum, {
         startIndex: indexNotVip,
         logLoaded: true,
         reshuffle: isRandom,
      })
   }, [
      item,
      notAlbum,
      isAlbumLoaded,
      isRandom,
      listSongShuffle,
      indexNotVip,
      idAlbum,
      playSong,
      playAlbum,
      playQueueIndex,
      rejectIfVip,
   ])

   return {
      isLike,
      handleLike,
      handlePlay,
      resume,
      pause,
      isActiveSong,
      isAlbumLoaded,
      playing,
      isReady,
   }
}
