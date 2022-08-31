import React, { memo, useEffect, useRef } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import AlbumPage from "../pages/AlbumPage"
import ArtistPage from "../pages/ArtistPage"
import HomePage from "../pages/HomePage"
import HubPage from "../pages/HubPage"
import MvPage from "../pages/MvPage"
import MyMusicPage from "../pages/MyMusicPage"
import NewFeedPage from "../pages/NewFeedPage"
import NotFound from "../pages/NotFound"
import RadioPage from "../pages/RadioPage"
import SearchPage from "../pages/SearchPage"
import Top100Page from "../pages/Top100Page"
import ZingChartPage from "../pages/ZingChartPage"

import NewMusicPage from "../pages/NewMusicPage"
import MvPageList from "../components/MVpage/MvPageList"
import NewFeedPageChidlen from "../components/Followpage/NewFeedPageChidlen"
import MyMusicAll from "../components/MyMusicPage/MyMusicAll"
import MyMusicSong from "../components/MyMusicPage/MyMusicSong"
import MyMusicPlayList from "../components/MyMusicPage/MyMusicPlayList"
import MyMusicArtis from "../components/MyMusicPage/MyMusicArtis"
import ArtistALl from "../components/ArtistPage/ArtistALl"
import ArtistSong from "../components/ArtistPage/ArtistSong"
import ArtistAlbum from "../components/ArtistPage/ArtistAlbum"
import ArtistMv from "../components/ArtistPage/ArtistMv"
import ArtistSingle from "../components/ArtistPage/ArtistSingle"
import HubDetailPage from "../components/HubPage/HubDetailPage"
import SearchPageAll from "../components/SearchPage/SearchPageAll"
import SearchPageArtist from "../components/SearchPage/SearchPageArtist"
import SearchPageMv from "../components/SearchPage/SearchPageMv"
import SearchPageSong from "../components/SearchPage/SearchPageSong"
import SearchPagePlaylist from "../components/SearchPage/SearchPagePlaylist"

const RouterPage = () => {
   const mainPageRef = useRef()
   useEffect(() => {
      const handleScroll = (e) => {
         if (mainPageRef.current.scrollTop > 30) {
            document.documentElement.classList.add("is-scroll")
         } else {
            document.documentElement.classList.remove("is-scroll")
         }
      }

      mainPageRef.current.addEventListener("scroll", handleScroll)
   }, [])

   const location = useLocation()

   return (
      <div ref={mainPageRef} id="scrollableDiv" className="main-page">
         <div className="container">
            <Routes location={location} key={location.pathname}>
               {/*  */}
               <Route path="/mymusic/" element={<MyMusicPage></MyMusicPage>}>
                  <Route index element={<MyMusicAll></MyMusicAll>}></Route>
                  <Route path="song" element={<MyMusicSong></MyMusicSong>}></Route>
                  <Route path="playlist" element={<MyMusicPlayList></MyMusicPlayList>}></Route>
                  <Route path="nghe-si" element={<MyMusicArtis></MyMusicArtis>}></Route>
               </Route>
               {/*  */}

               <Route index element={<HomePage></HomePage>}></Route>
               <Route path="/" element={<HomePage></HomePage>}></Route>
               <Route path="/zing-chart" element={<ZingChartPage></ZingChartPage>}></Route>
               <Route path="/radio" element={<RadioPage></RadioPage>}></Route>
               <Route path="newfeed/:nation" element={<NewFeedPage></NewFeedPage>}>
                  {/*  */}
                  <Route path=":id" element={<NewFeedPageChidlen></NewFeedPageChidlen>}></Route>
               </Route>
               {/*  */}
               <Route path="/moi-phat-hanh" element={<NewMusicPage></NewMusicPage>}></Route>
               <Route path="/hub/" element={<HubPage></HubPage>}></Route>
               <Route path="/hub/detail/:id" element={<HubDetailPage></HubDetailPage>}></Route>
               <Route path="/top100" element={<Top100Page></Top100Page>}></Route>
               {/*  */}
               <Route path="/mv" element={<MvPage></MvPage>}>
                  <Route path=":id" element={<MvPageList></MvPageList>}></Route>
               </Route>
               {/*  */}
               <Route path="/tim-kiem" element={<SearchPage></SearchPage>}>
                  <Route path="tatca/:id" element={<SearchPageAll></SearchPageAll>}></Route>
                  <Route path="baihat/:id" element={<SearchPageSong></SearchPageSong>}></Route>
                  <Route path="artist/:id" element={<SearchPageArtist></SearchPageArtist>}></Route>
                  <Route path="video/:id" element={<SearchPageMv></SearchPageMv>}></Route>
                  <Route path="playlist/:id" element={<SearchPagePlaylist></SearchPagePlaylist>}></Route>
               </Route>
               {/*  */}
               <Route path="/nghe-si/:name" element={<ArtistPage></ArtistPage>}>
                  <Route index element={<ArtistALl></ArtistALl>}></Route>
                  <Route path="song" element={<ArtistSong></ArtistSong>}></Route>
                  <Route path="album" element={<ArtistAlbum></ArtistAlbum>}></Route>
                  <Route path="mv" element={<ArtistMv></ArtistMv>}></Route>
                  <Route path="single" element={<ArtistSingle></ArtistSingle>}></Route>
               </Route>
               {/*  */}
               <Route path="/album/:id" element={<AlbumPage></AlbumPage>}></Route>
               {/*  */}
               <Route path="`*" element={<NotFound></NotFound>}></Route>
            </Routes>
         </div>
      </div>
   )
}

export default memo(RouterPage)
