/**
 * 使用者資料結構
 * @typedef {Object} User
 * @property {number} id - 使用者 ID
 * @property {string} name - 姓名
 * @property {string} email - Email
 * @property {string} phone - 電話
 * @property {string|null} avatar - 頭像 URL
 * @property {Object[]} addresses - 收貨地址列表
 * @property {Date} createdAt - 建立時間
 * @property {Date} updatedAt - 更新時間
 */

export const USER_MOCK_DATA = {
  id: 1,
  name: '王小明',
  email: 'test@example.com',
  phone: '0912-345-678',
  avatar: null,
  addresses: [
    {
      id: 1,
      recipientName: '王小明',
      phone: '0912-345-678',
      city: '台北市',
      district: '信義區',
      address: '信義路五段7號',
      postalCode: '110',
      isDefault: true,
    },
    {
      id: 2,
      recipientName: '王小明',
      phone: '0912-345-678',
      city: '新北市',
      district: '板橋區',
      address: '文化路一段188號',
      postalCode: '220',
      isDefault: false,
    },
  ],
  paymentMethods: [
    {
      id: 1,
      type: 'credit_card',
      label: '信用卡',
      cardNumber: '**** **** **** 1234',
      cardHolder: '王小明',
      expiryDate: '12/26',
      isDefault: true,
    },
    {
      id: 2,
      type: 'atm',
      label: 'ATM 轉帳',
      bankName: '台灣銀行',
      accountNumber: '******5678',
      isDefault: false,
    },
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2025-01-20'),
};

// 使用者個人資料表單欄位
export const USER_PROFILE_FIELDS = [
  { key: 'name', label: '姓名', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'phone', label: '電話', type: 'tel', required: true },
  { key: 'avatar', label: '頭像', type: 'file', required: false },
];

// 收貨地址表單欄位
export const ADDRESS_FORM_FIELDS = [
  { key: 'recipientName', label: '收件人姓名', type: 'text', required: true },
  { key: 'phone', label: '電話', type: 'tel', required: true },
  { key: 'city', label: '縣市', type: 'select', required: true },
  { key: 'district', label: '區域', type: 'select', required: true },
  { key: 'postalCode', label: '郵遞區號', type: 'text', required: true },
  { key: 'address', label: '詳細地址', type: 'text', required: true },
  { key: 'isDefault', label: '設為預設地址', type: 'checkbox', required: false },
];
