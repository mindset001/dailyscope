'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
  redirectTo?: string;
  subscriptionRedirect?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireSubscription = false,
  redirectTo = '/auth/login',
  subscriptionRedirect = '/subscription'
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated, hasActiveSubscription } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Only check auth if we haven't already and loading is complete
    if (!authChecked && !loading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push(redirectTo);
      } else if (requireSubscription && !hasActiveSubscription) {
        // Redirect to subscription page if subscription is required but not active
        router.push(subscriptionRedirect);
      }
      setAuthChecked(true);
    }
  }, [isAuthenticated, loading, hasActiveSubscription, requireSubscription, router, authChecked, redirectTo, subscriptionRedirect]);

  // Show loading spinner while checking authentication
  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated or subscription required but not active
  // The useEffect will handle the redirect
  if (!isAuthenticated || (requireSubscription && !hasActiveSubscription)) {
    return null;
  }

  return <>{children}</>;
}