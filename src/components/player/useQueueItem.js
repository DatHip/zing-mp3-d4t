import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
   pushSongHistoryPlayList,
   pushSongHistoryPlayListShuffle,
} from "features/queue/queueSlice"
import { setReady } from "features/setting/settingSlice"
import {
   selectCurrentEncodeId,
   selectCurrentIndex,
} from "features/queue/queueSelectors"
import { selectIsRandom, selectIsReady, selectPlaying } from "features/setting/settingSelectors"
import { usePlayback } from "hook/usePlayback"
import useLike from "hook/useLike"

/**
 * Move `song` to sit directly after the track playing now.
 *
 * If it is already somewhere in the list it is lifted out first, otherwise
 * clicking a song that is behind the cursor would leave a duplicate.
 */
const queueAfterCurrent = (list, song, currentIndex) => {
   const rest = list.filter((item) => item.encodeId !== song.encodeId)
   const at = currentIndex + 1
   return [...rest.slice(0, at), song, ...rest.slice(at)]
}

/**
 * Behaviour for one row of the queue panel.
 *
 * @param {{ data: object, index: number, items: object[], setToggleSilde?: Function }} params
 */
export function useQueueItem({ data, index, items, setToggleSilde }) {
   const dispatch = useDispatch()
   const { playQueueIndex, resume, pause } = usePlayback()
   const { isLike, handleLike } = useLike(data, 2)

   const playing = useSelector(selectPlaying)
   const isReady = useSelector(selectIsReady)
   const isRandom = useSelector(selectIsRandom)
   const currentIndexSong = useSelector(selectCurrentIndex)
   const currentEncodeId = useSelector(selectCurrentEncodeId)

   const isActive = data?.encodeId === currentEncodeId || data?.id === currentEncodeId
   const isPlayed = index < currentIndexSong

   /** History rows do not sit in the queue yet, so playing one inserts it. */
   const handlePlayFromHistory = useCallback(() => {
      dispatch(setReady(false))
      const list = queueAfterCurrent(items, data, currentIndexSong)
      const payload = { item: data, list, index: currentIndexSong + 1 }

      dispatch(pushSongHistoryPlayList(payload))
      if (isRandom) dispatch(pushSongHistoryPlayListShuffle(payload))

      setToggleSilde?.((value) => !value)
      resume()
   }, [dispatch, items, data, currentIndexSong, isRandom, setToggleSilde, resume])

   /** Queue rows are already in the list, so playing one just moves the cursor. */
   const handlePlayFromQueue = useCallback(
      () => playQueueIndex(index, { shuffled: isRandom }),
      [playQueueIndex, index, isRandom]
   )

   return {
      isLike,
      handleLike,
      handlePlayFromHistory,
      handlePlayFromQueue,
      resume,
      pause,
      isActive,
      isPlayed,
      playing,
      isReady,
   }
}
