import { Images } from '@assets';

/**
 * 訂單資料結構
 * @typedef {Object} Order
 * @property {string} id - 訂單 ID
 * @property {string} status - 訂單狀態
 * @property {string} statusText - 訂單狀態文字
 * @property {number} totalPrice - 訂單總金額
 * @property {number} subtotal - 商品小計
 * @property {number} shippingFee - 運費
 * @property {number} discount - 折扣金額
 * @property {Object[]} products - 訂單商品列表（向下相容：保持使用 products）
 * @property {Object} shippingAddress - 收貨地址
 * @property {Object} paymentMethod - 付款方式
 * @property {string[]} actions - 可執行的操作
 * @property {Date} createdAt - 建立時間
 * @property {Date} paidAt - 付款時間
 * @property {Date} shippedAt - 出貨時間
 * @property {Date} deliveredAt - 送達時間
 */

// 訂單狀態
export const ORDER_STATUS = {
  PENDING_PAYMENT: 'pending_payment',
  PENDING_SHIPMENT: 'pending_shipment',
  PENDING_RECEIPT: 'pending_receipt',
  COMPLETED: 'completed',
  REFUND: 'refund',
  CANCELLED: 'cancelled',
};

// 訂單狀態文字
export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.PENDING_PAYMENT]: '待付款',
  [ORDER_STATUS.PENDING_SHIPMENT]: '待出貨',
  [ORDER_STATUS.PENDING_RECEIPT]: '待收貨',
  [ORDER_STATUS.COMPLETED]: '已完成',
  [ORDER_STATUS.REFUND]: '退貨/退款',
  [ORDER_STATUS.CANCELLED]: '取消',
};

// 訂單狀態篩選器
export const ORDER_STATUS_FILTERS = [
  { key: 'all', label: '全部訂單' },
  { key: ORDER_STATUS.PENDING_PAYMENT, label: ORDER_STATUS_TEXT[ORDER_STATUS.PENDING_PAYMENT] },
  { key: ORDER_STATUS.PENDING_SHIPMENT, label: ORDER_STATUS_TEXT[ORDER_STATUS.PENDING_SHIPMENT] },
  { key: ORDER_STATUS.PENDING_RECEIPT, label: ORDER_STATUS_TEXT[ORDER_STATUS.PENDING_RECEIPT] },
  { key: ORDER_STATUS.REFUND, label: ORDER_STATUS_TEXT[ORDER_STATUS.REFUND] },
  { key: ORDER_STATUS.CANCELLED, label: ORDER_STATUS_TEXT[ORDER_STATUS.CANCELLED] },
];

