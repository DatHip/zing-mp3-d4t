import React, { memo, useEffect, useState } from "react"
import PlayListSelector from "../Selection/PlayListSelector"
import LoadingSvg from "../loading/LoadingSvg"
import ItemArits from "./ItemArits"
import { useGetHomeChart } from "../../api/getHomeChart"
const MyMusicArtis = memo(() => {
   const [datas, setData] = useState([])

   const { data, status } = useGetHomeChart()
   useEffect(() => {
      if (data) {
         setData(data.data.RTChart.items.slice(0, 30))
      }
   }, [status])

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>
   return (
      <PlayListSelector all={false} classAdd={"container_radio "} classAdd2={"mb-[10px]"} title={"Nghệ Sĩ"}>
         {datas &&
            datas.length > 0 &&
            datas.map((e, index) => {
               let classGird = "col l-2-4 m-3 c-5 !mb-[30px]"

               return <ItemArits classGird={classGird} key={e.encodeId} data={e}></ItemArits>
            })}
      </PlayListSelector>
   )
})

export default MyMusicArtis
