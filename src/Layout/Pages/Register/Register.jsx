import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Components/AuthProvider/AuthProvider';
import axios from 'axios';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Register = () => {
  const navigate = useNavigate() ;
  const axiosPublic = useAxiosPublic() ;

  const { signInUser, user, updateUserProfile, createUser, googleSignIn, logOut } = useContext(AuthContext);
    
  console.log(user)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },

  } = useForm() ;

  const onSubmit = (data) => {
    console.log(data)
    const email = data.email ;
    const password = data.password ;

        createUser(email, password)
        .then(res => { 
          console.log(res.user)
        
          updateUserProfile(data.name , data.photoURL)
          .then( () => {
            //create user entry in the database 
            const userInfo = {
              name : data.name,
              email : data.email
            }

            axiosPublic.post('/users', userInfo)
            .then(res => {
              console.log(res.data);
              if (res.data.insertedId) {
                reset();
                new Swal("Thank you!", "You have successfully completed your registration!", "success");
                navigate('/');
              }
            })
            .catch(error => {
              console.log(error);
            });
          
          })

          .catch(error => console.log(error))
        } )
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
    return (
        <>

        <div className="rounded  flex lg:justify-center lg:items-center h-full lg:h-[84vh]">


          <div className="lg:border border-[#5fa2bf] ">

            <div className="">
              <form onSubmit={handleSubmit(onSubmit)} className="px-7 lg:px-14 rounded  lg:w-[570px]">
                <h2 className="mb-10 text-[#009EE2] pt-7 font-Inter text-4xl font-bold text-center">Register Here</h2>

                <div>
                  <input className="border-[#009EE2] pl-5 bg-[#FFF]  rounded-lg py-3 outline-none w-full block border pb-3 mb-8" type="text" placeholder="Your Name" {...register("name", { required: true })} name="name" />
                  {errors.name && <span className="text-red-600">Name is required</span>}

              <input className="border-[#009EE2] pl-5 bg-[#FFF]  rounded-lg py-3 outline-none w-full block border pb-3 mb-8" type="text" placeholder="photo URL" {...register("photoURL", { required: true })}  />
                  {errors.photoURL && <span className="text-red-600">photo is required</span>}



                  <input className="border-[#009EE2] bg-[#FFF] rounded-lg py-3 outline-none w-full border b block pl-5 pb-3 mb-8" type="emial" placeholder="Username or Email" {...register("email", { required: true })} name="email" required />
                  {errors.email && <span className="text-red-600">email is required</span>}


                  <div className='relative mb-8'>

                    <input type={showPassword ? "text" : "password"}
                      placeholder="password"
                      className="input input-bordered border-[#009EE2] rounded-lg py-3 outline-none block pl-5 pb-3  bg-[#FFF] w-full" name='password'{...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern : /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                    
                      })}
                     
                      />

{errors.password?.type === "required" && (
  <p className="text-red-600">Password is required</p>
)}
{errors.password?.type === "minLength" && (
  <p className="text-red-600">Password must be at least 6 characters</p>
)}
{errors.password?.type === "maxLength" && (
  <p className="text-red-600">Password must be less than 20 characters</p>
)}
{errors.password?.type === "pattern" && (
  <p className="text-red-600">Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character</p>
)}

                    <span onClick={() => setShowPassword(!showPassword)} className='text-xl cursor-pointer absolute top-3 right-2' >
                      {
                        showPassword ? <AiFillEye ></AiFillEye> :

                          <AiFillEyeInvisible ></AiFillEyeInvisible>
                      }
                    </span>
                  </div>

                

                </div>

                <div className="mb-3">
                  <input type="checkbox" name="terms" id="terms" />
                  <label className="mt-2 text-[#00000080] font-Inter"> Accept our </label>
                  <a className="text-blue-500">Terms and Conditions</a>
                </div>

                <input  className="cursor-pointer rounded-lg py-4 mx-auto w-full mb-4 text-[#FFF] font-Inter font-semibold bg-[#009EE2] " type="submit" value="Register" />

                {/* <button

                 
                >
                  Register
                </button> */}

                <p className="text-center text-base font-Inter text-[#00000080]">Already have an account? <Link to='/login'>
                <a className="text-blue-600 cursor-pointer"> Login </a></Link>   </p>

              </form>


              <div className="flex mb-5 items-center gap-2 mt-6 justify-center">
                <div className="bg-[#191A48] h-[1px] w-[200px]">
                </div>
                <p className="text-xl text-[#191A48]">Or</p>
                <div className="bg-[#191A48] h-[1px] w-[200px]">
                </div>
              </div>


              <div onClick={handleGoogleLogin} className="rounded-full cursor-pointer w-4/5 mx-auto justify-center flex items-center gap-2 mb-7 mt-2 py-3 text-base border border-[#009EE2] bg-[#FFF]">
                <div className="flex items-center gap-2">
                  <FcGoogle className="text-2xl"></FcGoogle>
                  <h2 className="font-semibold text-[#00000080] font-Inter">Continue with Google</h2>
                </div>
              </div >



            </div>
          </div>
      </div>
      </>
    );
};

export default Register;