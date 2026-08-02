const root = (state) => state.toggleOpenMain

export const selectFullPlayerOpen = (state) => root(state).isOpen
export const selectFullPlayerOpenClass = (state) => root(state).isOpenClass
