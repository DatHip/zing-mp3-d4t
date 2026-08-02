import React from "react"
import { useOutletContext } from "react-router"
import EmptyContent from "components/ui/EmptyContent"
import LoadingSvg from "components/ui/LoadingSvg"
import Section from "components/ui/Section"
import ChartSongRow from "components/song/ChartSongRow"

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
            <Section classAdd="mb-[36px]" notRow classAdd2="w-full" title={"Bài Hát"}>
               <div className="main_topchart mt-2">
                  <div className="container_zing-chart">
                     <div className="zing-chart_list pt-2">
                        {docs.favouriteSongs.map((e, index) => {
                           return <ChartSongRow notAlbum isNoneRank item={e} index={index} key={e.encodeId}></ChartSongRow>
                        })}
                     </div>
                  </div>
               </div>
            </Section>
         )}
      </div>
   )
}

export default MyMusicSong
