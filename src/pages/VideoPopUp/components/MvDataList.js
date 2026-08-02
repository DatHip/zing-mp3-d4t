import axios from "axios"
import React, { memo, useState } from "react"
import { zingApi } from "config"
import Section from "components/ui/Section"
import MvCard from "components/card/MvCard"
import { useLayoutEffect } from "react"
import { useCallback } from "react"

const MvDataList = memo(({ item }) => {
   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(zingApi.getArtistPage(item.alias))
      const res = data.data.data.sections?.find((e) => e.sectionType === "video")
      setData(res.items)
   }, [item.alias])

   useLayoutEffect(() => {
      fetchData()
   }, [fetchData])

   if (!datas || datas.length === 0) return null

   return (
      <Section classAdd2={"container_top100-list "} key={item.alias} title={`MV Của ${item.name} `}>
         {datas?.slice(0, 8).map((e) => {
            return <MvCard isMvFull key={e.encodeId || e.id} data={e}></MvCard>
         })}
      </Section>
   )
})

export default MvDataList
