import React from 'react'
import Man from '@/../public/images/man.png'
import Image from 'next/image'

function Story() {
    return (
        <main className='flex flex-col md:flex-row justify-betweenp-10 gap-10'>
            <div className='w-1/2'>
                <Image src={Man} alt=''/>
            </div>
            <div className='w-1/2 flex flex-col gap-4 mt-10'>
                <h1 className='font-bold text-[33px] text-right'>
                    Our Story
                </h1>
                <p className=' text-[18px] font-[400] pt-4 text-justify'> The Daily Scope was born from a simple observation: the most compelling stories often come from voices that haven't been traditionally amplified. Founded in 2023, we set out to create a space where artistic expression meets thoughtful analysis.</p>
                <p className=' text-[18px] font-[400] pt-4 text-justify'>
                    What started as a small collective of writers and creatives has grown into a vibrant community of storytellers, visual artists, critics, and cultural enthusiasts. Our platform has become a trusted source for discovering emerging talent while providing established voices with a space for experimentation and dialogue.</p>
                <p className=' text-[18px] font-[400] pt-4 text-justify'>Today, we continue to evolve, always staying true to our core belief that culture is not static—it's a living, breathing conversation that we all participate in, one story at a time</p>
            </div>
        </main>
    )
}

export default Story