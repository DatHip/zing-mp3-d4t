const root = (state) => state.setting

export const selectPlaying = (state) => root(state).playing
export const selectIsReady = (state) => root(state).isReady
export const selectIsLoop = (state) => root(state).isLoop
export const selectIsRandom = (state) => root(state).isRandom
export const selectVolume = (state) => root(state).volume
export const selectIsVolume = (state) => root(state).isVolume
export const selectMuted = (state) => root(state).muted
export const selectIsBgFull = (state) => root(state).isBgFull
export const selectLyricTextSize = (state) => root(state).text
export const selectClockOff = (state) => root(state).clockOff
export const selectProgressInterval = (state) => root(state).progressInterval
export const selectQuality = (state) => root(state).quality
