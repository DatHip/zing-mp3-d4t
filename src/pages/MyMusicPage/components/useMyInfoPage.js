import { useEffect, useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "firebase/auth"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { setImgUrl, updateUser } from "features/user/userSlice"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { updatePassword } from "firebase/auth"
import { database } from "lib/firebase/firestore"
import { auth } from "lib/firebase/auth"
import { logError } from "utils/logger"
import { selectUser } from "features/user/userSelectors"

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

/**
 * Profile page state: the two forms, the avatar upload, and the Firebase
 * writes behind them.
 *
 * The component was 384 lines because all of this lived alongside the markup —
 * two react-hook-form instances aliased field by field, a Firebase Storage
 * upload, and three separate updateProfile/updateDoc paths.
 */
export function useMyInfoPage() {
   const dispatch = useDispatch()
   const users = useSelector(selectUser)
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

      // A new upload writes its URL; clearing the avatar writes an empty one.
      // Anything else leaves the existing photo alone.
      const nextPhotoUrl = data.fileImg || (!image ? "" : null)
      if (nextPhotoUrl !== null) {
         try {
            await updateProfile(auth.currentUser, { photoURL: nextPhotoUrl })
            await updateDoc(doc(database, "users", users.id), { photoURL: nextPhotoUrl })
            dispatch(setImgUrl({ photoURL: nextPhotoUrl }))
         } catch (err) {
            logError("useMyInfoPage.updatePhoto", err)
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
         logError("MyInfoPage.updateProfile", err)
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
         toast("Cập Nhật Thất Bại", { type: "error" })
         logError("useMyInfoPage.changePassword", error)
      }
   }

   const onSelectImage = (e) => {
      const file = e.target.files[0]
      if (!file) return

      const storageRef = ref(storage, "images/" + file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
         "state_changed",
         null,
         (error) => {
            toast("Lỗi", {
               type: "error",
            })
            logError("MyInfoPage.uploadAvatar", error)
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
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

      try {
         await deleteObject(ref(storage, nameImg))
         setImage("")
         setNameImg("")
         setValue("fileImg", "")
      } catch (error) {
         logError("useMyInfoPage.deleteImage", error)
      }
   }
   return {
      users,
      image,
      nameImg,
      changePasswordPage,
      setChangePasswordPage,
      register,
      handleSubmit,
      errors,
      isValid,
      isSubmitting,
      register2,
      handleSubmit2,
      error2,
      isValid2,
      isSubmitting2,
      onUpdateProfile,
      onChangePasswords,
      onSelectImage,
      handleDeleteImage,
   }
}
