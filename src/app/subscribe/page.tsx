// app/articles/subscription-required/page.tsx
'use client'

import { useAuth } from '@/app/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, FileText, PlusCircle, Settings, Star } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from 'react-hot-toast'
import SubscriptionPlans from '../subscription/SubscriptionPlan'

type BillingCycle = 'monthly' | 'yearly'

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

export default function SubscriptionRequiredPage() {
  const { user } = useAuth()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Get user email from localStorage or context
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserEmail(user.email)
    }
  }, [])

  const features = [
    {
      icon: <PlusCircle className="h-6 w-6 text-blue-600" />,
      title: "Create Articles",
      description: "Write and publish unlimited articles"
    },
    {
      icon: <FileText className="h-6 w-6 text-green-600" />,
      title: "Manage Content",
      description: "Edit, update, and organize your articles"
    },
    {
      icon: <Settings className="h-6 w-6 text-purple-600" />,
      title: "Advanced Tools",
      description: "Access premium editing and analytics tools"
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      title: "Priority Support",
      description: "Get dedicated help from our support team"
    }
  ]

  const initializePayment = async () => {
    if (!userEmail) {
      toast.error('Please log in to subscribe')
      return
    }

    setLoading(true)
    try {
      // First, create a subscription record in your backend
      const response = await axiosInstance.post('/subscription/initialize', {
        plan: billingCycle,
        planCode: plans[billingCycle].planCode,
        amount: billingCycle === 'monthly' ? 4000 : 40000,
        email: userEmail
      })

      // Get the payment authorization URL from your backend
      const { authorizationUrl, reference } = response.data

      // Open Paystack payment in a new window
      const paymentWindow = window.open(authorizationUrl, '_blank')
      
      if (!paymentWindow) {
        toast.error('Please allow popups for this site to complete payment')
        setLoading(false)
        return
      }

      // Check payment status periodically
      const checkPaymentStatus = setInterval(async () => {
        if (paymentWindow.closed) {
          clearInterval(checkPaymentStatus)
          
          try {
            // Verify payment with your backend
            const verificationResponse = await axiosInstance.get(`/subscription/verify/${reference}`)
            
            if (verificationResponse.data.status === 'success') {
              toast.success('Subscription successful!')
              // Update user context or local storage with subscription status
              const userData = localStorage.getItem('user')
              if (userData) {
                const user = JSON.parse(userData)
                user.subscription = {
                  active: true,
                  plan: billingCycle,
                  nextBillingDate: verificationResponse.data.nextBillingDate
                }
                localStorage.setItem('user', JSON.stringify(user))
              }
              // Refresh the page or update UI accordingly
              window.location.reload()
            } else {
              toast.error('Payment verification failed')
            }
          } catch (error) {
            console.error('Error verifying payment:', error)
            toast.error('Error verifying payment')
          } finally {
            setLoading(false)
          }
        }
      }, 1000)
    } catch (error) {
      console.error('Error initializing payment:', error)
      toast.error('Failed to initialize payment')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Article Management
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Hi {user?.firstName}, subscribe to create and manage your articles
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-4">
              Your current account doesn't include article management features. Upgrade now to:
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

       <SubscriptionPlans/>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                We offer a 7-day free trial for new subscribers to test all article management features.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and bank transfers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I upgrade or downgrade?</h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Changes take effect at your next billing cycle.
              </p>
            </div>
          </div>
        </div>

        {/* Support CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need help deciding? Our team is here to help!
          </p>
          <Button variant="outline">
            <a href="mailto:support@yourdomain.com">Contact Support</a>
          </Button>
        </div>
      </div>
    </div>
  )
}