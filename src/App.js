import React, { memo, useEffect, useLayoutEffect } from "react"
import BottomPlay from "./layout/Bottom/BottomPlay"
import Header from "./layout/Header"
import Siderleft from "./layout/Siderleft"
import RouterPage from "./router/RouterPage"
import { useSelector, useDispatch, useStore } from "react-redux"
import { setPlaying } from "./features/SettingPlay/settingPlay"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase-config"
import { setUser } from "./features/User/userFeatures"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
   const themeDataTheme = useSelector((state) => state.themeToggle.dataTheme)
   const themeBgImg = useSelector((state) => state.themeToggle.bgImg)
   const themeBgPlaying = useSelector((state) => state.themeToggle.bgPlaying)
   const themeDataStyle = useSelector((state) => state.themeToggle.dataStyle)

   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)
   const activeUser = useSelector((state) => state.users.activeUser)

   const dispatch = useDispatch()
   const store = useStore()

   useLayoutEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (!activeUser && user) {
            dispatch(
               setUser({
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  email: user.email,
                  uid: user.uid,
               })
            )
         }
      })
   }, [dispatch, activeUser])

   useEffect(() => {
      const keyboardShortcuts = (e) => {
         let input = document.querySelectorAll("input")

         let data = e.keyCode

         let isInput = false
         input.forEach((e) => {
            if (e === document.activeElement) {
               isInput = true
            }
         })
         if (isInput) return
         // eslint-disable-next-line default-case
         switch (data) {
            case 32:
               e.preventDefault()
               dispatch(setPlaying())
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
   }, [dispatch])

   useLayoutEffect(() => {
      document.documentElement.setAttribute("data-theme", themeDataTheme)
      if (themeBgImg) {
         document.documentElement.classList.add("theme-bg-image")
      } else {
         document.documentElement.classList.remove("theme-bg-image")
      }

      if (themeBgPlaying) {
         document.documentElement.classList.add("zma")
      } else {
         document.documentElement.classList.remove("zma")
      }

      if (themeDataStyle) {
         const param = themeDataStyle.map((e) => {
            return e
         })
         document.documentElement.setAttribute("style", param.join(" ; "))
      } else {
         document.documentElement.removeAttribute("style")
      }
   }, [themeDataTheme, themeBgImg, themeBgPlaying, themeDataStyle])

   // set localStorage
   useLayoutEffect(() => {
      const state = store.getState()
      const queueNowPlay = JSON.parse(localStorage.getItem("queue_nowplay"))
      const logged = JSON.parse(localStorage.getItem("d4tmp3_logged"))
      const setting = JSON.parse(localStorage.getItem("d4tmp3_setting"))
      const lyrics = JSON.parse(localStorage.getItem("d4tmp3_lyrics"))
      const time = JSON.parse(localStorage.getItem("d4tmp3_timeCurrent"))

      if (!queueNowPlay) {
         localStorage.setItem("queue_nowplay", JSON.stringify(state.queueNowPlay))
      }
      if (!logged) {
         localStorage.setItem("d4tmp3_logged", JSON.stringify(state.logged))
      }
      if (!setting) {
         localStorage.setItem("d4tmp3_setting", JSON.stringify(state.setting))
      }
      if (!lyrics) {
         localStorage.setItem("d4tmp3_lyrics", JSON.stringify(state.lyrics))
      }
      if (!time) {
         localStorage.setItem("d4tmp3_timeCurrent", JSON.stringify(state.currentTimes))
      }
   }, [store])

   return (
      <>
         <div
            className={`main ${currentEncodeId ? "" : "hide-bottom"}`}
            style={themeBgImg ? { backgroundImage: `url('${themeBgImg}')` } : {}}
         >
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

