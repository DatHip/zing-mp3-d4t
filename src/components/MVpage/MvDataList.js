import axios from "axios"
import React, { memo, useEffect, useState } from "react"
import { tmdAPI } from "../../config"
import PlayListSelector from "../Selection/PlayListSelector"
import MvItem from "./MvItem"
import { v4 as uuidv4 } from "uuid"
import LoadingSvg from "../loading/LoadingSvg"

const MvDataList = memo(({ item }) => {
   const [datas, setData] = useState([])

   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getArtistPage(item.alias))
      const res = data.data.data.sections?.find((e) => e.sectionType === "video")
      setData(res.items)
   }

   let fetch = true
   useEffect(() => {
      if (fetch) {
         fetchData()
      }
      return () => (fetch = false)
   }, [])

   if (datas.length === 0) return

   return (
      <PlayListSelector classAdd2={"container_top100-list text-white"} key={uuidv4()} title={`MV Của ${item.name} `}>
         {datas?.slice(0, 8).map((e) => {
            return <MvItem isMvFull key={uuidv4()} data={e}></MvItem>
         })}
      </PlayListSelector>
   )
})

export default MvDataList
