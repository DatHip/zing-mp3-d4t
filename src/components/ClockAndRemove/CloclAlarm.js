import React, { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import * as yup from "yup"
import { setClockOff, setPlay } from "../../features/SettingPlay/settingPlay"
import usePortal from "react-cool-portal"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"

const PortalStyle = styled.div`
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
const schema = yup.object({
   hours: yup.number().required("Vui lòng nhập trường này"),
   minute: yup.number().required("Vui lòng nhập trường này"),
})
const CloclAlarm = memo(() => {
   const dispatch = useDispatch()
   const clockOff = useSelector((state) => state.setting.clockOff)

   const { Portal, show, hide } = usePortal({ defaultShow: false })

   const handleClickBackdrop = (e) => {
      const id = e.target.id

      if (
         id === "theme-overlay" ||
         id === "portal-bio-arits" ||
         id === "close-block" ||
         e.target?.parentElement?.id === "close-block"
      ) {
         hide()
      }
   }

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: {
         hours: "00",
         minute: "00",
      },
   })

   const watchHours = watch("hours") === "0" || watch("hours") === "00"
   const watchMinute = watch("minute") === "0" || watch("minute") === "00"

   let TimeOut
   const handleClock = ({ hours, minute }) => {
      const hoursConvert = parseInt(hours) * 60 * 60 * 1000
      const minuteConvet = parseInt(minute) * 60 * 1000
      const timoutPause = hoursConvert + minuteConvet

      TimeOut = setTimeout(() => {
         dispatch(setClockOff(false))
         dispatch(setPlay(false))
      }, [timoutPause])

      clearTimeout(TimeOut)

      dispatch(setClockOff(true))
      hide()
      toast(`Nhạc sẽ dừng sau ${hours} Giờ, ${minute} Phút`, {
         type: "success",
         autoClose: "default",
      })
   }

   const handleRemoveTimeOut = () => {
      clearTimeout(TimeOut)
      dispatch(setClockOff(false))
      hide()
   }

   const err = errors.hours || errors.minute || (watchHours && watchMinute)

   return (
      <>
         <div onClick={() => show()} className={`player_btn queue_time ${clockOff ? "active" : ""}`}>
            <span className="material-icons-outlined"> alarm </span>
            <div className="playing_title-hover">Hẹn giờ</div>
         </div>
         <Portal>
            <PortalStyle>
               <div className="zm-portal-modal theme-modal-overlay" id="theme-overlay" onClick={handleClickBackdrop}>
                  {!clockOff && (
                     <div className="modal is-active">
                        <form onSubmit={handleSubmit(handleClock)} name="ClockOut">
                           <div role="presentation" className="modal-background">
                              <div className="modal-content">
                                 <div className="alarm-setting">
                                    <h3 className="title">Hẹn giờ dừng phát nhạc</h3>
                                    <div className="time-picker">
                                       <div className="time-input">
                                          <div className="control">
                                             <input
                                                onInput={(e) => {
                                                   if (e.target.value.length >= 2) {
                                                      e.target.value = e.target.value.slice(0, 2)
                                                   }
                                                }}
                                                {...register("hours")}
                                                className="input is-primary"
                                                type="number"
                                                defaultValue={"00"}
                                             />
                                          </div>
                                          <span className="label">giờ</span>
                                       </div>
                                       <div className="dot">:</div>
                                       <div className="time-input">
                                          <div className="control">
                                             <input
                                                onInput={(e) => {
                                                   if (e.target.value > 59) {
                                                      e.target.value = 59
                                                   }

                                                   if (e.target.value.length >= 2) {
                                                      e.target.value = e.target.value.slice(0, 2)
                                                   }
                                                }}
                                                {...register("minute", { maxLength: 2 })}
                                                className="input is-primary"
                                                type="text"
                                                pattern="\d*"
                                                maxLength="2"
                                                max={60}
                                                defaultValue={"00"}
                                             />
                                          </div>
                                          <span className="label">phút</span>
                                       </div>
                                    </div>
                                    <h3 className="estimate-time subtitle">Chọn thời gian để dừng phát nhạc</h3>
                                    <button
                                       disabled={err}
                                       className="w-full zm-btn active is-medium is-outlined is-fullwidth is-upper button"
                                       tabIndex={-1}
                                       type="submit"
                                    >
                                       Lưu lại
                                    </button>
                                    <button
                                       onClick={handleClickBackdrop}
                                       type="button"
                                       className="w-full zm-btn mar-t-10 active is-fullwidth is-upper button hover:opacity-90"
                                       tabIndex={0}
                                       id="close-block"
                                    >
                                       <i className="icon" />
                                       <span>Hủy</span>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </form>
                     </div>
                  )}
                  {clockOff && (
                     <div className="modal is-active">
                        <div role="presentation" className="modal-background">
                           <div className="confirm-modal">
                              <h3 className="title">Xóa hẹn giờ</h3>
                              <span>Bạn có chắc chắn muốn xóa hẹn giờ?</span>
                              <div className="actions flex items-end justify-end mt-[16px]">
                                 <button
                                    onClick={() => {
                                       hide()
                                    }}
                                    className="zm-btn is-outlined  is-small button"
                                    tabIndex={0}
                                 >
                                    Không
                                 </button>
                                 <button
                                    onClick={handleRemoveTimeOut}
                                    className="!ml-[16px] zm-btn is-outlined active  is-small button"
                                    tabIndex={0}
                                 >
                                    Có
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </PortalStyle>
         </Portal>
      </>
   )
})

export default CloclAlarm
