// components/SubscriptionPlans.js
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

type BillingCycle = 'monthly' | 'yearly';

type Plan = {
  price: string;
  period: string;
  description: string;
};

const plans: Record<BillingCycle, Plan> = {
  monthly: {
    price: 'N4,000',
    period: 'month',
    description: 'Cancel anytime. No long term commitments'
  },
  yearly: {
    price: 'N40,000', // Assuming 10% discount for yearly
    period: 'year',
    description: 'Save 10%. Cancel anytime.'
  }
};

export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly'); // 'monthly' or 'yearly'

  return (
    <section className="bg-[#f9f9f9] pb-20 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8 flex flex-col items-center  ">
        <h1 className="text-[40px] md:text-[82px] font-[800] mt-4 mb-2 text-center">Choose your plan</h1>
         <div className="flex justify-center mb-4">
        <div className="inline-flex items-center p-1">
          <button
            className={`px-4 py-2 rounded-full text-sm  ${billingCycle === 'monthly' ? 'text-black font-[800]' : 'text-black'}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm  ${billingCycle === 'yearly' ? ' text-black font-[800]' : 'text-gray-700'}`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
      </div>
      
      {/* Billing cycle toggle */}
     

      {/* Plan card */}
      <div className='p-6 bg-white  md:w-[50%] h-[70vh] flex flex-col justify-center rounded-lg shadow-md'>
         <div className="text-center flex flex-col items-center gap-4">
        <h3 className="text-3xl font-bold mb-2">{plans[billingCycle].price}</h3>
        <p className="text-gray-600 mb-4">Per {plans[billingCycle].period}</p>
        
        <Link 
          href="/signup" // Replace with your actual signup route
          className="block w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4"
        >
          Start membership
        </Link>
        
        <p className="text-sm text-gray-500">{plans[billingCycle].description}</p>
      </div>
      </div>
     

      {/* Additional features could be added here
      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-2">✓ Access to all content</p>
        <p className="mb-2">✓ Exclusive member benefits</p>
        <p>✓ Support our creative community</p>
      </div> */}
    </section>
  );
}