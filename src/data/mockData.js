import { Images } from '@assets';

export const USER_MOCK_DATA = {
  id: 1,
  name: '王小明',
  avatar: null,
  email: 'test@example.com',
  phone: '0912-345-678',
};

export const ORDER_STATUS = {
  PENDING_PAYMENT: '待付款',
  PENDING_SHIPMENT: '待出貨',
  PENDING_RECEIPT: '待收貨',
  COMPLETED: '已完成',
  REFUND: '退貨/退款',
  CANCELLED: '取消',
};

export const ORDER_STATUS_FILTERS = [
  { key: 'all', label: '全部訂單' },
  { key: 'pending_payment', label: '待付款' },
  { key: 'pending_shipment', label: '待出貨' },
  { key: 'pending_receipt', label: '待收貨' },
  { key: 'refund', label: '退貨/退款' },
  { key: 'cancelled', label: '取消' },
];

export const ORDERS_MOCK_DATA = [
  {
    id: '12345678',
    status: 'pending_receipt',
    statusText: ORDER_STATUS.PENDING_RECEIPT,
    totalPrice: 590,
    products: [
      { id: 1, image: Images.productImage1, price: 590, quantity: 1 },
      { id: 2, image: Images.productImage2, price: 590, quantity: 1 },
      { id: 3, image: Images.productImage3, price: 590, quantity: 1 },
      { id: 4, image: Images.productImage4, price: 590, quantity: 1 },
      { id: 4, image: Images.productImage4, price: 590, quantity: 1 },
      { id: 4, image: Images.productImage4, price: 590, quantity: 1 },
    ],
    actions: ['review', 'refund', 'confirm'],
  },
  {
    id: '12345679',
    status: 'pending_payment',
    statusText: ORDER_STATUS.PENDING_PAYMENT,
    totalPrice: 590,
    products: [
      { id: 5, image: Images.productImage5, price: 590, quantity: 1 },
      { id: 6, image: Images.productImage6, price: 590, quantity: 1 },
    ],
    actions: ['edit', 'cancel'],
  },
  {
    id: '12345680',
    status: 'completed',
    statusText: ORDER_STATUS.COMPLETED,
    totalPrice: 590,
    products: [
      { id: 7, image: Images.productImage7, price: 590, quantity: 1 },
    ],
    actions: ['viewReview', 'buyAgain'],
  },
  {
    id: '12345681',
    status: 'pending_receipt',
    statusText: ORDER_STATUS.PENDING_RECEIPT,
    totalPrice: 590,
    products: [
      { id: 8, image: Images.productImage8, price: 590, quantity: 1 },
      { id: 9, image: Images.productImage9, price: 590, quantity: 1 },
      { id: 10, image: Images.productImage10, price: 590, quantity: 1 },
      { id: 1, image: Images.productImage1, price: 590, quantity: 1 },
    ],
    actions: ['review', 'refund', 'confirm'],
  },
  {
    id: '12345682',
    status: 'pending_shipment',
    statusText: ORDER_STATUS.PENDING_SHIPMENT,
    totalPrice: 1280,
    products: [
      { id: 2, image: Images.productImage2, price: 640, quantity: 1 },
      { id: 3, image: Images.productImage3, price: 640, quantity: 1 },
    ],
    actions: ['edit', 'cancel'],
  },
  {
    id: '12345683',
    status: 'completed',
    statusText: ORDER_STATUS.COMPLETED,
    totalPrice: 890,
    products: [
      { id: 4, image: Images.productImage4, price: 590, quantity: 1 },
      { id: 5, image: Images.productImage5, price: 590, quantity: 1 },
      { id: 6, image: Images.productImage6, price: 590, quantity: 1 },
    ],
    actions: ['viewReview', 'buyAgain'],
  },
  {
    id: '12345684',
    status: 'pending_payment',
    statusText: ORDER_STATUS.PENDING_PAYMENT,
    totalPrice: 2350,
    products: [
      { id: 7, image: Images.productImage7, price: 470, quantity: 1 },
      { id: 8, image: Images.productImage8, price: 470, quantity: 1 },
      { id: 9, image: Images.productImage9, price: 470, quantity: 1 },
      { id: 10, image: Images.productImage10, price: 470, quantity: 1 },
      { id: 1, image: Images.productImage1, price: 470, quantity: 1 },
    ],
    actions: ['edit', 'cancel'],
  },
  {
    id: '12345685',
    status: 'pending_receipt',
    statusText: ORDER_STATUS.PENDING_RECEIPT,
    totalPrice: 450,
    products: [
      { id: 2, image: Images.productImage2, price: 450, quantity: 1 },
    ],
    actions: ['review', 'refund', 'confirm'],
  },
];

// DEPRECATED: 已改用 PRODUCTS_DATA (src/data/products.js)
// 此資料已不再使用，保留僅供參考
// export const PRODUCTS_MOCK_DATA = Array(16).fill(null).map((_, index) => ({
//   id: index + 1,
//   title: '女士短版襯衫',
//   price: '$590',
//   image: Images[`productImage${(index % 10) + 1}`] || Images.productDefault,
// }));

export const MY_ORDER_MENU = [
  { key: 'pending_payment', label: '待付款', icon: 'creditCard' },
  { key: 'pending_shipment', label: '待出貨', icon: 'shoppingBag' },
  { key: 'pending_receipt', label: '待收貨', icon: 'downloadPackage' },
  { key: 'completed', label: '已完成', icon: 'wavyCheck' },
];

export const TOOLS_MENU = [
  { key: 'favorites', label: '我的收藏', icon: 'heart02' },
  { key: 'history', label: '歷史紀錄', icon: 'bookOpen' },
  { key: 'coupons', label: '優惠券', icon: 'ticketVoucher' },
  { key: 'payment', label: '付款方式', icon: 'puzzle' },
  { key: 'reviews', label: '評價', icon: 'star' },
  { key: 'myReviews', label: '我的評論', icon: 'chatDots' },
  { key: 'address', label: '收貨地址', icon: 'mapPin' },
];
