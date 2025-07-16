import React from 'react'
import Lock from '@/../public/images/lock.png'
import Ring from '@/../public/images/ring.png'
import People from '@/../public/images/people.png'
import Award from '@/../public/images/tabler_award.png'
import Image from 'next/image';

function Impact() {

    const articles = [
        {
            id: 1,
            title: '500',
            description: 'Featured Artists',
            Image: Lock

        },
        {
            id: 2,
            title: '1,200',
            description: 'Published Articles',
            Image: Ring

        },
        {
            id: 3,
            title: '50',
            description: 'Cultural Events',
            Image: People

        },
        {
            id: 4,
            title: '10,000',
            description: 'Community Member'
         

        },
        // Add more articles as needed
    ];

    return (
        <main className='flex flex-col justify-center item-center text-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='font-bold text-[80px]'>
                    Our Impact
                </h1>
                <p className=' w-[55%]  text-[18px] font-[400] pt-2'>Numbers that reflect our growing community and the stories we've helped share across the globe.</p>
            </div>

            <div className='flex justify-center mt-6'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-16'>
                {articles.map((article) => (
                    <div key={article.id} className='flex flex-col items-center '>
                       

                        <h1 className='font-bold text-[50px] '>{article.title}+</h1>

                        <p className='font-[400] text-[18px] '>{article.description}</p>
                    </div>
                ))}
            </div>
            </div>
        </main>
    )
}

export default Impact