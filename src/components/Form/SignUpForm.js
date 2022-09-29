import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import FirebaseApp from "../../firebase/firebaseApp"
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc, getDoc } from "firebase/firestore"
import { auth, database } from "../../firebase/firebase-config"
import { toast } from "react-toastify"

import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"

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
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setFocus,
   } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
   })

   const [post, setPost] = useState([])
   const colRef = collection(database, "posts")

   // remove, addDoc ,getDoc , update,
   const removeDoc = async () => {
      const colRefDel = doc(database, "posts", "YDfp0gR3yeci2n6jra6g")
      await deleteDoc(colRefDel)
      console.log("oke")
   }

   const handleUpadatePost = async () => {
      const colRefUpdate = doc(database, "posts", "oq9bUMZkdGNDjDNzFnyu")
      await updateDoc(colRefUpdate, {
         name: "ahihiihhii",
      })
      console.log("oke")
   }

   const onSubmit = async (data) => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
         .then((userCredential) => {
            const user = userCredential.user

            console.log(user, "success")

            toast("Đăng ký Thành Công ", {
               type: "success",
            })

            setTimeout(() => {
               reset({
                  email: "",
                  password: "",
                  passwordCheck: "",
                  name: "",
               })
            }, 1000)

            // ...
         })

         .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message

            return toast("Đăng ký Không Thành Công ", {
               type: "error",
            })
         })
   }
   // const onSubmit = async (data) => {
   //    console.log(errors, data)

   //    // handleUpadatePost()

   //    if (!errors) return

   //    addDoc(colRef, {
   //       email: data.email,
   //       password: data.password,
   //       name: data.name,
   //       createAt: serverTimestamp(),
   //    })
   //       .then(() => {
   //          console.log("success")
   //          reset({
   //             email: "",
   //             password: "",
   //             passwordCheck: "",
   //             name: "",
   //          })
   //          toast("Wow so easy!")
   //          // removeDoc()
   //       })
   //       .catch(() => {
   //          console.log("error")
   //       })
   // }
   //

   useEffect(() => {
      setFocus("email")
   }, [setFocus])

   useEffect(() => {
      // getDocs(colRef).then((spanshot) => {
      //    let posts = []
      //    spanshot.docs.forEach((docs) => {
      //       posts.push({
      //          id: docs.id,
      //          ...docs.data(),
      //       })
      //    })
      //    console.log(posts)
      //    setPost(posts)
      // })

      onSnapshot(colRef, (snapshot) => {
         let posts = []
         snapshot.docs.forEach((docs) => {
            posts.push({
               id: docs.id,
               ...docs.data(),
            })
         })

         setPost(posts)
      })

      // getData
      const docRefSingle = doc(database, "posts", "yMWfn8Lkzh1Kt9pajCnF")
      onSnapshot(docRefSingle, (value) => {
         // console.log(value.data())
      })
      // getDoc(docRefSingle).then((value) => {
      //    console.log(value.data())
      // })
   }, [])

   return (
      <div>
         {post.length > 0 &&
            post.map((e, index) => {
               return <div key={index}>{e?.name}</div>
            })}
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
