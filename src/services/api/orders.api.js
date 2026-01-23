import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';

export const ordersApi = {
  // 獲取所有訂單
  getOrders: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ORDERS, { params });
      return response;
    } catch (error) {
      console.error('Get orders error:', error);
      throw error;
    }
  },

  // 獲取訂單詳情
  getOrderDetail: async (orderId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ORDER_DETAIL(orderId));
      return response;
    } catch (error) {
      console.error('Get order detail error:', error);
      throw error;
    }
  },

  // 建立訂單
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CREATE_ORDER, orderData);
      return response;
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  },

  // 取消訂單
  cancelOrder: async (orderId) => {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.ORDER_DETAIL(orderId)}/cancel`);
      return response;
    } catch (error) {
      console.error('Cancel order error:', error);
      throw error;
    }
  },
};
