import React from "react"
import PlayListSelector from "../Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"
import { useOutletContext } from "react-router"
import MvItem from "../MVpage/MvItem"

const ArtistMv = () => {
   const datas = useOutletContext()
   const dataSelector = datas?.sections?.find((e) => e.sectionType === "video")

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-container text-white">
            <PlayListSelector classAdd2={"container_top100-list text-white"} key={uuidv4()} title={dataSelector.title}>
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
