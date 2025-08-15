// components/SubscriptionPlans.js
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

type BillingCycle = 'monthly' | 'yearly';

type Plan = {
  price: string;
  period: string;
  description: string;
  paystackLink: string;
};

const plans: Record<BillingCycle, Plan> = {
  monthly: {
    price: 'N4,000',
    period: 'month',
    description: 'Cancel anytime. No long term commitments',
    paystackLink: 'https://paystack.shop/pay/56upr1y01e'
  },
  yearly: {
    price: 'N40,000',
    period: 'year',
    description: 'Save 10%. Cancel anytime.',
    paystackLink: 'https://paystack.shop/pay/1djm2xfx6t'
  }
};

export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

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
          
          <a 
            href={plans[billingCycle].paystackLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4 text-center"
          >
            Subscribe Now
          </a>
          
          <p className="text-sm text-gray-500">{plans[billingCycle].description}</p>
        </div>
      </div>

      {/* Features list */}
      {/* <div className="mt-8 text-center max-w-md">
        <h3 className="text-lg font-semibold mb-4">What's included:</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Full access to all content
          </li>
          <li className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Exclusive member benefits
          </li>
          <li className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Cancel anytime
          </li>
        </ul>
      </div> */}
    </section>
  );
}