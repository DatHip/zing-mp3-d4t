import React from "react"
import ItemChartList from "../../components/TopChartPage/ItemChartList"
import LoadingSvg from "../../components/loading/LoadingSvg"
import { useNewMusicPage } from "./useNewMusicPage"

const NewMusicPage = () => {
   const { items, isLoading, handlePlayAll, playlistId } = useNewMusicPage()

   if (isLoading || !items) return <LoadingSvg />

   let indexItem = -1

   return (
      <div className="main_topchart songnew">
         <div className="container_zing-chart">
            <div className="zing-chart_top">
               <div className="cursor-pointer zing-chartBtn">
                  <p>Mới Phát Hành</p>
                  <span onClick={handlePlayAll} className="material-icons-round">
                     play_circle
                  </span>
               </div>
            </div>
            <div className="zing-chart_bottom">
               <div className="zing-chart_list ">
                  {items.map((e, index) => {
                     if (e.streamingStatus === 1) indexItem++
                     return (
                        <ItemChartList
                           indexNotVip={indexItem}
                           idAlbum={playlistId}
                           index={index}
                           item={e}
                           key={e.encodeId}
                        />
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewMusicPage
