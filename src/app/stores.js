import { configureStore } from "@reduxjs/toolkit"
import formSearch from "../features/formSearch/formSearch"
import setTextBtn from "../features/MvState/MvStateFeatures"
import themeToggle from "../features/setTheme/themeSetFeatures"
import toggleRight from "../features/toggleRight/toggleRight"

export const store = configureStore({
   reducer: {
      formsearch: formSearch,
      themetoggle: themeToggle,
      toggleright: toggleRight,
      setTextBtn: setTextBtn,
   },
})
