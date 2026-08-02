import React from "react"
import { useSelector } from "react-redux"
import * as yup from "yup"
import { useSleepTimer } from "hook/useSleepTimer"
import usePortal from "react-cool-portal"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import { selectClockOff } from "features/setting/settingSelectors"
import { AlarmModalStyles } from "./AlarmModal.styles"

const schema = yup.object({
   hours: yup.number().required("Vui lòng nhập trường này"),
   minute: yup.number().required("Vui lòng nhập trường này"),
})

// Mounted only while the sleep-timer dialog is open, which keeps yup +
// react-hook-form (~137KB of source) out of main.js.
const AlarmModal = ({ onClose }) => {
   const { start, cancel } = useSleepTimer()
   const clockOff = useSelector(selectClockOff)

   const { Portal, hide } = usePortal({ defaultShow: true, onHide: onClose })

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

   const handleClock = ({ hours, minute }) => {
      if (!start(hours, minute)) return
      hide()
      toast(`Nhạc sẽ dừng sau ${hours} Giờ, ${minute} Phút`, {
         type: "success",
         autoClose: "default",
      })
   }

   const handleRemoveTimeOut = () => {
      cancel()
      hide()
   }

   const err = errors.hours || errors.minute || (watchHours && watchMinute)

   return (
      <Portal>
         <AlarmModalStyles>
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
         </AlarmModalStyles>
      </Portal>
   )
}

export default AlarmModal
