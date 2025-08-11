// components/ArticlesSection.tsx (or wherever this component is located)
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import One from '@/../public/images/article2.png';
import Two from '@/../public/images/image (1).png';
import Three from '@/../public/images/article1.png';
import Image from 'next/image';
import { getArticles } from '@/services/article';

interface Article {
  _id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  readTime: string;
  Image?: string;
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Get unique categories from articles
  const categories = [...new Set(articles.map(article => article.category))];
    
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
        setFilteredArticles(data);
        console.log("Fetched articles:", data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles based on search term and category
  useEffect(() => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto text-[#000]">
        <div className="text-center py-8">Loading articles...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto text-[#000]">
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto text-[#000]">
      <div className='flex items-center justify-between gap-4 py-6'>
        <div className='w-full md:w-[50%]'>
          <form onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder='Search articles....'  
              className='p-2 rounded-[16px] border border-[#E5E5E5] bg-white outline-[#E5E5E5] w-full'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        <div className="border border-[#E5E5E5] bg-white rounded-[16px] px-4 py-2 w-[200px]">
          <select 
            className='w-full bg-white outline-none text-[#000] text-[16px] font-[400]'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {filteredArticles.map((article) => (
          <Link 
            className='text-[#000]' 
            href={`/articles/${article._id}`} 
            key={article._id}
          >
            <article className="rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className='relative'>
                <Image
                  src={article.Image || One} // Use article image if available, fallback to One
                  alt={article.title || 'Article image'} 
                  className='rounded-t-md w-full h-48 object-cover' 
                  width={400}
                  height={200}
                />
                <span className="absolute top-8 left-8 text-sm font-semibold bg-[#fff] p-[4px] rounded-[10px]">
                  {article.category}
                </span>
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
            </article>
          </Link>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No articles found matching your criteria.
        </div>
      )}
    </section>
  );
}