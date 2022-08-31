import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { tmdAPI } from "../../config"
import scrollTop from "../../utils/scrollToTop"
import LoadingSvg from "../loading/LoadingSvg"
import PlayListSelector from "../Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"
import MvItem from "../MVpage/MvItem"

const SearchPageMv = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getSearchByType(id, "video"))
      setData(data.data.data)
      console.log(data.data.data)
   }

   useEffect(() => {
      scrollTop()
      fetchData()
   }, [id])

   if (datas?.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-container text-white">
            <PlayListSelector classAdd2={"container_top100-list text-white"} title={"MV"}>
               {datas &&
                  datas?.items?.length > 0 &&
                  datas?.items?.map((e, index) => {
                     return <MvItem key={uuidv4()} data={e}></MvItem>
                  })}
            </PlayListSelector>
         </div>
      </div>
   )
}

export default SearchPageMv
