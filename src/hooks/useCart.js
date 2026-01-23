import { useContext } from 'react';
import { CartContext } from '@context/CartContext';

/**
 * useCart Hook
 * 提供購物車相關的狀態和方法
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
