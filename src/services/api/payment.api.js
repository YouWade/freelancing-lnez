import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';

export const paymentApi = {
  // 獲取付款方式
  getPaymentMethods: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PAYMENT_METHODS);
      return response;
    } catch (error) {
      console.error('Get payment methods error:', error);
      throw error;
    }
  },

  // 處理付款
  processPayment: async (paymentData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PROCESS_PAYMENT, paymentData);
      return response;
    } catch (error) {
      console.error('Process payment error:', error);
      throw error;
    }
  },
};
