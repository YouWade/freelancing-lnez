import { Images } from '@assets';

/**
 * 購物車商品資料結構
 * @typedef {Object} CartItem
 * @property {string} id - 購物車項目 ID（唯一識別，可用 productId + color + size 組合）
 * @property {number} productId - 產品 ID
 * @property {string} name - 產品名稱
 * @property {string} image - 產品圖片
 * @property {number} price - 單價
 * @property {number} quantity - 數量
 * @property {string} color - 顏色
 * @property {string} size - 尺寸
 * @property {number} stock - 庫存數量
 * @property {boolean} selected - 是否被選中（用於結帳）
 * @property {Date} addedAt - 加入購物車時間
 */

// 購物車 Mock 資料
export const CART_MOCK_DATA = [
  {
    id: 'cart_1_white_M',
    productId: 1,
    name: '女士短版襯衫',
    image: Images.productImage1 || Images.productDefault,
    price: 590,
    quantity: 2,
    color: '白色',
    size: 'M',
    stock: 50,
    selected: true,
    addedAt: new Date('2025-01-20T10:30:00'),
  },
  {
    id: 'cart_2_cream_L',
    productId: 2,
    name: '優雅針織上衣',
    image: Images.productImage2 || Images.productDefault,
    price: 690,
    quantity: 1,
    color: '米白',
    size: 'L',
    stock: 35,
    selected: true,
    addedAt: new Date('2025-01-19T15:20:00'),
  },
  {
    id: 'cart_6_darkblue_M',
    productId: 6,
    name: '高腰牛仔褲',
    image: Images.productImage6 || Images.productDefault,
    price: 990,
    quantity: 1,
    color: '深藍',
    size: 'M',
    stock: 60,
    selected: true,
    addedAt: new Date('2025-01-18T14:10:00'),
  },
  {
    id: 'cart_8_white_L',
    productId: 8,
    name: '純棉 T 恤',
    image: Images.productImage8 || Images.productDefault,
    price: 390,
    quantity: 3,
    color: '白色',
    size: 'L',
    stock: 100,
    selected: false,
    addedAt: new Date('2025-01-17T11:45:00'),
  },
];

/**
 * 生成購物車項目 ID
 * @param {number} productId - 產品 ID
 * @param {string} color - 顏色
 * @param {string} size - 尺寸
 * @returns {string} 購物車項目 ID
 */
export const generateCartItemId = (productId, color, size) => {
  return `cart_${productId}_${color.toLowerCase().replace(/\s+/g, '')}_${size}`;
};

/**
 * 計算購物車小計
 * @param {CartItem[]} items - 購物車項目列表
 * @param {boolean} selectedOnly - 是否只計算選中的項目
 * @returns {number} 小計金額
 */
export const calculateCartSubtotal = (items, selectedOnly = true) => {
  return items
    .filter(item => !selectedOnly || item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * 計算購物車總數量
 * @param {CartItem[]} items - 購物車項目列表
 * @returns {number} 總數量
 */
export const calculateCartTotalQuantity = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

// 運費設定
export const SHIPPING_FEE = {
  FREE_THRESHOLD: 1000, // 滿額免運門檻
  STANDARD: 60, // 標準運費
  EXPRESS: 120, // 快速配送運費
};

/**
 * 計算運費
 * @param {number} subtotal - 小計金額
 * @param {string} shippingMethod - 配送方式（standard | express）
 * @returns {number} 運費
 */
export const calculateShippingFee = (subtotal, shippingMethod = 'standard') => {
  if (subtotal >= SHIPPING_FEE.FREE_THRESHOLD) {
    return 0;
  }
  return shippingMethod === 'express' ? SHIPPING_FEE.EXPRESS : SHIPPING_FEE.STANDARD;
};
