import React, { memo, useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import MvCard from "components/card/MvCard"
import axios from "axios"
import { useRef } from "react"
import { zingApi } from "config"
import DropDownMv from "./DropDownMv"
import LoadingSvg from "components/ui/LoadingSvg"

const MvPageList = () => {
   const { id } = useParams()
   const [datas, setData] = useState([])
   const page = useRef(1)
   const [loading, setLoading] = useState(false)

   const fetchData = useCallback(async () => {
      const data = await axios.get(zingApi.getListMv(id, page.current))
      const dataSelector = data.data.data.items
      const tolal = data.data.data.toltal
      const more = data.data.data.hasMore

      page.current += 1

      if (datas.length >= tolal || !more) {
         return setLoading(false)
      }

      if (datas.length === 0) {
         setData(dataSelector)
      } else {
         setData((value) => [...value, ...dataSelector])
      }
      setLoading(true)
   }, [id, datas.length])

   useEffect(() => {
      if (datas.length === 0) {
         fetchData()
      }
   }, [datas.length, fetchData])

   const pageEnd = useRef()
   useEffect(() => {
      if (loading) {
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
      }
   }, [loading, fetchData])

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div className="">
         <DropDownMv></DropDownMv>

         <div className="container_top100-list row transition-all">
            {datas?.map((e) => (
               <MvCard key={e.encodeId || e.id} data={e}></MvCard>
            ))}
         </div>
         <div ref={pageEnd} className="mt-[30px] "></div>
         {loading && <LoadingSvg isLoadMore></LoadingSvg>}
      </div>
   )
}

export default memo(MvPageList)
