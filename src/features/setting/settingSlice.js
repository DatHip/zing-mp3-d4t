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

// Persistence is owned by app/persistMiddleware.js (debounced, ref-equality
// short-circuited). The reducers below used to each call localStorage.setItem
// on an Immer draft — a synchronous JSON.stringify through a proxy on every
// dispatch, on top of the write the middleware was already doing.
export const setting = createSlice({
   name: "setting",
   initialState,
   reducers: {
      setClockOff: (state, action) => {
         state.clockOff = action.payload
      },
      setProgressInterval: (state, action) => {
         state.progressInterval = action.payload
      },
      setIsVolume: (state, action) => {
         state.isVolume = action.payload
      },
      toogleMuted: (state) => {
         state.muted = !state.muted
      },
      setReady: (state, action) => {
         state.isReady = action.payload
      },
      setPlay: (state, action) => {
         state.playing = action.payload
      },

      setVolume: (state, action) => {
         state.volume = action.payload
      },

      setRandomSongs: (state, action) => {
         state.isRandom = !state.isRandom
      },

      setLoopSongs: (state, action) => {
         state.isLoop = !state.isLoop
      },

      setPlaying: (state) => {
         state.playing = !state.playing
      },

      setPlayingAction: (state, action) => {
         state.playing = action.payload
      },

      setAciteTheme: (state, action) => {
         state.isBgFull = action.payload
      },
      setSizeText: (state, action) => {
         state.text = action.payload
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
