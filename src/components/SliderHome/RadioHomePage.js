import React, { memo, useEffect, useState } from "react"
import { useGetHomePage } from "../../api/getHomePage"
import PlayListSelector from "../Selection/PlayListSelector"
import RaidoItem from "../Selection/RaidoItem"

const RadioHomePage = memo(({ isNotAll }) => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()

   const dataSelector = data?.data.items.find((e) => e.title === "Radio Nổi bật")

   useEffect(() => {
      if (data) {
         setData(dataSelector.items)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [status])

   return (
      <PlayListSelector to="radio" classAdd={`container_radio`} title={dataSelector?.title} all={!isNotAll}>
         {datas &&
            datas.length > 0 &&
            datas.map((e, index) => {
               if (index > 6) {
                  // eslint-disable-next-line array-callback-return
                  return
               }
               let classGird = "col l-1-4 m-2 c-5 m2-6 m2-5"
               if (index === 5) {
                  classGird = "col l-1-4 m-2 c-5 m2-6 m2-none"
               }
               if (index === 6) {
                  classGird = "col l-1-4 m-none c-5"
               }

               return <RaidoItem key={e.id} className1={classGird} item={e}></RaidoItem>
            })}
      </PlayListSelector>
   )
})

export default RadioHomePage
