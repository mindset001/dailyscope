// app/articles/[id]/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { singleArticles } from '@/services/article';
import ArticlesSection from '../components/Article';

// Updated interface to match your actual API response
interface Article {
  _id: string;
  title: string;
  authorName: string; // Changed from 'author' to match API
  images: string[]; // Changed from 'Image' to match API (array of images)
  content: string; // Changed from 'history' to match API
  category: string;
  createdAt: string;
  updatedAt: string;
  // Optional sections (in case your API sometimes returns these)
  journey?: {
    title: string;
    content: string;
  };
  goals?: {
    title: string;
    content: string;
  };
  process?: {
    title: string;
    content: string;
  };
  projects?: {
    title: string;
    items: Array<{
      description: string;
      details: string;
    }>;
  };
}

export default function ArticleDetail() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchArticle = async () => {
      if (!params.id) return;
      
      try {
        setLoading(true);
        const articleData = await singleArticles(params.id as string);
        console.log("Fetched single article:", articleData.data);
        setArticle(articleData.data);
        console.log("Article data 22:", articleData);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Loading skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-16 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-8">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-red-600">{error}</h1>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-[55px] font-[800] mt-4 mb-6 text-center">
          {article.title} by {article.authorName}
        </h1>
        
        {/* Handle images array - show first image if available */}
        {article.images && article.images.length > 0 ? (
          <Image
            src={article.images[0]}
            alt={article.title}
            width={1200}
            height={630}
            className="rounded-lg w-full h-auto object-cover"
            priority
          />
        ) : (
          // Placeholder if no image
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>

      {/* Article Content Sections */}
      <div className="space-y-12">
        {/* Main content section */}
        {article.content && (
          <div className="pr-10 my-8">
            <h2 className="text-[42px] font-[600] mb-4">About</h2>
            <p className="text-lg text-gray-700 mb-8 w-[70%] mx-auto text-justify">
              {article.content}
            </p>
          </div>
        )}

        {/* Category and metadata */}
        <div className="pr-10 my-8">
          <h2 className="text-[42px] font-[600] mb-4">Details</h2>
          <div className="space-y-2 text-[18px]">
            <p><strong>Category:</strong> {article.category}</p>
            <p><strong>Author:</strong> {article.authorName}</p>
            <p><strong>Published:</strong> {new Date(article.createdAt).toLocaleDateString()}</p>
            {article.updatedAt !== article.createdAt && (
              <p><strong>Updated:</strong> {new Date(article.updatedAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        {/* Optional sections (if your API sometimes returns these) */}
        {article.journey && (
          <section className="pr-10 my-8">
            <h2 className="text-[42px] font-[600]">{article.journey.title}</h2>
            <p className="text-justify font-[400] mt-4 text-[18px]">
              {article.journey.content}
            </p>
          </section>
        )}

        {article.goals && (
          <section className="pr-10 my-8">
            <h2 className="text-[42px] font-[600]">{article.goals.title}</h2>
            <p className="text-justify font-[400] mt-4 text-[18px]">
              {article.goals.content}
            </p>
          </section>
        )}

        {article.process && (
          <section className="pr-10 my-8">
            <h2 className="text-[42px] font-[600]">{article.process.title}</h2>
            <p className="text-justify font-[400] mt-4 text-[18px]">
              {article.process.content}
            </p>
          </section>
        )}

        {article.projects && (
          <section className="pr-10 my-8">
            <h2 className="text-[42px] font-[600]">{article.projects.title}</h2>
            {article.projects.items?.map((item, index) => (
              <div key={index} className="mt-4">
                <p className="text-justify font-[400] text-[18px]">
                  {item.description}
                </p>
                <p className="text-justify font-[400] mt-2 text-[18px]">
                  {item.details}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Suggested Articles */}
      <div className="mt-16">
        <ArticlesSection />
      </div>
    </div>
  );
}