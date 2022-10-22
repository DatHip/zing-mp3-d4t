import { createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("data-theme")) || {
   name: "Zing Music Awards",
   itemS: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/zma.jpg",
   dataTheme: "blue",
   bgImg: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/zma.svg",
   bgPlaying: "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-player/zma.png",
   bgHeader: false,
   dataStyle: [
      "--layout-bg: #37075d",
      "--primary-bg: #6a39af",
      "--queue-player-popup-bg: #5d218c",
      "--purple-primary: #ed2b91",
      "--link-text-hover: #fe63da",
      "--sidebar-popup-bg: #572f90",
      "--linear-gradient-bg: linear-gradient(to bottom, #740091, #2d1a4c)",
      "--miniplayer-bg-img: url('https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-player/zma.png')",
   ],
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
