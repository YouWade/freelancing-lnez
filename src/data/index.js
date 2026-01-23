/**
 * 統一的資料匯出入口
 * 將所有 mock data 集中管理
 */

// 產品相關
export {
  PRODUCTS_DATA,
  PRODUCT_CATEGORIES,
  COLOR_OPTIONS,
  SIZE_OPTIONS,
  PRICE_RANGE,
} from './products';

// 使用者相關
export {
  USER_MOCK_DATA,
  USER_PROFILE_FIELDS,
  ADDRESS_FORM_FIELDS,
} from './user';

// 訂單相關
export {
  ORDERS_MOCK_DATA,
  ORDER_STATUS,
  ORDER_STATUS_TEXT,
  ORDER_STATUS_FILTERS,
  MY_ORDER_MENU,
} from './orders';

// 購物車相關
export {
  CART_MOCK_DATA,
  generateCartItemId,
  calculateCartSubtotal,
  calculateCartTotalQuantity,
  SHIPPING_FEE,
  calculateShippingFee,
} from './cart';

// 選單相關
export {
  TOOLS_MENU,
  MAIN_MENU,
  USER_MENU,
  FOOTER_MENU,
} from './menu';

// 付款相關
export {
  PAYMENT_METHODS,
  PAYMENT_METHOD_OPTIONS,
  SHIPPING_METHODS,
  SHIPPING_METHOD_OPTIONS,
  INVOICE_TYPES,
  INVOICE_OPTIONS,
  SAVED_PAYMENT_METHODS,
} from './payment';

// 向下相容：保留舊的 mockData 匯出
export * from './mockData';
