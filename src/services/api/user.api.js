import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';

export const userApi = {
  // 獲取使用者資料
  getProfile: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER_PROFILE);
      return response;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // 更新使用者資料
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, profileData);
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // 獲取使用者訂單
  getUserOrders: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER_ORDERS, { params });
      return response;
    } catch (error) {
      console.error('Get user orders error:', error);
      throw error;
    }
  },
};
