// components/ArticlesSection.js
'use client';
import React from 'react';
import Link from 'next/link';
import One from '@/../public/images/image.png';
import Two from '@/../public/images/image (1).png';
import Image from 'next/image';

export default function ArticlesSection() {
    const articles = [
        {
            id: 1,
            category: 'Design',
            title: 'The Renaissance of African Design Thinking',
            description: 'How contemporary African designers are reshaping global creatives discourse through indigenous methodologies and modern innovation',
            author: 'Chioma Nnadi',
            readTime: '8 min read',
            Image: One
        },
        {
            id: 2,
            category: 'Design',
            title: 'The Renaissance of African Design Thinking',
            description: 'How contemporary African designers are reshaping global creatives discourse through indigenous methodologies and modern innovation',
            author: 'Chioma Nnadi',
            readTime: '8 min read',
            Image: Two
        },
        // Add more articles as needed
    ];

    return (
        <section className="max-w-6xl mx-auto text-[#000]">
            <div className='flex items-center justify-between px-6 py-6'>
                <div>
                    <h1 className="text-3xl font-bold">Latest Articles</h1>
                    <p className="text-gray-600 pt-2">In-depth analysis and cultural commentary</p>
                </div>
                <div className="mt-8 border border-[#E5E5E5] rounded-[12px] px-4 py-2">
                    <Link href="/articles" className="text-[#000] hover:text-blue-800 font-medium">
                        Read All articles &gt;
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 ">
                {articles.map((article) => (
                    <article key={article.id} className="rounded-lg shadow-md">
                        <div className='relative'>
                            <Image
                                src={article.Image} alt='' className='rounded-t-md ' />
                            <span className=" absolute top-8 left-8 text-sm font-semibold bg-[#fff] p-[4px] rounded-[10px]">{article.category}</span>
                        </div>
                        <div className='p-6'>
                            <h2 className="text-2xl font-bold mt-2 mb-3">{article.title}</h2>
                            <p className="text-gray-700 mb-4">{article.description}</p>
                       
                            <div className="flex items-center justify-between text-sm text-gray-500 mt-4 border-t pt-4 border-[#E5E5E5]">
                                <div>
                                    <span className="text-[26px] text-[#000000] font-[500]">{article.author}</span>
                                </div>
                                <div>
                                    <span className='text-[18px] font-[400]'>{article.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>


        </section>
    );
}