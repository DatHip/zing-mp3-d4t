import React, { memo, useEffect, useLayoutEffect } from "react"
import PlayerBar from "layout/PlayerBar"
import Header from "layout/Header"
import Sidebar from "layout/Sidebar"
import RouterPage from "router/RouterPage"
import { useSelector, useDispatch, useStore } from "react-redux"
import { setPlaying } from "features/setting/settingSlice"
import { setUser } from "features/user/userSlice"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { selectCurrentEncodeId } from "features/queue/queueSelectors"
import { selectBgImg, selectBgPlaying, selectDataStyle, selectDataTheme } from "features/theme/themeSelectors"

function App() {
   const themeDataTheme = useSelector(selectDataTheme)
   const themeBgImg = useSelector(selectBgImg)
   const themeBgPlaying = useSelector(selectBgPlaying)
   const themeDataStyle = useSelector(selectDataStyle)

   const currentEncodeId = useSelector(selectCurrentEncodeId)

   const dispatch = useDispatch()
   const store = useStore()

   // The Auth SDK is ~450KB of source and nothing above the fold needs it, so it
   // is pulled in after mount instead of shipping inside main.js. activeUser is
   // read off the store inside the callback so this subscribes exactly once.
   useEffect(() => {
      let unsub = null
      let cancelled = false

      Promise.all([import("lib/firebase/auth"), import("firebase/auth")]).then(
         ([{ auth }, { onAuthStateChanged }]) => {
            if (cancelled || !auth) return
            unsub = onAuthStateChanged(auth, (user) => {
               if (!store.getState().users.activeUser && user) {
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
         }
      )

      return () => {
         cancelled = true
         if (unsub) unsub()
      }
   }, [dispatch, store])

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

   return (
      <>
         <div
            className={`main ${currentEncodeId ? "" : "hide-bottom"}`}
            style={themeBgImg ? { backgroundImage: `url('${themeBgImg}')` } : {}}
         >
            <Header></Header>
            <Sidebar></Sidebar>
            <PlayerBar></PlayerBar>
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

