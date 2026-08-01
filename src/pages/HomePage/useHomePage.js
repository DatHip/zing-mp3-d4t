import { useEffect } from "react"
import scrollTop from "utils/scrollToTop"

export function useHomePage() {
   useEffect(() => {
      scrollTop()
   }, [])

   return {}
}
