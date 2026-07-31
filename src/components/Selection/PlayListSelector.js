import React, { memo } from "react"
import { Link } from "react-router-dom"

const PlayListSelector = ({
   notRow,
   classAdd2,
   isTitleSub,
   classAdd,
   childrenOption,
   title,
   all = false,
   allLink,
   children,
   isHistory = false,
   isMyPage,
   to = "/",
}) => {
   let class1
   let class2
   if (isHistory) {
      class1 = "container_recently"
      class2 = "recently_list"
   } else {
      class1 = "container_want"
      class2 = "want_list"
   }
   return (
      <div className={` ${class1} ${classAdd || ""}`}>
         <div className="recently_title">
            <div>{isTitleSub ? isTitleSub : <p>{title}</p>}</div>
            {all && (
               <Link to={to} className="playlist_selector-all">
                  <span>TẤT CẢ</span>
                  <span className="material-icons-outlined"> chevron_right </span>
               </Link>
            )}
            {isMyPage}
         </div>
         {childrenOption}
         <div className={`${class2} ${classAdd2} ${notRow ? "" : "row"}`}>{children}</div>
      </div>
   )
}

export default memo(PlayListSelector)
