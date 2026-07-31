import React, { useEffect, useRef, useState } from "react"
import ArtistSpotlight from "../SliderHome/ArtistSpotlight"
import FollowItems from "./FollowItems"
import axios from "axios"
import { tmdAPI } from "../../config"
import { useParams } from "react-router-dom"
import LoadingSvg from "../loading/LoadingSvg"
import { v4 as uuidv4 } from "uuid"
import Masonry from "@mui/lab/Masonry"
import useWindowSize from "../../hook/useResizeHook"
import { useLayoutEffect } from "react"

const NewFeedPageChidlen = () => {
   const { nation, id } = useParams()

   const [datas, setData] = useState([])
   const [loading, setLoading] = useState(false)
   const numer = useRef(1)

   let col = 3
   const { width } = useWindowSize()
   if (width <= 1400) {
      col = 2
   }
   if (width <= 600) {
      col = 1
   }
   useLayoutEffect(() => {
      fetchData()
   }, [])

   useEffect(() => {
      if (!loading) return
      const observer = new IntersectionObserver(
         (e) => {
            if (e[0].isIntersecting) {
               fetchData()
            }
         },
         { threshold: 1 }
      )
      observer?.observe(pageEnd.current)
   }, [loading])

   const fetchData = async () => {
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
   }

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
            <Masonry columns={col} spacing={0}>
               {datas.map((e) => (
                  <FollowItems key={uuidv4()} data={e}></FollowItems>
               ))}
            </Masonry>
            <div ref={pageEnd}></div>
            <div className="!mt-[40px] "></div>
            {loading && <LoadingSvg isLoadMore></LoadingSvg>}
         </div>
      </div>
   )
}

export default NewFeedPageChidlen
