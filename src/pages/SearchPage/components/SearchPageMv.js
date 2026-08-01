import axios from "axios"
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { tmdAPI } from "config"
import scrollTop from "utils/scrollToTop"
import LoadingSvg from "components/loading/LoadingSvg"
import PlayListSelector from "components/Selection/PlayListSelector"
import MvItem from "components/MVpage/MvItem"

const SearchPageMv = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(tmdAPI.getSearchByType(id, "video"))
      setData(data.data.data)
   }, [id])

   useEffect(() => {
      scrollTop()
      fetchData()
   }, [id, fetchData])

   if (!datas || datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-container ">
            <PlayListSelector classAdd2={"container_top100-list "} title={"MV"}>
               {datas &&
                  datas?.items?.length > 0 &&
                  datas?.items?.map((e) => {
                     return <MvItem key={e.encodeId || e.id} data={e}></MvItem>
                  })}
            </PlayListSelector>
         </div>
      </div>
   )
}

export default SearchPageMv
