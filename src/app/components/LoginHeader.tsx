// components/Navbar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import Adam from '../../../public/images/adam.png'; // Adjust the path as necessary

export default function LoginNavbar() {
  return (
    <header className="w-full bg-white px-10 py-4 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-black">
          The <span className="font-extrabold">Daily Scope</span>
        </div>

        {/* Nav Links */}
        <ul className="flex space-x-6 text-sm font-medium text-black items-center">
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


        <ul className="flex space-x-6 text-sm font-medium text-black items-center">
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
      </nav>
    </header>
  );
}
