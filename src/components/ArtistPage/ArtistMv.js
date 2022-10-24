import React from "react"
import PlayListSelector from "../Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"
import { useOutletContext } from "react-router"
import MvItem from "../MVpage/MvItem"
import LoadingSvg from "../loading/LoadingSvg"

const ArtistMv = () => {
   const datas = useOutletContext()
   const dataSelector = datas?.sections?.find((e) => e.sectionType === "video")

   if (datas?.length === 0 || !datas) return <LoadingSvg></LoadingSvg>

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-container ">
            <PlayListSelector classAdd2={"container_top100-list "} key={uuidv4()} title={dataSelector?.title}>
               {dataSelector &&
                  dataSelector?.items?.length > 0 &&
                  dataSelector?.items?.map((e, index) => {
                     return <MvItem key={uuidv4()} data={e}></MvItem>
                  })}
            </PlayListSelector>
         </div>
      </div>
   )
}

export default ArtistMv
