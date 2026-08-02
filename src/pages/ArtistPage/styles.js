import styled from "styled-components"

export const ArtistPageStyles = styled.div`
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
