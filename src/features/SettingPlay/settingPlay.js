import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("d4tmp3_setting")) || {
   isLoop: false,
   isRandom: false,
   autoPlay: false,
   volume: 0.8,
   playing: false,
   muted: false,
   isLoading: false,
   quality: 320,
   isBgFull: true,
   text: 2,
   titleKey: "D4T MP3 | Nghe nhạc chất lượng cao trên desktop, mobile và TV",
}

export const setting = createSlice({
   name: "setting",
   initialState,
   reducers: {
      setRandomSongs: (state, action) => {
         state.isRandom = !state.isRandom
         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },
      setLoopSongs: (state, action) => {
         state.isLoop = !state.isLoop

         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },
      setPlaying: (state) => {
         state.playing = !state.playing

         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },

      setAciteTheme: (state, action) => {
         state.isBgFull = action.payload

         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },
      setSizeText: (state, action) => {
         state.text = action.payload

         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },
   },

   extraReducers: (builer) => {},
})

export const { setAciteTheme, setSizeText, setLoopSongs, setRandomSongs, setPlaying } = setting.actions

export default setting.reducer
