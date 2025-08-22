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

// services/article.ts
export const trackArticleView = async (articleId: string) => {
  try {
    const response = await axiosInstance.post(`/articles/${articleId}/track-view`);
    return response.data;
  } catch (error) {
    console.error('Error tracking article view:', error);
    throw error;
  }
};



export const createArticles = async (formData: FormData) => {
  try {
    // Debug token before request
    const token = localStorage.getItem('authToken');
    console.log('Current token:', token ? '****' + token.slice(-4) : 'NO TOKEN');
    
    // Important: Set proper headers for file upload
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };
    
    const response = await axiosInstance.post('/articles', formData, config);
    
    console.log('Upload successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Upload error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    throw new Error(error.response?.data?.message || 'Failed to create article');
  }
};

export const updateArticle = async (articleId: string, data: {
  title: string;
  content: string;
  category: string;
}) => {
  try {
    const response = await axiosInstance.put(`/articles/${articleId}`, data); // Send data as second argument

    if (!response.data) {
      throw new Error('Failed to update article: No data returned');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating article:', error);
    if (error && typeof error === 'object' && 'response' in error) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Failed to update article');
    }
    throw new Error('Failed to update article');
  }
};

export const deleteArticle = async (articleId: string) => {
  const response = await axiosInstance.delete(`/articles/${articleId}`);

  if (!response) {
    throw new Error('Failed to delete article');
  }

  return response;
};