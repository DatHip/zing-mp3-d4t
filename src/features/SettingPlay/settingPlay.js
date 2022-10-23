import { createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("d4tmp3_setting")) || {
   isLoop: false,
   isRandom: false,
   autoPlay: false,
   volume: 0.8,
   isVolume: 0.8,
   playing: false,
   muted: false,
   isLoading: false,
   isReady: false,
   quality: 320,
   isBgFull: false,
   text: 2,
   progressInterval: 500,
   titleKey: "D4T MP3 | Nghe nhạc chất lượng cao trên desktop, mobile và TV",
   clockOff: false,
}

export const setting = createSlice({
   name: "setting",
   initialState,
   reducers: {
      setClockOff: (state, action) => {
         state.clockOff = action.payload
         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },
      setProgressInterval: (state, action) => {
         state.progressInterval = action.payload
         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },
      setIsVolume: (state, action) => {
         state.isVolume = action.payload
         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },
      toogleMuted: (state) => {
         state.muted = !state.muted
         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },
      setReady: (state, action) => {
         state.isReady = action.payload
         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },
      setPlay: (state, action) => {
         state.playing = action.payload
         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },

      setVolume: (state, action) => {
         state.volume = action.payload
         localStorage.setItem("d4tmp3_setting", JSON.stringify(state))
      },

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

      setPlayingAction: (state, action) => {
         state.playing = action.payload
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

export const {
   setAciteTheme,
   setSizeText,
   setLoopSongs,
   setRandomSongs,
   setPlaying,
   setVolume,
   setPlay,
   setReady,
   toogleMuted,
   setIsVolume,
   setPlayingAction,
   setProgressInterval,
   setClockOff,
} = setting.actions

export default setting.reducer
