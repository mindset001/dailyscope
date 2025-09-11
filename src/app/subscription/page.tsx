// app/account/subscription/page.tsx
'use client'

import { useAuth } from '@/app/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Calendar, 
  CreditCard, 
  RefreshCw, 
  XCircle, 
  CheckCircle, 
  AlertTriangle,
  ArrowRightLeft
} from 'lucide-react'
import { useState } from 'react'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from 'react-hot-toast'

interface Plan {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
}

const availablePlans: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: '₦4,000',
    period: 'month',
    description: 'Perfect for getting started with article management',
    features: [
      'Create unlimited articles',
      'Basic editing tools',
      'Standard support',
      '1GB storage'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: '₦40,000',
    period: 'year',
    description: 'Best value - save 17% with annual billing',
    features: [
      'Everything in Monthly',
      'Advanced analytics',
      'Priority support',
      '5GB storage',
      'Early access to new features'
    ],
    popular: true
  }
]

export default function SubscriptionPage() {
  const { user, hasActiveSubscription } = useAuth()
  const [loading, setLoading] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [changingPlan, setChangingPlan] = useState<string | null>(null)

  const currentPlan = user?.subscription
  const nextBillingDate = currentPlan?.nextBillingDate 
    ? new Date(currentPlan.nextBillingDate) 
    : null

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to article management features at the end of your billing period.')) {
      return
    }

    setCancelling(true)
    try {
      const response = await axiosInstance.post('/subscription/cancel')
      
      if (response.data.success) {
        toast.success('Subscription cancellation requested successfully')
        // Update local user data
        const userData = localStorage.getItem('user')
        if (userData) {
          const user = JSON.parse(userData)
          user.subscription.active = false
          localStorage.setItem('user', JSON.stringify(user))
        }
        window.location.reload()
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      toast.error('Failed to cancel subscription')
    } finally {
      setCancelling(false)
    }
  }

  const handleChangePlan = async (newPlanId: string) => {
    setChangingPlan(newPlanId)
    try {
      const response = await axiosInstance.post('/subscription/change-plan', {
        newPlan: newPlanId
      })

      if (response.data.success) {
        toast.success('Plan change requested successfully')
        // Update local user data
        const userData = localStorage.getItem('user')
        if (userData) {
          const user = JSON.parse(userData)
          user.subscription.plan = newPlanId
          localStorage.setItem('user', JSON.stringify(user))
        }
        window.location.reload()
      }
    } catch (error) {
      console.error('Error changing plan:', error)
      toast.error('Failed to change plan')
    } finally {
      setChangingPlan(null)
    }
  }

  const handleReactivate = async () => {
    setLoading(true)
    try {
      // Redirect to subscription page or handle reactivation
      window.location.href = '/subscribe'
    } catch (error) {
      console.error('Error reactivating:', error)
      toast.error('Failed to reactivate subscription')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your subscription</h2>
          <Button asChild>
            <a href="/auth/login">Login</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
          <p className="text-gray-600">Manage your article management subscription</p>
        </div>

        {/* Current Subscription Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              {hasActiveSubscription ? 'Your active subscription details' : 'No active subscription'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasActiveSubscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className="text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Active
                    </Badge>
                    <span className="text-lg font-semibold capitalize">
                      {currentPlan?.plan} Plan
                    </span>
                  </div>
                  {/* <p>Subscription ends on 12th September 2026</p> */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {currentPlan?.plan === 'monthly' ? '₦4,000' : '₦40,000'}
                    </p>
                    <p className="text-sm text-gray-600">per {currentPlan?.plan}</p>
                  </div>
                </div>

                {nextBillingDate && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Next billing: {nextBillingDate.toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancelSubscription}
                    disabled={cancelling}
                    className="flex items-center"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
                  </Button>
                  
                  <Button asChild>
                    <a href="/subscription?change=true">
                      <ArrowRightLeft className="h-4 w-4 mr-2" />
                      Change Plan
                    </a>
                  </Button>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTitle className="text-blue-800">Heads up!</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Cancelling will stop automatic renewals. You'll keep access until {nextBillingDate?.toLocaleDateString()}.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Active Subscription
                </h3>
                <p className="text-gray-600 mb-4">
                  You don't have an active subscription. Subscribe to access article management features.
                </p>
                <Button onClick={handleReactivate} disabled={loading}>
                  {loading ? 'Loading...' : 'Subscribe Now'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

       

        {/* Billing History */}
        {hasActiveSubscription && (
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your recent subscription payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Monthly Subscription</p>
                      <p className="text-sm text-gray-600">August 15, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦4,000</p>
                    <Badge className="text-xs">Paid</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Monthly Subscription</p>
                      <p className="text-sm text-gray-600">July 15, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦4,000</p>
                    <Badge  className="text-xs">Paid</Badge>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                View Full Billing History
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Support Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>We're here to help with your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Common Questions</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• How do I update my payment method?</li>
                  <li>• Can I get a refund?</li>
                  <li>• How do I change my plan?</li>
                  <li>• What happens when I cancel?</li>
                </ul>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" asChild>
                  <a href="mailto:support@yourdomain.com">Contact Support</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}