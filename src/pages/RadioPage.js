import React, { useState, useEffect } from "react"
import { useGetRadioPage } from "../api/getRaidoPage"
import LoadingSvg from "../components/loading/LoadingSvg"
import CategoryRadio from "../components/RadioPage/CategoryRadio"
import DiscoverPoscast from "../components/RadioPage/DiscoverPoscast"
import FeaturedEpisodesRadio from "../components/RadioPage/FeaturedEpisodesRadio"
import NewProgramRaido from "../components/RadioPage/NewProgramRaido"
import RadReplayRadio from "../components/RadioPage/RadReplayRadio"
import SidleRadio from "../components/RadioPage/SidleRadio"
import RadioHomePage from "../components/SliderHome/RadioHomePage"

const RadioPage = () => {
   const [datas, setData] = useState([])
   const { data, status } = useGetRadioPage()

   useEffect(() => {
      if (data) {
         setData(data.data.items)
      }
   }, [status])

   const selectorDiscoverPoscast = datas?.find((e) => e.sectionId === "radPromoteProgram")

   const selectorListent = datas?.find((e) => e.title === "Đón nghe")
   const selectorCategoryRadio = datas?.find((e) => e.sectionId === "radPromoteCategory")
   const selectorFeaturedPrograms = datas?.find((e) => e.sectionId === "radSponsoredProgram")
   const selectorFeaturedEpisodes = datas?.find((e) => e.sectionId === "radPromoteEpisode")
   const selectorReplay = datas?.filter((e) => e.sectionId === "radReplay")
   const selectorNewShow = datas?.find((e) => e.sectionId === "radLastestProgram")

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div className="mt-1">
         {/* Raido home */}
         <RadioHomePage></RadioHomePage>
         {/* Khám Phá Poscast */}
         <DiscoverPoscast data={selectorDiscoverPoscast}></DiscoverPoscast>
         {/* Đón Nghe  */}
         <SidleRadio data={selectorListent}></SidleRadio>
         {/* Thể Loại Poscast */}
         <CategoryRadio data={selectorCategoryRadio}></CategoryRadio>
         {/* Tập Nổi Bật */}
         <FeaturedEpisodesRadio data={selectorFeaturedEpisodes}></FeaturedEpisodesRadio>
         {/* Chương Trình Nổi Bật */}
         <SidleRadio isFeatured data={selectorFeaturedPrograms}></SidleRadio>

         {/* Nghe Lai ... */}
         <RadReplayRadio data={selectorReplay}></RadReplayRadio>
         {/* Chuơng Trình Mới */}
         <NewProgramRaido data={selectorNewShow}></NewProgramRaido>
      </div>
   )
}

export default RadioPage
