import React from "react"
import SignInForm from "components/Form/SignInForm"
import SignUpForm from "components/Form/SignUpForm"
import { useAuthenticationPage } from "./useAuthenticationPage"
import { SignUpStyles } from "./styles"

const AuthenticationPage = () => {
   const { sign, setSign } = useAuthenticationPage()

   return (
      <SignUpStyles>
         <div className="gird wide">
            <div className="flex w-full h-[100vh] items-center justify-center">
               <div className=" mb-[5rem] l-8 m-10 c-12">
                  <div className="row !flex-wrap authForm">
                     <div className="col l-5 m-5 c-12 left flex items-center justify-center ">
                        <div className="sider">
                           <div className="sider_brand-item">
                              <div className="sider_brand-item-img">
                                 <img src="/pabicon.webp" alt="logo-dat-mp3" />
                              </div>
                              <p className="sider_brand-item-text">
                                 D4T <span>MP3</span>
                              </p>
                           </div>
                        </div>

                        <div className="text-center mb-[2rem] font-semibold">
                           Đăng nhập bằng mạng xã hội để truy cập nhanh
                        </div>

                        <div className="flex flex-col justify-start items-center gap-[16px]">
                           <button className="btnAuth bg-[#3b5998]">Tiếp tục với Facebook</button>
                           <button className="btnAuth bg-[#c32f10] ">Tiếp tục với Google</button>
                           <button className="btnAuth bg-[#2B3137]">Tiếp tục với Github</button>
                        </div>
                     </div>

                     <div className="col l-7 m-7 c-12 right">
                        <div className="flex items-baseline justify-center ">
                           <div className="text-header active">{sign ? "Đăng Nhập" : "Đăng Ký"}</div>
                        </div>

                        {sign ? (
                           <SignInForm setSign={setSign} />
                        ) : (
                           <SignUpForm setSign={setSign} />
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </SignUpStyles>
   )
}

export default AuthenticationPage
