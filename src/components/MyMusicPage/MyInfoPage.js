import React, { memo, useEffect, useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import ImageUpload from "../Form/ImageUpload"
import PlayListSelector from "../Selection/PlayListSelector"
import { updateProfile } from "firebase/auth"
import { auth, database } from "../../firebase/firebase-config"
import styled from "styled-components"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { setImgUrl, updateUser } from "../../features/User/userFeatures"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { updatePassword } from "firebase/auth"

const UpdateProfileStyled = styled.div`
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
const schema = yup.object({
   email: yup.string().required("Vui lòng nhập trường này").max(40).email(),
   name: yup.string().required("Vui lòng nhập trường này").max(30).min(5),
})

const schema2 = yup.object({
   password: yup.string().required("Vui lòng nhập trường này").max(30).min(7, "Độ dài tối thiểu 7 ký tự"),
   passwordNew: yup.string().required("Vui lòng nhập trường này").max(30).min(7, "Độ dài tối thiểu 7 ký tự"),
   passwordNewCheck: yup
      .string()
      .required("Vui lòng nhập trường này")
      .oneOf([yup.ref("passwordNew"), null], "Không khớp với mật khẩu"),
})

const MyInfoPage = memo(() => {
   const dispatch = useDispatch()
   const users = useSelector((state) => state.users)
   const storage = getStorage()

   const [nameImg, setNameImg] = useState("")
   const [image, setImage] = useState("")
   const [changePasswordPage, setChangePasswordPage] = useState(false)

   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors, isValid, isSubmitting },
   } = useForm({ resolver: yupResolver(schema), mode: "onChange" })

   const {
      register: register2,
      handleSubmit: handleSubmit2,
      reset: reset2,
      formState: { errors: error2, isValid: isValid2, isSubmitting: isSubmitting2 },
   } = useForm({ resolver: yupResolver(schema2), mode: "onChange" })

   useEffect(() => {
      if (!users?.email) return
      let img = users.imgUrl
      if (img) {
         setImage(img)
         const img_name = /%2F(\S+)\?/gm.exec(img)[1]
         setNameImg("images/" + img_name)
         reset({
            fileImg: img,
         })
      }

      reset({
         email: users?.email,
         name: users?.name,
      })
   }, [])

   const onUpdateProfile = async (data) => {
      if (!isValid) return

      if (data.fileImg) {
         try {
            updateProfile(auth.currentUser, {
               photoURL: data.fileImg,
            })

            updateDoc(doc(database, "users", users.id), {
               photoURL: data.fileImg,
            })

            dispatch(
               setImgUrl({
                  photoURL: data.fileImg,
               })
            )
         } catch (err) {
            console.log(err)
         }
      }

      if (!data.fileImg && !image) {
         try {
            updateProfile(auth.currentUser, {
               photoURL: "",
            })

            updateDoc(doc(database, "users", users.id), {
               photoURL: "",
            })

            dispatch(
               setImgUrl({
                  photoURL: "",
               })
            )
         } catch (err) {
            console.log(err)
         }
      }

      try {
         // update auth
         await updateProfile(auth.currentUser, {
            displayName: data.name.trim(),
         })

         await updateDoc(doc(database, "users", users.id), {
            name: data.name.trim(),
         })

         //  update state
         dispatch(
            updateUser({
               displayName: data.name.trim(),
            })
         )

         toast("Cập Nhật Thành Công", {
            type: "success",
         })
      } catch (err) {
         toast("Có Lỗi", { type: "error" })
         console.log(err)
      }
   }

   const onChangePasswords = async (data) => {
      const docRef = doc(database, "users", users.id)
      const docSnap = await getDoc(docRef)

      if (!isValid2) return

      if (data.password !== docSnap.data().password) {
         toast("Mật Khẩu Không Chích Xác", {
            type: "error",
         })

         setTimeout(() => {
            reset2({
               password: "",
            })
         }, 1000)

         return
      }

      const user = auth.currentUser
      const newPassword = data.passwordNew
      const colRef = doc(database, "users", users.id)
      try {
         updatePassword(user, newPassword)
         await updateDoc(colRef, {
            password: data.passwordNew,
         })
         toast("Cập Nhật Thành Công", {
            type: "success",
         })

         reset2({
            password: "",
            passwordNew: "",
            passwordNewCheck: "",
         })
      } catch (error) {
         toast("Cập Nhật Thất Bại", {
            type: "error",
         })
      }
   }

   const onSelectImage = (e) => {
      const file = e.target.files[0]
      if (!file) return

      console.log()

      const storageRef = ref(storage, "images/" + file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
         "state_changed",
         (snapshot) => {
            const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

            // eslint-disable-next-line default-case
            switch (snapshot.state) {
               case "paused":
                  console.log("Upload is paused")
                  break
               case "running":
                  console.log("Upload is running")
                  break
            }
         },
         (error) => {
            toast("Lỗi", {
               type: "error",
            })
            console.log(error)
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               console.log("File available at", downloadURL)
               setImage(downloadURL)
               setValue("fileImg", downloadURL)

               setNameImg("images/" + file.name)
            })
         }
      )
   }

   const handleDeleteImage = async () => {
      if (!nameImg) return
      const storage = getStorage()

      const desertRef = ref(storage, nameImg)

      // Delete the file
      deleteObject(desertRef)
         .then(() => {
            // File deleted successfully
            setImage("")
            setNameImg("")
            setValue("fileImg", "")
         })
         .catch((error) => {
            // Uh-oh, an error occurred!
         })
   }

   return (
      <>
         <PlayListSelector
            isMyPage={
               <button
                  onClick={() => {
                     setChangePasswordPage((value) => !value)
                  }}
                  className="font-medium text-[16px] flex justify-center items-center hover:opacity-70"
                  type="button"
               >
                  {changePasswordPage ? "Chỉnh Sửa Thông Tin" : "Đổi Mật Khẩu"}
                  <span className="material-icons-outlined"> chevron_right </span>
               </button>
            }
            title={!changePasswordPage ? "Chỉnh Sửa Thông Tin" : "Đổi Mật Khẩu"}
         ></PlayListSelector>
         <UpdateProfileStyled>
            {!changePasswordPage && (
               <div>
                  <form onSubmit={handleSubmit(onUpdateProfile)} name="UpdateProfile" className="w-full">
                     <label htmlFor="">Ảnh Đại Diện</label>
                     <div className="text-center mb-10">
                        <ImageUpload
                           image={image}
                           onChange={onSelectImage}
                           handleDeleteImage={handleDeleteImage}
                           className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
                        ></ImageUpload>
                     </div>

                     <div className="form-group mb-[16px]">
                        <label htmlFor="email">Email</label>
                        <input
                           disabled
                           {...register("email")}
                           type="email"
                           className="form-control email"
                           name="email"
                           placeholder="Email"
                        />
                     </div>

                     <div className="form-group">
                        <label htmlFor="email">Tên Hiển Thị</label>
                        <input {...register("name")} type="name" className="form-control name" name="name" placeholder="Name" />
                     </div>
                     <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.name?.message}</div>

                     <button className="btn-login " type="submit">
                        {isSubmitting && "Loading"}
                        {!isSubmitting && "Cập Nhật"}
                     </button>
                  </form>
               </div>
            )}
            {changePasswordPage && (
               <div>
                  <form onSubmit={handleSubmit2(onChangePasswords)} name="UpdateProfile" className="w-full">
                     <div className="form-group mt-[10px] ">
                        <label htmlFor="password">Password</label>
                        <input
                           {...register2("password")}
                           type="password"
                           className="form-control password"
                           name="password"
                           placeholder="Password"
                        />
                        <span className="fa fa-eye-slash pwd-toggle" />
                     </div>
                     <div className="mt-[6px]  px-[1rem] text-red-500">{error2?.password?.message}</div>

                     <div className="form-group mt-[16px]">
                        <label htmlFor="password">Password Mới</label>
                        <input
                           {...register2("passwordNew")}
                           type="password"
                           className="form-control password"
                           name="passwordNew"
                           placeholder="Password Mới"
                        />
                        <span className="fa fa-eye-slash pwd-toggle" />
                     </div>
                     <div className="mt-[6px] px-[1rem] text-red-500">{error2?.passwordNew?.message}</div>

                     <div className="form-group mt-[16px]">
                        <label htmlFor="password">Nhập Lại Password Mới</label>
                        <input
                           {...register2("passwordNewCheck")}
                           type="password"
                           className="form-control password"
                           name="passwordNewCheck"
                           placeholder="Nhập Lại Password Mới"
                        />
                        <span className="fa fa-eye-slash pwd-toggle" />
                     </div>
                     <div className="mt-[6px] px-[1rem] text-red-500">{error2?.passwordNewCheck?.message}</div>

                     <button className="btn-login " type="submit">
                        {isSubmitting2 && "Loading"}
                        {!isSubmitting2 && "Cập Nhật"}
                     </button>
                  </form>
               </div>
            )}
         </UpdateProfileStyled>
      </>
   )
})

export default MyInfoPage
