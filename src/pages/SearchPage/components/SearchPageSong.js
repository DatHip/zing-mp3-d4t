import React from "react"
import { useParams } from "react-router"
import { useSearchByType } from "api/useSearchData"
import { useScrollTop } from "hook/useScrollTop"
import LoadingSvg from "components/ui/LoadingSvg"
import Section from "components/ui/Section"
import ChartSongRow from "components/song/ChartSongRow"

const SearchPageSong = () => {
   const { id } = useParams()
   const { data, isLoading } = useSearchByType(id, "song")
   useScrollTop(id)

   if (isLoading || !data) return <LoadingSvg />

   const songs = data.items || []

   return (
      <div>
         <Section classAdd="mb-[36px]" notRow classAdd2="w-full" title="Bài Hát">
            <div className="main_topchart mt-2">
               <div className="container_zing-chart">
                  <div className="zing-chart_list pt-2">
                     {songs.map((song, index) => (
                        <ChartSongRow isNotList isNoneRank item={song} index={index} key={song.encodeId} />
                     ))}
                  </div>
               </div>
            </div>
         </Section>
      </div>
   )
}

export default SearchPageSong
