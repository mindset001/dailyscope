'use client';

import React, { useState, useEffect } from 'react';
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
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Get user info from localStorage or context
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserEmail(user.email || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, []);

  const handleSubscribe = () => {
    if (!userEmail || !firstName || !lastName) {
      toast.error('Please log in and ensure your profile is complete');
      return;
    }

    // Route to Paystack link with required details (email, planCode, firstName, lastName)
    // If Paystack supports these query params, append them
    const paystackUrl = `${plans[billingCycle].paystackLink}?email=${encodeURIComponent(userEmail)}&planCode=${plans[billingCycle].planCode}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
    window.open(paystackUrl, '_blank');
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
            onClick={handleSubscribe}
            disabled={!userEmail || !firstName || !lastName}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Subscribe Now
          </button>
          
          <p className="text-sm text-gray-500">{plans[billingCycle].description}</p>
        </div>
      </div>
    </section>
  );
}