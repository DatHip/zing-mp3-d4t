import styled from "styled-components"

export const UpdateProfileStyled = styled.div`
   max-width: 500px;
   margin-left: auto;
   margin-right: auto;
   .form-control {
      background-color: #fff;
      width: 100%;
      color: #333333;
      font-size: 18px;
      height: 50px;
      margin-top: 6px;
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
   label {
      font-size: 16px;
      font-weight: 500;
   }
`
