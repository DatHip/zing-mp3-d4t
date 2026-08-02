import axios from "axios"
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { zingApi } from "config"
import scrollTop from "utils/scrollToTop"
import LoadingSvg from "components/ui/LoadingSvg"
import AlbumCard from "components/card/AlbumCard"
import Section from "components/ui/Section"

const SearchPagePlaylist = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(zingApi.getSearchByType(id, "playlist"))
      setData(data.data.data)
   }, [id])

   useEffect(() => {
      scrollTop()
      fetchData()
   }, [id, fetchData])

   if (!datas || datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         <Section classAdd2={"!flex-wrap"} key={id} title={"Playlist/Album"}>
            {datas &&
               datas?.items?.length > 0 &&
               datas?.items?.map((e) => {
                  let classGird = "col l-2-4 m-3 c-6 !mb-[30px]"

                  return <AlbumCard key={e.encodeId || e.id} artis={true} desc={false} class1={classGird} item={e}></AlbumCard>
               })}
         </Section>
      </div>
   )
}

export default SearchPagePlaylist
