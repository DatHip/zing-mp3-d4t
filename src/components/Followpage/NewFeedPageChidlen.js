import React, { memo, useEffect, useRef, useState } from "react"
import ArtistSpotlight from "../SliderHome/ArtistSpotlight"
import FollowItems from "./FollowItems"
import axios from "axios"
import { tmdAPI } from "../../config"
import { useParams } from "react-router-dom"
import LoadingSvg from "../loading/LoadingSvg"
import { v4 as uuidv4 } from "uuid"
import Masonry from "@mui/lab/Masonry"
import useWindowSize from "../../hook/useResizeHook"

const NewFeedPageChidlen = memo(() => {
   const { nation, id } = useParams()
   const [datas, setData] = useState([])
   const [page, setPage] = useState(1)
   const [loading, setLoading] = useState(false)
   let col = 3
   const { width } = useWindowSize()

   if (width <= 1400) {
      col = 2
   }
   if (width <= 600) {
      col = 1
   }

   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getNewFeed(id, page))
      const dataSelector = data.data.data.items
      const totalitems = data.data.data.total

      if (datas.length >= totalitems) {
         return setLoading(false)
      }

      if (datas.length === 0) {
         setData(dataSelector)
      } else {
         setData((value) => [...value, ...dataSelector])
      }
      setLoading(true)
   }

   useEffect(() => {
      fetchData()
   }, [page])

   const HandleFetch = () => {
      setPage((value) => value + 1)
   }

   const pageEnd = useRef()
   useEffect(() => {
      if (loading) {
         const observer = new IntersectionObserver(
            (e) => {
               if (e[0].isIntersecting) {
                  setPage((value) => value + 1)
               }
            },
            { threshold: 1 }
         )
         observer?.observe(pageEnd.current)
      }
   }, [loading])

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         {nation === "Viet-Nam" && (
            <>
               <ArtistSpotlight></ArtistSpotlight>
               <div className="!mb-[40px]"></div>
            </>
         )}
         <div className="relative">
            <Masonry columns={col} spacing={0}>
               {datas.map((e) => (
                  <FollowItems key={uuidv4()} data={e}></FollowItems>
               ))}
            </Masonry>
         </div>
         <div ref={pageEnd}></div>
         <div className="!mt-[40px] "></div>
         {loading && <LoadingSvg isLoadMore></LoadingSvg>}
      </div>
   )
})

export default NewFeedPageChidlen
