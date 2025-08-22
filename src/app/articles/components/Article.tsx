// components/ArticlesSection.tsx (or wherever this component is located)
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import One from '@/../public/images/article2.png';
import Two from '@/../public/images/image (1).png';
import Three from '@/../public/images/article1.png';
import Image from 'next/image';
import { getArticles } from '@/services/article';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Article {
  _id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  readTime: string;
  Image?: string;
  cover?: string; // Assuming the API returns a cover image
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6); // You can adjust this number
  
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
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, selectedCategory, articles]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Pagination handlers
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

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

      {/* Results info */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {indexOfFirstArticle + 1}-{Math.min(indexOfLastArticle, filteredArticles.length)} of {filteredArticles.length} articles
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {currentArticles.map((article) => (
          <Link 
            className='text-[#000]' 
            href={`/articles/${article._id}`} 
            key={article._id}
          >
            <article className="rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className='relative'>
                <Image
                  src={article.cover || One} // Use article image if available, fallback to One
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 py-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === '...' ? (
                  <span className="px-2 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(pageNumber as number)}
                    className={`px-3 py-2 rounded-lg border ${
                      currentPage === pageNumber
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
            }`}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}