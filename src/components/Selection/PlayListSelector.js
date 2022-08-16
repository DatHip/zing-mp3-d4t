import React, { memo } from "react"

const PlayListSelector = ({ classAdd, childrenOption, title, all = false, allLink, children, isHistory = false }) => {
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
      <div className={` ${class1} ${classAdd}`}>
         <div className="recently_title">
            <div>
               <p>{title}</p>
            </div>
            {all && (
               <div className="playlist_selector-all">
                  <span>Tất Cả</span>
                  <span className="material-icons-outlined"> chevron_right </span>
               </div>
            )}
         </div>
         {childrenOption}
         <div className={`${class2} row`}>{children}</div>
      </div>
   )
}

export default memo(PlayListSelector)
