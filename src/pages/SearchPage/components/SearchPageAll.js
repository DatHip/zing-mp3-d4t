import axios from "axios"
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { tmdAPI } from "config"
import scrollTop from "utils/scrollToTop"
import LoadingSvg from "components/loading/LoadingSvg"
import MvItem from "components/MVpage/MvItem"
import ItemArits from "components/MyMusicPage/ItemArits"
import CarouselItem from "components/Selection/CarouselItem"
import PlayListSelector from "components/Selection/PlayListSelector"
import ItemChartList from "components/TopChartPage/ItemChartList"
import OutstandingItems from "./OutstandingItems"

const SearchPageAll = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(tmdAPI.getSearchAllKeyApi(id))
      setData(data.data.data)
   }, [id])

   useEffect(() => {
      scrollTop()
      fetchData()
   }, [id, fetchData])

   if (!datas || datas.length === 0) return <LoadingSvg></LoadingSvg>

   let classGrid = "col l-4 m-4 c-8"

   const colSong1 = datas?.songs?.slice(0, 3)
   const colSong2 = datas?.songs?.slice(3, 6)

   return (
      <div>
         {/* Nổi Bật */}
         <PlayListSelector title={"Nổi bật"}>
            {datas?.artists?.[0] && (
               <OutstandingItems type="Nghệ sĩ" classGrid={classGrid} data={datas?.artists[0]}></OutstandingItems>
            )}

            {datas?.playlists?.[0] && (
               <OutstandingItems type="Playlist" classGrid={classGrid} data={datas?.playlists[0]}></OutstandingItems>
            )}

            {datas?.songs?.[0] && <OutstandingItems type="Bài Hát" classGrid={classGrid} data={datas?.songs[0]}></OutstandingItems>}
         </PlayListSelector>

         {/* Song */}
         {datas.songs && (
            <PlayListSelector classAdd2="w-full" title={"Bài Hát"}>
               <div className="main_topchart w-full ">
                  <div className="container_zing-chart">
                     <div className="zing-chart_list !flex-row ">
                        <div className="col l-6 m-6 c-9">
                           {colSong1 &&
                              colSong1.map((e) => (
                                 <ItemChartList isNotList isNoneRank isChildren item={e} key={e.encodeId}></ItemChartList>
                              ))}
                        </div>
                        <div className="col l-6 m-6 c-9">
                           {colSong2 &&
                              colSong2.map((e) => (
                                 <ItemChartList isNotList isNoneRank isChildren item={e} key={e.encodeId}></ItemChartList>
                              ))}
                        </div>
                     </div>
                  </div>
               </div>
            </PlayListSelector>
         )}

         {/* Album  */}
         {datas.playlists && (
            <PlayListSelector title={"Playlist/Album"}>
               {datas.playlists.slice(0, 5).map((e, index) => {
                  let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"
                  return <CarouselItem key={e.encodeId || e.id} artis={true} desc={false} class1={classGird} item={e}></CarouselItem>
               })}
            </PlayListSelector>
         )}
         {datas.videos && (
            <PlayListSelector classAdd="artist-mv" title={"MV"}>
               {datas.videos.slice(0, 3).map((e) => {
                  return <MvItem key={e.encodeId || e.id} data={e} isAritst></MvItem>
               })}
            </PlayListSelector>
         )}

         {/* Artist  */}
         {datas.artists && (
            <PlayListSelector title={"Nghệ Sĩ/OA"}>
               {datas.artists.slice(0, 5).map((e, index) => {
                  let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"
                  return <ItemArits key={e.id || e.encodeId} classGird={classGird} data={e}></ItemArits>
               })}
            </PlayListSelector>
         )}
      </div>
   )
}

export default SearchPageAll
