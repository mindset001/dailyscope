'use client'

import React, { useState } from 'react'
import Login from '@/../public/images/login.png'
import Image from 'next/image'

import {
    FaInstagram,
    FaXTwitter,
    FaLinkedinIn,
    FaYoutube,
} from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/authServices';
import { useAuth } from '@/app/context/AuthContext';

function page() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await loginUser(formData);
            login(res.token);
            console.log("✅ Login success:", res);

            // Optionally store token
            localStorage.setItem('token', res.token);

            // Redirect after login
            localStorage.setItem('token', res.user.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            router.push('/'); // or wherever
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className='flex flex-col md:flex-row  justify-between bg-[#f9f9f9] py-10 px-20 gap-10'>
            <div className='pr-10'>
                <Image src={Login} alt="Login Image" className='' />
            </div>
            <div className=' pl-6 mt-6'>
                <div >
                    <h1 className='font-[600] text-[40px]'>Login to your account</h1>
                    <p className='font-[400] text-[16px]'>Continue exploring the scope in sharing the works
                        of others who contribute to the history,
                        culture, and development in Africa. </p>


                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-6 mt-8'>
                    <div>
                        <label htmlFor="" className='text-[14px] font-bold mb-4'>Email Address</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                            <FaInstagram />
                            <input type="email" name='email' className='w-full border-none outline-none' value={formData.email}
                                onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="" className='text-[14px] font-bold mb-4'>Enter your password</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                            <FaInstagram />
                            <input type="password" name='password' className='w-full border-none outline-none' value={formData.password}
                                onChange={handleChange} />
                        </div>
                    </div>

                    <div className='flex items-center justify-between text-[#000] font-[600] text-[14px]'>
                        <p><Link href='/auth/forget-password'>Forgot Password</Link></p>

                        <p><Link href='/auth/signup'>Create Account</Link></p>
                    </div>

                    <div className='w-full'>
                        <button type='submit' className='w-full bg-[#000] rounded-[10px] text-[#fff] h-[48px]'>
                            <p>Log in</p>
                        </button>
                    </div>
                </form>
            </div>

        </main>
    )
}

export default page