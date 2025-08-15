// utils/getAuthContext.ts
'use client';

import { useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

export const getAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('getAuthContext must be used within AuthProvider');
  }
  return context;
};