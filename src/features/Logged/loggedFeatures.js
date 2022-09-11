import { createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("d4tmp3_logged")) || {
   recentPlaylist: [],
   recentSongs: [],
   recentMvs: [],
}

export const logged = createSlice({
   name: "logged",
   initialState,
   reducers: {
      setThemes: (state, action) => {},
   },
})

export const { setThemes } = logged.actions

export default logged.reducer
