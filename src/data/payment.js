/**
 * 付款相關資料
 */

// 付款方式類型
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  ATM: 'atm',
  CONVENIENCE_STORE: 'convenience_store',
  LINE_PAY: 'line_pay',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay',
};

// 付款方式選項
export const PAYMENT_METHOD_OPTIONS = [
  {
    key: PAYMENT_METHODS.CREDIT_CARD,
    label: '信用卡',
    description: '支援 Visa, MasterCard, JCB',
    icon: 'creditCard',
    enabled: true,
  },
  {
    key: PAYMENT_METHODS.DEBIT_CARD,
    label: '金融卡',
    description: '支援各大銀行金融卡',
    icon: 'card',
    enabled: true,
  },
  {
    key: PAYMENT_METHODS.ATM,
    label: 'ATM 轉帳',
    description: '提供虛擬帳號，3 天內完成轉帳',
    icon: 'bank',
    enabled: true,
  },
  {
    key: PAYMENT_METHODS.CONVENIENCE_STORE,
    label: '超商付款',
    description: '7-11, 全家, 萊爾富, OK 超商',
    icon: 'store',
    enabled: true,
  },
  {
    key: PAYMENT_METHODS.LINE_PAY,
    label: 'LINE Pay',
    description: '使用 LINE Pay 快速付款',
    icon: 'linePay',
    enabled: true,
  },
  {
    key: PAYMENT_METHODS.APPLE_PAY,
    label: 'Apple Pay',
    description: '支援 Apple 裝置快速付款',
    icon: 'applePay',
    enabled: true,
  },
  {
    key: PAYMENT_METHODS.GOOGLE_PAY,
    label: 'Google Pay',
    description: '支援 Android 裝置快速付款',
    icon: 'googlePay',
    enabled: true,
  },
];

// 配送方式
export const SHIPPING_METHODS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  CONVENIENCE_STORE: 'convenience_store',
};

// 配送方式選項
export const SHIPPING_METHOD_OPTIONS = [
  {
    key: SHIPPING_METHODS.STANDARD,
    label: '標準配送',
    description: '3-5 個工作天送達',
    fee: 60,
    freeThreshold: 1000,
    icon: 'truck',
  },
  {
    key: SHIPPING_METHODS.EXPRESS,
    label: '快速配送',
    description: '1-2 個工作天送達',
    fee: 120,
    freeThreshold: 2000,
    icon: 'rocketLaunch',
  },
  {
    key: SHIPPING_METHODS.CONVENIENCE_STORE,
    label: '超商取貨',
    description: '2-4 個工作天送達超商',
    fee: 60,
    freeThreshold: 1000,
    icon: 'store',
  },
];

// 發票類型
export const INVOICE_TYPES = {
  PERSONAL: 'personal',
  COMPANY: 'company',
  DONATION: 'donation',
  MOBILE_CARRIER: 'mobile_carrier',
};

// 發票選項
export const INVOICE_OPTIONS = [
  {
    key: INVOICE_TYPES.PERSONAL,
    label: '個人發票',
    description: '發票將以電子方式寄送至您的 Email',
  },
  {
    key: INVOICE_TYPES.COMPANY,
    label: '公司發票',
    description: '請填寫統一編號與公司抬頭',
  },
  {
    key: INVOICE_TYPES.DONATION,
    label: '捐贈發票',
    description: '將發票捐贈給慈善機構',
  },
  {
    key: INVOICE_TYPES.MOBILE_CARRIER,
    label: '手機載具',
    description: '將發票儲存至手機載具',
  },
];

// Mock 付款方式資料
export const SAVED_PAYMENT_METHODS = [
  {
    id: 1,
    type: PAYMENT_METHODS.CREDIT_CARD,
    label: '信用卡',
    cardNumber: '**** **** **** 1234',
    cardHolder: '王小明',
    expiryDate: '12/26',
    isDefault: true,
  },
  {
    id: 2,
    type: PAYMENT_METHODS.CREDIT_CARD,
    label: '信用卡',
    cardNumber: '**** **** **** 5678',
    cardHolder: '王小明',
    expiryDate: '08/27',
    isDefault: false,
  },
];
