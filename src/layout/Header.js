import React, { memo } from "react"
import HeaderRight from "components/navbar/HeaderRight"
import UserMenu from "components/navbar/UserMenuLazy"
import SearchForm from "components/navbar/SearchForm"
import HistoryNav from "components/navbar/HistoryNav"

const Header = () => {
   return (
      <header className="header">
         <div className="header_content">
            <div className="header_content-btn-user-c">
               <UserMenu isTitle={false}></UserMenu>
            </div>
            <div className="header_content-left">
               <HistoryNav></HistoryNav>
               <SearchForm></SearchForm>
            </div>
            <HeaderRight></HeaderRight>
         </div>
      </header>
   )
}

export default memo(Header)
