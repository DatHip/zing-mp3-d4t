import { configureStore } from "@reduxjs/toolkit"
import formSearch from "features/search/searchSlice"
import logged from "features/logged/loggedSlice"
import Lyrics from "features/lyrics/lyricsSlice"
import setTextBtn from "features/mvState/mvStateSlice"
import toggleOpenMain from "features/fullPlayer/fullPlayerSlice"
import queueNowPlay from "features/queue/queueSlice"
import currentTimes from "features/queue/currentTimeSlice"
import themeToggle from "features/theme/themeSlice"
import setting from "features/setting/settingSlice"
import setOpenMainMv from "features/mvToggle/mvToggleSlice"
import toggleRight from "features/queuePanel/queuePanelSlice"
import users from "features/user/userSlice"
import { createPersistMiddleware, flushPersistOnUnload } from "./persistMiddleware"

export const store = configureStore({
   reducer: {
      formSearch: formSearch,
      themeToggle: themeToggle,
      toggleRight: toggleRight,
      setTextBtn: setTextBtn,
      setOpenMainMv: setOpenMainMv,
      toggleOpenMain: toggleOpenMain,
      queueNowPlay: queueNowPlay,
      logged: logged,
      setting: setting,
      lyrics: Lyrics,
      currentTimes: currentTimes,
      users: users,
   },
   middleware: (getDefault) => getDefault().concat(createPersistMiddleware()),
})

flushPersistOnUnload(store)
