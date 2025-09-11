'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-hot-toast';

type BillingCycle = 'monthly' | 'yearly';

type Plan = {
  price: string;
  period: string;
  description: string;
  paystackLink: string;
  planCode: string;
};

const plans: Record<BillingCycle, Plan> = {
  monthly: {
    price: 'N4,000',
    period: 'month',
    description: 'Cancel anytime. No long term commitments',
    paystackLink: 'https://paystack.shop/pay/56upr1y01e',
    planCode: 'PLN_monthly'
  },
  yearly: {
    price: 'N40,000',
    period: 'year',
    description: 'Save 10%. Cancel anytime.',
    paystackLink: 'https://paystack.shop/pay/1djm2xfx6t',
    planCode: 'PLN_yearly'
  }
};

export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Get user email from localStorage or context
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email);
    }
  }, []);

  const initializePayment = async () => {
    if (!userEmail) {
      toast.error('Please log in to subscribe');
      return;
    }

    setLoading(true);
    try {
      // First, create a subscription record in your backend
      const response = await axiosInstance.post('/subscription/initialize', {
        plan: billingCycle,
        planCode: plans[billingCycle].planCode,
        amount: billingCycle === 'monthly' ? 4000 : 40000,
        email: userEmail
      });

      // Get the payment authorization URL from your backend
      const { authorizationUrl, reference } = response.data;

      // Open Paystack payment in a new window
      const paymentWindow = window.open(authorizationUrl, '_blank');
      
      if (!paymentWindow) {
        toast.error('Please allow popups for this site to complete payment');
        setLoading(false);
        return;
      }

      // Check payment status periodically
      const checkPaymentStatus = setInterval(async () => {
        if (paymentWindow.closed) {
          clearInterval(checkPaymentStatus);
          
          try {
            // Verify payment with your backend
            const verificationResponse = await axiosInstance.get(`/subscription/verify/${reference}`);
            
            if (verificationResponse.data.status === 'success') {
              toast.success('Subscription successful!');
              // Update user context or local storage with subscription status
              const userData = localStorage.getItem('user');
              if (userData) {
                const user = JSON.parse(userData);
                user.subscription = {
                  active: true,
                  plan: billingCycle,
                  nextBillingDate: verificationResponse.data.nextBillingDate
                };
                localStorage.setItem('user', JSON.stringify(user));
              }
              // Refresh the page or update UI accordingly
              window.location.reload();
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            toast.error('Error verifying payment');
          } finally {
            setLoading(false);
          }
        }
      }, 1000);
    } catch (error) {
      console.error('Error initializing payment:', error);
      toast.error('Failed to initialize payment');
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f9f9f9] pb-20 flex flex-col items-center justify-center min-h-screen px-4">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-[40px] md:text-[82px] font-[800] mt-4 mb-2 text-center">Choose your plan</h1>
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-full">
            <button
              className={`px-6 py-2 rounded-full text-sm transition-colors ${
                billingCycle === 'monthly' 
                  ? 'bg-black text-white font-[600]' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm transition-colors ${
                billingCycle === 'yearly' 
                  ? 'bg-black text-white font-[600]' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      {/* Plan card */}
      <div className='p-8 bg-white w-full md:w-[50%] flex flex-col justify-center rounded-lg shadow-md max-w-md'>
        <div className="text-center flex flex-col items-center gap-4">
          <h3 className="text-4xl font-bold mb-2">{plans[billingCycle].price}</h3>
          <p className="text-gray-600 mb-4">Per {plans[billingCycle].period}</p>
          
          <button
            onClick={initializePayment}
            disabled={loading || !userEmail}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>
          
          <p className="text-sm text-gray-500">{plans[billingCycle].description}</p>
        </div>
      </div>
    </section>
  );
}