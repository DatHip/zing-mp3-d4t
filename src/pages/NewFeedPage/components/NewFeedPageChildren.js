import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react"
import ArtistSpotlight from "components/SliderHome/ArtistSpotlight"
import FollowItems from "./FollowItems"
import axios from "axios"
import { tmdAPI } from "config"
import { useParams } from "react-router-dom"
import LoadingSvg from "components/loading/LoadingSvg"
import Masonry from "react-masonry-css"
import useMediaQuery from "hook/useMediaQuery"

const NewFeedPageChildren = () => {
   const { nation, id } = useParams()

   const [datas, setData] = useState([])
   const [loading, setLoading] = useState(false)
   const numer = useRef(1)

   const isTablet = useMediaQuery("(max-width: 1400px)")
   const isMobile = useMediaQuery("(max-width: 600px)")
   const col = isMobile ? 1 : isTablet ? 2 : 3

   const fetchData = useCallback(async () => {
      const data = await axios.get(tmdAPI.getNewFeed(id, numer.current))
      const dataSelector = data.data.data.items
      const totalitems = data.data.data.total
      numer.current += 1
      if (datas.length >= totalitems) {
         return setLoading(false)
      }

      if (datas.length === 0) {
         setData(dataSelector)
      } else {
         setData((value) => [...value, ...dataSelector])
      }
      setTimeout(() => {
         setLoading(true)
      }, 3000)
   }, [id, datas.length])

   useLayoutEffect(() => {
      fetchData()
   }, [fetchData])

   useEffect(() => {
      if (!loading) return
      const currentPageEnd = pageEnd.current
      const observer = new IntersectionObserver(
         (e) => {
            if (e[0].isIntersecting) {
               fetchData()
            }
         },
         { threshold: 1 }
      )
      if (currentPageEnd) {
         observer?.observe(currentPageEnd)
      }
      return () => {
         if (currentPageEnd) {
            observer?.unobserve(currentPageEnd)
         }
      }
   }, [loading, fetchData])

   const pageEnd = useRef()

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div className="h-full">
         {nation === "Viet-Nam" && (
            <>
               <ArtistSpotlight></ArtistSpotlight>
               <div className="!mb-[40px]"></div>
            </>
         )}
         <div className="relative ">
            <Masonry breakpointCols={col} className="flex w-auto" columnClassName="min-w-0 flex-1 bg-clip-padding">
               {datas.map((e) => (
                  <FollowItems key={e.id || e.encodeId} data={e}></FollowItems>
               ))}
            </Masonry>
            <div ref={pageEnd}></div>
            <div className="!mt-[40px] "></div>
            {loading && <LoadingSvg isLoadMore></LoadingSvg>}
         </div>
      </div>
   )
}

export default NewFeedPageChildren
