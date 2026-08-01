import axios from "axios"
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { tmdAPI } from "config"
import scrollTop from "utils/scrollToTop"
import LoadingSvg from "components/loading/LoadingSvg"
import PlayListSelector from "components/Selection/PlayListSelector"
import ItemArits from "components/MyMusicPage/ItemArits"

const SearchPageArtist = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(tmdAPI.getSearchByType(id, "artist"))
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
            <PlayListSelector classAdd2={"container_top100-list "} title={"Nghệ Sĩ"}>
               {datas &&
                  datas?.items?.length > 0 &&
                  datas?.items?.map((e) => {
                     let classGird = "col l-2-4 m-3 c-5 !mb-[30px]"

                     return <ItemArits classGird={classGird} key={e.id || e.encodeId} data={e}></ItemArits>
                  })}
            </PlayListSelector>
         </div>
      </div>
   )
}

export default SearchPageArtist
