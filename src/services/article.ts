// services/articleService.ts
import axiosInstance from '@/utils/axiosInstance';

export const getArticles = async () => {
  const res = await axiosInstance.get('/articles');
  return res.data;
};
