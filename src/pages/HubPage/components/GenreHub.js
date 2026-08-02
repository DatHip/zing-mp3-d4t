import React, { memo } from "react"

import AlbumCard from "components/card/AlbumCard"
import Section from "components/ui/Section"

const GenreHub = memo(({ data }) => {
   return (
      <>
         {data &&
            data.length > 0 &&
            data.slice(0, 18).map((e, index) => {
               return (
                  <Section key={index} to={`/hub/detail/${e?.encodeId}`} title={e?.title} all={true}>
                     {e?.playlists?.length > 0 &&
                        e?.playlists.map((e, index) => {
                           if (index > 4) return
                           let classGird = "col l-2-4 m-3 c-5"
                           if (index === 4) {
                              classGird = "col l-2-4 m-0 c-5"
                           }

                           return (
                              <AlbumCard
                                 isSwiper={true}
                                 key={e.encodeId}
                                 artis={true}
                                 desc={false}
                                 class1={classGird}
                                 item={e}
                              ></AlbumCard>
                           )
                        })}
                  </Section>
               )
            })}
      </>
   )
})

export default GenreHub
