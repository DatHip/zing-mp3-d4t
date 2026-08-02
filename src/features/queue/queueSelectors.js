import { createSelector } from "@reduxjs/toolkit"

/**
 * Read access to the playback queue.
 *
 * Components must go through these instead of reaching into
 * `state.queueNowPlay.*` directly: the slice still carries field names from
 * the app's first draft (`infoCurrenAlbum`, `infoSongCurrent`) and those can
 * only be renamed once this file is the sole place that knows about them.
 */
const root = (state) => state.queueNowPlay

export const selectCurrentEncodeId = (state) => root(state).currentEncodeId
export const selectPlaylistEncodeId = (state) => root(state).playlistEncodeId
export const selectCurrentSong = (state) => root(state).infoSongCurrent
export const selectNextSong = (state) => root(state).infoSongNext
export const selectCurrentAlbum = (state) => root(state).infoCurrenAlbum
export const selectCurrentMv = (state) => root(state).infoCurrentMv
export const selectCurrentTime = (state) => root(state).currentTime
export const selectDuration = (state) => root(state).duration
export const selectCurrentIndex = (state) => root(state).currentIndexSong
export const selectListSong = (state) => root(state).listSong
export const selectListSongShuffle = (state) => root(state).listSongShuffle
export const selectQueueLoading = (state) => root(state).loading

/**
 * The list the player is actually walking through, which depends on shuffle.
 * Callers used to pick between the two lists inline and drift apart over time.
 */
export const selectActiveQueue = createSelector(
   [selectListSong, selectListSongShuffle, (state) => state.setting.isRandom],
   (listSong, listSongShuffle, isRandom) => (isRandom ? listSongShuffle : listSong)
)

export const selectQueueLength = createSelector([selectActiveQueue], (queue) => queue?.length ?? 0)
