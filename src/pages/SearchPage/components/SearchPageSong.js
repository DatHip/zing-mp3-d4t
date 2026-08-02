import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { zingApi } from "config"
import scrollTop from "utils/scrollToTop"
import LoadingSvg from "components/ui/LoadingSvg"
import Section from "components/ui/Section"
import ChartSongRow from "components/song/ChartSongRow"

const SearchPageSong = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = async () => {
      const data = await axios.get(zingApi.getSearchByType(id, "song"))
      setData(data.data.data)
   }

   useEffect(() => {
      scrollTop()
      fetchData()
   }, [id])

   if (datas?.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         <Section classAdd="mb-[36px]" notRow classAdd2="w-full" title={"Bài Hát"}>
            <div className="main_topchart mt-2">
               <div className="container_zing-chart">
                  <div className="zing-chart_list pt-2">
                     {datas &&
                        datas?.items?.length > 0 &&
                        datas?.items?.map((e, index) => {
                           return <ChartSongRow isNotList isNoneRank item={e} index={index} key={e.encodeId}></ChartSongRow>
                        })}
                  </div>
               </div>
            </div>
         </Section>
      </div>
   )
}

export default SearchPageSong
