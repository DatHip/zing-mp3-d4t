import React, { useState } from "react"
import { memo } from "react"
import FavoriteArtistCard from "components/card/FavoriteArtistCard"
import Section from "components/ui/Section"

const MoodHub = ({ data }) => {
   const [numRender, setNumRender] = useState(8)

   return (
      <Section classAdd2={"!flex-wrap transition-all"} title={"Tâm Trạng Và Hoạt Động"}>
         {data &&
            data.length > 0 &&
            data
               .slice(0, numRender)
               .map((e, index) => (
                  <FavoriteArtistCard key={index} clasName="col l-3 !mb-6 m-4 c-6" isHub item={e}></FavoriteArtistCard>
               ))}
         {numRender === 8 && (
            <div className="flex items-center justify-center w-full mt-2">
               <button onClick={() => setNumRender((value) => value * 2)} className="zing-chart_btn">
                  Xem Thêm
               </button>
            </div>
         )}
      </Section>
   )
}

export default memo(MoodHub)
