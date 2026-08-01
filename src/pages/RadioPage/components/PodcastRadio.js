import React, { memo } from "react"
import CarouselItem from "../../../components/Selection/CarouselItem"
import PlayListSelector from "../../../components/Selection/PlayListSelector"

const PodcastRadio = ({ data }) => {
   const SubTitle = (item) => (
      <div className="care_title">
         <div className="care_title-img">
            <img src={item?.thumbnail} alt="" />
         </div>
         <div className="care_title-text">
            <h3 className="uppercase">{data?.title}</h3>
            <span>{item?.title}</span>
         </div>
      </div>
   )

   return (
      <PlayListSelector isTitleSub={SubTitle(data?.subTitle)} title={data?.title}>
         {data?.items?.length > 0 &&
            data?.items.slice(0, 5).map((e, index) => {
               let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

               return (
                  <CarouselItem
                     isHiddenButton={true}
                     isSwiper={true}
                     key={e.encodeId || e.id}
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
                  let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

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

export default memo(PodcastRadio)
