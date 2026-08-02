import React, { memo } from "react"
import { useSelector } from "react-redux"
import MvCard from "components/card/MvCard"
import { selectRecentMvs } from "features/logged/loggedSelectors"

const HistoryVideo = memo(() => {
   const recentMvs = useSelector(selectRecentMvs)

   return (
      <div className="container_top100-list row    transition-all">
         {recentMvs && recentMvs.length > 0 && recentMvs?.map((e, index) => <MvCard key={index} data={e}></MvCard>)}

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
