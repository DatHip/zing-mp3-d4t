import styled from "styled-components"

export const NotFounds = styled.div`
   @import url("https://fonts.googleapis.com/css?family=Bevan");

   p {
      font-family: "Bevan", cursive;
      font-size: 130px;
      margin: 10vh 0 0;
      text-align: center;
      letter-spacing: 5px;
      background-color: black;
      color: transparent;
      text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.1);
      -webkit-background-clip: text;
      -moz-background-clip: text;
      background-clip: text;

      span {
         font-size: 1.2em;
      }
   }

   code {
      color: #bdbdbd;
      text-align: center;
      display: block;
      font-size: 16px;
      margin: 0 30px 25px;

      span {
         color: #f0c674;
      }

      i {
         color: #b5bd68;
      }

      em {
         color: #b294bb;
         font-style: unset;
      }

      b {
         color: #81a2be;
         font-weight: 500;
      }
   }

   a {
      color: #8abeb7;
      font-family: monospace;
      font-size: 20px;
      text-decoration: underline;
      margin-top: 10px;
      display: inline-block;
   }

   @media screen and (max-width: 880px) {
      p {
         font-size: 14vw;
      }
   }
`
