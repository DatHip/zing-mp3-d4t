import React, { memo } from "react"
import { useSelector } from "react-redux"
import MvItem from "../MVpage/MvItem"

const HistoryVideo = memo(() => {
   const recentMvs = useSelector((state) => state.logged.recentMvs)

   return (
      <div className="container_top100-list row  text-white  transition-all">
         {recentMvs && recentMvs.length > 0 && recentMvs?.map((e, index) => <MvItem key={index} data={e}></MvItem>)}

         {recentMvs && recentMvs.length === 0 && (
            <div className="personal_podcast-main personal_container-main active">
               <div className="personal_podcast-img"></div>
               <div className="personal_podcast-text">Không có tập mới</div>
            </div>
         )}
      </div>
   )
})

export default HistoryVideo
