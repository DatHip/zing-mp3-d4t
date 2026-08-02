import styled from "styled-components"

export const InfoTopStyles = styled.div`
   .read-more {
      display: inline-block;
      color: var(--text-item-hover);
      font-size: 12px;
      font-weight: 700;
      line-height: 1.92;
      cursor: pointer;
      text-transform: uppercase;
   }
`

export const ArtistBioPortalStyles = styled.div`
   .theme-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1080;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .zm-portal-modal .modal {
      background-color: var(--primary-bg);
      border-radius: 8px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      z-index: 40;
   }

   .top {
      position: relative;
      overflow: hidden;
      border-radius: 8px 8px 0 0;
      .cover-bg {
         background-repeat: no-repeat;
         background-position: 50%;
         background-size: cover;
         background-position-y: 10%;
         -webkit-filter: blur(50px);
         filter: blur(50px);
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;

         right: 0;
      }
      .blur-bg {
         opacity: 0.4;
         background-color: var(--primary-bg);
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;
         background-size: cover;
         right: 0;
      }
      .top-content {
         display: flex;
         flex-direction: column;
         align-items: center;
         padding-top: 24px;
         position: relative;
         background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), var(--primary-bg));
      }
      .image {
         width: 110px;
         height: 110px;
         border-radius: 50%;
         overflow: hidden;
         margin-bottom: 12px;
      }
      .title {
         font-size: 24px;
         font-weight: 700;
         margin-bottom: 0;
      }
   }
   .bio-content {
      padding: 24px;

      & > div {
         line-height: 1.43;
         color: var(--text-secondary);
         max-height: 218px;
         padding-bottom: 2rem;
      }
   }
   .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 2;
   }
`
