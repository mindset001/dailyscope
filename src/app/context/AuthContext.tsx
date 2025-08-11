'use client';

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Derived state for isLoggedIn
  const isLoggedIn = !!user;

  // Initialize auth state from storage
    useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          // Verify token with backend
          const isValid = await verifyToken(token);
          if (isValid) {
            setUser(JSON.parse(userData));
          } else {
            clearAuthData();
          }
        }
      } catch (error) {
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      router.push('/dashboard'); // Redirect after successful login
    } catch (err) {
      console.error('Login error:', err);
      throw err; // Re-throw for error handling in components
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn,
        user, 
        loading, 
        login, 
        logout, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to verify token (mock implementation)
async function verifyToken(token: string): Promise<boolean> {
  // In a real app, you would verify with your backend
  // For now, we'll just check if the token exists
  return !!token;
}