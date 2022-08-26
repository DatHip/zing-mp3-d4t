import React, { memo, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MvItem from "./MvItem"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { useRef } from "react"
import { tmdAPI } from "../../config"
import DropDownMv from "./DropDownMv"
import LoadingSvg from "../loading/LoadingSvg"

const MvPageList = () => {
   const { id } = useParams()
   const [datas, setData] = useState([])
   const page = useRef(1)
   const [loading, setLoading] = useState(false)

   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getListMv(id, page.current))
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
   }

   useEffect(() => {
      if (datas.length === 0) {
         fetchData()
      }
   }, [])

   const pageEnd = useRef()
   useEffect(() => {
      if (loading) {
         const observer = new IntersectionObserver(
            (e) => {
               if (e[0].isIntersecting) {
                  fetchData()
               }
            },
            { threshold: 1 }
         )
         observer?.observe(pageEnd.current)
      }
   }, [loading])

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div className="text-white">
         <DropDownMv></DropDownMv>

         <div className="container_top100-list row  text-white  transition-all">
            {datas?.map((e) => (
               <MvItem key={uuidv4()} data={e}></MvItem>
            ))}
         </div>
         <div ref={pageEnd} className="mt-[30px] "></div>
         {loading && <LoadingSvg isLoadMore></LoadingSvg>}
      </div>
   )
}

export default memo(MvPageList)
