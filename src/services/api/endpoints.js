export const API_ENDPOINTS = {
  // 認證
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  GOOGLE_LOGIN: '/auth/google',
  APPLE_LOGIN: '/auth/apple',

  // 產品
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  BEST_SELLERS: '/products/best-sellers',
  NEW_ARRIVALS: '/products/new-arrivals',
  SEARCH_PRODUCTS: '/products/search',

  // 購物車
  CART: '/cart',
  ADD_TO_CART: '/cart/add',
  UPDATE_CART_ITEM: (id) => `/cart/items/${id}`,
  REMOVE_CART_ITEM: (id) => `/cart/items/${id}`,

  // 訂單
  ORDERS: '/orders',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  CREATE_ORDER: '/orders/create',

  // 使用者
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile/update',
  USER_ORDERS: '/user/orders',

  // 付款
  PAYMENT_METHODS: '/payment/methods',
  PROCESS_PAYMENT: '/payment/process',
};
