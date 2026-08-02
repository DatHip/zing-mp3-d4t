import React, { memo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Tippy from "@tippyjs/react"
import { useDispatch, useSelector } from "react-redux"
import { setText } from "features/mvState/mvStateSlice"
import axios from "axios"
import { zingApi } from "config"
import { useLayoutEffect } from "react"
import { useCallback } from "react"
import { selectMvButtonText } from "features/mvState/mvStateSelectors"

const DropDownMv = memo(() => {
   const { id } = useParams()
   const [datas, setData] = useState([])
   const count = useSelector(selectMvButtonText)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [open, setOpen] = useState(false)

   const fetchData = useCallback(async () => {
      const data = await axios.get(zingApi.getCategoryMv(id))
      const dataSelector = data.data.data
      setData(dataSelector)
   }, [id])

   useLayoutEffect(() => {
      fetchData()
   }, [fetchData])

   useLayoutEffect(() => {
      if (id === "IWZ9Z08I" || id === "IWZ9Z08O" || id === "IWZ9Z08W" || id === "IWZ9Z086") {
         dispatch(setText("Tất Cả"))
      }
   }, [id, dispatch])

   const handleClick = useCallback((e) => {
      dispatch(setText(e.title))
      navigate(`/mv/${e.id}`, { state: true })
   }, [dispatch, navigate])

   return (
      <div className="main_mv-search-dropdown">
         <Tippy
            animation={"perspective-extreme"}
            onClickOutside={() => setOpen(false)}
            visible={open}
            content={
               <div id="mainMvList" className="main_mv-dropdown-list">
                  {datas?.childs?.map((e) => (
                     <div onClick={() => handleClick(e)} key={e.id || e.encodeId} className="main_mv-dropdown-item">
                        {e.title || e.name}
                     </div>
                  ))}
               </div>
            }
            interactive={true}
            arrow={false}
            offset={[0, 10]}
            placement={"bottom-start"}
         >
            <div onClick={() => setOpen((value) => !value)} className="main_mv-search-dropdown-btn ">
               <span className="material-icons-outlined">music_note</span>
               <p>{count}</p>

               {open ? (
                  <span className="material-icons-outlined up">expand_less</span>
               ) : (
                  <span className="material-icons-outlined down">expand_more</span>
               )}
            </div>
         </Tippy>
      </div>
   )
})

export default DropDownMv
