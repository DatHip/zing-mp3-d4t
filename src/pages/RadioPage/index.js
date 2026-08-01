import React from "react"

import LoadingSvg from "../../components/loading/LoadingSvg"
import RadioHomePage from "../../components/SliderHome/RadioHomePage"

import CategoryRadio from "./components/CategoryRadio"
import DiscoverPoscast from "./components/DiscoverPoscast"
import FeaturedEpisodesRadio from "./components/FeaturedEpisodesRadio"
import NewProgramRaido from "./components/NewProgramRaido"
import RadReplayRadio from "./components/RadReplayRadio"
import SidleRadio from "./components/SidleRadio"
import { useRadioPage } from "./useRadioPage"

const RadioPage = () => {
   const { sections, isLoading } = useRadioPage()

   if (isLoading || !sections) return <LoadingSvg />

   return (
      <div className="mt-1">
         <RadioHomePage isNotAll />
         <DiscoverPoscast data={sections.discoverPoscast} />
         <CategoryRadio data={sections.categoryRadio} />
         <FeaturedEpisodesRadio data={sections.featuredEpisodes} />
         <SidleRadio isFeatured data={sections.featuredPrograms} />
         <RadReplayRadio data={sections.replay} />
         <NewProgramRaido data={sections.newShow} />
      </div>
   )
}

export default RadioPage
