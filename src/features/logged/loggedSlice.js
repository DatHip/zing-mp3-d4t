import { createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("d4tmp3_logged")) || {
   recentPlaylist: [],
   recentSongs: [],
   recentMvs: [],
}

// Persisted by app/persistMiddleware.js — see the note in SettingPlay/settingPlay.js.
export const logged = createSlice({
   name: "logged",
   initialState,
   reducers: {
      pushPlayListsLogged: (state, action) => {
         let isExists = state.recentPlaylist.find((e) => action.payload.encodeId === e.encodeId)

         if (state.recentPlaylist.length > 30) {
            state.recentPlaylist.splice(-1)
         }

         if (isExists) {
            let index = state.recentPlaylist.indexOf(isExists)
            state.recentPlaylist.splice(index, 1)
         }

         state.recentPlaylist.unshift(action.payload)
      },
      pushSongsLogged: (state, action) => {
         let isExists = state.recentSongs.find((e) => action.payload.encodeId === e.encodeId)

         if (state.recentSongs.length > 50) {
            state.recentSongs.splice(-1)
         }

         if (isExists) {
            let index = state.recentSongs.indexOf(isExists)
            state.recentSongs.splice(index, 1)
         }

         state.recentSongs.unshift(action.payload)
      },
      pushMvsLogged: (state, action) => {
         let isExists = state.recentMvs.find((e) => action.payload.encodeId === e.encodeId)

         if (state.recentMvs.length > 20) {
            state.recentMvs.splice(-1)
         }

         if (isExists) {
            let index = state.recentMvs.indexOf(isExists)
            state.recentMvs.splice(index, 1)
         }

         state.recentMvs.unshift(action.payload)
      },
   },
})

export const { pushPlayListsLogged, pushSongsLogged, pushMvsLogged } = logged.actions

export default logged.reducer
