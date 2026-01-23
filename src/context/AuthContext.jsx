import { createContext, useState, useEffect } from 'react';
import { authApi } from '@services/api/auth.api';
import { userApi } from '@services/api/user.api';
import { tokenManager } from '@services/utils/tokenManager';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 初始化：檢查 token 並恢復使用者狀態
  useEffect(() => {
    const initAuth = async () => {
      const token = tokenManager.getToken();

      if (token && tokenManager.isValidTokenFormat(token)) {
        try {
          // 驗證 token 並獲取使用者資料
          const userData = await userApi.getProfile();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token validation failed:', error);
          tokenManager.removeToken();
          setUser(null);
          setIsAuthenticated(false);
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // 登入
  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, user: response.user };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  // 註冊
  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, user: response.user };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    }
  };

  // 登出
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      tokenManager.removeToken();
    }
  };

  // Google 登入
  const googleLogin = async (googleToken) => {
    try {
      const response = await authApi.googleLogin(googleToken);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, user: response.user };
    } catch (error) {
      console.error('Google login failed:', error);
      return { success: false, error: error.message };
    }
  };

  // Apple 登入
  const appleLogin = async (appleToken) => {
    try {
      const response = await authApi.appleLogin(appleToken);
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, user: response.user };
    } catch (error) {
      console.error('Apple login failed:', error);
      return { success: false, error: error.message };
    }
  };

  // 更新使用者資料
  const updateUser = async (userData) => {
    try {
      const response = await userApi.updateProfile(userData);
      setUser(response.user);
      return { success: true, user: response.user };
    } catch (error) {
      console.error('Update user failed:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    googleLogin,
    appleLogin,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
