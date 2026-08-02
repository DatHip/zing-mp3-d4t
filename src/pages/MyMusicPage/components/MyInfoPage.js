import React, { memo } from "react"
import ImageUpload from "components/form/ImageUpload"
import Section from "components/ui/Section"
import { UpdateProfileStyled } from "./MyInfoPage.styles"
import { useMyInfoPage } from "./useMyInfoPage"

const MyInfoPage = memo(() => {
   const {
      image,
      changePasswordPage,
      setChangePasswordPage,
      register,
      handleSubmit,
      errors,
      isSubmitting,
      register2,
      handleSubmit2,
      error2,
      isSubmitting2,
      onUpdateProfile,
      onChangePasswords,
      onSelectImage,
      handleDeleteImage,
   } = useMyInfoPage()

   return (
      <>
         <Section
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
         ></Section>
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
