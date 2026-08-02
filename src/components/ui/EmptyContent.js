import React from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"

const EmptyStyled = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   .icon.favorite-song,
   .icon.new-song {
      background-image: var(--empty-song-icon);
   }
   .icon {
      height: 120px;
      background-size: cover;
      width: 120px;
   }

   .text {
      font-size: 16px;
      margin-top: 16px;
      color: var(--text-secondary);
      font-weight: 500;
   }

   .zm-btn.is-outlined.active {
      background-color: var(--purple-primary);
      border-color: var(--purple-primary);
      color: var(--white);
   }
   .zm-btn.is-medium {
      margin-top: 16px;
      font-size: 14px;
      padding: 9px 24px;
   }
`

const EmptyContent = ({ text, textBtn }) => {
   const navigate = useNavigate()
   return (
      <EmptyStyled className="zm-empty">
         <div className={`icon ${"favorite-song"}`}></div>
         <div className="text">{text}</div>
         <button onClick={() => navigate("/moi-phat-hanh")} className="!uppercase is-outlined active is-medium is-upper zm-btn">
            {textBtn}
         </button>
      </EmptyStyled>
   )
}

export default EmptyContent
