const root = (state) => state.lyrics

export const selectLyricByLine = (state) => root(state).lyricByLine
export const selectLyricKara = (state) => root(state).lyricKara
export const selectIsSeek = (state) => root(state).isSeek

/**
 * The slice only ever wrote `isLoading`. KaraokeView read `state.lyrics.loading`,
 * which is always undefined, so its loading skeleton could never render — the
 * kind of silent mismatch that reading the raw shape from a component invites.
 */
export const selectLyricsLoading = (state) => root(state).isLoading
