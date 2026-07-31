import React from "react"
import { useOutletContext } from "react-router"
import EmptyContent from "../Bottom/EmptyContent"
import LoadingSvg from "../loading/LoadingSvg"
import PlayListSelector from "../Selection/PlayListSelector"
import ItemChartList from "../TopChartPage/ItemChartList"

const MyMusicSong = () => {
   const { docs } = useOutletContext()

   if (!docs?.email) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         {docs.favouriteSongs.length === 0 && (
            <EmptyContent
               icon="favorite-song"
               text={"Chưa có mục yêu thích trong thư viện"}
               textBtn={"Khám phá ngay"}
            ></EmptyContent>
         )}

         {docs.favouriteSongs.length > 0 && (
            <PlayListSelector classAdd="mb-[36px]" notRow classAdd2="w-full" title={"Bài Hát"}>
               <div className="main_topchart mt-2">
                  <div className="container_zing-chart">
                     <div className="zing-chart_list pt-2">
                        {docs.favouriteSongs.map((e, index) => {
                           return <ItemChartList notAlbum isNoneRank item={e} index={index} key={e.encodeId}></ItemChartList>
                        })}
                     </div>
                  </div>
               </div>
            </PlayListSelector>
         )}
      </div>
   )
}

export default MyMusicSong
