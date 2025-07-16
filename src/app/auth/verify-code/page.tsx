import React from 'react'
import Login from '@/../public/images/verify.png'
import Image from 'next/image'
import {
    FaInstagram,
    FaXTwitter,
    FaLinkedinIn,
    FaYoutube,
} from 'react-icons/fa6';
import Link from 'next/link';
import VerificationCodeInput from '@/app/components/verificationCodeInput';

 const handleComplete = (code: string) => {
    console.log('Verification code:', code);
    // Add your verification logic here
  };

function page() {
    return (
        <main className='flex flex-col md:flex-row  justify-between bg-[#f9f9f9] py-10 px-20 gap-10'>
            <div className='w-1/2'>
                <Image src={Login} alt="Login Image" className='' />
            </div>
            <div className='  mt-6'>
                <div >
                    <h1 className='font-[600] text-[40px]'>Enter Verification code</h1>
                    <p className='font-[400] text-[16px]'>Enter verification code to change your password.</p>


                </div>

                <form action="" className='flex flex-col gap-2 mt-8'>
                <p className='font-bold text-[14px]'>Verification code</p>

                     <VerificationCodeInput length={6} />

                    <div className='w-full mt-8'>
                        <button className='w-full bg-[#000] rounded-[10px] text-[#fff] h-[48px]'>
                            <p>Log in</p>
                        </button>
                    </div>
                </form>
            </div>

        </main>
    )
}

export default page