import axios from "axios"
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { tmdAPI } from "config"
import scrollTop from "utils/scrollToTop"
import LoadingSvg from "components/loading/LoadingSvg"
import CarouselItem from "components/Selection/CarouselItem"
import PlayListSelector from "components/Selection/PlayListSelector"

const SearchPagePlaylist = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(tmdAPI.getSearchByType(id, "playlist"))
      setData(data.data.data)
   }, [id])

   useEffect(() => {
      scrollTop()
      fetchData()
   }, [id, fetchData])

   if (!datas || datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         <PlayListSelector classAdd2={"!flex-wrap"} key={id} title={"Playlist/Album"}>
            {datas &&
               datas?.items?.length > 0 &&
               datas?.items?.map((e) => {
                  let classGird = "col l-2-4 m-3 c-6 !mb-[30px]"

                  return <CarouselItem key={e.encodeId || e.id} artis={true} desc={false} class1={classGird} item={e}></CarouselItem>
               })}
         </PlayListSelector>
      </div>
   )
}

export default SearchPagePlaylist
