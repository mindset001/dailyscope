// app/context/AuthContext.tsx
'use client'

import axiosInstance from '@/utils/axiosInstance'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface Subscription {
  active: boolean
  plan?: 'monthly' | 'yearly'
  nextBillingDate?: string
}

interface User {
  _id: string
  id: string
  email: string
  firstName: string
  lastName: string
  subscription?: Subscription
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  hasActiveSubscription: boolean
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      })

      if (!response.data) {
        throw new Error('Login failed')
      }

      const { user: userData, token: authToken } = response.data
      setUser(userData)
      setToken(userData.token || authToken)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', userData.token || authToken)
        localStorage.setItem('user', JSON.stringify(userData))
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  }

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('authToken')
          const storedUser = localStorage.getItem('user')
          
          if (storedToken) {
            setToken(storedToken)
            // Set default authorization header
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
          }
          
          if (storedUser) {
            const userData = JSON.parse(storedUser)
            setUser(userData)
          }
        }
      } catch (error) {
        console.error('Initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    hasActiveSubscription: user?.subscription?.active || false,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}