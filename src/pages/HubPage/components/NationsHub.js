import React, { memo } from "react"
import FavoriteArtisItem from "../../../components/Selection/FavoriteArtisItem"
import PlayListSelector from "../../../components/Selection/PlayListSelector"

const NationsHub = memo((data) => {
   return (
      <PlayListSelector classAdd2={"!flex-wrap"} title={"Quốc Gia"}>
         {data &&
            data?.data?.length > 0 &&
            data?.data?.map((e, index) => {
               let classGird = "col l-3 m-6 !mb-6 c-6"

               return <FavoriteArtisItem isCenter key={e.encodeId || e.id || index} clasName={classGird} isHub item={e}></FavoriteArtisItem>
            })}
      </PlayListSelector>
   )
})

export default NationsHub
