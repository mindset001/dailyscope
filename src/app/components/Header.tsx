// components/Navbar.tsx
'use client';

import Link from 'next/link';

export default function Navbar() {
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
      </nav>
    </header>
  );
}
