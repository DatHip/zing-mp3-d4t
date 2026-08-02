import styled from "styled-components"

export const AlarmModalStyles = styled.div`
   .confirm-modal {
      width: 500px;
      padding: 2rem;
      .title {
         margin-bottom: 10px;
      }
      .zm-btn {
         padding: 6px 15px;
         margin: 0;
      }
   }

   .zm-btn[disabled] {
      box-shadow: none;
      opacity: 0.5;
      cursor: not-allowed;
   }

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
   .alarm-setting {
      width: 330px;
      margin: 0;
      padding: 30px 25px 15px;
      position: relative;
      text-align: center;
   }

   .title {
      margin-bottom: 25px;
      font-size: 18px;
      color: var(--text-primary);
      font-weight: 700;
      text-transform: capitalize;
      display: block;
   }
   .time-picker {
      display: flex;
      justify-content: space-around;
      padding: 15px 19px 20px 20px;
      border-radius: 8px;
      background-color: var(--alpha-bg);
      .time-input {
         display: flex;
         align-items: center;
         border-bottom: 2px solid #ccc;
         width: 100px;
         justify-content: center;
         position: relative;
         cursor: default;
      }
      .label {
         text-transform: uppercase;
         color: var(--text-secondary);
      }

      .dot {
         font-size: 34px;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
         -webkit-appearance: none;
         margin: 0;
      }

      /* Firefox */
      input[type="number"] {
         -moz-appearance: textfield;
      }

      input {
         background-color: transparent;
         outline: none;
         border: none;
         font-size: 34px;
         padding: 0;
         height: 40px;
         width: 50px;
         letter-spacing: 3px;
      }

      .control {
         font-size: 1rem;
         position: relative;
      }

      .control {
         box-sizing: border-box;
         clear: both;
         text-align: inherit;
      }
   }
   .estimate-time {
      font-size: 12px;
      margin: 20px 0;
      color: var(--text-secondary);
   }
`
