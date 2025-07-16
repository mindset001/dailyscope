// services/authService.ts
import axiosInstance from '@/utils/axiosInstance';

export const signupUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post('/auth/signup', data);
  return res.data;
};
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/auth/login', data);
  return res.data;
};


