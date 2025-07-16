'use client'

import { useAuth } from './context/AuthContext';
import Navbar from './components/Header';
import LoginNavbar from './components/LoginHeader';
import Footer from './components/Footer';

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? <LoginNavbar /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
};

export default LayoutClient;
