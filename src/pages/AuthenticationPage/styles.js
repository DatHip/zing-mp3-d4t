import styled from "styled-components"

export const SignUpStyles = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   width: 100vw;
   height: 100vh;
   background-color: var(--layout-bg);
   z-index: 8888;
   transition: all 0.3s;
   overflow-y: auto;
   .sider {
      margin-bottom: 2rem;
      .sider_brand-item {
         font-size: 4rem;
         display: flex;
         align-items: center;
         justify-content: center;
         font-family: "Patrick Hand SC", cursive;

         transition: 0.2s ease-in;

         p {
            font-size: 4rem;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            font-family: "Patrick Hand SC", cursive;
            transition: 0.2s ease-in;
         }

         &:hover {
            opacity: 0.8;
            cursor: pointer;
         }

         span {
            font-size: 3rem;
            margin-left: 6px;
            font-family: "Patrick Hand SC", cursive;
         }

         .sider_brand-item-img {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
               max-height: 42px;
               filter: grayscale(100%);
               margin-right: 10px;
            }
         }
      }
   }

   .authForm {
      position: relative;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      align-items: stretch;
      -webkit-box-shadow: 0px 2px 6px 0px #1d2030;
      box-shadow: 0px 2px 6px 0px #1d2030;
      .left {
         background-color: rgb(12 14 33 / 92%);
         color: #ffffff;
         border-top-left-radius: 4px;
         border-bottom-left-radius: 4px;
         padding-top: 30px;
         padding-bottom: 40px;
         padding-right: 30px;
         padding-left: 30px;
      }

      .right {
         padding-top: 30px;
         padding-bottom: 40px;
         padding-right: 30px;
         padding-left: 30px;
         background-color: #ffffff;
         border-top-right-radius: 4px;
         border-bottom-right-radius: 4px;
         color: #2d385e;
         .text-header {
            font-size: 20px;
            font-weight: 500;

            &.active {
               font-size: 30px;
               font-weight: 700;
            }
         }
      }

      .btnAuth {
         padding: 8px 8px;
         width: 100%;
         border: 1px solid transparent;
         border-radius: 4px;
         transition: all 0.2s;
         &:hover {
            opacity: 0.8;
         }
      }
   }

   .form-control {
      background-color: #fff;
      width: 100%;
      color: #333333;
      font-size: 18px;
      height: 50px;
      margin-top: 16px;
      padding: 12px 22px;
      border-radius: 4px;
      border: solid 1px #bcc2ce;
      outline: none;
      -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 10%), 0 0 2px 0 rgba(0, 0, 0, 10%);
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 10%), 0 0 2px 0 rgba(0, 0, 0, 10%);
   }
   .btn-login {
      color: white;
      width: 100%;
      padding: 12px;
      margin-top: 2rem;
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      background-color: #486ff2;
      border-color: #486ff2;
      box-shadow: 0px 2px 3px #9c9c9c;

      &:hover {
         opacity: 0.8;
         cursor: pointer;
      }
   }

   @media (max-width: 719px) {
      .left,
      .right {
         padding-top: 2rem !important;
         padding-bottom: 2rem !important;
      }

      .left {
         flex-direction: column !important;
      }
      .sider {
         margin-bottom: 1rem;
      }
   }
`
