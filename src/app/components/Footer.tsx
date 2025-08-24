// components/Footer.tsx
'use client';

import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa6';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        'http://localhost:5000/api/newsletter/subscribe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Subscription successful! Check your inbox.');
        setEmail('');
      } else {
        setMessage(data.message || '❌ Failed to subscribe.');
      }
    } catch (error) {
      setMessage('⚠️ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-white px-2 md:px-18 py-12">
      {/* ... your existing code for brand, socials, explore, support */}

      <hr className="my-8 border-gray-700" />

      {/* Subscribe */}
      <div className="md:w-2/3 px-8">
        <h3 className="text-sm font-semibold mb-2">Stay updated</h3>
        <p className="text-sm text-gray-300 mb-4">
          Get our latest articles and spotlights delivered to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#727272] w-2/3 px-4 py-2 border border-[#727272] text-sm text-white rounded-md focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <p className="mt-2 text-sm">
            {message}
          </p>
        )}
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 px-8">
        <p>© 2025 The Daily Scope. All rights reserved.</p>
        <p>
          Powered by{' '}
          <Link href="http://Megasisnetwork.co.uk">Megasisnetwork.co.uk</Link>
        </p>
      </div>
    </footer>
  );
}
