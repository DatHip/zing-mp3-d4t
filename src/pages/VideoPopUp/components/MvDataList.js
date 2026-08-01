import axios from "axios"
import React, { memo, useState } from "react"
import { tmdAPI } from "config"
import PlayListSelector from "components/Selection/PlayListSelector"
import MvItem from "components/MVpage/MvItem"
import { useLayoutEffect } from "react"
import { useCallback } from "react"

const MvDataList = memo(({ item }) => {
   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(tmdAPI.getArtistPage(item.alias))
      const res = data.data.data.sections?.find((e) => e.sectionType === "video")
      setData(res.items)
   }, [item.alias])

   useLayoutEffect(() => {
      fetchData()
   }, [fetchData])

   if (!datas || datas.length === 0) return null

   return (
      <PlayListSelector classAdd2={"container_top100-list "} key={item.alias} title={`MV Của ${item.name} `}>
         {datas?.slice(0, 8).map((e) => {
            return <MvItem isMvFull key={e.encodeId || e.id} data={e}></MvItem>
         })}
      </PlayListSelector>
   )
})

export default MvDataList
