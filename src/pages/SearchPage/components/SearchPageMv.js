import axios from "axios"
import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import { zingApi } from "config"
import scrollTop from "utils/scrollToTop"
import LoadingSvg from "components/ui/LoadingSvg"
import Section from "components/ui/Section"
import MvCard from "components/card/MvCard"

const SearchPageMv = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(zingApi.getSearchByType(id, "video"))
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
            <Section classAdd2={"container_top100-list "} title={"MV"}>
               {datas &&
                  datas?.items?.length > 0 &&
                  datas?.items?.map((e) => {
                     return <MvCard key={e.encodeId || e.id} data={e}></MvCard>
                  })}
            </Section>
         </div>
      </div>
   )
}

export default SearchPageMv
