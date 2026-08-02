import React from "react"

import LoadingSvg from "components/loading/LoadingSvg"

import GenreHub from "./components/GenreHub"
import MoodHub from "./components/MoodHub"
import NationsHub from "./components/NationsHub"
import { HubStyles } from "./styles"
import { useHubPage } from "./useHubPage"

const HubPage = () => {
   const { sections, isLoading, onBannerClick } = useHubPage()

   if (isLoading || !sections) return <LoadingSvg />

   return (
      <HubStyles className=" transition-all">
         {sections.banner && (
            <div>
               <figure
                  onClick={onBannerClick}
                  className="cursor-pointer image banner-image is-48x48 !rounded-xl overflow-hidden"
               >
                  <img src={sections.banner.cover} alt="" />
               </figure>
            </div>
         )}
         <MoodHub data={sections.mood} />
         <NationsHub data={sections.nations} />
         <GenreHub data={sections.genre} />
      </HubStyles>
   )
}

export default HubPage
