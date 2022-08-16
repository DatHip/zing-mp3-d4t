import React, { useMemo } from "react"
import BottomPlay from "./layout/Bottom/BottomPlay"
import Header from "./layout/Header"
import Siderleft from "./layout/Siderleft"
import RouterPage from "./router/RouterPage"
import { useSelector } from "react-redux"

function App() {
   const theme = useSelector((state) => state.themetoggle)

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

   return (
      <div className="main" style={theme.bgImg ? { backgroundImage: `url('${theme.bgImg}')` } : {}}>
         <Header></Header>
         <Siderleft></Siderleft>
         <BottomPlay></BottomPlay>
         <RouterPage></RouterPage>
      </div>
   )
}

export default App

