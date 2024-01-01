import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../../Components/AuthProvider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const Login = () => {

   const axiosPublic = useAxiosPublic() ;
  const { signInUser, user, createUser, googleSignIn, logOut } = useContext(AuthContext)

  console.log(user)
  const navigate = useNavigate() ;
  const location = useLocation() ;

  const from = location.state?.from?.pathname || '/' ;

  console.log(location)



  const handleSignInUser = e => {

    e.preventDefault();
    const form = new FormData(e.currentTarget)

    const email = form.get('email')
    const password = form.get('password')

    signInUser(email, password)
      .then(res => {
        console.log(res.user)
        new Swal("Login Successful!", "Welcome back!", "success")
        navigate(from, {replace : true}) ;
      })
      .catch(error => console.log(error))

  }

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(res => {
        console.log(res.user)
        const userInfo = {
          email : res.user?.email,
          name : res.user?.displayName  
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data)
          navigate('/') ;
        })
        new Swal("Login Successful!", "Welcome back!", "success")
        
      })
      .catch(error => console.log(error))

  }
  // const handleLogOut = () => {
  //   logOut()
  // }


  const [disabled, setDisabled] = useState(true);

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;

    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }

  }

  useEffect(() => {
    loadCaptchaEnginge(6);

  }, [])


    return <>
      <div className=" rounded flex justify-center items-center h-[83vh]">

        <div className="lg:border border-[#5fa2bf]  -mt-20 lg:p-6">

          <div>
            <form onSubmit={handleSignInUser} className="px-8 lg:px-14 rounded lg:w-[570px]">
              <h2 className="mb-14 text-[#009EE2] pt-9 font-Inter text-4xl font-bold text-center">Login Here</h2>

              <div>

                <input className="border-[#009EE2] bg-[#FAFAFB] rounded-lg py-3 outline-none w-full border b block pl-5 pb-3 mb-8" type="emial" placeholder="Username or Email" name="email" required />

                <input className="border-[#009EE2] bg-[#FAFAFB] border  rounded-lg py-3 outline-none w-full block pl-5 pb-3 mb-10" type="password" placeholder="password" name="password" required />

                  <div className="">
                  <label htmlFor="" >
                    <LoadCanvasTemplate />
                    <input onClick={handleValidateCaptcha} className="border-[#009EE2] bg-[#FFF] rounded-lg py-3 outline-none w-full border b block pl-5 pb-3 mb-2" type="text" placeholder="Captcha" name="Captcha" />
                  

                  </label>
                </div>



              </div>
              <button 
                className='rounded-lg py-4 mx-auto w-full mb-4 text-[#FFF] font-Inter font-semibold bg-[#009EE2]'
              >
                Login
              </button>

              <p className="text-center text-base font-Inter text-[#191A48]">Don't have an account? <Link to='/register'><a className="text-blue-600 cursor-pointer"> Create an Account</a></Link> </p>

            </form>


            <div className="flex mb-5 items-center gap-2 mt-6 justify-center">
              <div className="bg-[#191A48] h-[1px] w-[200px]">
              </div>
              <p className="text-xl text-[#191A48]">Or</p>
              <div className="bg-[#191A48] h-[1px] w-[200px]">
              </div>
            </div>


            <div onClick={handleGoogleLogin} className=" rounded-full cursor-pointer w-4/5 mx-auto justify-center flex items-center gap-2 mb-12 mt-2 py-3 text-base border border-[#009EE2] bg-[#FFF]">
              <div className="flex items-center gap-2">
                <FcGoogle className="text-2xl"></FcGoogle>
                <h2 className="font-semibold text-[#191A48] font-Inter">Continue with Google</h2>
              </div>
            </div >



          </div>


        </div>


      </div>
    </>

  }




export default Login;