import React, { memo, useCallback, useState, Suspense } from "react"
import { useSelector } from "react-redux"

// The dialog carries yup + react-hook-form. It is split out so the queue header
// button costs nothing until someone actually sets a sleep timer.
const AlarmModal = React.lazy(() => import("./AlarmModal"))

const AlarmButton = memo(() => {
   const clockOff = useSelector((state) => state.setting.clockOff)
   const [isOpen, setOpen] = useState(false)

   const handleClose = useCallback(() => setOpen(false), [])

   return (
      <>
         <div onClick={() => setOpen(true)} className={`player_btn queue_time ${clockOff ? "active" : ""}`}>
            <span className="material-icons-outlined"> alarm </span>
            <div className="playing_title-hover">Hẹn giờ</div>
         </div>
         {isOpen && (
            <Suspense fallback={null}>
               <AlarmModal onClose={handleClose}></AlarmModal>
            </Suspense>
         )}
      </>
   )
})

export default AlarmButton
