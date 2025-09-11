// components/sidebar.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Users, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation';

export function Sidebar() {
  const router = useRouter();
  
const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  // Redirect and then reload after a short delay
  router.push('/auth/login');
  setTimeout(() => {
    window.location.reload();
  }, 100); // Small delay to ensure navigation happens
};

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between h-screen">
      {/* <h2 className="text-xl font-bold mb-6">Dashboard</h2> */}
      <nav className="space-y-2">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/profile">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" /> Profile
          </Button>
        </Link>
        <Link href="/dashboard/publishing">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" /> Article Publishing
          </Button>
        </Link>
        <Link href="/dashboard/management">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />Article Management
          </Button>
        </Link>
        <Link href="/dashboard/subscription">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />Subscription
          </Button>
        </Link>
      </nav>


      <Button onClick={handleLogout}>
        Logout
      </Button>
    </aside>
  )
}
