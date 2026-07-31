const getFormartTimeDDYY = (time) => {
   var date = new Date(time * 1000)
   var year = date.getFullYear()
   var month = ("0" + (date.getMonth() + 1)).slice(-2)
   var day = ("0" + date.getDate()).slice(-2)

   return `${day}/${month}/${year}`
}

export default getFormartTimeDDYY
