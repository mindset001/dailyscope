// components/ArticlesSection.js
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import One from '@/../public/images/image.png';
import Two from '@/../public/images/image (1).png';
import Image from 'next/image';
import { getArticles } from '@/services/article';

export default function ArticlesSection() {
       const [articles, setArticles] = useState<any[]>([]);
           const [loading, setLoading] = useState(true);
           const [error, setError] = useState('');
    
       useEffect(() => {
         const fetchArticles = async () => {
           try {
             const data = await getArticles();
             const spotlightArticles = data.filter(
               (article: any) => article.actionTag === "feat"
             );
             setArticles(spotlightArticles);
             console.log('Fetched articles:', spotlightArticles);
           } catch (err: any) {
             setError(err.message);
           } finally {
             setLoading(false);
           }
         };
       
         fetchArticles();
       }, []);
       

    return (
        <section className="max-w-6xl mx-auto text-[#000]">
            <div className='flex items-center justify-between px-6 py-6'>
                <div>
                    <h1 className="text-[14px] md:text-3xl font-bold">Latest Articles</h1>
                    <p className="text-[10px] md:text-[18px] text-gray-600 pt-2">In-depth analysis and cultural commentary</p>
                </div>
                <div className="mt-8 md:border  border-[#E5E5E5] rounded-[12px] px-4 py-2">
                    <Link href="/articles" className="flex gap-2 text-[10px] md:text-[18px] text-[#000] hover:text-blue-800 font-medium">
                        <p>Read All articles</p> <span className='hidden md:block'>&gt;</span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 ">
                {articles.map((article) => (
                    <article key={article.id} className="rounded-lg shadow-md">
                       <Link   href={`/articles/${article._id}`} >
                         <div className='relative'>
                            <Image
                                src={article.cover || One} alt='' className='rounded-t-md '  width={600}
                  height={200} />
                            <span className=" absolute top-8 left-8 text-sm font-semibold bg-[#fff] p-[4px] rounded-[10px]">{article.category}</span>
                        </div>
                        <div className='p-6'>
                            <h2 className="text-2xl font-bold mt-2 mb-3">{article.title}</h2>
                            <p className="text-gray-700 mb-4 line-clamp-3">{article.content}</p>
                       
                            <div className="flex items-center justify-between text-sm text-gray-500 mt-4 border-t pt-4 border-[#E5E5E5]">
                                <div>
                                    <span className="text-[26px] text-[#000000] font-[500]">{article.author}</span>
                                </div>
                                <div>
                                    <span className='text-[18px] font-[400]'>{article.readTime}</span>
                                </div>
                            </div>
                        </div>
                       </Link>

                       
                    </article>
                ))}
            </div>


        </section>
    );
}