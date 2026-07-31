import React, { useEffect } from "react"
import * as yup from "yup"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { auth, database } from "../../firebase/firebase-config"
import { setUser } from "../../features/User/userFeatures"

const schema = yup.object({
   email: yup.string().required("Vui lòng nhập trường này").max(40).email(),
   password: yup.string().required("Vui lòng nhập trường này").max(30).min(7, "Độ dài tối thiểu 7 ký tự"),
   passwordCheck: yup
      .string()
      .required("Vui lòng nhập trường này")
      .oneOf([yup.ref("password"), null], "Không khớp với mật khẩu"),
   name: yup.string().required("Vui lòng nhập trường này").max(30).min(5),
})

const SignUpForm = ({ setSign }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
      setFocus,
   } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
   })

   const onSubmit = async (data) => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
         .then(async (userCredential) => {
            const user = userCredential.user

            updateProfile(auth.currentUser, {
               displayName: data.name,
            })

            await setDoc(doc(database, "users", user.uid), {
               email: data.email,
               password: data.password,
               name: data.name,
               id: user.uid,
               favouriteSongs: [],
               favouritePlaylist: [],
               favouriteArtist: [],
               timestamp: serverTimestamp(),
            })

            dispatch(
               setUser({
                  displayName: data.name,
                  photoURL: user.photoURL,
                  email: user.email,
                  uid: user.uid,
               })
            )

            setTimeout(() => {
               reset({
                  email: "",
                  password: "",
                  passwordCheck: "",
                  name: "",
               })
            }, 1000)

            toast("Đăng ký Thành Công ", {
               type: "success",
            })

            setTimeout(() => {
               navigate("/")
            }, 1000)
         })

         .catch((error) => {
            console.log(error)
            return toast("Đăng ký Không Thành Công ", {
               type: "error",
            })
         })
   }

   useEffect(() => {
      setFocus("email")
   }, [setFocus])

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)} name="loginForm" className="loginForm w-full">
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

            <div className="form-group">
               <input
                  {...register("passwordCheck")}
                  type="password"
                  className="form-control password"
                  name="passwordCheck"
                  placeholder="Nhập lại password"
               />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.passwordCheck?.message}</div>

            <div className="form-group">
               <input {...register("name")} type="text" className="form-control " name="name" placeholder="Tên hiển thị" />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.name?.message}</div>

            <button disabled={isSubmitting} className="btn-login " type="submit">
               {isSubmitting ? "Loading..." : "Đăng Ký"}
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

// remove, addDoc ,getDoc , update,
// const removeDoc = async () => {
//    const colRefDel = doc(database, "posts", "YDfp0gR3yeci2n6jra6g")
//    await deleteDoc(colRefDel)
//    console.log("oke")
// }

// const handleUpadatePost = async () => {
//    const colRefUpdate = doc(database, "posts", "oq9bUMZkdGNDjDNzFnyu")
//    await updateDoc(colRefUpdate, {
//       name: "ahihiihhii",
//    })
//    console.log("oke")
// }
