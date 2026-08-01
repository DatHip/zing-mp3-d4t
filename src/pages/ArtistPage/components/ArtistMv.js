import React from "react"
import PlayListSelector from "../../../components/Selection/PlayListSelector"
import { useOutletContext } from "react-router"
import MvItem from "../../../components/MVpage/MvItem"
import LoadingSvg from "../../../components/loading/LoadingSvg"

const ArtistMv = () => {
   const datas = useOutletContext()
   const dataSelector = datas?.sections?.find((e) => e.sectionType === "video")

   if (!datas || !datas.sections) return <LoadingSvg></LoadingSvg>

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-container ">
            <PlayListSelector classAdd2={"container_top100-list "} key={dataSelector?.title} title={dataSelector?.title}>
               {dataSelector &&
                  dataSelector?.items?.length > 0 &&
                  dataSelector?.items?.map((e) => {
                     return <MvItem key={e.encodeId || e.id} data={e}></MvItem>
                  })}
            </PlayListSelector>
         </div>
      </div>
   )
}

export default ArtistMv
