'use client'

import React, { useState } from 'react'
import Login from '@/../public/images/Subtract.png'
import Image from 'next/image'
import {
    FaInstagram,
    FaXTwitter,
    FaLinkedinIn,
    FaYoutube,
} from 'react-icons/fa6';
import Link from 'next/link';
import { signupUser } from '@/services/authServices';
import { useRouter } from 'next/navigation';

function page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await signupUser(formData);
            setSuccess('Signup successful!');
            console.log('✅ User:', res);
            router.push('/auth/login'); // Redirect to login page after successful signup
            // optionally redirect or store token
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='flex flex-col md:flex-row  justify-between bg-[#f9f9f9] py-10 px-20 gap-10'>

            <div className=' mt-6'>
                <div >
                    <h1 className='font-[600] text-[40px]'>Create an account</h1>
                    <p className='font-[400] text-[16px]'>Start exploring the scope in sharing the works of others who contribute to the history,
                        culture, and development in Africa.  </p>


                </div>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-500 mb-2">{success}</p>}
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-6 mt-8'>
                    <div className='flex gap-4'>
                        <div>
                            <label htmlFor="" className='text-[14px] font-bold mb-4'>First name</label>
                            <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                                <FaInstagram />
                                <input type="text"  name="firstName" className='w-full border-none outline-none' value={formData.firstName}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className='text-[14px] font-bold mb-4'>Last name</label>
                            <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                                <FaInstagram />
                                <input type="text"  name="lastName" className='w-full border-none outline-none' value={formData.lastName}
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[14px] font-bold mb-4'>Email Address</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                            <FaInstagram />
                            <input type="email" name="email" className='w-full border-none outline-none' placeholder="Email Address"
                                value={formData.email}  onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="" className='text-[14px] font-bold mb-4'>Create a password</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                            <FaInstagram />
                            <input type="password"   name="password" className='w-full border-none outline-none' value={formData.password}
                                onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="" className='text-[14px] font-bold mb-4'>Confirm your password</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                            <FaInstagram />
                            <input type="password" className='w-full border-none outline-none' />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='font-[600] text-[14px]'>Already have an account, <Link href='/auth/login' className='font-bold'>Sign in</Link></p>


                    </div>

                    <div className='w-full'>
                        <button type="submit"
                            disabled={loading}
                            className='w-full bg-[#000] rounded-[10px] text-[#fff] h-[48px]'>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>

            <div className='pl-10'>
                <Image src={Login} alt="Login Image" className='' />
            </div>

        </main>
    )
}

export default page