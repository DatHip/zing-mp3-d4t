import React, { memo, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { auth } from "../../firebase/firebase-config"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { setUser } from "../../features/User/userFeatures"

const schema = yup.object({
   email: yup.string().required("Vui lòng nhập trường này").max(40).email(),
   password: yup.string().required("Vui lòng nhập trường này").max(30).min(7, "Độ dài tối thiểu 7 ký tự"),
})

const SignInForm = memo(({ setSign }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setFocus,
   } = useForm({ resolver: yupResolver(schema), mode: "onChange" })

   const navigate = useNavigate()
   const dispatch = useDispatch()
   useEffect(() => {
      setFocus("email")
   }, [setFocus])

   // useEffect(() => {
   //    onAuthStateChanged(auth, (user) => {
   //       console.log(user)
   //       if (user) {
   //          // setCurrnetInfo(user)
   //       } else {
   //          // setCurrnetInfo(false)
   //       }
   //    })
   // }, [])

   const onSubmitLogin = (data) => {
      signInWithEmailAndPassword(auth, data.email, data.password)
         .then((userCredential) => {
            const user = userCredential.user

            setTimeout(() => {
               reset({
                  email: "",
                  password: "",
               })
            }, 1000)

            dispatch(
               setUser({
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  email: user.email,
                  uid: user.uid,
               })
            )
            toast("Đăng Nhập Thành Công", {
               type: "success",
            })

            setTimeout(() => {
               navigate("/")
            }, 700)
         })
         .catch((error) => {
            toast("Đăng Nhập không thành công , Tài Khoản hoặc Mật Khẩu không chính xác", {
               type: "error",
            })
            setTimeout(() => {
               reset({
                  password: "",
               })
            }, 1000)
         })
   }

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmitLogin)} name="loginForm" className="loginForm w-full">
            <div className="form-group">
               <input {...register("email")} type="email" className="form-control email" name="email" placeholder="Email " />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.email?.message}</div>

            <div className="form-group">
               <input
                  {...register("password")}
                  type="password"
                  className="form-control password"
                  name="password"
                  placeholder="Password"
               />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.password?.message}</div>
            <button className="btn-login " type="submit">
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
