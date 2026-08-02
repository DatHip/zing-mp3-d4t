const getReleaseCountdown = (timeRelease) => {
   const d = new Date()
   let time = d.getTime() / 1000

   let timeFormat = Math.ceil(time - timeRelease)
   let day = Math.ceil(timeFormat / (3600 * 24))

   // Widest bucket first: the previous order tested `>= 7` before `>= 14`, so
   // the two-week branch could never be reached.
   if (day >= 14) {
      return "2 tuần"
   }
   if (day >= 7) {
      return "1 tuần"
   }
   return day + " ngày"
}

export default getReleaseCountdown
