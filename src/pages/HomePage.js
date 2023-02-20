import React, { memo } from "react";
// import { motion } from "framer-motion"
import SliderHomePage from "../components/SliderHome/SliderHomePage";
import HistoryHomePage from "../components/HomePage/HistoryHomePage";
import WantToHearHomePage from "../components/SliderHome/WantToHearHomePage";
import NewReleaseHomePage from "../components/SliderHome/NewReleaseHomePage";
import NewMusicEveryDayHomePage from "../components/SliderHome/NewMusicEveryDayHomePage";
import Top100HomePage from "../components/SliderHome/Top100HomePage";
import XoneCornerHomePage from "../components/SliderHome/XoneCornerHomePage";
import FavoriteArtistHomePapge from "../components/SliderHome/FavoriteArtistHomePapge";
import WeekChartHomePage from "../components/SliderHome/WeekChartHomePage";
import ArtistSpotlight from "../components/SliderHome/ArtistSpotlight";
import RadioHomePage from "../components/SliderHome/RadioHomePage";
import NewMusicHomePage from "../components/SliderHome/NewMusicHomePage";
import NewMusicHomePage2 from "../components/SliderHome/NewMusicHomePage2";
import EventHomePage from "../components/SliderHome/EventHomePage";
import ChartHomePage from "../components/SliderHome/ChartHomePage";
import ButtonIconHomePage from "../components/SliderHome/ButtonIconHomePage";
import scrollTop from "../utils/scrollToTop";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div>
      {/* Thanh Slider */}
      <SliderHomePage></SliderHomePage>
      {/* Icon Mobile */}
      <ButtonIconHomePage></ButtonIconHomePage>
      {/* History */}
      <HistoryHomePage></HistoryHomePage>
      {/* Because You Want To Hear || Lựa Chọn Hôm Nay */}
      <WantToHearHomePage></WantToHearHomePage>
      {/* New release  */}
      <NewReleaseHomePage></NewReleaseHomePage>
      {/* Nghệ Sĩ Yêu Thích  */}
      {/* <FavoriteArtistHomePapge></FavoriteArtistHomePapge> */}
      {/* Nhạc Mới Mỗi Ngày  */}
      <NewMusicEveryDayHomePage></NewMusicEveryDayHomePage>
      {/* Chart  */}
      <ChartHomePage></ChartHomePage>
      {/* weekChart */}
      <WeekChartHomePage></WeekChartHomePage>
      {/* ArtistSpotlight */}
      <ArtistSpotlight></ArtistSpotlight>
      {/* Top100 */}
      <Top100HomePage></Top100HomePage>
      {/* New Music */}
      <NewMusicHomePage></NewMusicHomePage>
      <NewMusicHomePage2></NewMusicHomePage2>
      {/* XONE's CORNER */}
      {/* <XoneCornerHomePage></XoneCornerHomePage> */}
      {/* Radio Nổi Bật */}
      <RadioHomePage></RadioHomePage>
      {/* Event */}
      <EventHomePage></EventHomePage>
    </div>
  );
};

export default memo(HomePage);
