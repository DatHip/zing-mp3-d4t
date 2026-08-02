import React, { memo } from "react"
import SongRow from "components/song/SongRow"
import Section from "components/ui/Section"

const FeaturedEpisodesRadio = memo(({ data }) => {
   const colSong1 = data?.items?.slice(0, 3)
   const colSong2 = data?.items?.slice(3, 6)
   const colSong3 = data?.items?.slice(6, 9)

   return (
      <Section title={data?.title}>
         <>
            <div className="col l-4 m-6 c-8">
               {colSong1 && colSong1.map((e) => <SongRow isRadio key={e.encodeId || e.id} item={e}></SongRow>)}
            </div>
            <div className="col l-4 m-6 c-8">
               {colSong2 && colSong2.map((e) => <SongRow isRadio key={e.encodeId || e.id} item={e}></SongRow>)}
            </div>
            <div className="col l-4 m-0 c-8">
               {colSong3 && colSong3.map((e) => <SongRow isRadio key={e.encodeId || e.id} item={e}></SongRow>)}
            </div>
         </>
      </Section>
   )
})

export default FeaturedEpisodesRadio
