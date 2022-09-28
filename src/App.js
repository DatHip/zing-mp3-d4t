import React, { memo, useMemo, useEffect } from "react"
import BottomPlay from "./layout/Bottom/BottomPlay"
import Header from "./layout/Header"
import Siderleft from "./layout/Siderleft"
import RouterPage from "./router/RouterPage"
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from "react-redux"
import { setPlaying } from "./features/SettingPlay/settingPlay"

function App() {
   const theme = useSelector((state) => state.themetoggle)
   const queueNowPlaySelector = useSelector((state) => state.queueNowPlay)
   const loggedSelector = useSelector((state) => state.logged)
   const settingSelector = useSelector((state) => state.setting)
   const lyricsSelector = useSelector((state) => state.lyrics)
   const timeSelector = useSelector((state) => state.currentTimes)

   const dispatch = useDispatch()

   useEffect(() => {
      const keyboardShortcuts = (e) => {
         let input = document.querySelectorAll("input")

         let data = e.keyCode

         // eslint-disable-next-line default-case
         switch (data) {
            case 32:
               let isInput = false
               input.forEach((e) => {
                  if (e === document.activeElement) {
                     isInput = true
                  }
               })

               if (!isInput) {
                  e.preventDefault()
                  dispatch(setPlaying())
               }
               break
            case 39:
               document.querySelector("#nextMusic").click()
               break
            case 37:
               document.querySelector("#prevMusic").click()
               break
            case 74:
               document.querySelector("#randomMusic").click()
               break
            case 76:
               document.querySelector("#loopMusic").click()
               break
         }
      }
      document.addEventListener("keydown", keyboardShortcuts)

      return () => document.removeEventListener("keydown", keyboardShortcuts)
   }, [])

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
      const time = JSON.parse(localStorage.getItem("d4tmp3_timeCurrent"))

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
      if (!time) {
         localStorage.setItem("d4tmp3_timeCurrent", JSON.stringify(timeSelector))
      }
   }, [])

   return (
      <>
         <div className="main" style={theme.bgImg ? { backgroundImage: `url('${theme.bgImg}')` } : {}}>
            <Header></Header>
            <Siderleft></Siderleft>
            <BottomPlay></BottomPlay>
            <RouterPage></RouterPage>
            <ToastContainer
               position="top-center"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               limit={5}
            ></ToastContainer>
         </div>
      </>
   )
}

export default memo(App)

