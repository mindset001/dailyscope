'use client'

import React, { useState } from 'react'
import Login from '@/../public/images/Subtract.png'
import Image from 'next/image'
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
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

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [countdown, setCountdown] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePasswords = () => {
        if (formData.password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validate passwords before submitting
        if (!validatePasswords()) {
            setLoading(false);
            return;
        }

        try {
            const res = await signupUser(formData);
            setSuccess('Account created successfully!');
            console.log('✅ User:', res);
            
            // Start countdown
            let timeLeft = 3;
            setCountdown(timeLeft);
            
            const countdownInterval = setInterval(() => {
                timeLeft--;
                setCountdown(timeLeft);
                
                if (timeLeft === 0) {
                    clearInterval(countdownInterval);
                    router.push('/auth/login');
                }
            }, 1000);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='flex flex-col md:flex-row justify-between bg-[#f9f9f9] py-4 md:py-10 px-8 md:px-20 gap-10'>

            <div className='mt-6'>
                <div>
                    <h1 className='font-[600] text-[25px] md:text-[40px]'>Create an account</h1>
                    <p className='font-[400] text-[12px] md:text-[16px]'>Start exploring the scope in sharing the works of others who contribute to the history,
                        culture, and development in Africa.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                        <p className="text-red-600 text-sm font-medium">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-green-500 text-lg">✓</span>
                            <p className="text-green-700 font-semibold">{success}</p>
                        </div>
                        {countdown > 0 && (
                            <p className="text-green-600 text-sm">
                                Redirecting to login page in <span className="font-bold">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
                            </p>
                        )}
                        <div className="mt-2">
                            <Link 
                                href="/auth/login" 
                                className="text-green-700 underline text-sm hover:text-green-800"
                            >
                                Go to login now →
                            </Link>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-8'>
                    <div className='flex gap-4'>
                        <div className="flex-1">
                            <label htmlFor="firstName" className='text-[14px] font-bold mb-4 block'>First name</label>
                            <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                                <IoPersonOutline className="text-gray-500" />
                                <input 
                                    type="text" 
                                    id="firstName"
                                    name="firstName" 
                                    className='w-full border-none outline-none bg-transparent' 
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName" className='text-[14px] font-bold mb-4 block'>Last name</label>
                            <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                                <IoPersonOutline className="text-gray-500" />
                                <input 
                                    type="text" 
                                    id="lastName"
                                    name="lastName" 
                                    className='w-full border-none outline-none bg-transparent' 
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className='text-[14px] font-bold mb-4 block'>Email Address</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                            <MdOutlineMail className="text-gray-500" />
                            <input 
                                type="email" 
                                id="email"
                                name="email" 
                                className='w-full border-none outline-none bg-transparent' 
                                placeholder="Email Address"
                                value={formData.email} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className='text-[14px] font-bold mb-4 block'>Create a password</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2 relative'>
                            <TbLockPassword className="text-gray-500" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password"
                                name="password" 
                                className='w-full border-none outline-none bg-transparent pr-8' 
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={6}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <IoEyeOffOutline size={20} />
                                ) : (
                                    <IoEyeOutline size={20} />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className='text-[14px] font-bold mb-4 block'>Confirm your password</label>
                        <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2 relative'>
                            <TbLockPassword className="text-gray-500" />
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                id="confirmPassword"
                                name="confirmPassword"
                                className={`w-full border-none outline-none bg-transparent pr-8 ${
                                    confirmPassword && formData.password !== confirmPassword 
                                        ? 'text-red-500' 
                                        : confirmPassword && formData.password === confirmPassword 
                                        ? 'text-green-600' 
                                        : ''
                                }`}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            >
                                {showConfirmPassword ? (
                                    <IoEyeOffOutline size={20} />
                                ) : (
                                    <IoEyeOutline size={20} />
                                )}
                            </button>
                        </div>
                        {confirmPassword && (
                            <p className={`text-xs mt-1 ${
                                formData.password === confirmPassword ? 'text-green-600' : 'text-red-500'
                            }`}>
                                {formData.password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </p>
                        )}
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='font-[600] text-[14px]'>
                            Already have an account, 
                            <Link href='/auth/login' className='font-bold hover:underline ml-1'>
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className='w-full'>
                        <button 
                            type="submit"
                            disabled={loading || (!!confirmPassword && formData.password !== confirmPassword)}
                            className={`w-full bg-[#000] rounded-[10px] text-[#fff] h-[48px] font-medium transition-colors ${
                                loading || (!!confirmPassword && formData.password !== confirmPassword)
                                    ? 'opacity-70 cursor-not-allowed' 
                                    : 'hover:bg-gray-800'
                            }`}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>

            <div className='hidden md:block pl-10'>
                <Image src={Login} alt="Signup Image" className='' />
            </div>

        </main>
    )
}

export default page