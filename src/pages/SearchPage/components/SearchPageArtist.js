import axios from "axios"
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { zingApi } from "config"
import scrollTop from "utils/scrollToTop"
import LoadingSvg from "components/ui/LoadingSvg"
import Section from "components/ui/Section"
import ArtistCard from "components/card/ArtistCard"

const SearchPageArtist = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(zingApi.getSearchByType(id, "artist"))
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
            <Section classAdd2={"container_top100-list "} title={"Nghệ Sĩ"}>
               {datas &&
                  datas?.items?.length > 0 &&
                  datas?.items?.map((e) => {
                     let classGird = "col l-2-4 m-3 c-5 !mb-[30px]"

                     return <ArtistCard classGird={classGird} key={e.id || e.encodeId} data={e}></ArtistCard>
                  })}
            </Section>
         </div>
      </div>
   )
}

export default SearchPageArtist
