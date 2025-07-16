'use client';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ArticlesSection from '../components/Article';
import One from '@/../public/images/article2.png';

export default function ArticleDetail() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fromList = searchParams.get('fromList');
    if (fromList === 'true') {
      const data = sessionStorage.getItem('selectedArticle');
      if (data) {
        setArticle(JSON.parse(data));
      }
    }
  }, [searchParams]);

  if (!article) return <div className="text-center py-20">Loading article...</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-[55px] text-black font-[800] mt-4 mb-6 text-center">
          {article.title} with {article.author}
        </h1>
        <img
          src={One.src}
          alt={article.title}
          className="rounded-lg w-full"
        />
      </div>

      <p className="text-lg text-gray-700 mb-8 w-[70%]">{article.content}</p>

      {article.journey && (
        <div className="pr-10 my-8">
          <h2 className="text-[42px] font-[600]">{article.journey.title}</h2>
          <p className="text-justify font-[400] mt-4 text-[18px]">{article.journey.content}</p>
        </div>
      )}

      {/* Repeat for goals, process, projects etc. */}

      <ArticlesSection />
    </div>
  );
}
