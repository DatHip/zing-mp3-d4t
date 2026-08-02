import styled from "styled-components"

export const HeroSliderStyles = styled.div`
   flex-grow: 1;
   margin: 0 auto;
   position: relative;
   width: 100%;

   .gallery-container {
      align-items: center;
      justify-content: center;
      display: flex;
      position: relative;
      transform-style: preserve-3d;
   }

   .gallery-item {
      height: auto;
      transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out, z-index 0s linear 0.25s;
      width: 100%;
      z-index: 1;
      opacity: 1;
      border-radius: 8px;
      padding: 15px;
   }

   .gallery-item.gallery-item-selected {
      transform: translateX(0);
      opacity: 1;
      z-index: 10;
   }
   .gallery-item.gallery-item-next {
      transform: translateX(100%);
   }
   .gallery-item.gallery-item-next,
   .gallery-item.gallery-item-previous {
      opacity: 1;
      z-index: 1;
   }
   .gallery-item.gallery-item-last {
      transform: translateX(20%);
   }

   .gallery-item.gallery-item-last {
      transform: translateX(20%);
   }
   .gallery-item.gallery-item-previous {
      transform: translateX(-100%);
   }

   .gallery-item .zm-card-image {
      border-radius: 8px;
   }
   .zm-card-image {
      display: block;
      position: relative;
      overflow: hidden;
      border-radius: 4px;
      flex-shrink: 0;
   }
`
