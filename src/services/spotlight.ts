// services/spotlightService.ts
import axiosInstance from '@/utils/axiosInstance';


export const getSpotlights = async () => {
  const res = await axiosInstance.get('/spotlights');
  return res.data;
};