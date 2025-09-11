import Create from '@/app/create/page'
import ProtectedRoute from '@/lib/ProtectedRoute'
import React from 'react'

function page() {
  return (
    <div>
       <ProtectedRoute requireSubscription subscriptionRedirect="/dashboard/subscription">
        <Create/>
       </ProtectedRoute>
       
    </div>
  )
}

export default page