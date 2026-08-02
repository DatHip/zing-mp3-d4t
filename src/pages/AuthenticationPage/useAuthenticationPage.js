import { useState } from "react"

export function useAuthenticationPage() {
   const [sign, setSign] = useState(true)

   return {
      sign,
      setSign,
   }
}
