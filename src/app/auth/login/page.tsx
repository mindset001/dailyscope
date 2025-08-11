    'use client'

    import React, { useState } from 'react'
    import Login from '@/../public/images/login.png'
    import Image from 'next/image'

    import { MdOutlineMail } from "react-icons/md";
    import { TbLockPassword } from "react-icons/tb";
    import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
    import Link from 'next/link';
    import { useRouter } from 'next/navigation';
    import { loginUser } from '@/services/authServices';
    import { useAuth } from '@/app/context/AuthContext';

    function page() {
        const { login } = useAuth();
        const [formData, setFormData] = useState({ email: '', password: '' });
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');
        const [loading, setLoading] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const [countdown, setCountdown] = useState(0);
        const router = useRouter();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        };

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await loginUser(formData);
            // Pass both email and password to the login function
            await login(formData.email, formData.password);
            console.log("✅ Login success:", res);

            // Store token and user data
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            
            // Show success message
            setSuccess('Login successful! Welcome back.');
            
            // Start countdown
            let timeLeft = 2;
            setCountdown(timeLeft);
            
            const countdownInterval = setInterval(() => {
                timeLeft--;
                setCountdown(timeLeft);
                
                if (timeLeft === 0) {
                    clearInterval(countdownInterval);
                    router.push('/'); // Redirect to home or dashboard
                }
            }, 1000);
            
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

        return (
            <main className='flex flex-col md:flex-row justify-between bg-[#f9f9f9] py-4 md:py-10 px-8 md:px-20 gap-10'>
                <div className='hidden md:block pr-10'>
                    <Image src={Login} alt="Login Image" className='' />
                </div>
                <div className='md:pl-6 mt-6'>
                    <div>
                        <h1 className='font-[600] text-[25px] md:text-[40px]'>Login to your account</h1>
                        <p className='font-[400] text-[12px] md:text-[16px]'>Continue exploring the scope in sharing the works
                            of others who contribute to the history,
                            culture, and development in Africa. </p>
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
                                    Redirecting in <span className="font-bold">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
                                </p>
                            )}
                            <div className="mt-2">
                                <Link 
                                    href="/" 
                                    className="text-green-700 underline text-sm hover:text-green-800"
                                >
                                    Go to dashboard now →
                                </Link>
                            </div>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-8'>
                        <div>
                            <label htmlFor="email" className='text-[14px] font-bold mb-4 block'>Email Address</label>
                            <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2'>
                                <MdOutlineMail className="text-gray-500" />
                                <input 
                                    type="email" 
                                    id="email"
                                    name='email' 
                                    className='w-full border-none outline-none bg-transparent' 
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className='text-[14px] font-bold mb-4 block'>Enter your password</label>
                            <div className='flex items-center gap-2 bg-[#F4F4F4] rounded-md px-4 py-2 relative'>
                                <TbLockPassword className="text-gray-500" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="password"
                                    name='password' 
                                    className='w-full border-none outline-none bg-transparent pr-8' 
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
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
                        </div>

                        <div className='flex items-center justify-between text-[#000] font-[600] text-[14px]'>
                            <p><Link href='/auth/forget-password' className="hover:underline">Forgot Password</Link></p>
                            <p><Link href='/auth/signup' className="hover:underline">Create Account</Link></p>
                        </div>

                        <div className='w-full'>
                           <button 
    type='submit' 
    disabled={loading || !!success}  // Convert success to boolean with !!
    className={`w-full bg-[#000] rounded-[10px] text-[#fff] h-[48px] font-medium transition-colors ${
        loading || success ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'
    }`}
>
    {loading ? 'Logging in...' : success ? 'Login Successful!' : 'Log in'}
</button>
                        </div>
                    </form>
                </div>
            </main>
        )
    }

    export default page