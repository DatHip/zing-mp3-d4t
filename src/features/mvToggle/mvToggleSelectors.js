const root = (state) => state.setOpenMainMv

export const selectMvOpen = (state) => root(state).isOpen
export const selectMvHistoryOpen = (state) => root(state).historyOpen
