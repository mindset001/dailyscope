import React from 'react'
import Hero from './components/Hero'
import ArticlesSection from './components/Article'
import ProtectedRoute from '@/lib/ProtectedRoute'

function page() {
  return (
    // <ProtectedRoute>
       <main className='flex flex-col  gap-10'>
     <div className=' bg-[#f9f9f9] px-8 md:px-20 py-4 md:py-10 flex flex-col gap-16'>
       <Hero/>
        <ArticlesSection/>
     </div>
    
    </main>
    // {/* </ProtectedRoute> */}
  )
}

export default page