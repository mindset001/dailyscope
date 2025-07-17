import React from 'react'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Story from './components/Story'
import Values from './components/Values'
import What from './components/What'
import Impact from './components/Impact'
import Team from './components/Team'

function page() {
  return (
    <main className='flex flex-col  gap-16'>
     <div className=' bg-[#f9f9f9] p-4 md:p-20 flex flex-col gap-16'>
       <Hero/>
      <Mission/>
      <Story/>
      {/* <Values/> */}
      {/* <Team/> */}
    {/* <Impact/> */}
     </div>
     <div className='p-20'>
  <What/>
     </div>
    </main>
  )
}

export default page