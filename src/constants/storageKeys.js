/**
 * LocalStorage 和 SessionStorage key 常量
 */

export const STORAGE_KEYS = {
  // 認證相關
  TOKEN: 'token',
  USER: 'user',
  REMEMBER_ME: 'rememberMe',

  // 購物車相關
  CART: 'cart',
  CART_COUNT: 'cartCount',

  // 使用者偏好
  THEME: 'theme',
  LANGUAGE: 'language',

  // 搜尋歷史
  SEARCH_HISTORY: 'searchHistory',

  // 瀏覽歷史
  VIEW_HISTORY: 'viewHistory',
};

export const STORAGE_EXPIRY = {
  TOKEN: 7 * 24 * 60 * 60 * 1000, // 7 天
  CART: 30 * 24 * 60 * 60 * 1000, // 30 天
  SEARCH_HISTORY: 7 * 24 * 60 * 60 * 1000, // 7 天
};
