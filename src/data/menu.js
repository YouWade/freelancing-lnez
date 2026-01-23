/**
 * 選單相關資料
 */

// 工具選單
export const TOOLS_MENU = [
  { key: 'favorites', label: '我的收藏', icon: 'heart02' },
  { key: 'history', label: '歷史紀錄', icon: 'bookOpen' },
  { key: 'coupons', label: '優惠券', icon: 'ticketVoucher' },
  { key: 'payment', label: '付款方式', icon: 'puzzle' },
  { key: 'reviews', label: '評價', icon: 'star' },
  { key: 'myReviews', label: '我的評論', icon: 'chatDots' },
  { key: 'address', label: '收貨地址', icon: 'mapPin' },
];

// 主導航選單
export const MAIN_MENU = [
  { key: 'home', label: '首頁', path: '/' },
  { key: 'new', label: '新品上架', path: '/search?category=new' },
  { key: 'bestseller', label: '暢銷商品', path: '/search?category=bestseller' },
  { key: 'sale', label: '特價優惠', path: '/search?category=sale' },
];

// 使用者選單
export const USER_MENU = [
  { key: 'profile', label: '個人資料', path: '/user', icon: 'user' },
  { key: 'orders', label: '我的訂單', path: '/user/orders', icon: 'shoppingBag' },
  { key: 'favorites', label: '我的收藏', path: '/user/favorites', icon: 'heart02' },
  { key: 'coupons', label: '優惠券', path: '/user/coupons', icon: 'ticketVoucher' },
  { key: 'settings', label: '帳戶設定', path: '/user/settings', icon: 'settings' },
  { key: 'logout', label: '登出', path: '/logout', icon: 'logout' },
];

// 頁腳選單
export const FOOTER_MENU = {
  about: {
    title: '關於我們',
    items: [
      { key: 'company', label: '公司簡介', path: '/about/company' },
      { key: 'team', label: '團隊介紹', path: '/about/team' },
      { key: 'careers', label: '加入我們', path: '/about/careers' },
    ],
  },
  service: {
    title: '客戶服務',
    items: [
      { key: 'faq', label: '常見問題', path: '/service/faq' },
      { key: 'shipping', label: '配送說明', path: '/service/shipping' },
      { key: 'returns', label: '退換貨政策', path: '/service/returns' },
      { key: 'contact', label: '聯絡我們', path: '/service/contact' },
    ],
  },
  policy: {
    title: '條款政策',
    items: [
      { key: 'terms', label: '服務條款', path: '/policy/terms' },
      { key: 'privacy', label: '隱私政策', path: '/policy/privacy' },
      { key: 'payment', label: '付款說明', path: '/policy/payment' },
    ],
  },
};
