import React from "react"
import { Outlet, useParams } from "react-router"
import { Link } from "react-router-dom"
import PortalMVpage from "../components/Portal/PortalMVpage"

const NewFeedPage = () => {
   const { nation, id } = useParams()

   return (
      <div>
         <div className="flex items-center min-h-[52px] my-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
               <li className={`zm-navbar-item ${nation === "Viet-Nam" ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to="/newfeed/Viet-Nam/IWZ9Z08I" className="">
                        Việt Nam
                     </Link>
                  </div>
               </li>
               <li className={`zm-navbar-item ${nation === "Au-My" ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to="/newfeed/Au-My/IWZ9Z08O" className="">
                        US-UK
                     </Link>
                  </div>
               </li>
               <li className={`zm-navbar-item ${nation === "Han-Quoc" ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to="/newfeed/Han-Quoc/IWZ9Z08W" className="">
                        K-POP
                     </Link>
                  </div>
               </li>
               <li className={`zm-navbar-item ${nation === "Hoa-Ngu" ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to="/newfeed/Hoa-Ngu/IWZ9Z08U" className="">
                        Hoa Ngữ
                     </Link>
                  </div>
               </li>
            </ul>
         </div>

         <Outlet></Outlet>
      </div>
   )
}

export default NewFeedPage
