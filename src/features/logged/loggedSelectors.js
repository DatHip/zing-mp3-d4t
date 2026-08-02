const root = (state) => state.logged

export const selectRecentSongs = (state) => root(state).recentSongs
export const selectRecentPlaylists = (state) => root(state).recentPlaylist
export const selectRecentMvs = (state) => root(state).recentMvs
