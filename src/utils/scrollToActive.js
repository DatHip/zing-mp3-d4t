function scrollToActive(e) {
   setTimeout(function () {
      e?.scrollIntoView({
         behavior: "smooth",
         block: "center",
         inline: "center",
      })
   }, 200)
}

export default scrollToActive
