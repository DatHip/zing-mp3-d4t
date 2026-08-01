import React, { memo } from "react"
import NewReleaseitem from "../../../components/NewReleaseitem/NewReleaseitem"
import PlayListSelector from "../../../components/Selection/PlayListSelector"

const FeaturedEpisodesRadio = memo(({ data }) => {
   const colSong1 = data?.items?.slice(0, 3)
   const colSong2 = data?.items?.slice(3, 6)
   const colSong3 = data?.items?.slice(6, 9)

   return (
      <PlayListSelector title={data?.title}>
         <>
            <div className="col l-4 m-6 c-8">
               {colSong1 && colSong1.map((e) => <NewReleaseitem isRadio key={e.encodeId || e.id} item={e}></NewReleaseitem>)}
            </div>
            <div className="col l-4 m-6 c-8">
               {colSong2 && colSong2.map((e) => <NewReleaseitem isRadio key={e.encodeId || e.id} item={e}></NewReleaseitem>)}
            </div>
            <div className="col l-4 m-0 c-8">
               {colSong3 && colSong3.map((e) => <NewReleaseitem isRadio key={e.encodeId || e.id} item={e}></NewReleaseitem>)}
            </div>
         </>
      </PlayListSelector>
   )
})

export default FeaturedEpisodesRadio
