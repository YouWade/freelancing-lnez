/**
 * Token 管理工具
 * 處理 token 的儲存、讀取和刪除
 */

const TOKEN_KEY = 'token';

export const tokenManager = {
  // 設定 token（根據 rememberMe 決定使用 localStorage 或 sessionStorage）
  setToken: (token, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
  },

  // 獲取 token（優先從 localStorage 讀取，再從 sessionStorage）
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  // 移除 token（從兩個 storage 都清除）
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },

  // 檢查 token 是否存在
  hasToken: () => {
    return !!(localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY));
  },

  // 驗證 token 格式（簡單的 JWT 格式檢查）
  isValidTokenFormat: (token) => {
    if (!token) return false;
    const parts = token.split('.');
    return parts.length === 3;
  },
};
