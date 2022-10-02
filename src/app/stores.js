import { configureStore } from "@reduxjs/toolkit"
import formSearch from "../features/formSearch/formSearch"
import logged from "../features/Logged/loggedFeatures"
import Lyrics from "../features/Lyrics/Lyrics"
import setTextBtn from "../features/MvState/MvStateFeatures"
import toggleOpenMain from "../features/openMainFull/openMainFullFeatures"
import queueNowPlay from "../features/QueueFeatures/QueueFeatures"
import currentTimes from "../features/QueueFeatures/SetTimeCurrent"
import themeToggle from "../features/setTheme/themeSetFeatures"
import setting from "../features/SettingPlay/settingPlay"
import setOpenMainMv from "../features/ToggleMainMv/toggleMainMv"
import toggleRight from "../features/toggleRight/toggleRight"
import users from "../features/User/userFeatures"

export const store = configureStore({
   reducer: {
      formsearch: formSearch,
      themetoggle: themeToggle,
      toggleright: toggleRight,
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
})
