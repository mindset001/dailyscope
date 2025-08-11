'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isLoggedIn } = useAuth(); // Make sure your AuthContext provides isLoggedIn
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Only check auth if we haven't already
    if (!authChecked && !loading) {
      if (!isLoggedIn) {
        router.push('/auth/login');
      }
      setAuthChecked(true);
    }
  }, [isLoggedIn, loading, router, authChecked]);

  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Still redirecting
  }

  return <>{children}</>;
}