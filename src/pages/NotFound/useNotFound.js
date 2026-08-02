import { useEffect } from "react"

export function useNotFound() {
   useEffect(() => {
      const timeouts = []
      const intervals = []

      function type(n, t) {
         const elements = document.getElementsByTagName("code")
         if (!elements[n]) return
         const str = elements[n].innerHTML.toString()
         let i = 0
         elements[n].innerHTML = ""

         const timeoutId = setTimeout(function () {
            const intervalId = setInterval(function () {
               i++
               const el = document.getElementsByTagName("code")[n]
               if (!el) {
                  clearInterval(intervalId)
                  return
               }
               el.innerHTML = str.slice(0, i) + "|"
               if (i === str.length) {
                  clearInterval(intervalId)
                  el.innerHTML = str
               }
            }, 10)
            intervals.push(intervalId)
         }, t)
         timeouts.push(timeoutId)
      }

      type(0, 0)
      type(1, 600)
      type(2, 1300)

      return () => {
         timeouts.forEach(clearTimeout)
         intervals.forEach(clearInterval)
      }
   }, [])
}
