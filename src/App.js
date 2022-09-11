import React, { memo, useMemo } from "react"
import BottomPlay from "./layout/Bottom/BottomPlay"
import Header from "./layout/Header"
import Siderleft from "./layout/Siderleft"
import RouterPage from "./router/RouterPage"
import { useSelector } from "react-redux"

function App() {
   const theme = useSelector((state) => state.themetoggle)
   const queueNowPlaySelector = useSelector((state) => state.queueNowPlay)
   const loggedSelector = useSelector((state) => state.logged)
   const settingSelector = useSelector((state) => state.setting)
   const lyricsSelector = useSelector((state) => state.lyrics)

   useMemo(() => {
      document.documentElement.setAttribute("data-theme", theme.dataTheme)
      if (theme.bgImg) {
         document.documentElement.classList.add("theme-bg-image")
      } else {
         document.documentElement.classList.remove("theme-bg-image")
      }

      if (theme.bgPlaying) {
         document.documentElement.classList.add("zma")
      } else {
         document.documentElement.classList.remove("zma")
      }

      if (theme.dataStyle) {
         const param = theme.dataStyle.map((e) => {
            return e
         })
         document.documentElement.setAttribute("style", param.join(" ; "))
      } else {
         document.documentElement.removeAttribute("style")
      }
   }, [])

   // set localStorage
   useMemo(() => {
      const queueNowPlay = JSON.parse(localStorage.getItem("queue_nowplay"))
      const logged = JSON.parse(localStorage.getItem("d4tmp3_logged"))
      const setting = JSON.parse(localStorage.getItem("d4tmp3_setting"))
      const lyrics = JSON.parse(localStorage.getItem("d4tmp3_lyrics"))

      if (!queueNowPlay) {
         localStorage.setItem("queue_nowplay", JSON.stringify(queueNowPlaySelector))
      }
      if (!logged) {
         localStorage.setItem("d4tmp3_logged", JSON.stringify(loggedSelector))
      }
      if (!setting) {
         localStorage.setItem("d4tmp3_setting", JSON.stringify(settingSelector))
      }
      if (!lyrics) {
         localStorage.setItem("d4tmp3_lyrics", JSON.stringify(lyricsSelector))
      }
   }, [])

   return (
      <>
         <div className="main" style={theme.bgImg ? { backgroundImage: `url('${theme.bgImg}')` } : {}}>
            <Header></Header>
            <Siderleft></Siderleft>
            <BottomPlay></BottomPlay>
            <RouterPage></RouterPage>
         </div>
      </>
   )
}

export default memo(App)

