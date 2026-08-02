import React, { memo, useState } from "react"
import styled from "styled-components"
import { byType, useHomeSection } from "../../hook/useHomeSection"
import NewReleaseitem from "../NewReleaseitem/NewReleaseitem"
import PlayListSelector from "../Selection/PlayListSelector"

const NewReleaseStyle = styled.div`
   .m-6 {
      margin: unset;
   }
   .genre-select {
      color: var(--white);
      .zm-btn.active {
         border-color: var(--purple-primary);
         background-color: var(--purple-primary);
         color: var(--white);
      }

      .zm-btn {
         padding: 4px 24px;
         border: 1px solid var(--border-primary);
         border-radius: 100px;
         font-weight: 400;
         font-size: 12px;
         text-transform: uppercase;
         margin-right: 15px;
      }
   }
`
// Module scope on purpose: defining this inside NewReleaseHomePage made it a new
// component type on every render, so toggling VIỆT NAM/QUỐC TẾ remounted all 12
// rows instead of re-rendering them.
const NewReleaseColumns = memo(({ items }) => {
   if (!items) return null

   const colSong1 = items?.slice(0, 4)
   const colSong2 = items?.slice(4, 8)
   const colSong3 = items?.slice(8, 12)

   return (
      <>
         <div className="col l-4 m-6 c-9">
            {colSong1 && colSong1.map((e, index) => <NewReleaseitem key={e.encodeId || e.id || index} item={e}></NewReleaseitem>)}
         </div>
         <div className="col l-4 m-6 c-9">
            {colSong2 && colSong2.map((e, index) => <NewReleaseitem key={e.encodeId || e.id || index} item={e}></NewReleaseitem>)}
         </div>
         <div className="col l-4 m-0 c-9">
            {colSong3 && colSong3.map((e, index) => <NewReleaseitem key={e.encodeId || e.id || index} item={e}></NewReleaseitem>)}
         </div>
      </>
   )
})

const NewReleaseHomePage = memo(() => {
   const [selectList, setSelectList] = useState(false)
   const { section, isLoading } = useHomeSection(byType("new-release"))
   const datas = section?.items

   if (!section && !isLoading) return null

   return (
      <NewReleaseStyle>
         <PlayListSelector
            to="moi-phat-hanh"
            childrenOption={
               <div className="genre-select mb-[20px]">
                  <button onClick={() => setSelectList(false)} className={`zm-btn  button ${selectList ? "" : "active"}`}>
                     VIỆT NAM
                  </button>
                  <button onClick={() => setSelectList(true)} className={`zm-btn button ${selectList ? "active" : ""}`}>
                     QUỐC TẾ
                  </button>
               </div>
            }
            title={section?.title}
            all={true}
            className2="h-[320px]"
         >
            <NewReleaseColumns items={selectList ? datas?.others : datas?.vPop}></NewReleaseColumns>
         </PlayListSelector>
      </NewReleaseStyle>
   )
})

export default NewReleaseHomePage
