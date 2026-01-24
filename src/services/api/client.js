import axios from 'axios';
import { CONFIG } from '@constants/config';

const apiClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: CONFIG.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - 自動添加 token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 清理認證相關的 storage
 */
const clearAuthStorage = () => {
  const storageKeys = ['token', 'user'];
  storageKeys.forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

/**
 * 觸發登出事件
 * 使用自定義事件通知應用程式需要登出
 */
const triggerLogout = () => {
  clearAuthStorage();
  window.dispatchEvent(new CustomEvent('auth:logout'));
};

// Response interceptor - 統一錯誤處理
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        // Token 過期或未授權
        triggerLogout();
        break;
      case 403:
        // 權限不足
        console.warn('權限不足,無法訪問此資源');
        break;
      case 404:
        // 資源不存在
        console.warn('請求的資源不存在');
        break;
      case 500:
      case 502:
      case 503:
        // 伺服器錯誤
        console.error('伺服器錯誤,請稍後再試');
        break;
      default:
        console.error('請求失敗:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
