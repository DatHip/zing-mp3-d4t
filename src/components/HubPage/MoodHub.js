import React, { useState } from "react"
import { memo } from "react"
import FavoriteArtisItem from "../Selection/FavoriteArtisItem"
import PlayListSelector from "../Selection/PlayListSelector"

const MoodHub = ({ data }) => {
   const [numRender, setNumRender] = useState(8)

   return (
      <PlayListSelector classAdd2={"!flex-wrap transition-all"} title={"Tâm Trạng Và Hoạt Động"}>
         {data &&
            data.length > 0 &&
            data
               .slice(0, numRender)
               .map((e, index) => (
                  <FavoriteArtisItem key={index} clasName="col l-3 !mb-6 m-4 c-6" isHub item={e}></FavoriteArtisItem>
               ))}
         {numRender === 8 && (
            <div className="flex items-center justify-center w-full mt-2">
               <button onClick={() => setNumRender((value) => value * 2)} className="zing-chart_btn">
                  Xem Thêm
               </button>
            </div>
         )}
      </PlayListSelector>
   )
}

export default memo(MoodHub)
