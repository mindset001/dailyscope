// components/Footer.tsx
'use client';

import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white px-18 py-12">
      <div className="flex justify-between gap-20">
        {/* Brand + Socials */}
        <div className='w-2/3 px-8'>
          <h2 className="text-lg font-bold">The Daily Scope</h2>
          <p className="text-sm mt-2 text-gray-300 w-2/3">
            A member-powered platform amplifying diverse voices in art,
            culture, and creative discourse. Join us in fostering meaningful
            conversations that matter.
          </p>
          <div className="flex space-x-4 mt-4 text-white text-lg">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

       

        <div className='flex justify-between  w-1/2 pr-20'>
             {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Explore</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/spotlight">Spotlight</Link>
            </li>
            <li>
              <Link href="/articles">Articles</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link href="/contact">Contact us</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        </div>

      
      </div>

      <hr className="my-8 border-gray-700" />

       {/* Subscribe */}
        <div className='w-2/3 px-8'>
          <h3 className="text-sm font-semibold mb-2">Stay updates</h3>
          <p className="text-sm text-gray-300 mb-4">
            Get our latest articles and spotlights delivered to your inbox.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#727272] w-2/3 px-4 py-2 border border-[#727272] text-sm text-white rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>

       <hr className="my-8 border-gray-700" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 px-8">
        <p>© 2025 The Daily Scope. All rights reserved.</p>
        <p>
          Made with <span className="text-red-500">❤️</span> for the creative
          community
        </p>
      </div>
    </footer>
  );
}
