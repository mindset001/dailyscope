'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional: you can use any icon or SVG

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white px-6 py-4 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-black">
          The <span className="font-extrabold">Daily Scope</span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-black items-center">
          <li>
            <Link href="/" className="font-semibold">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/auth/login">Spotlight</Link>
          </li>
          <li>
            <Link href="/auth/login">Articles</Link>
          </li>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
          <li>
            <Link href="/auth/signup">
              <button className="bg-black text-white px-4 py-2 rounded-md hover:opacity-90">
                Join
              </button>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-4 space-y-4 px-6 pb-6">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block font-semibold text-black">Home</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-black">About</Link>
          <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block text-black">Spotlight</Link>
          <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block text-black">Articles</Link>
          <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block text-black">Login</Link>
          <Link href="/auth/signup" onClick={() => setMobileOpen(false)} className="block">
            <button className="w-full bg-black text-white py-2 rounded-md">Join</button>
          </Link>
        </div>
      )}
    </header>
  );
}
