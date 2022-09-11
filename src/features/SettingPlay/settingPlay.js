import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("d4tmp3_setting")) || {
   isLoop: false,
   autoPlay: false,
   quality: 320,
   isBgFull: true,
   text: 2,
   titleKey: "D4T MP3 | Nghe nhạc chất lượng cao trên desktop, mobile và TV",
}

export const setting = createSlice({
   name: "setting",
   initialState,
   reducers: {
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

export const { setAciteTheme, setSizeText } = setting.actions

export default setting.reducer
