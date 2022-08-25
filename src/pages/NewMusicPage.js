import React, { useEffect, useState } from "react"
import { getNewSongRelease } from "../api/getNewSongRelease"
import ItemChartList from "../components/TopChartPage/ItemChartList"
import { v4 as uuidv4 } from "uuid"
import LoadingSvg from "../components/loading/LoadingSvg"
const NewMusicPage = () => {
   const [datas, setData] = useState([])
   const { data, status } = getNewSongRelease()

   useEffect(() => {
      if (data) {
         setData(data.data.items)
      }
   }, [status])

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div className="main_topchart songnew">
         <div className="container_zing-chart">
            <div className="zing-chart_top">
               <div className="zing-chart_top-item">
                  <a href="#">
                     Nhạc Mới
                     <span className="material-icons-round" encodeid="ZDB6EB9C">
                        play_circle
                     </span>
                  </a>
               </div>
            </div>
            <div className="zing-chart_bottom">
               <div className="zing-chart_list">
                  {datas &&
                     datas.length > 0 &&
                     datas.map((e, index) => {
                        return <ItemChartList index={index} item={e} key={uuidv4()}></ItemChartList>
                     })}
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewMusicPage
