'use client';

import { useAuth } from './context/AuthContext';
import Navbar from './components/Header';
import LoginNavbar from './components/LoginHeader';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, loading, user } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Wait until after initial render to show UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state while auth is being checked
  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <LoginNavbar /> : <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutClient;