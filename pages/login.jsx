import React, { useContext } from 'react'
import { PrayerRequestContext } from '@/context/PrayerRequest'
import { useRouter } from 'next/router'
import { FaFacebook } from "react-icons/fa";
import Navbar from '../components/Navbar';
import { Toaster } from "react-hot-toast";
import Footer from '@/components/Footer';
import {FcGoogle} from 'react-icons/fc'
import Link from 'next/link';

const Login = () => {

    const { user, SignInWithGoogle, SignInWithFacebook } = useContext(PrayerRequestContext)
    const router = useRouter()

    return (

        <div className='max-w-screen max-h-screen overflow-hidden'>
            <Navbar />
            <Toaster position="bottom-center" reverseOrder={false} />

        <div className='text-[#fff] w-screen h-screen flex flex-col items-center justify-center '>
            {user ?
                <div className='flex flex-col items-center'>
                    <p>You are logged in</p>
                    <a onClick={() => router.push('/dashboard')} className='underline cursor-pointer'>Go back</a>
                </div>
                :
                <>


                    <div className="flex flex-col justify-start mb-[180px] py-4 sm:w-[370px] w-[420px] h-[304px] bg-white text-gray-800 rounded-2xl">
                        <div className="flex justify-center p-3 w-full">
                            <p className="flex font-bold text-[20px] ">Login into your account</p>
                        </div>
                        <div onClick={ SignInWithGoogle } className='flex rounded-md relative top-7 cursor-pointer mx-6 flex-row items-center  justify-center p-1 m-3 h-[45px] bg-[#112EA0] hover:bg-blue-600 rounded-[6px] hover:shadow-2xl' >
                            <div className=' p-2 flex justify-center items-center h-full mx-3 rounded-full bg-[#fff]'>
                                <FcGoogle className='rounded-[50%]' size={25} />
                            </div>
                            <button className='font-medium text-sm uppercase text-white '><b>Sign in with Google</b></button>
                        </div>

                        <div className="flex justify-center items-center relative top-7 mx-6 text-[12px] h-[1px] bg-gradient-to-r from-[#000] via-[#fff] to-[#000]">
                            <p className="text-center font-semibold mb-0">Or</p>
                        </div>
                        <div onClick={ SignInWithFacebook } className='flex rounded-md relative top-7 cursor-pointer mx-6 flex-row items-center justify-center p-1 m-3 h-[45px] bg-[#4267B2] hover:bg-blue-900 rounded-[6px] hover:shadow-2xl' >
                            <div className=' p-2 flex justify-center items-center h-full mx-3 rounded-full'>
                                <FaFacebook className='rounded-[50%] text-white bg-blue' size={25} />
                            </div>
                            <button className='font-medium text-sm uppercase text-white '><b>Sign in with Facebook</b></button>
                        </div>
                        <div className='relative top-[60px] flex w-full items-center justify-center'>
                            <p className='text-[#8C8C8C] not-italic'>
                            by logging in you agree to the 
                            </p>
                            <Link href='/terms'>
                                <a className='text-[#0ABEEE] underline ml-1 not-italic'>terms of use</a>
                            </Link>
                        </div>
                    </div>
                </>
            }
        </div>
        <Footer />

    </div>
    )
}

export default Login




