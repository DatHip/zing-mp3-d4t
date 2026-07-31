import React, { memo, useLayoutEffect, useState } from "react"
import { useGetHomePage } from "../../api/getHomePage"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"

const NewMusicEveryDayHomePage = () => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()

   const dataSelector = data?.data.items.find((e) => e.title === "XONE's CORNER")

   useLayoutEffect(() => {
      if (data) {
         setData(dataSelector.items)
      }
   }, [status])

   return (
      <PlayListSelector title={dataSelector?.title}>
         {datas?.length > 0 &&
            datas.map((e, index) => {
               let classGird = "col l-2-4 m-3 c-5"
               if (index === 4) {
                  classGird = "col l-2-4 m-0 c-5"
               }

               return <CarouselItem key={e.encodeId} artis={false} desc={true} class1={classGird} item={e}></CarouselItem>
            })}
         {!datas &&
            Array(5)
               .fill(0)
               .map((e, index) => {
                  let classGird = "col l-2-4 m-3 c-5"
                  if (index === 4) {
                     classGird = "col l-2-4 m-0 c-5"
                  }

                  return (
                     <CarouselItem.Loading
                        key={index}
                        artis={false}
                        desc={false}
                        class1={classGird}
                        item={e}
                     ></CarouselItem.Loading>
                  )
               })}
      </PlayListSelector>
   )
}

export default memo(NewMusicEveryDayHomePage)
