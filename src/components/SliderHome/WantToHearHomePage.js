import React, { memo, useEffect, useState } from "react"
import { useGetHomePage } from "../../api/getHomePage"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"
const WantToHearHomePage = () => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()

   // const dataSelector = data?.data.items.filter((e) => e.title === "Cuối Tuần Lên Nhạc")

   const dataSelector = data?.data?.items[4]

   useEffect(() => {
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
                        key={uuidv4()}
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

export default memo(WantToHearHomePage)
