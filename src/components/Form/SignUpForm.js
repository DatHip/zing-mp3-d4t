import React from "react"
import { useForm } from "react-hook-form"

const SignUpForm = ({ setSign }) => {
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
               <input
                  {...register("Email", { required: true, maxLength: 10 })}
                  type="email"
                  className="form-control email"
                  name="username"
                  placeholder="Email "
               />
            </div>
            <div className="form-group">
               <input
                  {...register("Password", { required: true, max: 10, min: 7, maxLength: 10 })}
                  type="password"
                  className="form-control password"
                  name="password"
                  placeholder="Password"
               />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>

            <div className="form-group">
               <input type="password" className="form-control password" name="password" placeholder="Nhập lại password" />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>

            <div className="form-group">
               <input
                  {...register("User Name", { required: true, maxLength: 30 })}
                  type="name"
                  className="form-control "
                  name="user-name"
                  placeholder="Tên hiển thị"
               />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>

            <button className="btn-login " type="submit">
               Đăng Ký
            </button>
         </form>
         <div className="flex items-center justify-between mt-[20px]">
            <div>Bạn đã có tài khoản?</div>
            <button
               onClick={() => {
                  setSign(true)
               }}
               className="underline text-blue-600"
            >
               Đăng Nhập{" "}
            </button>
         </div>
      </div>
   )
}

export default SignUpForm
