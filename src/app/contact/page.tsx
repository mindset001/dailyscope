import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaInstagram, FaInstagramSquare } from 'react-icons/fa'
import Login from '@/../public/images/Subtract.png'

function page() {
  return (
    <main className='flex flex-col bg-[#f9f9f9]'>
        <div className="mb-8 flex flex-col items-center bg-[#f9f9f9] ">
        <h1 className="text-[55px] font-[800] mt-4 mb-6 text-center">Contact</h1>
         <p className="text-lg text-gray-700 mb-8 w-[50%] text-center">In-depth analysis, cultural commentary, and thought-provoking essays on art, culture, and the creative forces shaping our world.</p>
      </div>

      <main className='flex flex-col md:flex-row w-full justify-between py-10 px-20 gap-10'>

            <div className='w-1/2 mt-6 '>

                <form action="" className='flex flex-col gap-6 mt-8'>
                    <div className='flex gap-4'>
                        <div>
                            <label htmlFor="" className='text-[14px] font-bold mb-4'>First name</label>
                            <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                                <FaInstagram />
                                <input type="text" className='w-full border-none outline-none' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className='text-[14px] font-bold mb-4'>Last name</label>
                            <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                                <FaInstagram />
                                <input type="text" className='w-full border-none outline-none' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[14px] font-bold mb-4'>Email Address</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                            <FaInstagram />
                            <input type="email" className='w-full border-none outline-none' />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="" className='text-[14px] font-bold mb-4'>Enter your message</label>
                        <textarea name="" id="" className='w-full bg-[#F4F4F4] border-none outline-none p-4 h-[189px]' placeholder='Type your message...'></textarea>
                    </div>

                    

                    <div className='w-full'>
                        <button className='w-full bg-[#000] rounded-[10px] text-[#fff] h-[48px]'>
                            <p>Submit</p>
                        </button>
                    </div>
                </form>
            </div>

            <div className='pl-10 w-1/2'>
                <Image src={Login} alt="Login Image" className='' />
            </div>

        </main>

    </main>
  )
}

export default page