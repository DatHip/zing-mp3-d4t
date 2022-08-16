/* eslint-disable no-unused-expressions */
import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"

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

const SuggestList = () => {
   const { entities, loading } = useSelector((state) => state.formsearch)
   return (
      <SuggestListStyles className="suggest__list">
         <div className="suggest__list--content">
            <div className="search__title">Đề xuất cho bạn</div>

            {loading && (
               <div>
                  <li className="suggest__item">
                     <div className="is-oneline">Loading...</div>
                  </li>
               </div>
            )}

            {entities &&
               entities.map((e, index) => (
                  <div key={index}>
                     <li className="suggest__item">
                        <i className="icon ic-trend" />
                        <div className="is-oneline">{e.keyword}</div>
                     </li>
                  </div>
               ))}
         </div>
      </SuggestListStyles>
   )
}

export default SuggestList
