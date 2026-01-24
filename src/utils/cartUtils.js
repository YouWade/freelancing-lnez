/**
 * 購物車工具函數
 * 提供購物車相關的計算和比對邏輯
 */

/**
 * 比對兩個購物車項目是否相同
 * @param {Object} item1 - 第一個購物車項目
 * @param {Object} item2 - 第二個購物車項目
 * @returns {boolean} 是否為相同項目
 */
export const isSameCartItem = (item1, item2) => {
  return (
    item1.id === item2.id &&
    item1.color === item2.color &&
    item1.size === item2.size
  );
};

/**
 * 計算購物車小計
 * @param {Array} items - 購物車項目列表
 * @returns {number} 小計金額
 */
export const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/**
 * 計算選中項目的總額
 * @param {Array} items - 購物車項目列表
 * @param {Object} checkedItems - 選中狀態對象 { itemId: boolean }
 * @param {number} discount - 折扣金額
 * @returns {number} 選中項目總額
 */
export const calculateSelectedTotal = (items, checkedItems, discount = 0) => {
  const selectedSubtotal = items.reduce((sum, item) => {
    return checkedItems[item.id] ? sum + item.price * item.quantity : sum;
  }, 0);
  return selectedSubtotal - discount;
};

/**
 * 初始化所有項目為選中狀態
 * @param {Array} items - 購物車項目列表
 * @returns {Object} 選中狀態對象 { itemId: true }
 */
export const initializeCheckedItems = (items) => {
  const checkedItems = {};
  items.forEach(item => {
    checkedItems[item.id] = item.selected !== false; // 預設全選
  });
  return checkedItems;
};
