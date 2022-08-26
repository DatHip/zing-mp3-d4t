import React, { memo, useEffect, useState } from "react"
import { useGetHomeChart } from "../../api/getHomeChart"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"

const MyMusicPlayList = memo(() => {
   const [datas, setData] = useState([])

   const { data, status } = useGetHomeChart()

   useEffect(() => {
      if (data) {
         setData(data.data.RTChart.items.slice(0, 30))
      }
   }, [status])
   return (
      <div className="main_songnew main-page-item active">
         <PlayListSelector title={"PlayList"}>
            {datas?.length > 0 &&
               datas.slice(0, 8).map((e, index) => {
                  let classGird = "col l-2-4 m-3 c-5"

                  return <CarouselItem key={e.encodeId} artis={true} desc={false} class1={classGird} item={e}></CarouselItem>
               })}
         </PlayListSelector>
      </div>
   )
})

export default MyMusicPlayList
