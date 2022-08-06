import React, { useContext } from 'react'
import { PrayerRequestContext } from '../context/PrayerRequest'
import { useRouter } from 'next/router'
import { FaEye, FaFacebook, FaApple } from "react-icons/fa";
import Navbar from '../components/Navbar';
const Login = () => {

    const { user, SignInWithGoogle } = useContext(PrayerRequestContext)
    const router = useRouter()

    return (

        <div className='min-w-screen min-h-screen overflow-hidden'>
            <Navbar />

        <div className='text-[#fff] w-screen h-screen flex flex-col items-center justify-center '>
            {user ?
                <div className='flex flex-col items-center'>
                    <p>You are logged in</p>
                    <a onClick={() => router.push('/')} className='underline cursor-pointer'>Please go back to home page</a>
                </div>
                :
                <>


                    <div className="flex flex-col  justify-center mb-[180px] py-4 sm:w-[370px] w-[420px] h-[344px] bg-white text-gray-800 rounded-2xl">
                        <div className="flex justify-center p-3 mb-5 w-full">
                            <p className="flex font-bold text-[24px] ">Login into your account</p>
                        </div>
                        <div className='flex rounded-md cursor-pointer mx-6 flex-row items-center  justify-center p-1 m-3 h-[45px] bg-[#112EA0] hover:bg-blue-600 rounded-[6px] hover:shadow-2xl' >
                            <div className=' p-2 flex justify-center items-center h-full mx-3 rounded-full bg-[#fff]'>
                                <img className='h-full w-full' src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                            </div>
                            <button onClick={SignInWithGoogle} className='font-medium text-sm uppercase text-white '><b>Sign in with Google</b></button>
                        </div>

                        <form className='justify-center items-center p-4'>
                            <div
                                className="flex justify-center items-center content-center my-4 h-[1px] bg-gradient-to-r from-[#000] via-[#fff] to-[#000]"
                            >
                                <p className="text-center font-semibold mb-0">Or</p>
                            </div>
                            <div className="flex flex-row items-center justify-around my-4 px-16">
                                <div className='flex w-[80px] h-[50px] hover:shadow-2xl cursor-pointer rounded-xl border justify-center items-center '>
                                    <button
                                        type="button"
                                        
                                        className="text-[#000] font-medium text-xs rounded-full shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg mx-1"
                                        >
                                        {/* <!-- Facebook --> */}
                                        <FaFacebook size={25} />
                                    </button>
                                </div>
                                <div className='flex w-[80px] h-[50px] hover:shadow-2xl cursor-pointer rounded-xl border justify-center items-center '>
                                    <button
                                        type="button"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="text-[#000] font-medium text-xs rounded-full shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg mx-1"
                                        >
                                        {/* <!-- Linkedin --> */}
                                        <FaApple size={25} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            }
        </div>
            </div>
    )
}

export default Login




