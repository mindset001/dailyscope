import React from 'react'
import Login from '@/../public/images/forget.png'
import Image from 'next/image'
import {
    FaInstagram,
    FaXTwitter,
    FaLinkedinIn,
    FaYoutube,
} from 'react-icons/fa6';
import Link from 'next/link';

function page() {
    return (
        <main className='flex flex-col md:flex-row  justify-between bg-[#f9f9f9] py-4 md:py-10 px-8 md:px-20 gap-10'>

            <div className='md:w-1/2 mt-6'>
                <div >
                    <h1 className='font-[600] text-[25px] md:text-[40px] '>Forget password</h1>
                    <p className='font-[400] text-[12px] md:text-[16px]'>Enter your email address to get verification code.</p>


                </div>

                <form action="" className='flex flex-col gap-6 mt-8'>
                   
                    <div>
                        <label htmlFor="" className='text-[14px] font-bold mb-4'>Email Address</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                            <FaInstagram />
                            <input type="email" className='w-full border-none outline-none'required />
                        </div>
                    </div>

                   

                    <div className='w-full'>
                        <button className='w-full bg-[#000] rounded-[10px] text-[#fff] h-[48px]'>
                            <p><Link href='/auth/verify-code'>Reset Password</Link></p>
                        </button>
                    </div>
                </form>
            </div>

            <div className='hidden md:block w-1/2 '>
                <Image src={Login} alt="Login Image" className='' />
            </div>

        </main>
    )
}

export default page