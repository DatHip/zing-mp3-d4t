import React from "react"
import { useOutletContext } from "react-router"
import LoadingSvg from "../loading/LoadingSvg"
import PlayListSelector from "../Selection/PlayListSelector"
import ItemChartList from "../TopChartPage/ItemChartList"

const ArtistSong = () => {
   const datas = useOutletContext()
   const dataSelector = datas?.sections?.find((e) => e.sectionType === "song")

   if (datas?.length === 0 || !datas) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         {" "}
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
            title={"Danh Sách Bài Hát"}
         >
            <div className="main_topchart mt-2">
               <div className="container_zing-chart">
                  <div className="zing-chart_list pt-2">
                     {dataSelector &&
                        dataSelector?.items?.length > 0 &&
                        dataSelector?.items?.map((e, index) => {
                           return <ItemChartList isNoneRank item={e} index={index} key={e.encodeId}></ItemChartList>
                        })}
                  </div>
               </div>
            </div>
         </PlayListSelector>
      </div>
   )
}

export default ArtistSong
