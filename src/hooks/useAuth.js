import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';

/**
 * useAuth Hook
 * 提供認證相關的狀態和方法
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
