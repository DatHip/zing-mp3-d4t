import { createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("data-theme")) || {
   name: "XONE",
   itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/xone-thumbn.jpg",
   dataTheme: "dark",
   bgImg: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/xone-bg.jpg",
   bgPlaying: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1//images/theme/xone-miniplayer.jpg",
   bgHeader: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1//images/theme/xone-header.jpg",
   dataStyle: ["--purple-primary: #d7cb1f", "--progressbar-active-bg: #d7cb1f", "--link-text-hover: #7cb1f"],
}

export const themeToggle = createSlice({
   name: "themetoggle",
   initialState,
   reducers: {
      setThemes: (state, action) => {
         state.name = action.payload.name
         state.itemS = action.payload.itemS
         state.dataTheme = action.payload.dataTheme
         state.bgImg = action.payload.bgImg
         state.bgPlaying = action.payload.bgPlaying
         state.bgHeader = action.payload.bgHeader
         state.dataStyle = action.payload.dataStyle

         document.documentElement.setAttribute("data-theme", action.payload.dataTheme)
         if (action.payload.bgImg) {
            document.documentElement.classList.add("theme-bg-image")
         } else {
            document.documentElement.classList.remove("theme-bg-image")
         }
         if (action.payload.dataStyle) {
            const alo = action.payload.dataStyle.map((e) => {
               return e
            })
            document.documentElement.setAttribute("style", alo.join(" ; "))
         } else {
            document.documentElement.removeAttribute("style")
         }

         localStorage.setItem("data-theme", JSON.stringify(action.payload))
      },
   },
})

export const { setThemes } = themeToggle.actions

export default themeToggle.reducer
