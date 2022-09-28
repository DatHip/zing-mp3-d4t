/* eslint-disable no-unused-expressions */
import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setName } from "../../features/formSearch/formSearch"
import { memo } from "react"
import OutstandingItems from "../SearchPage/OutstandingItems"
import LoadingSvg from "../loading/LoadingSvg"

const SuggestListStyles = styled.ul`
   position: absolute;
   overflow: hidden;
   width: 100.32% !important;
   height: auto;
   min-height: 0;
   background-color: var(--primary-bg);
   z-index: 5;
   display: block;
   border-bottom-left-radius: 20px;
   border-bottom-right-radius: 20px;
   box-shadow: 0 4px 6px 0 rgb(32 33 36 / 28%);
   padding: 13px 10px;
   color: var(--text-primary);
   top: 100%;
   left: -0.6px;
   .suggest__list--content {
      max-height: calc(100vh - 180px);
      overflow-y: auto;
   }

   div {
      word-break: break-word;
   }

   .search__title {
      font-size: 14px;
      font-weight: 700;
      padding: 0 10px 8px;
      display: flex;
      justify-content: space-between;
   }
   .suggest__item {
      display: flex;
      align-items: baseline;
      border-radius: 4px;
      padding: 8px 10px;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      .icon {
         font-size: 16px;
         color: var(--text-secondary);
         position: relative;
         top: 3px;
         margin-right: 10px;
      }
      &:hover {
         background-color: var(--alpha-bg);
      }
   }
   .is-oneline {
      overflow: hidden;
      text-overflow: ellipsis;
   }
`

const SuggestList = ({ setOpen, setValue, value, refinput }) => {
   const { entities, loading, entitiesNew, names } = useSelector((state) => state.formsearch)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   return (
      <SuggestListStyles className="suggest__list">
         <div className="suggest__list--content">
            {loading && (
               <div>
                  <li className="suggest__item ">
                     <div className="is-oneline w-full h-full text-center">
                        <LoadingSvg isLoadMore></LoadingSvg>
                     </div>
                  </li>
               </div>
            )}
            {entities && !refinput.current.value && entities.length > 0 && (
               <>
                  <div className="search__title ">Đề xuất cho bạn</div>
                  {entities?.map((e, index) => {
                     if (e.link)
                        return (
                           <div key={index}>
                              <a href={e.link} target={"_blank"} hrefLang="eng" className="suggest__item" rel="noreferrer">
                                 <i className="icon ic-trend" />
                                 <div className="is-oneline">{e.keyword}</div>
                              </a>
                           </div>
                        )
                     return (
                        <div key={index}>
                           <div
                              onClick={() => {
                                 dispatch(setName(e.keyword))
                                 setOpen(false)
                                 setValue(e.keyword)
                                 refinput.current.value = e.keyword
                                 navigate(`/tim-kiem/tatca/${e.keyword}`)
                              }}
                              className="suggest__item"
                           >
                              <i className="icon ic-trend" />
                              <div className="is-oneline">{e.keyword}</div>
                           </div>
                        </div>
                     )
                  })}
               </>
            )}
            {entitiesNew && !loading && refinput.current.value && refinput.current.value.length > 0 && (
               <>
                  <div className="search__title">Từ khóa liên quan</div>

                  {entitiesNew[0].keywords?.map((e, index) => {
                     return (
                        <div key={index}>
                           <div
                              onClick={() => {
                                 dispatch(setName(e.keyword))
                                 setOpen(false)
                                 setValue(e.keyword)
                                 refinput.current.value = e.keyword
                                 navigate(`/tim-kiem/tatca/${e.keyword}`)
                              }}
                              className="suggest__item"
                           >
                              <i className="icon ic-trend" />
                              <div className="is-oneline">{e.keyword}</div>
                           </div>
                        </div>
                     )
                  })}
               </>
            )}
            {entitiesNew && !loading && refinput.current.value && refinput.current.value.length > 0 && (
               <>
                  <div className="search__title  !pt-[10px] ">Gợi ý kết quả</div>
                  {entitiesNew[1]?.suggestions?.map((e, index) => {
                     if (index > 5) return

                     return <OutstandingItems setOpen={setOpen} isSearch key={index} data={e}></OutstandingItems>
                  })}
               </>
            )}
         </div>
      </SuggestListStyles>
   )
}

export default memo(SuggestList)
