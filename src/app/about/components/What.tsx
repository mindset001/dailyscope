
import React from 'react'
import Lock from '@/../public/images/lock.png'
import Ring from '@/../public/images/light.png'
import People from '@/../public/images/person.png'
import Award from '@/../public/images/tabler_award.png'
import Image from 'next/image';

function What() {

    const articles = [
        {
            id: 1,
            title: 'Editorial Excellence',
            description: 'We publish in-depth articles, interviews, and cultural analysis that goes beyond surface-level coverage.',
            Image: Award

        },
        {
            id: 2,
            title: 'Artist Spotlights',
            description: 'We showcase emerging and established artists, giving them a platform to share their stories and work.',
            Image: People

        },
        {
            id: 3,
            title: 'Community Building',
            description: 'We foster connections through events, workshops, and exclusive member experiences.',
            Image: Ring

        },
       
        // Add more articles as needed
    ];

    return (
        <main className='flex flex-col justify-center item-center text-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='w-full font-bold text-[40px] md:text-[80px]'>
                   What we do
                </h1>
                {/* <p className=' w-[55%]  text-[18px] font-[400] pt-2'>These principles guide everything we do, from the stories we tell to the community we build.</p> */}
            </div>

            <div className='w-full flex justify-center mt-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-16'>
                {articles.map((article) => (
                    <div key={article.id} className='flex flex-col items-center gap-4'>
                        <div className='bg-[#F0F1F4] rounded-[12px] h-[100px] w-[104px] flex items-center justify-center'>
                            <Image src={article.Image} alt='' className='h-[44px] w-[44px]'/>
                        </div>

                        <h1 className='font-semiBold text-[28px] '>{article.title}</h1>

                        <p className='font-regular text-[18px] '>{article.description}</p>
                    </div>
                ))}
            </div>
            </div>
        </main>
    )
}

export default What