// 訂單 Mock 資料
export const ORDERS_MOCK_DATA = [
  {
    id: 'ORD20250121001',
    status: ORDER_STATUS.PENDING_RECEIPT,
    statusText: ORDER_STATUS_TEXT[ORDER_STATUS.PENDING_RECEIPT],
    totalPrice: 3540,
    subtotal: 3480,
    shippingFee: 60,
    discount: 0,
    products: [
      {
        id: 1,
        productId: 1,
        name: '女士短版襯衫',
        image: Images.productImage1 || Images.productDefault,
        price: 590,
        quantity: 1,
        color: '白色',
        size: 'M',
      },
      {
        id: 2,
        productId: 2,
        name: '優雅針織上衣',
        image: Images.productImage2 || Images.productDefault,
        price: 690,
        quantity: 1,
        color: '米白',
        size: 'L',
      },
      {
        id: 3,
        productId: 3,
        name: '休閒寬褲',
        image: Images.productImage3 || Images.productDefault,
        price: 790,
        quantity: 1,
        color: '卡其',
        size: 'M',
      },
      {
        id: 4,
        productId: 4,
        name: '條紋連身裙',
        image: Images.productImage4 || Images.productDefault,
        price: 890,
        quantity: 1,
        color: '黑白條紋',
        size: 'S',
      },
      {
        id: 5,
        productId: 5,
        name: '雪紡印花上衣',
        image: Images.productImage5 || Images.productDefault,
        price: 650,
        quantity: 1,
        color: '花卉印花',
        size: 'M',
      },
    ],
    shippingAddress: {
      recipientName: '王小明',
      phone: '0912-345-678',
      address: '台北市信義區信義路五段7號',
    },
    paymentMethod: {
      type: 'credit_card',
      label: '信用卡 **** 1234',
    },
    actions: ['review', 'refund', 'confirm'],
    createdAt: new Date('2025-01-19T10:30:00'),
    paidAt: new Date('2025-01-19T10:35:00'),
    shippedAt: new Date('2025-01-20T14:20:00'),
    deliveredAt: null,
  },
  {
    id: 'ORD20250120002',
    status: ORDER_STATUS.PENDING_PAYMENT,
    statusText: ORDER_STATUS_TEXT[ORDER_STATUS.PENDING_PAYMENT],
    totalPrice: 1240,
    subtotal: 1180,
    shippingFee: 60,
    discount: 0,
    products: [
      {
        id: 6,
        productId: 6,
        name: '高腰牛仔褲',
        image: Images.productImage6 || Images.productDefault,
        price: 990,
        quantity: 1,
        color: '深藍',
        size: 'M',
      },
      {
        id: 7,
        productId: 8,
        name: '純棉 T 恤',
        image: Images.productImage8 || Images.productDefault,
        price: 390,
        quantity: 1,
        color: '白色',
        size: 'L',
      },
    ],
    shippingAddress: {
      recipientName: '王小明',
      phone: '0912-345-678',
      address: '台北市信義區信義路五段7號',
    },
    paymentMethod: {
      type: 'atm',
      label: 'ATM 轉帳',
    },
    actions: ['pay', 'cancel'],
    createdAt: new Date('2025-01-20T16:45:00'),
    paidAt: null,
    shippedAt: null,
    deliveredAt: null,
  },
  {
    id: 'ORD20250118003',
    status: ORDER_STATUS.COMPLETED,
    statusText: ORDER_STATUS_TEXT[ORDER_STATUS.COMPLETED],
    totalPrice: 1830,
    subtotal: 1780,
    shippingFee: 60,
    discount: 10,
    products: [
      {
        id: 8,
        productId: 7,
        name: '針織開衫外套',
        image: Images.productImage7 || Images.productDefault,
        price: 1290,
        quantity: 1,
        color: '駝色',
        size: 'M',
      },
      {
        id: 9,
        productId: 8,
        name: '純棉 T 恤',
        image: Images.productImage8 || Images.productDefault,
        price: 390,
        quantity: 1,
        color: '黑色',
        size: 'L',
      },
    ],
    shippingAddress: {
      recipientName: '王小明',
      phone: '0912-345-678',
      address: '台北市信義區信義路五段7號',
    },
    paymentMethod: {
      type: 'credit_card',
      label: '信用卡 **** 1234',
    },
    actions: ['viewReview', 'buyAgain'],
    createdAt: new Date('2025-01-15T09:20:00'),
    paidAt: new Date('2025-01-15T09:25:00'),
    shippedAt: new Date('2025-01-16T11:30:00'),
    deliveredAt: new Date('2025-01-18T14:15:00'),
  },
  {
    id: 'ORD20250117004',
    status: ORDER_STATUS.PENDING_RECEIPT,
    statusText: ORDER_STATUS_TEXT[ORDER_STATUS.PENDING_RECEIPT],
    totalPrice: 2530,
    subtotal: 2470,
    shippingFee: 60,
    discount: 0,
    products: [
      {
        id: 10,
        productId: 10,
        name: '西裝外套',
        image: Images.productImage10 || Images.productDefault,
        price: 1590,
        quantity: 1,
        color: '黑色',
        size: 'L',
      },
      {
        id: 11,
        productId: 4,
        name: '條紋連身裙',
        image: Images.productImage4 || Images.productDefault,
        price: 890,
        quantity: 1,
        color: '藍白條紋',
        size: 'M',
      },
    ],
    shippingAddress: {
      recipientName: '王小明',
      phone: '0912-345-678',
      address: '新北市板橋區文化路一段188號',
    },
    paymentMethod: {
      type: 'credit_card',
      label: '信用卡 **** 1234',
    },
    actions: ['review', 'refund', 'confirm'],
    createdAt: new Date('2025-01-16T11:10:00'),
    paidAt: new Date('2025-01-16T11:15:00'),
    shippedAt: new Date('2025-01-17T10:40:00'),
    deliveredAt: null,
  },
  {
    id: 'ORD20250115005',
    status: ORDER_STATUS.PENDING_SHIPMENT,
    statusText: ORDER_STATUS_TEXT[ORDER_STATUS.PENDING_SHIPMENT],
    totalPrice: 1940,
    subtotal: 1880,
    shippingFee: 60,
    discount: 0,
    products: [
      {
        id: 12,
        productId: 14,
        name: '風衣外套',
        image: Images.productImage4 || Images.productDefault,
        price: 1890,
        quantity: 1,
        color: '卡其',
        size: 'M',
      },
    ],
    shippingAddress: {
      recipientName: '王小明',
      phone: '0912-345-678',
      address: '台北市信義區信義路五段7號',
    },
    paymentMethod: {
      type: 'credit_card',
      label: '信用卡 **** 1234',
    },
    actions: ['contact'],
    createdAt: new Date('2025-01-14T13:25:00'),
    paidAt: new Date('2025-01-14T13:30:00'),
    shippedAt: null,
    deliveredAt: null,
  },
];

// 我的訂單選單
export const MY_ORDER_MENU = [
  { key: ORDER_STATUS.PENDING_PAYMENT, label: '待付款', icon: 'creditCard' },
  { key: ORDER_STATUS.PENDING_SHIPMENT, label: '待出貨', icon: 'shoppingBag' },
  { key: ORDER_STATUS.PENDING_RECEIPT, label: '待收貨', icon: 'downloadPackage' },
  { key: ORDER_STATUS.COMPLETED, label: '已完成', icon: 'wavyCheck' },
];
