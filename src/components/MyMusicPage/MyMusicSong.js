import React, { useEffect, useState } from "react"
import { useGetHomeChart } from "../../api/getHomeChart"
import LoadingSvg from "../loading/LoadingSvg"
import PlayListSelector from "../Selection/PlayListSelector"
import ItemChartList from "../TopChartPage/ItemChartList"

const MyMusicSong = () => {
   const [datas, setData] = useState([])

   const { data, status } = useGetHomeChart()
   useEffect(() => {
      if (data) {
         setData(data.data.RTChart.items.slice(0, 30))
      }
   }, [status])

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         <PlayListSelector
            classAdd="mb-[36px]"
            notRow
            classAdd2="w-full"
            isMyPage={
               <div className="flex items-center justify-center ">
                  <button className="personal_play-all">
                     Phát Tất Cả
                     <span className="material-icons">play_arrow</span>
                  </button>
               </div>
            }
            title={"Bài Hát"}
         >
            <div className="main_topchart mt-2">
               <div className="container_zing-chart">
                  <div className="zing-chart_list pt-2">
                     {datas &&
                        datas.length > 0 &&
                        datas.map((e, index) => {
                           return <ItemChartList onFavourite isNoneRank item={e} index={index} key={e.encodeId}></ItemChartList>
                        })}
                  </div>
               </div>
            </div>
         </PlayListSelector>
      </div>
   )
}

export default MyMusicSong
