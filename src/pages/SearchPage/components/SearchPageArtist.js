import React from "react"
import { useParams } from "react-router"
import { useSearchByType } from "api/useSearchData"
import { useScrollTop } from "hook/useScrollTop"
import LoadingSvg from "components/ui/LoadingSvg"
import Section from "components/ui/Section"
import ArtistCard from "components/card/ArtistCard"

const GRID_CLASS = "col l-2-4 m-3 c-5 !mb-[30px]"

const SearchPageArtist = () => {
   const { id } = useParams()
   const { data, isLoading } = useSearchByType(id, "artist")
   useScrollTop(id)

   if (isLoading || !data) return <LoadingSvg />

   const artists = data.items || []

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-container ">
            <Section classAdd2="container_top100-list " title="Nghệ Sĩ">
               {artists.map((artist) => (
                  <ArtistCard classGird={GRID_CLASS} key={artist.id || artist.encodeId} data={artist} />
               ))}
            </Section>
         </div>
      </div>
   )
}

export default SearchPageArtist
