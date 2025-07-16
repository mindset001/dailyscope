'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Lady from '../../../../public/images/lady.png'
import { getSpotlights } from '@/services/spotlight';

// Mock data for the 9 spotlight items
// const spotlightItems = [
//   {
//     id: 1,
//     title: 'Digital art in voices',
//     author: 'By Adam Lukat',
//     location: 'Lagos, Nigeria',
//     tags: ['Digital Art', 'Modern'],
//     image: Lady
//   },
//   {
//     id: 2,
//     title: 'Urban photography',
//     author: 'By Sarah Johnson',
//     location: 'New York, USA',
//     tags: ['Photography', 'Urban'],
//     image: Lady
//   },
//   {
//     id: 3,
//     title: 'Abstract expressions',
//     author: 'By Michael Chen',
//     location: 'Tokyo, Japan',
//     tags: ['Abstract', 'Contemporary'],
//     image: Lady
//   },
//   {
//     id: 4,
//     title: 'Nature landscapes',
//     author: 'By Emma Wilson',
//     location: 'Sydney, Australia',
//     tags: ['Landscape', 'Nature'],
//     image: Lady
//   },
//   {
//     id: 5,
//     title: 'Portrait series',
//     author: 'By David Kim',
//     location: 'Seoul, Korea',
//     tags: ['Portrait', 'People'],
//     image: Lady
//   },
//   {
//     id: 6,
//     title: 'Street fashion',
//     author: 'By Lisa Rodriguez',
//     location: 'Paris, France',
//     tags: ['Fashion', 'Street'],
//     image: Lady
//   },
//   {
//     id: 7,
//     title: 'Minimalist designs',
//     author: 'By James White',
//     location: 'Berlin, Germany',
//     tags: ['Minimalist', 'Design'],
//     image: Lady
//   },
//   {
//     id: 8,
//     title: 'Wildlife photography',
//     author: 'By Olivia Brown',
//     location: 'Nairobi, Kenya',
//     tags: ['Wildlife', 'Nature'],
//     image: Lady
//   },
//   {
//     id: 9,
//     title: 'Conceptual art',
//     author: 'By Thomas Lee',
//     location: 'London, UK',
//     tags: ['Conceptual', 'Modern'],
//     image: Lady
//   }
// ];

function Spotlight() {

  const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
      
   useEffect(() => {
      const fetchArticles = async () => {
        try {
          const data = await getSpotlights();
          setArticles(data);
          console.log("Fetched spotlight:", data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchArticles();
    }, []);
  return (
    <main className="container mx-auto px-4 py-8">
         <div className='flex items-center justify-between  py-6'>
                <div className='w-full md:w-[50%]'>
                    <form action="">
                        <input type="text" placeholder='Search articles....'  className='p-2 rounded-[16px] border border-[#E5E5E5] bg-white outline-[#E5E5E5] w-full'/>
                    </form>
                </div>
                <div className="border border-[#E5E5E5] bg-white rounded-[16px] px-4 py-2 w-[200px]">
                    <select name="" id="" className='w-full bg-white outline-none bg-white text-[#000] text-[16px] font-[400]'>
                        <option value="">All Categories</option>
                        <option value="">Design</option>
                        <option value="">Design</option>
                        <option value="">Design</option>
                        <option value="">Design</option>
                    </select>
                </div>
            </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item) => (
          <div key={item.id} className="shadow-md rounded-[16px] hover:shadow-lg transition-shadow duration-300">
            <div className='relative'>
              <Image 
                src={Lady} 
                alt={item.title} 
                className='rounded-t-[16px] w-full h-64 object-cover'
              />
              <div className='absolute bottom-10 left-10'>
                <h1 className='text-[24px] font-[500] text-white'>{item.title}</h1>
                <p className='text-[14px] font-[500] text-white'>{item.author}</p>
              </div>
            </div>

            <div className='bg-white p-4 rounded-b-[16px]'>
              <div className='mt-4'>
                <p className="text-gray-600">{item.location}</p>
              </div>

              <div className='flex gap-2 mt-4 flex-wrap'>
                {item.category.map((tag:any) => (
                  <div key={tag} className='border border-[#E5E5E5] px-3 py-1 rounded-[16px]'>
                    <p className="text-sm text-gray-700">{tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Spotlight