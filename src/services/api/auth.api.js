import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';

export const authApi = {
  // 登入
  login: async (credentials) => {
    try {
      const { email, password, rememberMe } = credentials;
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      // 根據 rememberMe 決定儲存位置
      const storage = rememberMe ? localStorage : sessionStorage;
      if (response.token) {
        storage.setItem('token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // 註冊
  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);

      // 註冊成功後自動登入，將 token 儲存到 sessionStorage
      if (response.token) {
        sessionStorage.setItem('token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // 登出
  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.LOGOUT);

      // 清除本地儲存的 token
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Google 登入
  googleLogin: async (googleToken) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.GOOGLE_LOGIN, {
        token: googleToken,
      });

      // Google 登入預設使用 localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  },

  // Apple 登入
  appleLogin: async (appleToken) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.APPLE_LOGIN, {
        token: appleToken,
      });

      // Apple 登入預設使用 localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Apple login error:', error);
      throw error;
    }
  },
};
