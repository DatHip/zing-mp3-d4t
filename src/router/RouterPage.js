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
import { AnimatePresence } from "framer-motion"

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
      <div ref={mainPageRef} className="main-page">
         <div className="container">
            <AnimatePresence>
               <Routes location={location} key={location.pathname}>
                  <Route path="/mymusic" element={<MyMusicPage></MyMusicPage>}></Route>
                  <Route index element={<HomePage></HomePage>}></Route>
                  <Route path="/" element={<HomePage></HomePage>}></Route>
                  <Route path="/zing-chart" element={<ZingChartPage></ZingChartPage>}></Route>
                  <Route path="/radio" element={<RadioPage></RadioPage>}></Route>
                  <Route path="/newfeed" element={<NewFeedPage></NewFeedPage>}></Route>
                  <Route path="/moi-phat-hanh" element={<NewFeedPage></NewFeedPage>}></Route>
                  <Route path="/hub" element={<HubPage></HubPage>}></Route>
                  <Route path="/top100" element={<Top100Page></Top100Page>}></Route>
                  <Route path="/mv" element={<MvPage></MvPage>}></Route>
                  {/*  */}
                  <Route path="/tim-kiem" element={<SearchPage></SearchPage>}></Route>
                  <Route path="/nghe-si" element={<ArtistPage></ArtistPage>}></Route>
                  <Route path="/album" element={<AlbumPage></AlbumPage>}></Route>
                  <Route path="`*" element={<NotFound></NotFound>}></Route>
               </Routes>
            </AnimatePresence>
         </div>
      </div>
   )
}

export default memo(RouterPage)
