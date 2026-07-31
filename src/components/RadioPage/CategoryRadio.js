import React, { memo } from "react"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"

const CategoryRadio = ({ data }) => {
   return (
      <PlayListSelector title={data?.title} all={false}>
         {data?.items?.length > 0 &&
            data?.items.map((e, index) => {
               if (index > 4) return
               let classGird = "col l-2-4 m-3 c-5"
               if (index === 4) {
                  classGird = "col l-2-4 m-0 c-5"
               }

               return (
                  <CarouselItem
                     hiddenTitle
                     isHiddenButton={true}
                     isSwiper={true}
                     key={uuidv4()}
                     artis={false}
                     desc={false}
                     class1={classGird}
                     item={e}
                  ></CarouselItem>
               )
            })}
         {!data &&
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

export default memo(CategoryRadio)
