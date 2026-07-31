import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { tmdAPI } from "../../config"
import scrollTop from "../../utils/scrollToTop"
import LoadingSvg from "../loading/LoadingSvg"
import PlayListSelector from "../Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"

import ItemArits from "../MyMusicPage/ItemArits"

const SearchPageArtist = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getSearchByType(id, "artist"))
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
         <div className="main_mv-container ">
            <PlayListSelector classAdd2={"container_top100-list "} title={"MV"}>
               {datas &&
                  datas?.items?.length > 0 &&
                  datas?.items?.map((e, index) => {
                     let classGird = "col l-2-4 m-3 c-5 !mb-[30px]"

                     return <ItemArits classGird={classGird} key={uuidv4()} data={e}></ItemArits>
                  })}
            </PlayListSelector>
         </div>
      </div>
   )
}

export default SearchPageArtist
