const getConterTimeRelese = (timeRelease, isAlbum = false) => {
   const d = new Date()
   let time = d.getTime() / 1000

   // if (isAlbum) {
   //    let dateString = timeRelease
   //    console.log(dateString)
   //    // let dateParts = dateString?.split("/")
   //    // let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
   //    // timeRelease = dateObject.getTime() / 1000
   // }

   let timeFormat = Math.ceil(time - timeRelease)
   let day = Math.ceil(timeFormat / (3600 * 24))

   if (day >= 7) {
      day = "1 tuần"
   } else if (day >= 14) {
      day = "2 tuần"
   } else {
      day += " ngày"
   }

   return day
}

export default getConterTimeRelese
