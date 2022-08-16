import React, { memo, useEffect, useState } from "react"
import { useGetHomePage } from "../../api/getHomePage"
import PlayListSelector from "../Selection/PlayListSelector"
import FavoriteArtisItem from "../Selection/FavoriteArtisItem"

const FavoriteArtistHomePapge = () => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()

   const dataSelector = data?.data.items.find((e) => e.title === "Nghệ Sĩ Yêu Thích")

   //  const dataSelector = data?.data.items[4]

   useEffect(() => {
      if (data) {
         setData(dataSelector.items)
      }
   }, [status])

   return (
      <PlayListSelector title={dataSelector?.title}>
         {datas?.length > 0 &&
            datas.map((e, index) => {
               let classGird = "col l-2-4 m-3 c-5"
               if (index > 4) return
               if (index === 4) {
                  classGird = "col l-2-4 m-0 c-5"
               }

               return <FavoriteArtisItem key={e.encodeId} clasName={classGird} item={e}></FavoriteArtisItem>
            })}
      </PlayListSelector>
   )
}

export default memo(FavoriteArtistHomePapge)
