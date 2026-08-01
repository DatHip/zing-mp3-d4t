import React, { memo } from "react"
import SliderHomePage from "components/SliderHome/SliderHomePage"
import HistoryHomePage from "components/HomePage/HistoryHomePage"
import WantToHearHomePage from "components/SliderHome/WantToHearHomePage"
import NewReleaseHomePage from "components/SliderHome/NewReleaseHomePage"
import FavoriteArtistHomePapge from "components/SliderHome/FavoriteArtistHomePapge"
import NewMusicEveryDayHomePage from "components/SliderHome/NewMusicEveryDayHomePage"
import ChartHomePage from "components/SliderHome/ChartHomePage"
import WeekChartHomePage from "components/SliderHome/WeekChartHomePage"
import ArtistSpotlight from "components/SliderHome/ArtistSpotlight"
import Top100HomePage from "components/SliderHome/Top100HomePage"
import NewMusicHomePage2 from "components/SliderHome/NewMusicHomePage2"
import RadioHomePage from "components/SliderHome/RadioHomePage"
import ButtonIconHomePage from "components/SliderHome/ButtonIconHomePage"
import { useHomePage } from "./useHomePage"

const HomePage = () => {
   useHomePage()

   return (
      <div>
         {/* Thanh Slider */}
         <SliderHomePage />
         {/* Icon Mobile */}
         <ButtonIconHomePage />
         {/* History */}
         <HistoryHomePage />
         {/* Because You Want To Hear || Lựa Chọn Hôm Nay */}
         <WantToHearHomePage />
         {/* New release  */}
         <NewReleaseHomePage />
         {/* Nghệ Sĩ Yêu Thích  */}
         <FavoriteArtistHomePapge />
         {/* Nhạc Mới Mỗi Ngày  */}
         <NewMusicEveryDayHomePage />
         {/* Chart  */}
         <ChartHomePage />
         {/* weekChart */}
         <WeekChartHomePage />
         {/* ArtistSpotlight */}
         <ArtistSpotlight />
         {/* Top100 */}
         <Top100HomePage />
         {/* New Music */}
         <NewMusicHomePage2 />
         {/* Radio Nổi Bật */}
         <RadioHomePage />
      </div>
   )
}

export default memo(HomePage)
