import React, { memo } from "react"
import PlayListSelector from "../Selection/PlayListSelector"
import LoadingSvg from "../loading/LoadingSvg"
import ItemArits from "./ItemArits"

import { useOutletContext } from "react-router"
import EmptyContent from "../Bottom/EmptyContent"
const MyMusicArtis = memo(() => {
   const { docs } = useOutletContext()

   if (!docs?.email) return <LoadingSvg></LoadingSvg>
   return (
      <>
         {docs.favouriteArtist.length === 0 && (
            <EmptyContent icon={"album"} text={"Chưa có mục yêu thích trong thư viện"} textBtn={"Khám phá ngay"}></EmptyContent>
         )}
         {docs.favouriteArtist.length > 0 && (
            <PlayListSelector all={false} classAdd={"container_radio "} classAdd2={"mb-[10px]"} title={"Nghệ Sĩ"}>
               {docs.favouriteArtist.map((e, index) => {
                  let classGird = "col l-2-4 m-3 c-5 !mb-[30px]"

                  return <ItemArits classGird={classGird} key={e.id} data={e}></ItemArits>
               })}
            </PlayListSelector>
         )}
      </>
   )
})

export default MyMusicArtis
