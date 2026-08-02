import React, { memo } from "react"

const LoadingSvg = memo(({ isLoadMore }) => {
   return (
      <div className={`loading ${isLoadMore ? "relative mt-5" : "absolute"}`}>
         <div className="loader">
            <div className="bar1" />
            <div className="bar2" />
            <div className="bar3" />
            <div className="bar4" />
            <div className="bar5" />
            <div className="bar6" />
         </div>
      </div>
   )
})

export default LoadingSvg
