import React, { memo } from "react"
import HistorySection from "components/home/HistorySection"
import WantToHearSection from "components/home/WantToHearSection"
import NewReleaseSection from "components/home/NewReleaseSection"
import FavoriteArtistSection from "components/home/FavoriteArtistSection"
import DailyMixSection from "components/home/DailyMixSection"
import ChartSection from "components/home/ChartSection"
import WeekChartSection from "components/home/WeekChartSection"
import ArtistSpotlight from "components/home/ArtistSpotlight"
import Top100Section from "components/home/Top100Section"
import NewMusicGridSection from "components/home/NewMusicGridSection"
import RadioSection from "components/home/RadioSection"
import SectionIconButton from "components/home/SectionIconButton"
import { useHomePage } from "./useHomePage"

const HomePage = () => {
   useHomePage()

   return (
      <div>
         {/* Icon Mobile */}
         <SectionIconButton />
         {/* History */}
         <HistorySection />
         {/* Because You Want To Hear || Lựa Chọn Hôm Nay */}
         <WantToHearSection />
         {/* New release  */}
         <NewReleaseSection />
         {/* Nghệ Sĩ Yêu Thích  */}
         <FavoriteArtistSection />
         {/* Nhạc Mới Mỗi Ngày  */}
         <DailyMixSection />
         {/* Chart  */}
         <ChartSection />
         {/* weekChart */}
         <WeekChartSection />
         {/* ArtistSpotlight */}
         <ArtistSpotlight />
         {/* Top100 */}
         <Top100Section />
         {/* New Music */}
         <NewMusicGridSection />
         {/* Radio Nổi Bật */}
         <RadioSection />
      </div>
   )
}

export default memo(HomePage)
