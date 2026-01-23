import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';

export const cartApi = {
  // 獲取購物車
  getCart: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CART);
      return response;
    } catch (error) {
      console.error('Get cart error:', error);
      throw error;
    }
  },

  // 新增商品到購物車
  addToCart: async (item) => {
    try {
      const { productId, quantity, color, size } = item;
      const response = await apiClient.post(API_ENDPOINTS.ADD_TO_CART, {
        productId,
        quantity,
        color,
        size,
      });
      return response;
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  },

  // 更新購物車商品
  updateCartItem: async (itemId, updates) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.UPDATE_CART_ITEM(itemId), updates);
      return response;
    } catch (error) {
      console.error('Update cart item error:', error);
      throw error;
    }
  },

  // 刪除購物車商品
  removeCartItem: async (itemId) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.REMOVE_CART_ITEM(itemId));
      return response;
    } catch (error) {
      console.error('Remove cart item error:', error);
      throw error;
    }
  },

  // 清空購物車
  clearCart: async () => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CART);
      return response;
    } catch (error) {
      console.error('Clear cart error:', error);
      throw error;
    }
  },
};
