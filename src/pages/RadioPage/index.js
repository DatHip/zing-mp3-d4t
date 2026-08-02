import React from "react"

import LoadingSvg from "components/ui/LoadingSvg"
import RadioSection from "components/home/RadioSection"

import CategoryRadio from "./components/CategoryRadio"
import DiscoverPodcast from "./components/DiscoverPodcast"
import FeaturedEpisodesRadio from "./components/FeaturedEpisodesRadio"
import NewProgramRadio from "./components/NewProgramRadio"
import RadioReplay from "./components/RadioReplay"
import SlideRadio from "./components/SlideRadio"
import { useRadioPage } from "./useRadioPage"

const RadioPage = () => {
   const { sections, isLoading } = useRadioPage()

   if (isLoading || !sections) return <LoadingSvg />

   return (
      <div className="mt-1">
         <RadioSection isNotAll />
         <DiscoverPodcast data={sections.discoverPodcast} />
         <CategoryRadio data={sections.categoryRadio} />
         <FeaturedEpisodesRadio data={sections.featuredEpisodes} />
         <SlideRadio isFeatured data={sections.featuredPrograms} />
         <RadioReplay data={sections.replay} />
         <NewProgramRadio data={sections.newShow} />
      </div>
   )
}

export default RadioPage
