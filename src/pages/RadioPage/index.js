import React, { useEffect, useMemo } from "react"
import { toast } from "react-toastify"

import LoadingSvg from "../../components/loading/LoadingSvg"
import RadioHomePage from "../../components/SliderHome/RadioHomePage"

import CategoryRadio from "./components/CategoryRadio"
import DiscoverPoscast from "./components/DiscoverPoscast"
import FeaturedEpisodesRadio from "./components/FeaturedEpisodesRadio"
import NewProgramRaido from "./components/NewProgramRaido"
import RadReplayRadio from "./components/RadReplayRadio"
import SidleRadio from "./components/SidleRadio"
import { useRadioData } from "./useRadioData"

const RadioPage = () => {
   const { data, isLoading } = useRadioData()
   const items = data?.items

   useEffect(() => {
      if (items) {
         toast("Radio đang phát triển, vui lòng thông cảm!", { type: "info" })
      }
   }, [items])

   const sections = useMemo(() => {
      if (!items) return null
      return {
         discoverPoscast: items.find((e) => e.sectionId === "radPromoteProgram"),
         categoryRadio: items.find((e) => e.sectionId === "radPromoteCategory"),
         featuredPrograms: items.find((e) => e.sectionId === "radSponsoredProgram"),
         featuredEpisodes: items.find((e) => e.sectionId === "radPromoteEpisode"),
         replay: items.filter((e) => e.sectionId === "radReplay"),
         newShow: items.find((e) => e.sectionId === "radLastestProgram"),
      }
   }, [items])

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
