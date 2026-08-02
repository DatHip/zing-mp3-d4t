const root = (state) => state.themeToggle

export const selectThemeName = (state) => root(state).name
export const selectDataTheme = (state) => root(state).dataTheme
export const selectDataStyle = (state) => root(state).dataStyle
export const selectThemeItem = (state) => root(state).itemS
export const selectBgImg = (state) => root(state).bgImg
export const selectBgPlaying = (state) => root(state).bgPlaying
