'use client'

import React, { useState, useEffect } from 'react'
import Login from '@/../public/images/login.png'
import Image from 'next/image'
import { MdOutlineMail } from "react-icons/md"
import { TbLockPassword } from "react-icons/tb"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  // UI state
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ 
      ...prev, 
      [e.target.name]: e.target.value 
    }))
    // Clear errors when user types
    if (error) setError('')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate inputs
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      
      setSuccess('Login successful! Welcome back.')
      setCountdown(3) // Start 3-second countdown
      
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle countdown for redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      
      if (countdown === 1) {
        router.push('/')
      }
      
      return () => clearTimeout(timer)
    }
  }, [countdown, router])

  return (
    <main className='flex flex-col md:flex-row justify-between bg-[#f9f9f9] py-4 md:py-10 px-8 md:px-20 gap-10'>
      {/* Login Image */}
      <div className='hidden md:block pr-10'>
        <Image 
          src={Login} 
          alt="Login Illustration" 
          className='max-h-[600px] object-contain'
          priority
        />
      </div>

      {/* Login Form */}
      <div className='md:pl-6 mt-6 w-full max-w-md'>
        <div className='mb-8'>
          <h1 className='font-[600] text-[25px] md:text-[40px] mb-2'>
            Login to your account
          </h1>
          <p className='text-gray-600'>
            Continue exploring the scope in sharing the works of others who 
            contribute to the history, culture, and development in Africa.
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Success Message */}
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
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className='block text-sm font-medium mb-2'>
              Email Address
            </label>
            <div className='flex items-center gap-2 bg-gray-50 rounded-md px-4 py-3 border border-gray-200 focus-within:border-black transition-colors'>
              <MdOutlineMail className="text-gray-400" />
              <input 
                type="email" 
                id="email"
                name='email'
                className='w-full bg-transparent outline-none text-sm'
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className='block text-sm font-medium mb-2'>
              Password
            </label>
            <div className='flex items-center gap-2 bg-gray-50 rounded-md px-4 py-3 border border-gray-200 focus-within:border-black transition-colors relative'>
              <TbLockPassword className="text-gray-400" />
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                name='password'
                className='w-full bg-transparent outline-none text-sm pr-8'
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className='flex items-center justify-between text-sm'>
            <Link 
              href='/auth/forget-password' 
              className="text-gray-600 hover:text-black hover:underline"
            >
              Forgot Password?
            </Link>
            <Link 
              href='/auth/signup' 
              className="font-medium text-black hover:underline"
            >
              Create Account
            </Link>
          </div>

          {/* Submit Button */}
          <button 
            type='submit' 
            disabled={loading || !!success}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              loading || success 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Logging in...
              </span>
            ) : success ? (
              'Login Successful!'
            ) : (
              'Log in'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}