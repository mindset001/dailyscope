// components/ArticlesSection.js
'use client';
import React from 'react';
import Link from 'next/link';
import One from '@/../public/images/image (2).png';
import Two from '@/../public/images/image (3).png';
import Three from '@/../public/images/image (4).png';
import Image from 'next/image';

export default function Spotlight() {
    const articles = [
        {
            id: 1,
            title: 'Digital art in voices',
            author: 'Adunni Olorunipa',
            Image: One
        },
        {
            id: 2,
            title: 'Digital art in voices',
            author: 'Adunni Olorunipa',
            Image: Two
        },
         {
            id: 3,
            title: 'Digital art in voices',
            author: 'Adunni Olorunipa',
            Image: Three
        },
        // Add more articles as needed
    ];

    return (
        <section className="max-w-6xl mx-auto ">
            <div className='flex items-center justify-between px-6 py-6'>
                <div>
                    <h1 className="text-[14px] text-3xl font-bold">Featured Spotlight</h1>
                    <p className="text-[10px] text-gray-600 pt-2">Celebrating creators, thinkers, and cultural innovators</p>
                </div>
                <div className="mt-8 md:border border-[#E5E5E5] rounded-[12px] md:px-4 md:py-2">
                    <Link href="/articles" className="text-[10px] text-[#000] hover:text-blue-800 font-medium">
                        See More <span className='hidden md:block'>&gt;</span>
                    </Link>
                </div>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 ">
                {articles.map((article) => (
                    <article key={article.id} className="rounded-lg shadow-md">
                        <div>
                            <Image
                                src={article.Image} alt='' className='rounded-t-md ' />
                        </div>
                        <div className='p-4'>
                            <h2 className="text-2xl font-bold mt-2 mb-3">{article.title}</h2>
                       
                            <div className="flex items-center justify-between text-sm text-gray-500 mt-4 ">
                                <div>
                                    <span className="font-[400] text-[18px] text-[#000000]">by {article.author}</span>
                                </div>
                               
                            </div>
                        </div>
                    </article>
                ))}
            </div>


        </section>
    );
}