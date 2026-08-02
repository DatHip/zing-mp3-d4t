import React from "react"
import { useParams } from "react-router"
import { useSearchByType } from "api/useSearchData"
import { useScrollTop } from "hook/useScrollTop"
import LoadingSvg from "components/ui/LoadingSvg"
import Section from "components/ui/Section"
import AlbumCard from "components/card/AlbumCard"

const GRID_CLASS = "col l-2-4 m-3 c-6 !mb-[30px]"

const SearchPagePlaylist = () => {
   const { id } = useParams()
   const { data, isLoading } = useSearchByType(id, "playlist")
   useScrollTop(id)

   if (isLoading || !data) return <LoadingSvg />

   const playlists = data.items || []

   return (
      <div>
         <Section classAdd2="!flex-wrap" key={id} title="Playlist/Album">
            {playlists.map((playlist) => (
               <AlbumCard
                  key={playlist.encodeId || playlist.id}
                  artis={true}
                  desc={false}
                  class1={GRID_CLASS}
                  item={playlist}
               />
            ))}
         </Section>
      </div>
   )
}

export default SearchPagePlaylist
