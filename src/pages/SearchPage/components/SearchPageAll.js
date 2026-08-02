import axios from "axios"
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { zingApi } from "config"
import scrollTop from "utils/scrollToTop"
import LoadingSvg from "components/ui/LoadingSvg"
import MvCard from "components/card/MvCard"
import ArtistCard from "components/card/ArtistCard"
import AlbumCard from "components/card/AlbumCard"
import Section from "components/ui/Section"
import ChartSongRow from "components/song/ChartSongRow"
import OutstandingItems from "./OutstandingItems"

const SearchPageAll = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(zingApi.getSearchAllKeyApi(id))
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
         <Section title={"Nổi bật"}>
            {datas?.artists?.[0] && (
               <OutstandingItems type="Nghệ sĩ" classGrid={classGrid} data={datas?.artists[0]}></OutstandingItems>
            )}

            {datas?.playlists?.[0] && (
               <OutstandingItems type="Playlist" classGrid={classGrid} data={datas?.playlists[0]}></OutstandingItems>
            )}

            {datas?.songs?.[0] && <OutstandingItems type="Bài Hát" classGrid={classGrid} data={datas?.songs[0]}></OutstandingItems>}
         </Section>

         {/* Song */}
         {datas.songs && (
            <Section classAdd2="w-full" title={"Bài Hát"}>
               <div className="main_topchart w-full ">
                  <div className="container_zing-chart">
                     <div className="zing-chart_list !flex-row ">
                        <div className="col l-6 m-6 c-9">
                           {colSong1 &&
                              colSong1.map((e) => (
                                 <ChartSongRow isNotList isNoneRank isChildren item={e} key={e.encodeId}></ChartSongRow>
                              ))}
                        </div>
                        <div className="col l-6 m-6 c-9">
                           {colSong2 &&
                              colSong2.map((e) => (
                                 <ChartSongRow isNotList isNoneRank isChildren item={e} key={e.encodeId}></ChartSongRow>
                              ))}
                        </div>
                     </div>
                  </div>
               </div>
            </Section>
         )}

         {/* Album  */}
         {datas.playlists && (
            <Section title={"Playlist/Album"}>
               {datas.playlists.slice(0, 5).map((e, index) => {
                  let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"
                  return <AlbumCard key={e.encodeId || e.id} artis={true} desc={false} class1={classGird} item={e}></AlbumCard>
               })}
            </Section>
         )}
         {datas.videos && (
            <Section classAdd="artist-mv" title={"MV"}>
               {datas.videos.slice(0, 3).map((e) => {
                  return <MvCard key={e.encodeId || e.id} data={e} isAritst></MvCard>
               })}
            </Section>
         )}

         {/* Artist  */}
         {datas.artists && (
            <Section title={"Nghệ Sĩ/OA"}>
               {datas.artists.slice(0, 5).map((e, index) => {
                  let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"
                  return <ArtistCard key={e.id || e.encodeId} classGird={classGird} data={e}></ArtistCard>
               })}
            </Section>
         )}
      </div>
   )
}

export default SearchPageAll
