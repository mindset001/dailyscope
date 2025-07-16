// app/articles/[id]/page.js
import React from 'react';
import Image from 'next/image';
import { articles } from '../data/articles';
import ArticlesSection from '../components/Suggestions';



export default function ArticleDetail() {
  

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-[55px] font-[800] mt-4 mb-6 text-center">{articles[0].title} with {articles[0].author}</h1>
        <Image
          src={articles[0].Image}
          alt={articles[0].title}
          className="rounded-lg w-full"
        />
      </div>
      
      
      <p className="text-lg text-gray-700 mb-8 w-[70%]">{articles[0].history}</p>
      <div className='pr-10 my-8'>
        <h2 className='text-[42px] font-[600]'>{articles[0].journey?.title}</h2>
        <p className='text-justify font-[400] mt-4 text-[18px]'>{articles[0].journey?.content}</p>
      </div>

      <div className='pr-10 my-8'>
        <h2 className='text-[42px] font-[600]'>{articles[0].goals?.title}</h2>
        <p className='text-justify font-[400] mt-4 text-[18px]'>{articles[0].goals?.content}</p>
      </div>

      <div className='pr-10 my-8'>
        <h2 className='text-[42px] font-[600]'>{articles[0].process?.title}</h2>
        <p className='text-justify font-[400] mt-4 text-[18px]'>{articles[0].journey?.content}</p>
      </div>

      <div className='pr-10 my-8'>
        <h2 className='text-[42px] font-[600]'>{articles[0].process?.title}</h2>
        <p className='text-justify font-[400] mt-4 text-[18px]'>{articles[0].journey?.content}</p>
      </div>

      <div className='pr-10 my-8'>
        <h2 className='text-[42px] font-[600]'>{articles[0].projects?.title}</h2>
        <p className='text-justify font-[400] mt-4 text-[18px]'>{articles[0].projects?.items[0].description}</p>
                <p className='text-justify font-[400] mt-4 text-[18px]'>{articles[0].projects?.items[0].details}</p>
      </div>
      <div>
        <ArticlesSection/>
      </div>
    </div>
  );
}