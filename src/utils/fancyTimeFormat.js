const fancyTimeFormat = (duration) => {
   // Hours, minutes and seconds
   var hrs = ~~(duration / 3600)
   var mins = ~~((duration % 3600) / 60)
   var secs = ~~duration % 60

   var ret = ""

   if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "")
   }

   ret += "" + mins + ":" + (secs < 10 ? "0" : "")
   ret += "" + secs
   return ret
}

export default fancyTimeFormat
