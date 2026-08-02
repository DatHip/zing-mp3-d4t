import { useCallback, useState } from "react"
// Usage
// function App() {
//
//    const [isTextChanged, setIsTextChanged] = useToggle()

//    return <button onClick={setIsTextChanged}>{isTextChanged ? "Toggled" : "Click to Toggle"}</button>
// }
// Hook
// Parameter is the boolean, with default "false" value

const useToggle = (initialState = false) => {
   const [state, setState] = useState(initialState)

   const toggle = useCallback(() => setState((state) => !state), [])

   return [state, toggle]
}

export default useToggle
