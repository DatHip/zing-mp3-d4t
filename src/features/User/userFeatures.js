import { createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("d4tmp3_user")) || {
   activeUser: false,
   name: "",
   email: "",
   imgUrl: "",
   id: "",
}

export const users = createSlice({
   name: "users",
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.name = action.payload.displayName
         state.imgUrl = action.payload.photoURL
         state.email = action.payload.email
         state.id = action.payload.uid
         state.activeUser = true
         localStorage.setItem("d4tmp3_user", JSON.stringify(state))
      },
      logOut: (state, action) => {
         state.name = ""
         state.imgUrl = ""
         state.email = ""
         state.id = ""
         state.activeUser = false
         localStorage.setItem("d4tmp3_user", JSON.stringify(state))
      },
   },
})

export const { setUser, logOut } = users.actions

export default users.reducer
