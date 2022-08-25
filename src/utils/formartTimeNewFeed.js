const formartTimeNewFeed = (time) => {
   var date = new Date(time * 1000)
   var month = ("0" + (date.getMonth() + 1)).slice(-2)
   var day = ("0" + date.getDate()).slice(-2)

   var dates = new Date(null)
   dates.setSeconds(time)
   var results = date.toISOString().substr(11, 5)

   return `${day} tháng ${month} lúc ${results}`
}

export default formartTimeNewFeed
