import { createSlice } from "@reduxjs/toolkit"

let initialState = false

export const toggleRight = createSlice({
   name: "toggleright",
   initialState,
   reducers: {
      setToggle: (state) => !state,
   },
})

export const { setToggle } = toggleRight.actions

export default toggleRight.reducer
