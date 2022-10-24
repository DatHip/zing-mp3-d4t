import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { tmdAPI } from "../../config"
import scrollTop from "../../utils/scrollToTop"
import LoadingSvg from "../loading/LoadingSvg"
import PlayListSelector from "../Selection/PlayListSelector"
import ItemChartList from "../TopChartPage/ItemChartList"

const SearchPageSong = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getSearchByType(id, "song"))
      setData(data.data.data)
   }

   useEffect(() => {
      scrollTop()
      fetchData()
   }, [id])

   if (datas?.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         <PlayListSelector classAdd="mb-[36px]" notRow classAdd2="w-full" title={"Bài Hát"}>
            <div className="main_topchart mt-2">
               <div className="container_zing-chart">
                  <div className="zing-chart_list pt-2">
                     {datas &&
                        datas?.items?.length > 0 &&
                        datas?.items?.map((e, index) => {
                           return <ItemChartList isNotList isNoneRank item={e} index={index} key={e.encodeId}></ItemChartList>
                        })}
                  </div>
               </div>
            </div>
         </PlayListSelector>
      </div>
   )
}

export default SearchPageSong
