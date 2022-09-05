import { createSlice } from "@reduxjs/toolkit"

let initialState = {
   isOpen: false,
   historyOpen: "/",
   historyOut: "",
   id: "",
}

export const setOpenMainMv = createSlice({
   name: "setOpenMainMv",
   initialState,
   reducers: {
      setOpenOn: (state, action) => {
         state.isOpen = true
      },

      setLocationOpen: (state, action) => {
         state.historyOpen = action.payload
      },

      setOpenOff: (state, action) => {
         state.isOpen = false
      },
   },
})

export const { setOpenOn, setOpenOff, setLocationOpen } = setOpenMainMv.actions

export default setOpenMainMv.reducer
