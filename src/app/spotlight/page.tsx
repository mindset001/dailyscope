import React from 'react'
import Hero from './components/Hero'
import SpotlightCard from './components/SpotlightCard'
import Spotlight from './components/Spotlight'

function page() {
  return (
     <main className='flex flex-col  gap-10'>
         <div className=' bg-[#f9f9f9] px-8 md:px-20 py-4 md:py-10 flex flex-col gap-16'>
           <Hero/>
           <Spotlight/>
         </div>
       
        </main>
  )
}

export default page