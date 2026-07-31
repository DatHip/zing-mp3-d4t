import React, { memo, useEffect, useState } from "react"
import styled from "styled-components"
import { useGetHomePage } from "../../api/getHomePage"
import NewReleaseitem from "../NewReleaseitem/NewReleaseitem"
import PlayListSelector from "../Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"

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
const NewReleaseHomePage = memo(() => {
   const [datas, setData] = useState(null)
   const [selectList, setSelectList] = useState(false)
   const { data, status } = useGetHomePage()
   const dataSelector = data?.data.items.find((e) => e.sectionType === "new-release")

   useEffect(() => {
      if (dataSelector) {
         setData(dataSelector?.items)
      }
   }, [status])

   const SongList = memo(() => {
      if (!datas) return
      const dataSong = datas?.vPop

      const colSong1 = dataSong?.slice(0, 4)
      const colSong2 = dataSong?.slice(4, 8)
      const colSong3 = dataSong?.slice(8, 12)

      return (
         <>
            <div className="col l-4 m-6 c-9">
               {colSong1 && colSong1.map((e) => <NewReleaseitem key={uuidv4()} item={e}></NewReleaseitem>)}
            </div>
            <div className="col l-4 m-6 c-9">
               {colSong2 && colSong2.map((e) => <NewReleaseitem key={uuidv4()} item={e}></NewReleaseitem>)}
            </div>
            <div className="col l-4 m-0 c-9">
               {colSong3 && colSong3.map((e) => <NewReleaseitem key={uuidv4()} item={e}></NewReleaseitem>)}
            </div>
         </>
      )
   })

   const AlbumList = memo(() => {
      // if (!datas) return
      // const dataAlbum = datas?.album
      // const colSong1 = dataAlbum?.slice(0, 3)
      // const colSong2 = dataAlbum?.slice(3, 6)
      // const colSong3 = dataAlbum?.slice(6, 9)

      if (!datas) return
      const dataSong = datas?.others

      const colSong1 = dataSong?.slice(0, 4)
      const colSong2 = dataSong?.slice(4, 8)
      const colSong3 = dataSong?.slice(8, 12)

      return (
         <>
            <div className="col l-4 m-6 c-9">
               {colSong1 && colSong1.map((e) => <NewReleaseitem key={uuidv4()} item={e}></NewReleaseitem>)}
            </div>
            <div className="col l-4 m-6 c-9">
               {colSong2 && colSong2.map((e) => <NewReleaseitem key={uuidv4()} item={e}></NewReleaseitem>)}
            </div>
            <div className="col l-4 m-0 c-9">
               {colSong3 && colSong3.map((e) => <NewReleaseitem key={uuidv4()} item={e}></NewReleaseitem>)}
            </div>
         </>
      )
   })

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
            title={dataSelector?.title}
            all={true}
            className2="h-[320px]"
         >
            {!selectList ? <SongList></SongList> : <AlbumList></AlbumList>}
         </PlayListSelector>
      </NewReleaseStyle>
   )
})

export default NewReleaseHomePage
