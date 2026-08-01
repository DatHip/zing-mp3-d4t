import React from "react"
import PlayListSelector from "../../../components/Selection/PlayListSelector"
import { useOutletContext } from "react-router"
import CarouselItem from "../../../components/Selection/CarouselItem"
import LoadingSvg from "../../../components/loading/LoadingSvg"

const ArtistSingle = () => {
   const datas = useOutletContext()
   const dataSelector = datas?.sections?.find((e) => e.title === "Single & EP")

   if (!datas || datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <PlayListSelector classAdd2={"!flex-wrap"} key={dataSelector?.title} title={dataSelector?.title}>
         {dataSelector &&
            dataSelector?.items?.length > 0 &&
            dataSelector?.items?.map((e) => {
               let classGird = "col l-2-4 m-3 c-6 !mb-[30px]"

               return <CarouselItem key={e.encodeId || e.id} artis={true} desc={false} class1={classGird} item={e}></CarouselItem>
            })}
      </PlayListSelector>
   )
}
export default ArtistSingle
