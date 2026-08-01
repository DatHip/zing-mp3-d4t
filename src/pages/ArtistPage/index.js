import React from "react"
import { Outlet } from "react-router"
import { NavLink } from "react-router-dom"

import LoadingSvg from "../../components/loading/LoadingSvg"
import ArtistInfoTop from "./components/ArtistInfoTop"
import { ArtistPageStyles } from "./styles"
import { useArtistPage } from "./useArtistPage"

const tabClass = ({ isActive }) => (isActive ? "zm-navbar-item is-active" : "zm-navbar-item ")

const ArtistPage = () => {
   const { artist, isLoading, tabs } = useArtistPage()

   if (isLoading || !artist) return <LoadingSvg />

   return (
      <ArtistPageStyles className=" mt-5 ">
         <ArtistInfoTop data={artist} />

         <div className="flex items-center min-h-[52px] mb-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
               {tabs.map((tab) => (
                  <NavLink key={tab.to} to={tab.to} end={tab.end} className={tabClass}>
                     <div className="navbar-link">
                        <span>{tab.label}</span>
                     </div>
                  </NavLink>
               ))}
            </ul>
         </div>

         <Outlet context={artist} />
      </ArtistPageStyles>
   )
}

export default ArtistPage
