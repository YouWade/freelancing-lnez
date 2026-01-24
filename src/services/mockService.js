/**
 * Mock Service
 * 統一管理 Mock Data 的獲取和使用
 */

import { CONFIG } from '@constants/config';
import { CART_MOCK_DATA } from '@data/cart';
import { PRODUCTS_DATA } from '@data/products';

export const mockService = {
    /**
     * 是否啟用 Mock 模式
     */
    enabled: CONFIG.ENABLE_MOCK,

    /**
     * 獲取購物車 Mock 資料
     * @returns {Array|null} Mock 資料或 null
     */
    getCartData: () => {
        return mockService.enabled ? CART_MOCK_DATA : null;
    },

    /**
     * 獲取產品 Mock 資料
     * @returns {Array|null} Mock 資料或 null
     */
    getProductsData: () => {
        return mockService.enabled ? PRODUCTS_DATA : null;
    },

    /**
     * 模擬 API 延遲
     * @param {number} delay - 延遲時間(毫秒)
     * @returns {Promise}
     */
    simulateDelay: (delay = 500) => {
        return new Promise(resolve => setTimeout(resolve, delay));
    },
};
