import React from 'react'
import Lock from '@/../public/images/lock.png'
import Ring from '@/../public/images/ring.png'
import People from '@/../public/images/people.png'
import Award from '@/../public/images/tabler_award.png'
import Image from 'next/image';

function Values() {

    const articles = [
        {
            id: 1,
            title: 'Authenticity',
            description: 'We believe in genuine voices and authentic storytelling that reflects real experiences and perspectives.',
            Image: Lock

        },
        {
            id: 2,
            title: 'Diversity',
            description: 'We believe in genuine voices and authentic storytelling that reflects real experiences and perspectives.',
            Image: Ring

        },
        {
            id: 3,
            title: 'Community',
            description: 'We foster meaningful connections between creators, thinkers, and cultural enthusiasts.',
            Image: People

        },
        {
            id: 4,
            title: 'Excellence',
            description: 'We maintain high editorial standards while supporting emerging and established voices alike.',
            Image: Award

        },
        // Add more articles as needed
    ];

    return (
        <main className='flex flex-col justify-center item-center text-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='font-bold text-[80px]'>
                    Our Values
                </h1>
                <p className=' w-[55%]  text-[18px] font-[400] pt-2'>These principles guide everything we do, from the stories we tell to the community we build.</p>
            </div>

            <div className='flex justify-center mt-6'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-16'>
                {articles.map((article) => (
                    <div key={article.id} className='flex flex-col items-center gap-4'>
                        <div className='bg-[#F0F1F4] rounded-[12px] h-[100px] w-[104px] flex items-center justify-center'>
                            <Image src={article.Image} alt='' className='h-[44px] w-[44px]'/>
                        </div>

                        <h1 className='font-bold text-[33.29px] '>{article.title}</h1>

                        <p className='font-[400] text-[18px] '>{article.description}</p>
                    </div>
                ))}
            </div>
            </div>
        </main>
    )
}

export default Values