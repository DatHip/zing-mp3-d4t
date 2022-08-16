import { checkTargetForNewValues } from "framer-motion"
import React, { memo, useEffect, useState } from "react"
import { useGetHomePage } from "../../api/getHomePage"
import PlayListSelector from "../Selection/PlayListSelector"
import RaidoItem from "../Selection/RaidoItem"

const RadioHomePage = memo(() => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()

   const dataSelector = data?.data.items.find((e) => e.title === "Radio Nổi bật")

   useEffect(() => {
      if (data) {
         console.log(dataSelector)
         setData(dataSelector.items)
      }
   }, [status])

   return (
      <PlayListSelector classAdd={`container_radio`} title={dataSelector?.title} all={true}>
         {datas &&
            datas.length > 0 &&
            datas.map((e, index) => {
               if (index > 6) return
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
