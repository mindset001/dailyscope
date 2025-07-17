// components/Navbar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import Adam from '../../../public/images/adam.png'; // Adjust the path as necessary
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function LoginNavbar() {
   const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="w-full bg-white px-10 py-4 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-black">
          The <span className="font-extrabold">Daily Scope</span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-black items-center">
          <li>
            <Link href="/" className="font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/spotlight">Spotlight</Link>
          </li>
          <li>
            <Link href="/articles">Articles</Link>
          </li>
         
        </ul>


        <ul className="hidden md:flex space-x-6 text-sm font-medium text-black items-center">
          <li>
            <Link href="/privacy" >
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <div className='flex items-center gap-2'>
                <div className='bg-black h-12 w-12 rounded-full'>
                    <Image src={Adam} alt=''/>
                </div>
                <div>
                    <p>Adam</p>
                    <p>Adamlukat@gmail.com</p>
                </div>
            </div>
          </li>
         
          
         
        </ul>
      {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className='flex items-center gap-2'>
                <div className='bg-black h-12 w-12 rounded-full'>
                    <Image src={Adam} alt=''/>
                </div>
                {/* <div>
                    <p>Adam</p>
                    <p>Adamlukat@gmail.com</p>
                </div> */}
            </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-4 space-y-4 px-6 pb-6">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block font-semibold text-black">Home</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-black">About</Link>
          <Link href="/spotlight" onClick={() => setMobileOpen(false)} className="block text-black">Spotlight</Link>
          <Link href="/articles" onClick={() => setMobileOpen(false)} className="block text-black">Articles</Link>
          <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block text-black">Contact</Link>
           <Link href="/privacy" >
              Privacy
            </Link>
        </div>
      )}

    </header>
  );
}
