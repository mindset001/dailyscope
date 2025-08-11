// services/articleService.ts
import axiosInstance from '@/utils/axiosInstance';

export const getArticles = async () => {
  const res = await axiosInstance.get('/articles');
  return res.data;
};

export const singleArticles = async (articleId: string) => {
  const res = await axiosInstance.get(`/articles/${articleId}`);
  return res.data;
};


export const getUserArticles = async (userId: string) => {
  const response = await axiosInstance.get(`/articles/user/${userId}`);
  return response.data;
};



export const createArticles = async (formData: FormData) => {
  try {
    // Debug token before request
    const token = localStorage.getItem('token');
    console.log('Current token:', token ? '****' + token.slice(-4) : 'NO TOKEN');
    
    const response = await axiosInstance.post('/articles', formData);
    
    console.log('Request headers:', {
      Authorization: response.config.headers?.Authorization
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers
    });
    
    throw new Error(error.response?.data?.message || 'Failed to create article');
  }
};