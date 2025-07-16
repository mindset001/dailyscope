import React from 'react'
import Lock from '@/../public/images/Rectangle 1.png'
import Ring from '@/../public/images/Rectangle 1 (1).png'
import People from '@/../public/images/Rectangle 1 (2).png'
import Award from '@/../public/images/tabler_award.png'
import Image from 'next/image';

function Team() {

    const articles = [
        {
            id: 1,
            title: 'Adam Lukat',
            category: 'Social media',
            description: 'Award-winning journalist with 15 years of experience in cultural commentary and arts writing.',
            Image: Lock

        },
        {
            id: 2,
              title: 'Adam Lukat',
            category: 'Social media',
            description: 'Award-winning journalist with 15 years of experience in cultural commentary and arts writing.',
            Image: Ring

        },
        {
            id: 3,
             title: 'Adam Lukat',
            category: 'Social media',
            description: 'Award-winning journalist with 15 years of experience in cultural commentary and arts writing.',
            Image: People

        },
     
        // Add more articles as needed
    ];

    return (
        <main className='flex flex-col justify-center item-center text-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='font-bold text-[80px]'>
                    Our Team
                </h1>
                <p className=' w-[55%]  text-[18px] font-[400] pt-2'>These principles guide everything we do, from the stories we tell to the community we build.</p>
            </div>

            <div className='flex justify-center mt-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {articles.map((article) => (
                    <div key={article.id} className='flex flex-col items-center gap-4 bg-white rounded-[20px]'>
                        <div className='rounded-t-[20px]'>
                            <Image src={article.Image} alt='' className='rounded-t-[20px]'/>
                        </div>

                       <div className='p-6 flex flex-col justify-center items-center'>
                         <h1 className='font-bold text-[33.29px] '>{article.title}</h1>

                        <div className='py-2 bg-[#F0F1F4] w-[50%] rounded-[20px] text-[16px] my-6'>
                            <p>{article.category}</p>
                        </div>

                        <p className='font-[400] text-[18px] '>{article.description}</p>
                       </div>
                    </div>
                ))}
            </div>
            </div>
        </main>
    )
}

export default Team