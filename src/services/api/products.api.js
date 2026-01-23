import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';

export const productsApi = {
  // 獲取所有產品
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS, { params });
      return response;
    } catch (error) {
      console.error('Get products error:', error);
      throw error;
    }
  },

  // 搜尋產品（支援篩選）
  search: async (searchParams) => {
    try {
      const { q, category, color, size, minPrice, maxPrice, page = 1, limit = 12 } = searchParams;
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_PRODUCTS, {
        params: { q, category, color, size, minPrice, maxPrice, page, limit }
      });
      return response;
    } catch (error) {
      console.error('Search products error:', error);
      throw error;
    }
  },

  // 獲取暢銷產品
  getBestSellers: async (limit = 10) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BEST_SELLERS, {
        params: { limit }
      });
      return response;
    } catch (error) {
      console.error('Get best sellers error:', error);
      throw error;
    }
  },

  // 獲取新品上架
  getNewArrivals: async (limit = 10) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.NEW_ARRIVALS, {
        params: { limit }
      });
      return response;
    } catch (error) {
      console.error('Get new arrivals error:', error);
      throw error;
    }
  },

  // 獲取產品詳情
  getDetail: async (productId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCT_DETAIL(productId));
      return response;
    } catch (error) {
      console.error('Get product detail error:', error);
      throw error;
    }
  },
};
