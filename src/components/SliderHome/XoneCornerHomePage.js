import React, { memo } from "react"
import { useHomeSection } from "../../hook/useHomeSection"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"

const matchXone = (s) => /xone/i.test(s?.title || "") || s?.sectionId === "hXoneCorner"

const XoneCornerHomePage = () => {
   const { section, isLoading } = useHomeSection(matchXone)
   const datas = section?.items

   if (!section && !isLoading) return null
   if (!section) return null

   return (
      <PlayListSelector title={section?.title}>
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

export default memo(XoneCornerHomePage)
