'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
};

export default function LoginNavbar() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white px-4 sm:px-6 lg:px-10 py-4 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-black">
          The <span className="font-extrabold">Daily Scope</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6 text-sm font-medium text-black">
            <Link href="/" className="font-semibold hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/spotlight" className="hover:text-gray-600 transition-colors">
              Spotlight
            </Link>
            <Link href="/articles" className="hover:text-gray-600 transition-colors">
              Articles
            </Link>
          </div>

          <div className="flex items-center space-x-6 ml-6">
            <Link href="/contact" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
              Contact
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 group">
              {/* <div className="bg-black h-10 w-10 rounded-full overflow-hidden flex items-center justify-center">
                {user?.avatar ? (
                  <Image 
                    src={user.avatar} 
                    alt={`${user. || ''} ${user.lastName || ''}`}
                    width={40}
                    height={40}
                    className="object-cover"
                    priority
                  />
                ) : (
                  <span className="text-white font-medium">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                )}
              </div> */}
              <div className="hidden lg:block">
                <p className="text-sm font-medium group-hover:text-gray-600 transition-colors">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[160px]">
                  {user?.email}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/dashboard" className="flex items-center">
            <div className="bg-black h-10 w-10 rounded-full overflow-hidden flex items-center justify-center">
              {/* {user?.avatar ? (
                <Image 
                  src={user.avatar} 
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                  priority
                />
              ) : (
                <span className="text-white font-medium">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              )} */}
            </div>
          </Link>
          <button
            className="text-black"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 px-6 py-4 space-y-4">
            <Link 
              href="/" 
              onClick={() => setMobileOpen(false)}
              className="block font-semibold text-black hover:text-gray-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileOpen(false)}
              className="block text-black hover:text-gray-600 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/spotlight" 
              onClick={() => setMobileOpen(false)}
              className="block text-black hover:text-gray-600 transition-colors"
            >
              Spotlight
            </Link>
            <Link 
              href="/articles" 
              onClick={() => setMobileOpen(false)}
              className="block text-black hover:text-gray-600 transition-colors"
            >
              Articles
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileOpen(false)}
              className="block text-black hover:text-gray-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}