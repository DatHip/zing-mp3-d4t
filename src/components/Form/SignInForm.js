import React, { memo } from "react"
import { useForm } from "react-hook-form"

const SignInForm = memo(({ setSign }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm()

   const onSubmit = (data) => console.log(data)

   console.log(errors)

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)} name="loginForm" className="loginForm w-full">
            <div className="form-group">
               <input type="email" className="form-control email" name="username" placeholder="Email " />
            </div>
            <div className="form-group">
               <input type="password" className="form-control password" name="password" placeholder="Password" />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>

            <button className="btn-login " type="button">
               Đăng Nhập
            </button>
         </form>
         <div className="flex items-center justify-between mt-[20px]">
            <div>Bạn chưa có tài khoản?</div>
            <button
               onClick={() => {
                  setSign(false)
               }}
               className="underline text-blue-600"
            >
               Đăng ký{" "}
            </button>
         </div>
      </div>
   )
})

export default SignInForm
