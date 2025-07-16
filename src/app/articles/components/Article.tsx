// components/ArticlesSection.js
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import One from '@/../public/images/article2.png';
import Two from '@/../public/images/image (1).png';
import Three from '@/../public/images/article1.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getArticles } from '@/services/article';

export default function ArticlesSection() {
    const router = useRouter();
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await getArticles();
                setArticles(data);
                console.log("Fetched articles:", data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleArticleClick = (article: any) => {
        router.push(`/articles/${article._id}?fromList=true`, { scroll: true });
        sessionStorage.setItem("selectedArticle", JSON.stringify(article));
    };
    return (
        <section className="max-w-6xl mx-auto text-[#000]">
            <div className='flex items-center justify-between  py-6'>
                <div className='w-full md:w-[50%]'>
                    <form action="">
                        <input type="text" placeholder='Search articles....' className='p-2 rounded-[16px] border border-[#E5E5E5] bg-white outline-[#E5E5E5] w-full' />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 ">
                {articles.map((article) => (
                    <div className='text-[#000]' onClick={() => handleArticleClick(article)} key={article._id}>
                        <article key={article.id} className="rounded-lg shadow-md">
                            <div className='relative'>
                                <Image
                                    src={One} alt='' className='rounded-t-md ' />
                                <span className=" absolute top-8 left-8 text-sm font-semibold bg-[#fff] p-[4px] rounded-[10px]">{article.category}</span>
                            </div>
                            <div className='p-6'>
                                <h2 className="text-2xl font-bold mt-2 mb-3">{article.title}</h2>
                                <p className="text-gray-700 mb-4">{article.content}</p>

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
                    </div>
                ))}
            </div>


        </section>
    );
}