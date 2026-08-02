import React, { memo, useEffect, useRef } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Loading from "components/loading/Loadng"

const MyInfoPage = React.lazy(
   () => import('pages/MyMusicPage/components/MyInfoPage'),
 )
const HistorySong = React.lazy(
   () => import('pages/HistoryPage/components/HistorySong'),
 )
const HistoryVideo = React.lazy(
   () => import('pages/HistoryPage/components/HistoryVideo'),
 )
const HistroryPlayList = React.lazy(
   () => import('pages/HistoryPage/components/HistroryPlayList'),
 )
const SearchPagePlaylist = React.lazy(
   () => import('pages/SearchPage/components/SearchPagePlaylist'),
 )
const SearchPageSong = React.lazy(
   () => import('pages/SearchPage/components/SearchPageSong'),
 )
const SearchPageMv = React.lazy(
   () => import('pages/SearchPage/components/SearchPageMv'),
 )
const SearchPageArtist = React.lazy(
   () => import('pages/SearchPage/components/SearchPageArtist'),
 )
const SearchPageAll = React.lazy(
   () => import('pages/SearchPage/components/SearchPageAll'),
 )
const HubDetailPage = React.lazy(
   () => import('pages/HubPage/components/HubDetailPage'),
 )
const ArtistSingle = React.lazy(
   () => import('pages/ArtistPage/components/ArtistSingle'),
 )
const ArtistMv = React.lazy(
   () => import('pages/ArtistPage/components/ArtistMv'),
 )
const ArtistAlbum = React.lazy(
   () => import('pages/ArtistPage/components/ArtistAlbum'),
 )
const ArtistSong = React.lazy(
   () => import('pages/ArtistPage/components/ArtistSong'),
 )
const ArtistALl = React.lazy(
   () => import('pages/ArtistPage/components/ArtistALl'),
 )
const MyMusicArtis = React.lazy(
   () => import('pages/MyMusicPage/components/MyMusicArtis'),
 )
const MyMusicPlayList = React.lazy(
   () => import('pages/MyMusicPage/components/MyMusicPlayList'),
 )
const MyMusicSong = React.lazy(
   () => import('pages/MyMusicPage/components/MyMusicSong'),
 )
const MyMusicAll = React.lazy(
   () => import('pages/MyMusicPage/components/MyMusicAll'),
 )
const NewFeedPageChildren = React.lazy(
   () => import('pages/NewFeedPage/components/NewFeedPageChildren'),
 )
const MvPageList = React.lazy(
   () => import('pages/MvPage/components/MvPageList'),
 )
const AuthenticationPage = React.lazy(
   () => import('pages/AuthenticationPage'),
 )
const NewMusicPage = React.lazy(
   () => import('pages/NewMusicPage'),
 )
const VideoPopUp = React.lazy(
   () => import('pages/VideoPopUp'),
 )
const HistoryPage = React.lazy(
   () => import('pages/HistoryPage'),
 )
const ZingChartPage = React.lazy(
   () => import('pages/ZingChartPage'),
 )
const Top100Page = React.lazy(
   () => import('pages/Top100Page'),
 )
const SearchPage = React.lazy(
   () => import('pages/SearchPage'),
 )
const RadioPage = React.lazy(
   () => import('pages/RadioPage'),
 )
const NotFound = React.lazy(
   () => import('pages/NotFound'),
 )
const NewFeedPage = React.lazy(
   () => import('pages/NewFeedPage'),
 )
const MyMusicPage = React.lazy(
   () => import('pages/MyMusicPage'),
 )
const MvPage = React.lazy(
   () => import('pages/MvPage'),
 )
const HubPage = React.lazy(
   () => import('pages/HubPage'),
 )
const HomePage = React.lazy(
   () => import('pages/HomePage'),
 )
const AlbumPage = React.lazy(
   () => import('pages/AlbumPage'),
 )
const ArtistPage = React.lazy(
   () => import('pages/ArtistPage'),
 )


const RouterPage = () => {
   const mainPageRef = useRef()

   useEffect(() => {
      const node = mainPageRef.current
      if (!node) return

      // Passive: this handler never calls preventDefault, so telling the browser
      // up front keeps scrolling off the main thread's critical path.
      let isScrolled = false
      const handleScroll = () => {
         const scrolled = node.scrollTop > 30
         if (scrolled === isScrolled) return
         isScrolled = scrolled
         document.documentElement.classList.toggle("is-scroll", scrolled)
      }

      node.addEventListener("scroll", handleScroll, { passive: true })
      return () => node.removeEventListener("scroll", handleScroll)
   }, [])

   const location = useLocation()

   return (
      <div ref={mainPageRef} id="scrollableDiv" className="main-page">
         <div className="container">
            <Routes location={location} key={location.pathname}>
               <Route element={<Loading></Loading>}>
               {/*  */}
               <Route path="/video-clip/:id" element={<VideoPopUp></VideoPopUp>}></Route>
               <Route path="/mymusic/" element={<MyMusicPage></MyMusicPage>}>
                  <Route index element={<MyMusicAll></MyMusicAll>}></Route>
                  <Route path="song" element={<MyMusicSong></MyMusicSong>}></Route>
                  <Route path="playlist" element={<MyMusicPlayList></MyMusicPlayList>}></Route>
                  <Route path="nghe-si" element={<MyMusicArtis></MyMusicArtis>}></Route>
                  <Route path="info" element={<MyInfoPage></MyInfoPage>}></Route>
               </Route>
               {/*  */}
               <Route path="/auth" element={<AuthenticationPage></AuthenticationPage>}></Route>
               <Route path="/" element={<HomePage></HomePage>}></Route>
               <Route path="/zing-chart" element={<ZingChartPage></ZingChartPage>}></Route>
               <Route path="/radio" element={<RadioPage></RadioPage>}></Route>
               <Route path="newfeed/:nation" element={<NewFeedPage></NewFeedPage>}>
                  {/*  */}
                  <Route path=":id" element={<NewFeedPageChildren></NewFeedPageChildren>}></Route>
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
               <Route path="/history/" element={<HistoryPage></HistoryPage>}>
                  <Route index path="playlist" element={<HistroryPlayList></HistroryPlayList>}></Route>
                  <Route path="song" element={<HistorySong></HistorySong>}></Route>
                  <Route path="video" element={<HistoryVideo></HistoryVideo>}></Route>
               </Route>
               {/*  */}
               <Route path="/album/:id" element={<AlbumPage></AlbumPage>}></Route>
               {/*  */}
               <Route path="*" element={<NotFound></NotFound>}></Route>
             </Route>

            </Routes>
         </div>
      </div>
   )
}

export default memo(RouterPage)
