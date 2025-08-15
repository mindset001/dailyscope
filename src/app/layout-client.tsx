'use client';

import { useAuth } from './context/AuthContext';
import Navbar from './components/Header';
import LoginNavbar from './components/LoginHeader';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LayoutClientProps {
  children: React.ReactNode;
  protectedRoute?: boolean;
}

const LayoutClient = ({ children, protectedRoute = false }: LayoutClientProps) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && protectedRoute && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, protectedRoute, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated ? <LoginNavbar /> : <Navbar />}
      <main className="flex-grow">
        {protectedRoute && !isAuthenticated ? null : children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutClient;