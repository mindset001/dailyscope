// components/SubscriptionStatus.js
'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';

export default function SubscriptionStatus() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await axiosInstance.get('/subscription/status');
      setSubscription(response.data);
      console.log('subscription', response.data)
    } catch (error) {
      console.error('Error fetching subscription status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading subscription status...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Subscription</h2>
      {subscription ? (
        <div>
          <p className="text-green-600 font-semibold">Status: Active</p>
          <p>Plan: {subscription.plan}</p>
          <p>Next Billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <div>
          <p className="text-red-600 font-semibold">No active subscription</p>
          <p className="mt-2">Subscribe to access premium content</p>
        </div>
      )}
    </div>
  );
}