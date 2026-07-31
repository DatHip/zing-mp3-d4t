import axios from "axios"
import React, { useState } from "react"
import { useLayoutEffect } from "react"
import { Outlet, useParams } from "react-router"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import LoadingSvg from "../components/loading/LoadingSvg"
import { tmdAPI } from "../config"
import scrollTop from "../utils/scrollToTop"
import ArtistInfoTop from "../components/ArtistPage/ArtistInfoTop"
const ArtistPageStyles = styled.div`
   .avatar {
      width: 260px;
      height: 260px;
      border-radius: 50%;
      overflow: hidden;
   }

   .content-detail {
      max-height: 70px;
      overflow-y: auto;
      font-size: 14px;
      line-height: 1.64;
      margin-bottom: 10px;

      span {
         display: inline-block;
         color: var(--text-item-hover);
         font-size: 12px;
         font-weight: 700;
         line-height: 1.92;
         cursor: pointer;
      }
   }
   .artist-name {
      color: var(--text-primary);
      font-size: 40px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.08px;
      margin-bottom: 5px;
   }
`

const ArtistPage = () => {
   const { name } = useParams()
   const [datas, setData] = useState([])

   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getArtistPage(name))
      setData(data?.data?.data)
   }

   useLayoutEffect(() => {
      scrollTop()
      fetchData()
   }, [])

   if (datas?.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <ArtistPageStyles className=" mt-5 ">
         <ArtistInfoTop data={datas}></ArtistInfoTop>

         <div className="flex items-center min-h-[52px] mb-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
               <NavLink
                  to={`/nghe-si/${name}/`}
                  className={({ isActive }) => (isActive ? "zm-navbar-item is-active" : "zm-navbar-item ")}
               >
                  <div className="navbar-link">
                     <span>TỔNG QUAN</span>
                  </div>
               </NavLink>
               <NavLink
                  to={`/nghe-si/${name}/song`}
                  className={({ isActive }) => (isActive ? "zm-navbar-item is-active" : "zm-navbar-item ")}
               >
                  <div className="navbar-link">
                     <span>BÀI HÁT</span>
                  </div>
               </NavLink>
               <NavLink
                  to={`/nghe-si/${name}/single`}
                  className={({ isActive }) => (isActive ? "zm-navbar-item is-active" : "zm-navbar-item ")}
               >
                  <div className="navbar-link">
                     <span>SINGLE & EP</span>
                  </div>
               </NavLink>
               <NavLink
                  to={`/nghe-si/${name}/album`}
                  className={({ isActive }) => (isActive ? "zm-navbar-item is-active" : "zm-navbar-item ")}
               >
                  <div className="navbar-link">
                     <span>ALBUM</span>
                  </div>
               </NavLink>

               <NavLink
                  to={`/nghe-si/${name}/mv`}
                  className={({ isActive }) => (isActive ? "zm-navbar-item is-active" : "zm-navbar-item ")}
               >
                  <div className="navbar-link">
                     <span>MV</span>
                  </div>
               </NavLink>
            </ul>
         </div>

         <Outlet context={datas}></Outlet>
      </ArtistPageStyles>
   )
}

export default ArtistPage
